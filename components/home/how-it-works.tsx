  "use client";
  import React, { useRef } from "react";
  import { motion, useScroll, useTransform } from "framer-motion";
  import { useGSAP } from "@gsap/react";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  const HowItWorks = () => {
    gsap.registerPlugin(ScrollTrigger);
    const container = useRef(null);

    useGSAP(
      () => {
        const cards = document.querySelectorAll(".card");
        const leftBoxes = document.querySelectorAll(".left-box");
        const rightBoxes = document.querySelectorAll(".right-box");

        // Initial State: Only the first set of text is visible
        gsap.set([leftBoxes, rightBoxes], { height: 0, opacity: 0 });
        gsap.set([leftBoxes[0], rightBoxes[0]], { height: "auto", opacity: 1 });

        // Initial Card Positions
        gsap.set(cards[0], { x: "0%", y: "0%" });
        gsap.set(cards[1], { x: "100%", y: "0%" });
        gsap.set(cards[2], { x: "0%", y: "100%" });

        const scrollTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            // Increase this number to slow down the overall animation
            end: "+=1500",
            pin: ".sticky-cards",
            // Increase this for more "weight" or smoothing
            scrub: 2,
            pinSpacing: true,
            anticipatePin: 1,
          },
        });

        // STEP 1: Move to Screen 2
        scrollTimeline.to(cards[1], {
          x: "0%",
          ease: "power2.inOut",
          duration: 1,
        });
        // Hide Screen 1 Text
        scrollTimeline.to(
          [leftBoxes[0], rightBoxes[0]],
          { height: 0, opacity: 0, duration: 0.5 },
          "<",
        );
        // Show Screen 2 Text
        scrollTimeline.to(
          [leftBoxes[1], rightBoxes[1]],
          { height: "auto", opacity: 1, duration: 0.5 },
          "<",
        );

        // STEP 2: Move to Screen 3
        scrollTimeline.to(cards[2], { y: "0%", ease: "power2.out", duration: 1 });
        // Hide Screen 2 Text
        scrollTimeline.to(
          [leftBoxes[1], rightBoxes[1]],
          { height: 0, opacity: 0, duration: 0.5 },
          "<",
        );
        // Show Screen 3 Text
        scrollTimeline.to(
          [leftBoxes[2], rightBoxes[2]],
          { height: "auto", opacity: 1, duration: 0.5 },
          "<",
        );
      },
      { scope: container },
    );
    const { scrollYProgress: rippleProgress } = useScroll({
      target: container,
      offset: ["start end", "center center"],
    });

    const rippleOpacity = useTransform(rippleProgress, [0, 0.5, 1], [0, 0.3, 0]);

    const content = [
      {
        title: "Scan your phone",
        desc: "Bee analyzes your entire photo library to find duplicates, similar images, screenshots, and videos cluttering your storage.",
      },
      {
        title: "Review what’s found",
        desc: "See exactly what’s taking up space with smart categories: duplicates, similar photos, screenshots, videos, and more.",
      },
      {
        title: "Clean with one tap",
        desc: "Remove clutter instantly, compress videos, merge contacts, or unsubscribe from junk emails—all in one place.",
      },
    ];

    return (
      <div className="flex flex-col items-center font-satoshi">
        <motion.div
          ref={container}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="relative w-full mt-14"
        >
          <div className="sticky-cards">
            <section className=" h-screen w-full flex justify-center items-center overflow-hidden relative z-10">
              {/* Background & Ripples (Kept from original) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[25, 35, 25].map((thickness, index) => (
                  <motion.div
                    key={index}
                    style={{
                      scale: useTransform(
                        rippleProgress,
                        [0, 1],
                        [0.4, 1.2 + index * 0.8],
                      ),
                      opacity: rippleOpacity,
                    }}
                    className={`absolute w-[450px] h-[450px] md:w-[700px] md:h-[700px] rounded-full border-[${thickness}px] border-white/10 blur-sm bg-transparent`}
                  />
                ))}
              </div>

              <div className="hidden lg:flex flex-col items-end w-64">
                {content.map((item, i) => (
                  <div key={i} className="left-box overflow-hidden">
                    <h2 className="text-4xl z-50 font-bold text-gray-900 tracking-tight">
                      {item.title}
                    </h2>
                  </div>
                ))}
              </div>

              {/* CENTER: Phone Frame */}
              <div className="relative w-[280px] h-[520px] lg:w-[200px] lg:h-[550px]">
                <div className="absolute inset-0 z-50 pointer-events-none">
                  <img
                    src="/frame.png"
                    alt="frame"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="absolute inset-[10px] overflow-hidden rounded-[2.5rem] md:rounded-[3.2rem]">
                  <div className="card absolute inset-0 w-full h-full z-10 will-change-transform">
                    <img
                      className="w-[100%] h-full object-contain"
                      src="/front.png"
                      alt="1"
                    />
                  </div>
                  <div className="card absolute inset-0 w-full h-full z-20 will-change-transform">
                    <img
                      className="w-full h-full object-contain"
                      src="/hero-2.png"
                      alt="2"
                    />
                  </div>
                  <div className="card absolute inset-0 w-full h-full z-30 will-change-transform">
                    <img
                      className="w-full h-full object-contain"
                      src="/hero-3.png"
                      alt="3"
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE: H2 Headings */}
              <div className="hidden lg:flex flex-col items-start w-64 ml-10">
                {content.map((item, i) => (
                  <div key={i} className="right-box overflow-hidden">
                    <p className="text-right text-gray-600 text-lg leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    );
  };

  export default HowItWorks;
