"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const CTA = () => {
  return (
    <motion.div
      className="flex flex-col mt-20 items-center justify-center py-20 px-4 text-center font-satoshi bg-gradient-to-b from-gray-50 to-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
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
      <motion.div
        variants={{
          hidden: { opacity: 0, scale: 0.9 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { type: "spring", stiffness: 200, damping: 20 },
          },
        }}
        className="mb-8"
      >
        <div className="w-20 h-20 mx-auto flex items-center justify-center bg-white rounded-2xl shadow-apple">
          <Mail className="w-10 h-10 text-primary" />
        </div>
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
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-6">
          Ready to join the hive?
        </h1>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
          Don&apos;t see the perfect fit? We&apos;re always looking for exceptional talent.
          <br className="hidden md:block" />
          Send us your resume and tell us how you can contribute.
        </p>
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
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button className="py-6 px-10 flex items-center gap-3 rounded-2xl bg-primary text-white hover:bg-primary/90 shadow-apple hover:shadow-apple-hover transition-all duration-200 text-lg font-bold tracking-tight">
            <Mail className="w-5 h-5" />
            Get in touch
          </Button>
        </motion.div>
      </motion.div>

      <motion.p
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { delay: 0.4, duration: 0.5 },
          },
        }}
        className="mt-8 text-sm text-gray-500"
      >
        Or email us at <span className="text-primary font-medium">careers@beeclean.com</span>
      </motion.p>
    </motion.div>
  );
};

export default CTA;
