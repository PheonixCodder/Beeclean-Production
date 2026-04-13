import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { QueryProvider } from "@/lib/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ErrorBoundary } from "@/components/error-boundary";
import { WebVitals } from "@/components/web-vitals";
import { validateEnv } from "@/lib/env-validator";
import { HashScrollHandler } from "@/components/ui/hash-scroll-handler";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const satoshi = localFont({
  src: [
    {
      path: "./fonts/Satoshi-Variable.woff2",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-VariableItalic.woff2",
      style: "italic",
    },
  ],
  // This allows you to use font-satoshi in Tailwind
  variable: "--font-satoshi",
});

// Validate environment variables on app startup
validateEnv();

export const metadata: Metadata = {
    title: "Beeclean - Professional iPhone Cleaning & Optimization",
    description: "Keep your iPhone running like new with Beeclean. Advanced cleaning, optimization, and performance tools for iOS devices.",
    keywords: ["iPhone cleaning", "iOS optimization", "iPhone performance", "clean iPhone", "optimize iPhone"],
    authors: [{ name: "Beeclean Team" }],
    openGraph: {
    title: "Beeclean - Professional iPhone Cleaning & Optimization",
    description: "Keep your iPhone running like new with Beeclean. Advanced cleaning, optimization, and performance tools for iOS devices.",
    type: "website",
    locale: "en_US",
    siteName: "Beeclean",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Beeclean - iPhone Cleaning & Optimization",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Beeclean - Professional iPhone Cleaning & Optimization",
    description: "Keep your iPhone running like new with Beeclean.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${satoshi.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NuqsAdapter>
          <ErrorBoundary>
            <QueryProvider>{children}</QueryProvider>
          </ErrorBoundary>
        </NuqsAdapter>
        <WebVitals />
        <HashScrollHandler />
      </body>
    </html>
  );
}
