"use client";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const faqData = [
  {
    question: "How does BeeClean find duplicate photos?",
    answer:
      "BeeClean uses advanced algorithms to analyze your photo library, comparing image content, metadata, and file characteristics to identify exact duplicates and similar photos.",
  },
  {
    question: "Is my data safe with BeeClean?",
    answer:
      "Absolutely! All processing happens locally on your device. We never upload your photos, contacts, or any personal data to external servers. Your privacy is our top priority.",
  },
  {
    question: "What happens to deleted files?",
    answer:
      "Deleted files are moved to your device's Recently Deleted folder where they stay for 30 days. You can recover them anytime within this period before they're permanently removed.",
  },
  {
    question: "Can I recover files after compression?",
    answer:
      "Compressed files replace the originals to save space. We recommend backing up important files before compression. The compressed versions maintain high quality while reducing file size.",
  },
  {
    question: "How do I use the email cleanup feature?",
    answer:
      "Connect your Gmail account and BeeClean will analyze your inbox. Bulk unsubscribe from unwanted newsletters and mass-delete junk emails to achieve inbox zero in seconds.",
  },
  {
    question: "What's included in Premium?",
    answer:
      "Premium unlocks unlimited smart cleaning, the secret vault, email cleanup tools, all charging animations, advanced contact management, and priority customer support.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "You can manage your subscription through the App Store. Go to Settings > Apple ID > Subscriptions, find BeeClean, and tap Cancel Subscription. Your access continues until the end of your billing period.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full bg-transparent font-satoshi overflow-hidden">
      {/* Background Polish */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-3xl text-center mx-auto flex flex-col gap-6 mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        >
          <div className="inline-flex items-center justify-center gap-3 px-4 py-2 rounded-full bg-zinc-50 border border-zinc-100 shadow-sm self-center">
             <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Common Questions</span>
          </div>
          <h4 className="text-5xl font-black tracking-[-0.04em] text-black leading-[0.9]">
            Everything you <br /><span className="text-zinc-500 italic">should know.</span>
          </h4>
          <p className="text-xl md:text-xl text-zinc-400 font-medium leading-tight tracking-tight max-w-lg mx-auto">
            Find answers to common questions about storage optimization, privacy, and Bee.
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
        >
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className={cn(
                  "relative rounded-[2.5rem] transition-all duration-500 overflow-hidden border",
                  isOpen 
                    ? "bg-white border-zinc-200 shadow-apple-hover" 
                    : "bg-zinc-50 border-transparent hover:bg-zinc-100/50 hover:border-zinc-100"
                )}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-10 text-left focus:outline-none"
                >
                  <span className={cn(
                    "text-2xl font-black tracking-tight transition-colors duration-500",
                    isOpen ? "text-black" : "text-zinc-400"
                  )}>
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      "p-3 rounded-full transition-colors duration-500",
                      isOpen ? "bg-black text-white" : "bg-white text-zinc-400 shadow-sm"
                    )}
                  >
                    <Plus className="w-6 h-6" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-10 pb-10">
                        <p className="text-xl font-medium text-zinc-500 leading-relaxed max-w-3xl">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
