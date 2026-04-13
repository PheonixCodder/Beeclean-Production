"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import Image from "next/image";

const shots = [
  {
    id: 1,
    label: "Overly Dark",
    isWinner: false,
    image: "/shot1.png",
    opacityClass: "opacity-40",
  },
  {
    id: 2,
    label: "Eyes Closed",
    isWinner: false,
    image: "/shot2.png",
    opacityClass: "opacity-60",
  },
  {
    id: 3,
    label: "Optimal Shot",
    isWinner: true,
    image: "/shot3.png",
    opacityClass: "opacity-100",
  },
  {
    id: 4,
    label: "Awkward Crop",
    isWinner: false,
    image: "/shot4.png",
    opacityClass: "opacity-60",
  },
  {
    id: 5,
    label: "Tilted Frame",
    isWinner: false,
    image: "/shot5.png",
    opacityClass: "opacity-40",
  },
];

export default function DuplicateSelector() {
  return (
    <section className="w-full py-24 bg-transparent overflow-hidden font-satoshi">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Quality over <span className="text-primary">Quantity</span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Our AI instantly identifies the best shots in your gallery, so you
            only keep the memories that matter.
          </p>
        </motion.div>

        {/* Shots Gallery */}
        <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-3 md:gap-6">
          {shots.map((shot, idx) => (
            <motion.div
              key={shot.id}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center group"
            >
              {/* Image Card */}
              <div
                className={`
                relative rounded-3xl overflow-hidden transition-all duration-700 ease-out
                ${
                  shot.isWinner
                    ? "ring-4 ring-gray-500 ring-offset-4 scale-110 z-20 shadow-[0_20px_50px_rgba(59,130,246,0.3)]"
                    : `scale-90 grayscale-[40%] hover:grayscale-0 hover:scale-95 ${shot.opacityClass}`
                }
              `}
              >
                <div className="relative w-24 h-32 md:w-44 md:h-60">
                  <Image
                    src={shot.image}
                    alt={shot.label}
                    fill
                    className="object-cover"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Status Indicator */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={shot.isWinner ? { scale: 0 } : {}}
                    animate={shot.isWinner ? { scale: 1 } : {}}
                    className={`p-2 rounded-full backdrop-blur-md shadow-xl ${
                      shot.isWinner
                        ? "bg-black/90 text-white"
                        : "bg-white/20 text-white/80"
                    }`}
                  >
                    {shot.isWinner ? (
                      <CheckCircle2 size={24} />
                    ) : (
                      <XCircle size={20} />
                    )}
                  </motion.div>
                </div>
              </div>
              
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
