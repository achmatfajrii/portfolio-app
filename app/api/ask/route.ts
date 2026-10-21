
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type HistoryMessage = {
  role: "user" | "assistant";
  content: string;
};

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
  error?: {
    message?: string;
    status?: string;
    code?: number;
  };
};

const PORTFOLIO_CONTEXT = `
IDENTITY
You are Ask My Portfolio, the AI guide for Achmat Fajri's personal developer portfolio.

Your job is to answer questions about Achmat's profile, career background, professional experience, projects, technologies, social profiles, and learning journey.

PROFILE
- Name: Achmat Fajri.
- Professional title: Fullstack Web Developer.
- He enjoys turning ideas into clean, interactive, and purposeful web experiences.
- Education: vocational high school in Computer Networking, followed by a Bachelor's degree in Informatics Engineering at Universitas Sebelas Maret, Surakarta.

CAREER BACKGROUND
- Achmat began his IT journey in vocational high school, majoring in Computer Networking.
- He studied Informatics Engineering at Universitas Sebelas Maret, Surakarta.
- During college, he worked on IT projects and completed an internship as a Fullstack Web Developer through the MBKM program in Malang.
- Before graduating, he worked as a Frontend Developer in Yogyakarta.
- He then worked as a Frontend Developer at a hospital in Pasuruan.
- After completing a full-stack development bootcamp, he joined a subsidiary of Pertamina as a Fullstack Web Developer.
- According to the portfolio's Background section, he still works there.

IMPORTANT EMPLOYMENT DISTINCTION
- If asked about Achmat's current work, explain that he works as a Fullstack Web Developer at a subsidiary of Pertamina.
- Do not say that his current workplace is absent from the portfolio.
- The background text identifies the employer as a subsidiary of Pertamina, but does not state the subsidiary's exact company name. Do not invent its legal name.

SOCIAL PROFILES
- GitHub profile: https://github.com/achmatfajrii
- LinkedIn profile: https://www.linkedin.com/in/achmatfajri
- When asked for a social profile, provide the actual URL listed here.
- Never invent, shorten, or substitute a profile URL.
- Do not claim a profile URL is absent if it is provided in this context.

TECHNOLOGIES
- React, Next.js, TypeScript, JavaScript, Tailwind CSS, Vue.js, Node.js, Express.js, Prisma, PostgreSQL, MySQL, Git, GitHub, and SQL.
- The Data Journey section identifies Python, pandas, and Matplotlib as learning areas, and SQL as ready in its toolkit snapshot.

DATA AND AI INTERESTS
- Achmat is expanding his skills in Python and data analysis and is interested in AI.
- An exploratory question in the portfolio is: "Why do some AI suggestions work better than others?"
- The displayed data workflow is collect, clean, explore, visualize, and story.
- Describe learning progress only as supported by the portfolio. Do not invent completed achievements.

RESPONSE RULES
- Answer in the same language as the visitor's question.
- Be friendly, professional, and concise.
- Prioritize the specific information in this context over generic statements.
- Do not say that information is missing when it is explicitly listed here.
- Distinguish between a fact that is not listed and a fact that is listed but described generally.
- If the portfolio identifies only an employer category and not its exact legal name, explain that distinction honestly.
- Never invent URLs, project details, employment dates, achievements, or technical skills.
- For project-specific questions, use verified project information added to this context. Do not assume every technology listed is used in every project.
- Do not claim to browse the website or access private files.
- Keep answers focused on Achmat's portfolio and politely redirect unrelated questions.
`;

const MAX_ATTEMPTS = 3;
const REQUEST_TIMEOUT_MS = 20_000;

const RETRYABLE_STATUSES = new Set([
  408,
  429,
  500,
  502,
  503,
  504,
]);

