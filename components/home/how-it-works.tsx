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
    title: "Project Setup",
    accent: "text-primary",
    accentBg: "bg-primary/10",
    desc: "Initialize your project with Tailwind CSS and install the shadcn/ui accordion component.",
    features: [
      {
        value: "item-1",
        trigger: "Initialize",
        content: "Run npx shadcn-ui@latest init to configure your project.",
      },
      {
        value: "item-2",
        trigger: "Install Accordion",
        content: "Run npx shadcn-ui@latest add accordion.",
      },
    ],
  },
  {
    id: "02",
    title: "GSAP Animation",
    accent: "text-chart-2",
    accentBg: "bg-chart-2/10",
    desc: "Use @gsap/react to create smooth scroll-triggered animations for each card.",
    features: [
      {
        value: "item-1",
        trigger: "Import Hooks",
        content: "Import { useGSAP } from @gsap/react and { ScrollTrigger }.",
      },
      {
        value: "item-2",
        trigger: "Setup Ref",
        content:
          "Create a container ref and scope your animations inside useGSAP.",
      },
    ],
  },
  {
    id: "03",
    title: "Sticky Cards",
    accent: "text-chart-3",
    accentBg: "bg-chart-3/10",
    desc: "Apply sticky positioning to make cards stack vertically as the user scrolls.",
    features: [
      {
        value: "item-1",
        trigger: "CSS Sticky",
        content: "Use sticky top-0 and h-screen for the stacking effect.",
      },
      {
        value: "item-2",
        trigger: "Z-Index Management",
        content:
          "Ensure z-index increases for each card so they stack properly.",
      },
    ],
  },
];

export default function MobileStack() {
  const container = useRef(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".card-item");
      cards.forEach((card: any) => {
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
      });
    },
    { scope: container },
  );

  return (
    <div ref={container} className="bg-background font-satoshi mt-50">
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
              "card-item sticky top-0 w-full h-screen flex items-center bg-background",
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
                <div className="relative w-[300px] h-[600px] bg-card rounded-[3.2rem] border-[10px] border-secondary shadow-apple ring-1 ring-border overflow-hidden transition-transform duration-500 hover:scale-[1.02]">
                  {/* Dynamic Island Area */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-secondary rounded-full z-20" />

                  {/* Screen Interior */}
                  <div className="absolute inset-0 bg-muted/20 flex flex-col p-6 pt-16">
                    <div
                      className={`w-12 h-12 rounded-2xl ${step.accentBg} ${step.accent} flex items-center justify-center mb-8`}
                    >
                      <div className="w-5 h-5 rounded-md border-2 border-current" />
                    </div>
                    <div className="space-y-4 mb-8">
                      <div className="h-3 w-full bg-foreground/10 rounded-full" />
                      <div className="h-3 w-2/3 bg-foreground/5 rounded-full" />
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="h-32 rounded-2xl bg-card border border-border shadow-sm flex items-center justify-center">
                        <div className="w-1/2 h-2 bg-muted rounded-full" />
                      </div>
                      <div className="h-32 rounded-2xl bg-card border border-border shadow-sm flex items-center justify-center">
                        <div className="w-1/2 h-2 bg-muted rounded-full" />
                      </div>
                    </div>
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
      <div className="h-[20vh] bg-background" />
    </div>
  );
}
