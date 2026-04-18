import type { Metadata } from "next";
// import { BlogSlider } from "@/components/blog/blog-slider"; // Component not implemented yet
import BeeBuddyHero from "@/features/home/ui/components/bee-screen";
import CTA from "@/features/home/ui/components/cta";
import FAQ from "@/features/home/ui/components/faq";
import Features from "@/features/home/ui/components/features";
// import Hero from "@/components/home/hero";
import HowItWorks from "@/features/home/ui/components/how-it-works";
// import PhoneDecodeScroll from "@/components/home/phone-decode";
import Pricing from "@/features/home/ui/components/pricing";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import DuplicateSelector from "@/features/home/ui/components/duplicate-images";
import InteractiveBeeMascot from "@/components/canvas/interactive-bee-mascot";
import Hero from "@/features/home/ui/components/new-hero";
import Prism from "@/components/ui/background";

const Home = () => {
  return (
    <div className="relative min-h-screen">
      {/* Global Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
{/* <div className="h-full bg-gradient-to-r from-amber-50 via-yellow-50 to-emerald-50" /> */}
      </div>

      <Navbar />
      <main>
        <Hero />
        <DuplicateSelector />
        <div id="features">
          <Features />
        </div>
        <div id="pricing">
          <Pricing />
        </div>
        <div id="how-it-works">
          <HowItWorks />
        </div>
        <FAQ />
        <CTA />
      </main>

      {/* Footer with background to overlay the Prism */}
      <div className="bg-white dark:bg-slate-950 relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