function cleanHistory(value: unknown): HistoryMessage[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((entry): entry is Record<string, unknown> => {
      return Boolean(entry) && typeof entry === "object";
    })
    .map((entry) => {
      const role: HistoryMessage["role"] =
        entry.role === "assistant" ? "assistant" : "user";

      return {
        role,
        content:
          typeof entry.content === "string"
            ? entry.content.trim()
            : "",
      };
    })
    .filter((entry) => entry.content.length > 0)
    .slice(-8)
    .map((entry) => ({
      role: entry.role,
      content: entry.content.slice(0, 1500),
    }));
}

function getErrorMessage(payload: unknown): string | undefined {
  if (!payload || typeof payload !== "object") {
    return undefined;
  }

  const error = (payload as { error?: unknown }).error;

  if (!error || typeof error !== "object") {
    return undefined;
  }

  const message = (error as { message?: unknown }).message;

  return typeof message === "string"
    ? message.slice(0, 500)
    : undefined;
}

async function readJsonSafely(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function getRetryDelay(
  response: Response,
  attempt: number,
): number {
  const retryAfter = response.headers.get("Retry-After");

  if (retryAfter) {
    const seconds = Number(retryAfter);

    if (Number.isFinite(seconds) && seconds >= 0) {
      return Math.min(seconds * 1000, 20_000);
    }

    const retryDate = Date.parse(retryAfter);

    if (!Number.isNaN(retryDate)) {
      return Math.min(
        Math.max(0, retryDate - Date.now()),
        20_000,
      );
    }
  }

  // Exponential backoff with jitter:
  // attempt 1: approximately 0.8–1.1 seconds
  // attempt 2: approximately 1.6–1.9 seconds
  const baseDelay = 800 * 2 ** (attempt - 1);
  const jitter = Math.floor(Math.random() * 300);

  return Math.min(baseDelay + jitter, 8_000);
}

function wait(
  milliseconds: number,
  signal: AbortSignal,
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException("Request aborted", "AbortError"));
      return;
    }

    const onAbort = () => {
      clearTimeout(timer);
      signal.removeEventListener("abort", onAbort);

      reject(new DOMException("Request aborted", "AbortError"));
    };

    const timer = setTimeout(() => {
      signal.removeEventListener("abort", onAbort);
      resolve();
    }, milliseconds);

    signal.addEventListener("abort", onAbort, { once: true });
  });
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  requestSignal: AbortSignal,
): Promise<Response> {
  const controller = new AbortController();

  const onRequestAbort = () => {
    controller.abort();
  };

  if (requestSignal.aborted) {
    controller.abort();
  } else {
    requestSignal.addEventListener(
      "abort",
      onRequestAbort,
      { once: true },
    );
  }

  const timeout = setTimeout(() => {
    controller.abort(
      new DOMException(
        "Gemini request timed out",
        "TimeoutError",
      ),
    );
  }, REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
    requestSignal.removeEventListener(
      "abort",
      onRequestAbort,
    );
  }
}

