import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Achmat Fajri — Fullstack Developer",
  description:
    "Portfolio of Achmat Fajri, a fullstack developer specializing in React, Vue, Node.js, and SQL.",
  openGraph: {
    title: "Achmat Fajri — Fullstack Developer",
    description:
      "Portfolio of Achmat Fajri, a fullstack developer specializing in React, Vue, Node.js, and SQL.",
    url: siteUrl,
    siteName: "Achmat Fajri",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Achmat Fajri — Fullstack Developer",
    description:
      "Portfolio of Achmat Fajri, a fullstack developer specializing in React, Vue, Node.js, and SQL.",
  },
};

// Script ini jalan sebelum React hydrate, supaya tema langsung benar
// dari awal (tidak ada flash light->dark).
const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme-storage');
    var theme = stored ? JSON.parse(stored).state.theme : 'dark';
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}