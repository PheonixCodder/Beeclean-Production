"use client";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
        <h4 className="text-5xl font-black tracking-tight">
          Frequently asked questions
        </h4>
        <p className="text-lg text-muted-foreground font-medium">
          Start free, go pro when you're ready! No limits, no pressure.
        </p>
      </motion.div>

      <motion.div
        className="max-w-3xl min-w-full md:min-w-[48rem] mx-auto p-6 space-y-4"
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
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              className="relative rounded-[2rem] bg-white/40 backdrop-blur-xl border border-white/20 shadow-lg overflow-hidden"
            >
              <motion.button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                transition={{ duration: 0.2 }}
              >
                <span
                  className={`text-lg font-medium transition-colors duration-200 ${isOpen ? "text-gray-900" : "text-gray-700"}`}
                >
                  {faq.question}
                </span>
                {/* Smoothly rotate the icon */}
                <motion.div
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Plus className="w-5 h-5 text-gray-900" />
                </motion.div>
              </motion.button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0, y: 10 }}
                    animate={{ height: "auto", opacity: 1, y: 0 }}
                    exit={{ height: 0, opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <div className="px-6 pb-6">
                      <p className="text-gray-500 leading-relaxed max-w-[90%]">
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
    </motion.div>
  );
};

export default FAQ;
