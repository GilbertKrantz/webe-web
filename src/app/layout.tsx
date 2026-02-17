import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

const THEME_SCRIPT = `
  (function () {
    var theme = localStorage.getItem("theme") || "dark";
    document.documentElement.classList.toggle("light", theme === "light");
  })();
`;

export const metadata: Metadata = {
  title: 'Wilbert Chandra | Data Engineer & AI Engineer',
  description:
    'Portfolio of Wilbert Chandra, a Data Engineer and AI Engineer based in Jakarta, Indonesia.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <a
          href="#projects"
          className="sr-only font-mono text-sm uppercase focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[999] focus:bg-primary focus:px-4 focus:py-2 focus:text-background"
        >
          Skip to content
        </a>
        <div className="relative min-h-screen bg-background transition-colors duration-300">
          <div className="grain-overlay" />
          {children}
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
