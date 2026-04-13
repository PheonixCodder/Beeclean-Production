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
    <section className="relative w-full py-32 bg-white font-satoshi overflow-hidden">
      {/* Background Polish */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--zinc-50)_0%,_transparent_80%)] opacity-40" />
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
             <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Our Culture</span>
          </div>
          <h4 className="text-6xl md:text-8xl font-black tracking-[-0.04em] text-black leading-[0.9]">
            The principles that <br /><span className="text-zinc-300 italic">drive us.</span>
          </h4>
          <p className="text-xl md:text-2xl text-zinc-400 font-medium leading-tight tracking-tight max-w-lg mx-auto">
            These are the core beliefs that guide everything we build and how we operate as a collective.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto w-full"
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
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              whileHover={{ y: -8, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
              className="group flex flex-col items-center p-12 bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm hover:shadow-apple-hover transition-all duration-500"
            >
              <div className="w-20 h-20 flex items-center justify-center bg-zinc-50 rounded-2xl mb-10 text-black group-hover:bg-black group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:shadow-black/10">
                {value.icon}
              </div>
              <h3 className="text-2xl font-black text-black mb-4 text-center tracking-tight">
                {value.title}
              </h3>
              <p className="text-lg font-medium text-zinc-400 text-center leading-snug tracking-tight">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Values;
