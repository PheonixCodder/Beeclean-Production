"use client";
import { motion } from "framer-motion";
import { Lightbulb, Users, Zap, Heart, Target, Award } from "lucide-react";

const Values = () => {
  const values = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaboration",
      description: "We succeed together. Our cross-functional teams work seamlessly, sharing knowledge and lifting each other up.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Impact-Driven",
      description: "We measure our success by the difference we make. Every feature, every line of code serves a purpose.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Growth Mindset",
      description: "We're constantly learning and evolving. Mistakes are opportunities to grow, not failures.",
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
        className="max-w-xl px-4 mx-auto gap-4 items-center justify-center flex flex-col text-center mb-12"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          },
        }}
      >
        <h4 className="text-4xl font-black text-gray-900">Our values</h4>
        <p className="text-[16px] max-w-md text-center text-foreground/80 font-[550]">
          These are the principles that guide everything we do at BeeClean.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8 max-w-6xl mx-auto w-full"
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
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="flex flex-col items-center p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-16 h-16 flex items-center justify-center bg-primary/10 rounded-2xl mb-6 text-primary">
              {value.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
              {value.title}
            </h3>
            <p className="text-gray-500 text-center leading-relaxed">
              {value.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Values;
