"use client";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Video } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const DownloadComp = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yMove = useTransform(scrollYProgress, [0, 1], ["60%", "-20%"]);
  const leftX = useTransform(scrollYProgress, [0, 1], ["-105%", "-125%"]);
  const rightX = useTransform(scrollYProgress, [0, 1], ["-5%", "15%"]);

  return (
    <motion.section
      ref={containerRef}
      className="relative flex flex-col items-center justify-center py-40 px-6 text-center font-satoshi overflow-hidden bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
          },
        },
      }}
    >
      {/* Background Mesh Gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[radial-gradient(circle_at_center,_var(--zinc-50)_0%,,_transparent_70%)] opacity-70" />
      </div>

      {/* Background Floating Elements */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-10"
        style={{ perspective: "1500px" }}
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex items-center gap-4 absolute top-[25%] left-[8%] p-6 bg-white border border-zinc-100 shadow-apple-hover rounded-[2rem]"
          style={{ transform: "rotateY(20deg) rotateX(10deg) scale(0.95)" }}
        >
          <div className="w-12 h-12 flex items-center justify-center bg-black rounded-xl">
            <Video className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col text-left">
            <p className="text-xl font-black text-black tracking-tighter">50+</p>
            <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-black">
              Replica Engine
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex items-center gap-4 absolute top-[30%] right-[8%] p-6 bg-white border border-zinc-100 shadow-apple-hover rounded-[2rem]"
          style={{ transform: "rotateY(-20deg) rotateX(10deg) scale(0.95)" }}
        >
          <div className="w-12 h-12 flex items-center justify-center bg-zinc-50 rounded-xl">
            <ImageIcon className="text-black w-6 h-6" />
          </div>
          <div className="flex flex-col text-left">
            <p className="text-xl font-black text-black tracking-tighter">100%</p>
            <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-black">
              Pure Fidelity
            </p>
          </div>
        </motion.div>
      </div>

      {/* Content Layer */}
      <motion.div
        className="relative z-20 flex flex-col items-center"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
          },
        }}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { type: "spring", stiffness: 200, damping: 20 },
            },
          }}
          className="mb-12"
        >
          <div className="p-4 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm relative group overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 group-hover:via-white/20 transition-all duration-700" />
             <img src="/logo.svg" alt="Logo" className="w-24 h-24 relative z-10" />
          </div>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
            },
          }}
          className="max-w-4xl mb-16"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-50 border border-zinc-100 shadow-sm mb-12">
             <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Available Globally</span>
          </div>
          
          <h1 className="text-6xl md:text-6xl font-black tracking-tight text-[#1a1a1a] mb-10 leading-[1.1]">
            One Click. <br />
            <span className="text-primary italic">Unlimited speed.</span>
          </h1>
          
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, delay: 0.2, ease: "easeOut" },
              },
            }}
            className="text-xl font-semibold text-foreground/85 leading-relaxed max-w-2xl mx-auto"
          >
            The same Beeclean you love, now for Desktop. Clean your file system,
            optimize cache, and reclaim your space, stay organized, and master your device.
          </motion.p>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.4, ease: "easeOut" },
            },
          }}
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-black/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <Button className="h-24 px-14 relative z-50 flex items-center gap-6 rounded-[2.5rem] bg-black text-white hover:bg-zinc-800 transition-all duration-500 text-xl font-black uppercase tracking-widest shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)]">
              <img
                src="/apple.svg"
                width={28}
                alt="apple"
                className="brightness-0 invert"
              />
              Download for iPhone
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Phone Images Layout */}
      <div className="relative w-full max-w-[800px] h-[500px] md:h-[600px] mt-24">
        {/* Left Phone */}
        <motion.div
          style={{
            y: yMove,
            x: leftX,
            rotate: -15,
          }}
          className="absolute left-1/2 top-0 w-[280px] md:w-[400px] will-change-transform"
        >
           <div className="relative rounded-[3rem] p-1.5 bg-black overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)]">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
              <img src="/front.png" alt="App Screenshot Left" className="w-full rounded-[2.5rem]" />
           </div>
        </motion.div>
        {/* Right Phone */}
        <motion.div
          style={{
            y: yMove,
            x: rightX,
            rotate: 15,
          }}
          className="absolute left-1/2 top-0 w-[280px] md:w-[400px] will-change-transform"
        >
           <div className="relative rounded-[3rem] p-1.5 bg-black overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)]">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
              <img src="/front.png" alt="App Screenshot Right" className="w-full rounded-[2.5rem]" />
           </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default DownloadComp;
