"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Bot,
  MessageCircle,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import "./PortfolioAssistant.css";

type ChatRole = "user" | "assistant";
type ChatMessage = {
  id: number;
  role: ChatRole;
  content: string;
};

type PromptOptions = {
  attachments?: unknown[];
  model?: { key?: string } | undefined;
  effort?: string;
};

const SUGGESTIONS = [
  "Which technologies do I use for full-stack development?",
  "What can I learn about me from this portfolio?",
  "What am I exploring in AI and data analysis?",
];

const INITIAL_MESSAGE: ChatMessage = {
  id: 0,
  role: "assistant",
  content:
    "Hi! I'm the portfolio guide. Ask me about Achmat's background, skills, projects, or current learning interests.",
};

export default function PortfolioAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const controller = useRef<AbortController | null>(null);
  const messageListRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    if (!isOpen || !messageListRef.current) return;
    messageListRef.current.scrollTo({
      top: messageListRef.current.scrollHeight,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }, [isOpen, messages, busy, error]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !busy) setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, busy]);

  const send = useCallback(
    async (rawText: string, _options?: PromptOptions) => {
      const text = rawText.trim();
      if (!text || busy) return;

      const history = messages.map(({ role, content }) => ({ role, content }));
      const userMessage: ChatMessage = {
        id: nextId.current++,
        role: "user",
        content: text,
      };

      setMessages((current) => [...current, userMessage]);
      setError(null);
      setBusy(true);

      const currentController = new AbortController();
      controller.current = currentController;

      try {
        const response = await fetch("/api/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, history }),
          signal: currentController.signal,
        });

        const payload: { answer?: unknown; error?: unknown } = await response
          .json()
          .catch(() => ({}));

        if (!response.ok) {
          throw new Error(
            typeof payload.error === "string"
              ? payload.error
              : "I couldn't get an answer right now. Please try again."
          );
        }

        const answer = payload.answer;
        if (typeof answer !== "string" || !answer.trim()) {
          throw new Error("The assistant returned an empty response. Please try again.");
        }

        setMessages((current) => [
          ...current,
          {
            id: nextId.current++,
            role: "assistant",
            content: answer.trim(),
          },
        ]);
      } catch (caught) {
        if (caught instanceof Error && caught.name === "AbortError") {
          setMessages((current) => [
            ...current,
            {
              id: nextId.current++,
              role: "assistant",
              content: "Response stopped. You can ask another question whenever you're ready.",
            },
          ]);
          return;
        }
        setError(
          caught instanceof Error
            ? caught.message
            : "Something went wrong. Please try again."
        );
      } finally {
        if (controller.current === currentController) {
          controller.current = null;
          setBusy(false);
        }
      }
    },
    [busy, messages]
  );

  const stop = useCallback(() => {
    controller.current?.abort();
  }, []);

  const resetConversation = useCallback(() => {
    if (busy) return;
    setMessages([]);
    setError(null);
  }, [busy]);

  const shownMessages = messages.length ? messages : [INITIAL_MESSAGE];

  return (
    <div className="portfolio-assistant fixed bottom-5 right-4 z-[1000] sm:bottom-6 sm:right-6">
      {isOpen && (
        <section
          aria-label="Ask my portfolio"
          className="portfolio-assistant__panel mb-3 flex w-[min(440px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-border bg-card/95 shadow-[0_24px_80px_rgba(20,12,35,0.22)] backdrop-blur-2xl"
          style={{ maxHeight: "min(76dvh, 680px)" }}
        >
          <header className="flex shrink-0 items-center gap-3 border-b border-border px-4 py-3.5 sm:px-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
              <Sparkles size={19} aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-sm font-semibold text-foreground">Ask my portfolio</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Explore my work, skills, and interests.
              </p>
            </div>
            <button
              type="button"
              aria-label="Start a new conversation"
              title="New conversation"
              disabled={busy}
              onClick={resetConversation}
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-40"
            >
              <RotateCcw size={15} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Close portfolio assistant"
              onClick={() => setIsOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <X size={17} aria-hidden="true" />
            </button>
          </header>

          <div
            ref={messageListRef}
            aria-live="polite"
            aria-relevant="additions text"
            className="portfolio-assistant__messages min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-5"
          >
            {shownMessages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-2.5 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Bot size={15} aria-hidden="true" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2.5 text-sm leading-6 ${
                    message.role === "user"
                      ? "rounded-br-md bg-primary text-primary-foreground"
                      : "rounded-bl-md border border-border bg-background/80 text-foreground"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {busy && (
              <div className="flex items-center gap-2.5" role="status" aria-label="Thinking">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Bot size={15} aria-hidden="true" />
                </div>
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-border bg-background/80 px-4 py-3">
                  <span className="portfolio-assistant__dot" />
                  <span className="portfolio-assistant__dot portfolio-assistant__dot--delay-1" />
                  <span className="portfolio-assistant__dot portfolio-assistant__dot--delay-2" />
                </div>
              </div>
            )}

            {error && (
              <div className="ml-9 rounded-xl border border-destructive/20 bg-destructive/5 px-3 py-2.5 text-xs leading-5 text-destructive">
                {error}
              </div>
            )}

            {messages.length === 0 && (
              <div className="pt-1">
                <p className="mb-2.5 pl-9 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  Try asking
                </p>
                <div className="flex flex-col items-start gap-2 pl-9">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      disabled={busy}
                      onClick={() => void send(suggestion)}
                      className="group inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-2 text-left text-xs leading-5 text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-foreground disabled:opacity-50"
                    >
                      <span>{suggestion}</span>
                      <ArrowUpRight
                        size={13}
                        className="shrink-0 text-primary/70 opacity-70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="shrink-0 border-t border-border bg-card/80 p-3 sm:p-4">
            <form
              className="portfolio-assistant__composer flex items-center gap-2 rounded-2xl border border-border bg-background px-3 py-2"
              onSubmit={(event) => {
                event.preventDefault();
                const text = prompt;
                setPrompt("");
                void send(text);
              }}
            >
              <input
                type="text"
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="Ask about my work..."
                aria-label="Ask about my work"
                disabled={busy}
                className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:opacity-50"
              />
              {busy ? (
                <button
                  type="button"
                  onClick={stop}
                  className="shrink-0 rounded-xl px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-accent"
                >
                  Stop
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!prompt.trim()}
                  className="shrink-0 rounded-xl bg-primary px-3 py-2 text-xs font-medium text-primary-foreground disabled:opacity-50"
                >
                  Send
                </button>
              )}
            </form>
            <p className="mt-2 px-1 text-[10px] leading-4 text-muted-foreground">
              Answers are based on information available in this portfolio.
            </p>
          </div>
        </section>
      )}

      <button
        type="button"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close Ask my portfolio" : "Ask my portfolio"}
        onClick={() => setIsOpen((current) => !current)}
        className={`portfolio-assistant__trigger inline-flex items-center gap-2.5 rounded-full border border-primary/25 bg-card/95 px-4 py-3 text-sm font-medium text-foreground shadow-[0_10px_35px_rgba(20,12,35,0.18)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[0_14px_40px_rgba(168,85,247,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
          isOpen ? "portfolio-assistant__trigger--open" : ""
        }`}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
          {isOpen ? <X size={15} aria-hidden="true" /> : <MessageCircle size={15} aria-hidden="true" />}
        </span>
        <span>{isOpen ? "Close assistant" : "Ask my portfolio"}</span>
        {!isOpen && <Sparkles size={14} className="text-primary" aria-hidden="true" />}
      </button>
    </div>
  );
}
