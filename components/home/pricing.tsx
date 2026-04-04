"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Pricing = () => {
  const pricingPlans = [
    {
      name: "Free",
      price: "0",
      description: "Keep your phone clean",
      features: [
        "Duplicate photo detection",
        "Similar photo finder",
        "Screenshot organization",
        "Basic contact cleanup",
        "Storage analytics",
        "Ad-supported",
      ],
      highlight: false,
    },
    {
      name: "Pro",
      price: "4.99",
      description: "Full cleaning power",
      features: [
        "Everything in Free",
        "Unlimited photo cleanup",
        "Video compression",
        "Email detox (inbox zero)",
        "Similar video detection",
        "Screen recording cleanup",
        "Priority support",
      ],
      highlight: true,
    },
    {
      name: "Premium",
      price: "9.99",
      description: "Ultimate phone hygiene",
      features: [
        "Everything in Pro",
        "Secret vault (Face ID)",
        "Unlimited email cleanup",
        "Advanced contact merge",
        "All charging animations",
        "Export & backup tools",
      ],
      highlight: false,
    },
  ];

  return (
    <motion.div
      className="flex flex-col gap-12 p-10 justify-center items-center min-h-screen font-satoshi mt-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
          },
        },
      }}
    >
      {/* Header Section */}
      <motion.div
        className="max-w-xl text-center flex flex-col gap-4"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          },
        }}
      >
        <h4 className="text-5xl font-black tracking-tight">Pricing plans</h4>
        <p className="text-lg text-muted-foreground font-medium">
          Start free, go pro when you’re ready! No limits, no pressure.
        </p>
      </motion.div>

      {/* Cards Container - Fixed Flex Layout */}
      <motion.div
        className="flex flex-col md:flex-row gap-4 w-full max-w-6xl justify-center items-stretch"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.2,
            },
          },
        }}
      >
        {pricingPlans.map((plan) => (
          <motion.div
            key={plan.name}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: "easeOut" },
              },
            }}
            className={`w-full py-0 flex flex-col border-none shadow-2xl shadow-gray-200/50 rounded-[2.5rem] overflow-hidden bg-[#F6F6F6] ${
              plan.highlight ? "ring-1 ring-primary/20" : "h-full"
            }`}
          >
            {/* Header Section */}
            <div className="px-6 py-6 rounded-4xl shadow gap-4 flex flex-col bg-white">
              <div
                className={`rounded-[2rem] px-8 py-4 space-y-5 transition-all ${
                  plan.highlight
                    ? "bg-gradient-to-br from-primary/30 via-primary/90 to-primary text-primary-foreground"
                    : "bg-[#F3F4F6]"
                }`}
              >
                <div className="flex justify-between items-start">
                  <span
                    className={`px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                      plan.highlight
                        ? "bg-white/20 text-white"
                        : "bg-white text-gray-500 shadow-sm"
                    }`}
                  >
                    {plan.name}
                  </span>
                </div>

                <div className="flex items-baseline">
                  <span
                    className={cn(
                      "text-6xl font-black",
                      plan.highlight && "text-white",
                    )}
                  >
                    ${plan.price}
                  </span>
                  <span
                    className={`ml-1 text-sm font-bold ${
                      plan.highlight ? "text-white" : "text-gray-400"
                    }`}
                  >
                    /month
                  </span>
                </div>

                <p
                  className={`text-[15px] font-medium leading-tight ${
                    plan.highlight ? "text-white" : "text-gray-500"
                  }`}
                >
                  {plan.description}
                </p>
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/download">
                  <Button
                    className={`w-full h-14 rounded-2xl text-base font-bold transition-all ${
                      plan.highlight
                        ? "bg-black text-white hover:bg-black/90 shadow-xl"
                        : "bg-white text-gray-900 hover:bg-gray-50 shadow-md border border-gray-100"
                    }`}
                  >
                    Try now
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Features Section */}
            <CardContent className="pt-6 pb-12 px-10 flex-grow">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
                Includes
              </p>
              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-[15px] font-semibold text-gray-600/90"
                  >
                    <Check
                      className="h-4 w-4 text-primary mt-1 shrink-0"
                      strokeWidth={4}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Pricing;
