"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Image, Video } from "lucide-react";
import { useScroll, useTransform, motion } from "framer-motion";
import AnimatedBeeCanvas from "../canvas/animated-bee-canvas";
import AnimatedBarCanvas from "../canvas/animated-bar-canvas";

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
      {/* Phone Container */}
      <div
        ref={phoneRef}
        className="relative w-[300px] aspect-[9/19] z-10 transition-transform duration-300"
      >
        <AnimatedBarCanvas
          className="z-50 absolute mt-22.5 ml-6"
          width={80}
          height={15}
          totalFrames={144}
          fps={144 / 10}
          loop={true}
        />
        <AnimatedBeeCanvas
          className="z-50 absolute mt-20"
          totalFrames={372}
          fps={372 / 10}
          width={300}
          height={200}
        />
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
