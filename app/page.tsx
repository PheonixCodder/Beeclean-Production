import type { Metadata } from "next";
import Home from "@/features/home/ui/pages/home";

export const metadata: Metadata = {
  title: "Beeclean - Professional iPhone Cleaning & Optimization",
  description:
    "Keep your iPhone running like new with Beeclean. Advanced cleaning, optimization, and performance tools for iOS devices.",
  keywords: [
    "iPhone cleaning",
    "iOS optimization",
    "iPhone performance",
    "clean iPhone",
    "optimize iPhone",
  ],
  authors: [{ name: "Beeclean Team" }],
  openGraph: {
    title: "Beeclean - Professional iPhone Cleaning & Optimization",
    description:
      "Keep your iPhone running like new with Beeclean. Advanced cleaning, optimization, and performance tools for iOS devices.",
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
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const HomePage = () => {
  return (
    <Home />
  );
};

export default Home;
