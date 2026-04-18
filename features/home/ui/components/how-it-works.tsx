"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    id: "01",
    title: "Meet Your AI Bee",
    accent: "text-black dark:text-white",
    accentBg: "bg-black/5 dark:bg-white/10",
    image: "/Home.png",
    desc: "Start your cleanup journey with our proactive AI mascot that instantly scans your device to identify gigabytes of hidden clutter.",
    features: [
      {
        value: "item-1",
        trigger: "Intelligent Device Scan",
        content: "Tap the Bee to uncover duplicate photos, giant videos, and outdated screenshots hiding in the depths of your camera roll.",
      },
      {
        value: "item-2",
        trigger: "Personalized Action Plan",
        content: "Get an intuitive, visual breakdown showing exactly what's eating your storage and precisely how much space you can recover instantly.",
      },
    ],
  },
  {
    id: "02",
    title: "One-Tap Detox",
    accent: "text-black dark:text-white",
    accentBg: "bg-black/5 dark:bg-white/10",
    image: "/Email.png",
    desc: "Sweep out the digital noise. Sort out your thousands of unread emails and perfectly organize your messy address book.",
    features: [
      {
        value: "item-1",
        trigger: "Inbox Zero Workflow",
        content: "Easily sort cluttered inboxes into neat categories, bulk unsubscribe from newsletters, and mass-delete promotional junk in seconds.",
      },
      {
        value: "item-2",
        trigger: "Smart Contacts Merge",
        content: "Automatically locate and cleanly merge duplicate contacts, effortlessly filling in missing or incomplete details in your address book.",
      },
    ],
  },
  {
    id: "03",
    title: "Vault & Compress",
    accent: "text-black dark:text-white",
    accentBg: "bg-black/5 dark:bg-white/10",
    image: "/Vault.png",
    desc: "Reclaim massive amounts of space by shrinking large files, or securely lock away your most private media.",
    features: [
      {
        value: "item-1",
        trigger: "Lossless Video Compression",
        content: "The Bee hugs your heaviest 4K videos, deeply compressing them into lightweight, shareable versions without noticeably sacrificing quality.",
      },
      {
        value: "item-2",
        trigger: "Face-ID Secure Vault",
        content: "Lock away sensitive photos and documents in a highly secure, offline vault that remains completely invisible until unlocked with Face ID.",
      },
    ],
  },
];

export default function MobileStack() {
  const container = useRef(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".card-item") as any[];
      cards.forEach((card: any, i: number) => {
        // Fade in and scale down slightly as it reaches sticky position
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "top 10%",
            scrub: true,
          },
          scale: 0.95,
          opacity: 1,
        });

        // Fade out as the next card approaches
        if (i < cards.length - 1) {
          gsap.to(card, {
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top 90%",
              end: "top 40%",
              scrub: true,
            },
            opacity: 0,
            pointerEvents: "none",
          });
        }
      });
    },
    { scope: container },
  );

  return (
    <div ref={container} className="bg-transparent font-satoshi mt-50">
      <motion.div
        className="max-w-xl mx-auto text-center flex flex-col gap-4"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          },
        }}
      >
        <h4 className="text-5xl font-black tracking-tight">How Beeclean Works</h4>
        <p className="text-lg text-muted-foreground font-medium">
          Start free, go pro when you’re ready! No limits, no pressure.
        </p>
      </motion.div>
      <div className="flex flex-col">
        {steps.map((step, i) => (
          <div
            key={i}
            className={cn(
              "card-item sticky top-0 w-full h-screen flex items-center",
              i !== 0 && "border-t border-border",
            )}
            style={{ zIndex: i + 1 }}
          >
            <div className="max-w-[1400px] mx-auto px-12 w-full grid grid-cols-12 gap-12 items-center">
              {/* Left Column */}
              <div className="col-span-4 space-y-6">
                <div
                  className={`inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase ${step.accentBg} ${step.accent}`}
                >
                  Step {step.id}
                </div>
                <h2 className="text-6xl font-bold tracking-tighter text-foreground leading-[1.1]">
                  {step.title}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-sm">
                  {step.desc}
                </p>
              </div>

              {/* Center Column: Mobile Frame */}
              <div className="col-span-4 flex justify-center">
                {/* The Container */}
                <div className="relative w-[320px] md:w-[360px] aspect-[9/19] transition-transform duration-500 hover:scale-[1.02]">
                  {/* Frame Shadow */}
                  <div className="absolute inset-0 z-0 bg-black/5 blur-3xl scale-90 translate-y-10 rounded-[3rem]" />
                  
                  {/* 1. The Frame */}
                  <img
                    src="/frame.png"
                    alt="frame"
                    className="absolute inset-0 z-30 w-full h-full object-contain pointer-events-none drop-shadow-2xl"
                  />

                  {/* 2. The Active Image */}
                  <div className="absolute inset-0 z-10 w-full h-[97%] mt-3 rounded-[2.8rem] overflow-hidden">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-[91.5%] h-full mt-0 ml-[15px] md:ml-[16px] rounded-[2.8rem] object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Themed Accordion */}
              <div className="col-span-4">
                <Accordion
                  type="single"
                  collapsible
                  defaultValue="item-1"
                  className="w-full space-y-4"
                >
                  {step.features.map((feature) => (
                    <AccordionItem
                      key={feature.value}
                      value={feature.value}
                      className="border border-border bg-card/50 px-6 rounded-3xl backdrop-blur-xl shadow-sm data-[state=open]:ring-2 data-[state=open]:ring-primary/20 transition-all"
                    >
                      <AccordionTrigger className="text-xl font-bold py-6 hover:no-underline text-foreground">
                        {feature.trigger}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                        {feature.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Bottom spacer for the last sticky item */}
      <div className="h-[20vh] bg-transparent" />
    </div>
  );
}
