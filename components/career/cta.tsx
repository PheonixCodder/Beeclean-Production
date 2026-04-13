"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const CTA = () => {
  return (
    <section className="relative w-full py-40 bg-white font-satoshi overflow-hidden">
      {/* Background Polish */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--zinc-50)_0%,_transparent_80%)] opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto flex flex-col items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        >
          <div className="inline-flex items-center justify-center gap-3 px-4 py-2 rounded-full bg-zinc-50 border border-zinc-100 shadow-sm mb-12">
             <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Join the collective</span>
          </div>

          <h1 className="text-6xl md:text-6xl font-black tracking-tight text-[#1a1a1a] leading-[1.1] mb-10">
            Let&apos;s build <br />
            <span className="text-primary italic">together.</span>
          </h1>
          
          <p className="max-w-xl mx-auto font-semibold text-xl text-foreground/85 leading-relaxed mb-16">
            We&apos;re always looking for talented individuals who are passionate
            about building high-fidelity experiences. Join our collective.
          </p>

          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { delay: 0.2, type: "spring", stiffness: 100 },
              },
            }}
            className="flex flex-col items-center gap-8"
          >
            <Button className="h-20 px-12 flex items-center gap-4 rounded-2xl bg-black text-white hover:bg-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-300 text-xl font-black uppercase tracking-widest">
              <Mail className="w-6 h-6" />
              Get in touch
            </Button>
            
            <p className="text-sm font-black uppercase tracking-widest text-zinc-300">
              Or email us at <span className="text-black">careers@beeclean.com</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
