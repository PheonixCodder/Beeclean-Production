"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Image, Video } from "lucide-react";
import { useScroll, useTransform, motion } from "framer-motion";
import AnimatedBeeCanvas from "../canvas/animated-bee-canvas";

gsap.registerPlugin(ScrollTrigger);

export default function BeeBuddyHero() {
  const containerRef = useRef(null);
  const phoneRef = useRef(null);
  const floatingElementsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=40%",
          scrub: true,
          pin: true,
        },
      });

      tl.to(phoneRef.current, {
        scale: 1.2,
        y: -50,
        ease: "none",
      })
        .from(
          ".floating-card",
          {
            x: (i) => (i % 2 === 0 ? 100 : -100),
            y: 100,
            scale: 0.5,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1,
          },
          "-=0.8",
        )
        .from(
          ".bottom-text",
          {
            opacity: 0,
            y: 50,
            duration: 0.4,
          },
          "-=0.4",
        );
    });

    return () => ctx.revert();
  }, []);

  const { scrollYProgress: rippleProgress } = useScroll({
    target: phoneRef, // Target the phone section
    offset: ["start end", "center center"], // Animation starts when phone bottom enters, ends when centered
  });
  const rippleOpacity = useTransform(
    rippleProgress,
    [0, 0.3, 0.6, 1],
    [0, 0, 0.3, 0],
  );

  return (
    <section
      ref={containerRef}
      className="relative h-fit w-full mt-0 pt-10 z-10 overflow-hidden font-satoshi bg-white flex flex-col items-center justify-center"
    >
      {/* Background Floating Elements
      <div
        ref={floatingElementsRef}
        className="absolute inset-0 pointer-events-none"
        style={{ perspective: "1000px" }}
      >
        {/* Top Left - Duplicate Photos
        <div
          className="floating-card gap-2 flex absolute top-[20%] left-[15%] p-4 bg-gray-100/70 rounded-xl border border-gray-100 shadow-sm"
          style={{ transform: "rotateY(20deg) rotateX(5deg)" }}
        >
          <div className="w-10 h-10 flex items-center justify-center bg-blue-300/60 rounded-xl">
            <Image className="text-blue-500" />
          </div>
          <div className="flex flex-col">
            <p className="text-xs text-foreground font-bold">12.4 GB</p>
            <p className="text-xs text-gray-400 font-semibold">
              Duplicates Found
            </p>
          </div>
        </div>

        {/* Top Right - Similar Videos
        <div
          className="floating-card gap-2 flex absolute top-[25%] right-[15%] p-4 bg-gray-100/70 rounded-xl border border-gray-100 shadow-sm"
          style={{ transform: "rotateY(-20deg) rotateX(5deg)" }}
        >
          <div className="w-10 h-10 flex items-center justify-center bg-red-300/60 rounded-xl">
            <Video className="text-red-500" />
          </div>
          <div className="flex flex-col">
            <p className="text-xs text-foreground font-bold">8.7 GB</p>
            <p className="text-xs text-gray-400 font-semibold">
              Videos Cleaned
            </p>
          </div>
        </div>

        {/* Bottom Left - Duplicate Contacts
        <div
          className="floating-card gap-2 flex absolute top-[75%] left-[22%] p-4 bg-gray-100/70 rounded-xl border border-gray-100 shadow-sm"
          style={{ transform: "rotateY(20deg) rotateX(-5deg)" }}
        >
          <div className="w-10 h-10 flex items-center justify-center bg-purple-300/60 rounded-xl">
            <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <p className="text-xs text-foreground font-bold">47</p>
            <p className="text-xs text-gray-400 font-semibold">
              Duplicate Groups
            </p>
          </div>
        </div>

        {/* Bottom Right - Email Cleanup
        <div
          className="floating-card gap-2 flex absolute top-[80%] right-[22%] p-4 bg-gray-100/70 rounded-xl border border-gray-100 shadow-sm"
          style={{ transform: "rotateY(-20deg) rotateX(-5deg)" }}
        >
          <div className="w-10 h-10 flex items-center justify-center bg-teal-300/60 rounded-xl">
            <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <p className="text-xs text-foreground font-bold">2,847</p>
            <p className="text-xs text-gray-400 font-semibold">
              Emails Cleared
            </p>
          </div>
        </div>
      </div> */}
      {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {[
          {
            color: "border-gray-200/40", // Light gray border
            glow: "shadow-[0_0_40px_rgba(128,128,128,0.1)]",
            blur: "blur-sm",
          },
          {
            color: "border-gray-300/30", // Medium gray border
            glow: "shadow-[0_0_50px_rgba(128,128,128,0.08)]",
            blur: "blur-md",
          },
          {
            color: "border-gray-400/20", // Subtle dark gray border
            glow: "shadow-[0_0_60px_rgba(128,128,128,0.05)]",
            blur: "blur-lg",
          },
        ].map((style, index) => (
          <motion.div
            key={index}
            style={{
              // Each ring scales slightly wider than the last
              scale: useTransform(
                rippleProgress,
                [0, 0.3, 1], // Stays at 0.4 scale until 30% scroll progress
                [0.4, 0.4, 1.2 + index * 0.8],
              ),
              opacity: rippleOpacity,
            }}
            // 'border-[6px]' or 'border-[8px]' makes them much thicker
            className={`absolute z-50 w-[450px] h-[450px] md:w-[700px] md:h-[700px] rounded-full border-[25px] ${style.color} ${style.glow} ${style.blur} bg-transparent`}
          />
        ))}
      </div> */}
      {/* Phone Container */}
      <div
        ref={phoneRef}
        className="relative w-[300px] aspect-[9/19] z-10 transition-transform duration-300"
      >
        <AnimatedBeeCanvas className="z-50 absolute mt-20" width={300} height={200} />
        <img
          src="/frame.png"
          alt="Frame"
          className="absolute inset-0 z-20 w-full h-full object-contain pointer-events-none"
        />
        <img
          src="/front-wb.png"
          alt="App UI"
          className="absolute inset-0 z-10 w-[100%] h-[96%] mt-2.5 ml-[1px] rounded-[2.5rem] object-contain"
        />
      </div>

      {/* Bottom Text */}
      <div className="bottom-text mt-12 text-center z-20">
        <h2 className="text-[64px] font-black text-foreground">
          Know what <br /> you&apos;re saving
        </h2>
      </div>
    </section>
  );
}
