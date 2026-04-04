"use client";
import { Image, Lock, Trash, Vault } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const PhoneDecodeScroll = () => {
  const layers = [
    { id: "top", src: "/phone.png", alt: "iPhone Top View" },
    {
      id: "junk",
      src: "/blocks.png",
      label: "Junk Files",
      icon: <Trash size={15} />,
      align: "right",
    },
    {
      id: "duplicates",
      src: "/images.png",
      label: "Duplicate Images",
      icon: <Image size={15} />,
      align: "left",
    },
    {
      id: "bottom",
      src: "/phone-internals.png",
      label: "Secret Vault",
      icon: <Lock size={15} />,
      align: "right",
    },
  ];

  return (
    <motion.div
      className="flex flex-col pt-30 items-center font-satoshi"
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
        className="max-w-md px-4 mx-auto gap-4 items-center justify-center flex flex-col"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
          },
        }}
      >
        <h4 className="text-4xl font-black">Decode your storage</h4>
        <motion.p
          className="text-[16px] text-center text-foreground/80 font-[550]"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: 0.1, ease: "easeOut" },
            },
          }}
        >
          See exactly what&apos;s taking up space on your phone. Duplicates, screenshots, videos, and more—all laid bare.
        </motion.p>
      </motion.div>
      {/* The Animated Container */}
      <motion.div
        initial="closed"
        whileInView="open"
        viewport={{ once: true, amount: 0.5 }}
        className="relative flex flex-col items-center"
      >
        {layers.map((layer, index) => (
          <motion.div
            key={layer.id}
            variants={{
              closed: {
                y: -index * 60, // Stacked tightly
                opacity: 0,
                scale: 0.9,
              },
              open: {
                y: 0,
                opacity: 1,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 45,
                  damping: 14,
                  delay: index * 0.12,
                },
              },
            }}
            // Negative margin makes them overlap initially
            className={`relative ${index !== 0 ? "-mt-6" : ""} z-[${10 - index}]`}
          >
            {/* Layer Image */}
            <div className="w-[500px] pointer-events-none select-none">
              <img
                src={layer.src}
                alt={layer.id}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Label & Connector Logic */}
            {layer.label && (
              <motion.div
                variants={{
                  closed: { opacity: 0, scale: 0.8 },
                  open: {
                    opacity: 1,
                    scale: 1,
                    transition: { delay: 0.8 + index * 0.1 },
                  },
                }}
                className={`absolute top-1/2 -translate-y-1/2 flex items-center
                  ${layer.align === "right" ? "left-[80%]" : "right-[80%] flex-row-reverse"}`}
              >
                {/* Visual Connector: Dot and Line */}
                <div
                  className={`flex items-center ${layer.align === "right" ? "" : "flex-row-reverse"}`}
                >
                  <div className="w-2 h-2 rounded-full border border-yellow-500 bg-white ring-2 ring-white" />
                  <div className="w-16 h-[1.5px] bg-yellow-400/60" />
                </div>

                {/* The Shadcn-style Label Card */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3 px-4 py-2 bg-white border border-yellow-200 rounded-xl shadow-xl shadow-yellow-900/5 backdrop-blur-sm"
                >
                  <div className="p-1.5 bg-yellow-50 rounded-lg">
                    {layer.icon}
                  </div>
                  <span className="text-sm font-bold text-slate-800 whitespace-nowrap">
                    {layer.label}
                  </span>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default PhoneDecodeScroll;