function getPublicProviderError(status: number): {
  message: string;
  status: number;
} {
  if (status === 429) {
    return {
      message:
        "The AI assistant is receiving too many requests. Please wait a moment and try again.",
      status: 429,
    };
  }

  if (status === 503) {
    return {
      message:
        "The AI service is temporarily busy. Please try again in a moment.",
      status: 503,
    };
  }

  if (status === 408 || status >= 500) {
    return {
      message:
        "The AI service is temporarily unavailable. Please try again shortly.",
      status: 502,
    };
  }

  if (status === 401 || status === 403) {
    return {
      message:
        "The AI service could not authorize the request. Please check the server API key and Gemini API access.",
      status: 502,
    };
  }

  return {
    message:
      "The AI service could not process the request. Please try again later.",
    status: 502,
  };
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  const model =
    process.env.GEMINI_MODEL || "gemini-3.6-flash";

  if (!apiKey) {
    console.error(
      "[Portfolio assistant] GEMINI_API_KEY is not configured.",
    );

    return NextResponse.json(
      {
        error:
          "The portfolio assistant is not configured yet. Please try again later.",
      },
      { status: 503 },
    );
  }

  let body: {
    text?: unknown;
    history?: unknown;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const text =
    typeof body.text === "string"
      ? body.text.trim()
      : "";

  if (!text) {
    return NextResponse.json(
      { error: "Please enter a question." },
      { status: 400 },
    );
  }

  if (text.length > 1500) {
    return NextResponse.json(
      {
        error:
          "Please keep your question under 1,500 characters.",
      },
      { status: 413 },
    );
  }

  const history = cleanHistory(body.history);

  const contents = [
    ...history.map((message) => ({
      role:
        message.role === "assistant"
          ? "model"
          : "user",
      parts: [{ text: message.content }],
    })),
    {
      role: "user",
      parts: [{ text }],
    },
  ];

  const endpoint =
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;

  try {
    for (
      let attempt = 1;
      attempt <= MAX_ATTEMPTS;
      attempt += 1
    ) {
      let upstream: Response;

      try {
        upstream = await fetchWithTimeout(
          endpoint,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-goog-api-key": apiKey,
            },
            body: JSON.stringify({
              systemInstruction: {
                parts: [{ text: PORTFOLIO_CONTEXT }],
              },
              contents,
              generationConfig: {
                temperature: 0.35,
                maxOutputTokens: 450,
              },
            }),
            cache: "no-store",
          },
          request.signal,
        );
      } catch (error) {
        // If the visitor cancelled the request, do not retry it.
        if (request.signal.aborted) {
          return new Response(null, { status: 499 });
        }

        const message =
          error instanceof Error
            ? error.message
            : "Unknown network error";

        console.error(
          `[Portfolio assistant] Gemini network/timeout error (attempt ${attempt}/${MAX_ATTEMPTS}):`,
          {
            model,
            message,
          },
        );

        if (attempt === MAX_ATTEMPTS) {
          return NextResponse.json(
            {
              error:
                "The AI service could not be reached after several attempts. Please try again shortly.",
            },
            { status: 503 },
          );
        }

        await wait(
          Math.min(800 * 2 ** (attempt - 1), 8_000)
            + Math.floor(Math.random() * 300),
          request.signal,
        );

        continue;
      }

      if (!upstream.ok) {
        const providerPayload =
          await readJsonSafely(upstream);

        const providerMessage =
          getErrorMessage(providerPayload);

        console.error(
          `[Portfolio assistant] Gemini returned HTTP ${upstream.status} (attempt ${attempt}/${MAX_ATTEMPTS}).`,
          {
            model,
            providerMessage:
              providerMessage ?? "No error message returned",
          },
        );

        const shouldRetry =
          RETRYABLE_STATUSES.has(upstream.status);

        if (shouldRetry && attempt < MAX_ATTEMPTS) {
          const delay = getRetryDelay(upstream, attempt);

          console.warn(
            `[Portfolio assistant] Retrying Gemini in ${delay}ms.`,
          );

          await wait(delay, request.signal);
          continue;
        }

        const publicError = getPublicProviderError(
          upstream.status,
        );

        return NextResponse.json(
          { error: publicError.message },
          { status: publicError.status },
        );
      }

      const result = (
        await upstream.json()
      ) as GeminiResponse;

      const answer = result.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || "")
        .join("")
        .trim();

      if (typeof answer !== "string" || !answer) {
        console.error(
          "[Portfolio assistant] Gemini returned no usable answer.",
          { model },
        );

        return NextResponse.json(
          {
            error:
              "I couldn't form an answer from the available portfolio information. Please try rephrasing your question.",
          },
          { status: 502 },
        );
      }

      return NextResponse.json({ answer });
    }

    // Defensive fallback. The retry loop should return before reaching this.
    return NextResponse.json(
      {
        error:
          "The AI service is temporarily unavailable. Please try again shortly.",
      },
      { status: 503 },
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.name === "AbortError"
    ) {
      return new Response(null, { status: 499 });
    }

    if (request.signal.aborted) {
      return new Response(null, { status: 499 });
    }

    console.error(
      "[Portfolio assistant] Unexpected server error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "An unexpected error occurred while generating a response. Please try again.",
      },
      { status: 500 },
    );
  }
}
