"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { NumberTicker } from "@/components/ui/number-ticker";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

  const pricingPlans = [
    {
      name: "Premium",
      monthlyPrice: "9.99",
      yearlyPrice: "2.92",
      monthlyDescription: "Billed $9.99 monthly. Cancel anytime.",
      yearlyDescription: "Annual — $34.99/yr",
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
    {
      name: "Pro",
      monthlyPrice: "4.99",
      yearlyPrice: "1.99",
      monthlyDescription: "Billed $4.99 monthly. Cancel anytime.",
      yearlyDescription: "First year $23.99, then $34.99/year. Cancel anytime.",
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
    }
  ];

  return (
    <section className="relative w-full py-40 bg-transparent font-satoshi overflow-hidden">
      {/* Background Polish */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-60" />
      </div>

      <div>
        <motion.div
          className="max-w-xl mx-auto text-center flex flex-col gap-4 mb-16"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut" },
            },
          }}
        >
          <div className="inline-flex items-center justify-center gap-3 px-4 py-2 rounded-full bg-zinc-50 border border-zinc-100 shadow-sm self-center">
            <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Simple Pricing</span>
          </div>
          <h4 className="text-5xl font-black tracking-tight">Pricing plans</h4>
          <p className="text-lg text-muted-foreground font-medium mb-6">
            Start free, go pro when you’re ready! No limits, no pressure.
          </p>
        </motion.div>

        {/* Toggle Buttons */}
        <div className="flex justify-center mb-16 relative z-10">
          <div className="flex bg-zinc-50 p-1.5 rounded-full border border-zinc-100 shadow-sm">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={cn(
                "px-8 py-2.5 rounded-full text-sm font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2",
                billingCycle === "monthly" 
                  ? "bg-white text-black shadow-md border border-zinc-100" 
                  : "text-zinc-400 hover:text-zinc-600 border border-transparent"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={cn(
                "px-8 py-2.5 rounded-full text-sm font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2",
                billingCycle === "yearly" 
                  ? "bg-black text-white shadow-xl" 
                  : "text-zinc-400 hover:text-zinc-600 border border-transparent"
              )}
            >
              Yearly
              <span className={cn(
                "text-[9px] px-2 py-0.5 rounded-full transition-colors",
                billingCycle === "yearly" ? "bg-white/20 text-white" : "bg-zinc-200 text-zinc-500"
              )}>Save 60%</span>
            </button>
          </div>
        </div>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-6xl mx-auto">
          {pricingPlans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "relative group flex flex-col rounded-[2.5rem] transition-all duration-500",
                plan.highlight 
                  ? "bg-black text-white shadow-apple-hover scale-105 z-20" 
                  : "bg-zinc-50 text-black border border-zinc-100 hover:border-zinc-200"
              )}
            >
              {plan.highlight && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-5 py-2 bg-black border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl z-30">
                  Most Popular
                </div>
              )}

              <div className="p-10 flex flex-col h-full">
                <div className="mb-8">
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border",
                    plan.highlight ? "text-zinc-400 border-zinc-800" : "text-zinc-400 border-zinc-200"
                  )}>
                    {plan.name}
                  </span>
                  <div className="mt-8 flex items-baseline gap-1">
                    <span className="text-6xl font-black tracking-tighter">
                      <NumberTicker value={parseFloat(billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice)} decimals={2} />
                    </span>
                    <span className={cn("text-sm font-bold", plan.highlight ? "text-zinc-500" : "text-zinc-400")}>/mo</span>
                  </div>
                  <p className={cn("mt-4 text-sm font-medium", plan.highlight ? "text-zinc-400" : "text-zinc-500")}>
                    {billingCycle === "monthly" ? plan.monthlyDescription : plan.yearlyDescription}
                  </p>
                </div>

                <div className="flex-grow space-y-4 mb-10">
                  <p className={cn("text-[10px] font-black uppercase tracking-widest", plan.highlight ? "text-zinc-600" : "text-zinc-500")}>
                    What's included
                  </p>
                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm font-medium">
                        <Check className={cn("w-4 h-4 mt-0.5 shrink-0", plan.highlight ? "text-white" : "text-black")} strokeWidth={3} />
                        <span className={plan.highlight ? "text-zinc-400" : "text-zinc-600"}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href="/download" className="block mt-auto">
                  <Button
                    className={cn(
                      "w-full h-16 rounded-2xl text-sm font-black uppercase tracking-widest transition-all duration-300",
                      plan.highlight 
                        ? "bg-white text-black hover:bg-zinc-100 shadow-xl" 
                        : "bg-black text-white hover:bg-zinc-800 shadow-lg"
                    )}
                  >
                    {plan.highlight ? "Get Pro Access" : "Get Started Free"}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
