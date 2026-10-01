/**
 * Root layout: wraps every page. Anything here (header, footer, fonts, theme)
 * appears on all routes. Only {children} changes as you navigate.
 */
import type { Metadata } from "next";
import { ViewTransition } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";
// Fonts are npm packages (Fontsource): files are bundled with the site, so no request to Google per visit.
import "@fontsource-variable/inter-tight";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource-variable/space-grotesk";
import "./globals.css";

// SEO + social previews. Each page can override `title`/`description` with its own `metadata`.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: { type: "website", siteName: site.title, title: site.title, description: site.description },
  twitter: { card: "summary_large_image" },
  alternates: { types: { "application/rss+xml": "/rss.xml" } },
};

// Runs before the page paints: saved theme, else the OS preference. Prevents a flash of the wrong theme.
const themeScript = `try{var t=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className="antialiased">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:p-3">Skip to content</a>
        <Header />
        {/* Every navigation is a React transition, so this animates old page out / new page in. */}
        <ViewTransition default="page">
          <main id="main" className="flex-1">{children}</main>
        </ViewTransition>
        <Footer />
      </body>
    </html>
  );
}
