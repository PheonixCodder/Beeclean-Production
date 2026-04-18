"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface PromoContentProps {
  variant?: "desktop" | "mobile";
  className?: string;
}

export function PromoContent({
  variant = "desktop",
  className,
}: PromoContentProps) {
  if (variant === "mobile") {
    return (
      <Card className="rounded-3xl border-none shadow-apple bg-gray-50 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <div className="relative h-16 w-16 mx-auto bg-white rounded-2xl flex items-center justify-center shadow-apple">
              <span className="text-2xl">✨</span>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                BeeClean Pro
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Unlock unlimited cleaning and premium features.
              </p>
              <Button
                className="w-full bg-[#1a1a1a] text-white shadow-apple hover:shadow-apple-hover"
                size="sm"
              >
                Learn More <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`rounded-3xl border-none shadow-apple overflow-hidden bg-white ${className}`}>
      <CardContent className="p-6">
        <div className="flex flex-col gap-6">
          <div className="relative h-48 w-full bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center">
            <span className="text-6xl">⚡</span>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
              BeeClean Pro
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Get unlimited access to all premium features. Advanced AI cleaning,
              secret vault, email detox, and priority support.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full"
        >
          <Button className="w-full bg-[#1a1a1a] text-white shadow-apple hover:shadow-apple-hover py-6 text-base">
            Try Pro Free <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </CardFooter>
    </Card>
  );
}
