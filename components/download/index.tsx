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

  // Vertical movement (same for both)
  // Starts at 50% (half hidden) and moves to -30% (upward)
  const yMove = useTransform(scrollYProgress, [0, 1], ["50%", "-30%"]);

  // Horizontal movement based on tilt
  // Left phone (-15deg): starts at -95%, moves further left to -110% as it goes up
  const leftX = useTransform(scrollYProgress, [0, 1], ["-95%", "-115%"]);

  // Right phone (15deg): starts at -15%, moves further right to 0% as it goes up
  const rightX = useTransform(scrollYProgress, [0, 1], ["-15%", "5%"]);

  return (
    <motion.section
      ref={containerRef}
      className="relative flex flex-col items-center justify-center py-24 px-4 text-center font-satoshi overflow-hidden bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
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
      {/* Background Floating Elements */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{ perspective: "1200px" }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hidden lg:flex items-center gap-3 absolute top-[15%] left-[10%] p-4 bg-white/80 backdrop-blur-md rounded-2xl border border-gray-100 shadow-xl"
          style={{ transform: "rotateY(15deg) rotateX(5deg) scale(0.9)" }}
        >
          <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-xl">
            <Video className="text-green-600 w-5 h-5" />
          </div>
          <div className="flex flex-col text-left">
            <p className="text-sm font-bold text-slate-900">50+</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">
              Replica Videos
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="hidden lg:flex items-center gap-3 absolute top-[20%] right-[10%] p-4 bg-white/80 backdrop-blur-md rounded-2xl border border-gray-100 shadow-xl"
          style={{ transform: "rotateY(-15deg) rotateX(5deg) scale(0.9)" }}
        >
          <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-xl">
            <ImageIcon className="text-blue-600 w-5 h-5" />
          </div>
          <div className="flex flex-col text-left">
            <p className="text-sm font-bold text-slate-900">100+</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">
              Replica Images
            </p>
          </div>
        </motion.div>
      </div>

      {/* Content Layer */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
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
        >
          <img src="/logo.svg" alt="Logo" className="w-20 h-20" />
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut" },
            },
          }}
          className="max-w-2xl mb-10"
        >
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-black mb-6">
            Download now <br /> on App Store
          </h1>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: 0.1, ease: "easeOut" },
              },
            }}
            className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium px-4"
          >
            The #1 rated phone cleaning app — built to help you{" "}
            <br className="hidden md:block" />
            clean up clutter, stay organized, and save space.
          </motion.p>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: 0.2, ease: "easeOut" },
            },
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="h-16 px-10 relative z-50 flex items-center gap-3 rounded-2xl bg-black text-white hover:bg-zinc-800 transition-all duration-300 text-lg font-bold shadow-2xl">
              <img
                src="/apple.svg"
                width={24}
                alt="apple"
                className="brightness-0 invert"
              />
              Download for iPhone
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Phone Images Layout */}
      <div className="relative w-full max-w-[600px] h-[300px] md:h-[400px] mt-12">
        {/* Left Phone: Moves Up and Left */}
        <motion.img
          style={{
            y: yMove,
            x: leftX,
            rotate: -15,
          }}
          src="/front.png"
          alt="App Screenshot Left"
          className="absolute left-1/2 top-0 w-[240px] md:w-[320px] will-change-transform"
        />
        {/* Right Phone: Moves Up and Right */}
        <motion.img
          style={{
            y: yMove,
            x: rightX,
            rotate: 15,
          }}
          src="/front.png"
          alt="App Screenshot Right"
          className="absolute left-1/2 top-0 w-[240px] md:w-[320px] will-change-transform"
        />
      </div>
    </motion.section>
  );
};

export default DownloadComp;
