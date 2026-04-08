import type { Metadata } from "next";
// import { BlogSlider } from "@/components/blog/blog-slider"; // Component not implemented yet
import BeeBuddyHero from "@/components/home/bee-screen";
import CTA from "@/components/home/cta";
import FAQ from "@/components/home/faq";
import Features from "@/components/home/features";
import Hero from "@/components/home/hero";
import HowItWorks from "@/components/home/how-it-works";
// import PhoneDecodeScroll from "@/components/home/phone-decode";
import Pricing from "@/components/home/pricing";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import DuplicateSelector from "@/components/home/duplicate-images";
import InteractiveBeeMascot from "@/components/canvas/interactive-bee-mascot";

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

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <BeeBuddyHero />
      {/* <InteractiveBeeMascot /> */}
      {/* <PhoneDecodeScroll /> */}
      <DuplicateSelector />
      {/* <HowItWorks /> */}
      <Features />
      <Pricing />
      {/* <BlogSlider /> */}
      <HowItWorks />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;
