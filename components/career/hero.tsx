"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, Lightbulb, Users, Zap } from "lucide-react";

const CareerHero = () => {
  return (
    <motion.div
      className="flex flex-col items-center bg-white relative z-20 pb-40 pt-20 font-satoshi overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
          },
        },
      }}
    >
      {/* Background Depth Layers */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Mesh Gradients */}
        <div className="absolute top-[-10%] right-[-10%] w-[70%] h-[70%] bg-[radial-gradient(circle_at_center,_var(--zinc-100)_0%,_transparent_70%)] opacity-40 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,_var(--zinc-100)_0%,_transparent_70%)] opacity-30 blur-[100px]" />
        
        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
      {/* Background Polish */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[80%] bg-[radial-gradient(circle_at_center,_var(--zinc-50)_0%,_transparent_70%)] opacity-70" />
        <div className="absolute top-[20%] -left-[20%] w-[60%] h-[100%] bg-[radial-gradient(circle_at_center,_var(--zinc-50)_0%,_transparent_60%)] blur-3xl opacity-50" />
      </div>

      <motion.div
        className="flex flex-col items-center justify-center min-h-[400px] px-6 text-center relative z-10"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
          },
        }}
      >
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-50 border border-zinc-100 shadow-sm mb-10">
           <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
           <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Join Beeclean</span>
        </div>

        <h1 className="text-6xl md:text-6xl font-black tracking-tight text-[#1a1a1a] leading-[1.1] mb-8">
          Build the future <br />
          <span className="text-primary italic">with us.</span>
        </h1>
        
        <p className="max-w-xl font-semibold text-xl text-foreground/85 leading-relaxed mb-16">
          Join a team of passionate creators who are reimagining how people
          interact with their devices. Help us build tools that millions rely on
          every day.
        </p>

        <motion.div 
          className="mt-16"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
        >
          <Button className="h-16 px-10 rounded-2xl bg-black text-white font-black uppercase tracking-widest shadow-xl hover:bg-zinc-800 transition-all">
            See Open Roles
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CareerHero;
