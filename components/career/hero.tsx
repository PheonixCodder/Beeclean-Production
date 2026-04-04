"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, Lightbulb, Users, Zap } from "lucide-react";

const CareerHero = () => {
  const values = [
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Innovation",
      description: "We push boundaries and explore new ideas",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Collaboration",
      description: "Together we build something extraordinary",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Impact",
      description: "Your work helps millions worldwide",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Care",
      description: "We support each other's growth and wellbeing",
    },
  ];

  return (
    <motion.div
      className="flex flex-col items-center bg-white relative z-20 pb-10 font-satoshi"
      initial="hidden"
      animate="visible"
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
        className="flex flex-col items-center justify-center min-h-[300px] px-4 text-center"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          },
        }}
      >
        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-[#1a1a1a] leading-[1.1] mb-6">
          Build the future <br />
          <span className="relative inline-block">
            <span className="relative z-10 text-primary">with us</span>
            <span className="absolute inset-0 bg-primary/25 rounded-xl scale-110" />
          </span>
        </h1>
        <p className="mt-4 max-w-2xl font-semibold text-xl text-foreground/85 leading-relaxed">
          Join a team of passionate creators who are reimagining how people
          interact with their devices. Help us build tools that millions rely on
          every day.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8 max-w-6xl mx-auto"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.3,
            },
          },
        }}
      >
        {values.map((value, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: "easeOut" },
              },
            }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="flex flex-col items-center p-6 bg-[#F6F6F6] rounded-3xl border-none shadow-sm"
          >
            <div className="w-14 h-14 flex items-center justify-center bg-white rounded-2xl shadow-md mb-4 text-primary">
              {value.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
            <p className="text-gray-500 text-center leading-relaxed">
              {value.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default CareerHero;
