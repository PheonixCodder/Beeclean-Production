"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Coffee, Plane, Laptop, Stethoscope, Gift } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Health & Insurance",
      description: "Comprehensive medical, dental, and vision coverage for you and your family.",
    },
    {
      icon: <Plane className="w-8 h-8" />,
      title: "Flexible PTO",
      description: "Unlimited vacation days and flexible sick leave to recharge whenever you need.",
    },
    {
      icon: <Laptop className="w-8 h-8" />,
      title: "Remote First",
      description: "Work from anywhere. We trust you to deliver results, not just hours.",
    },
    {
      icon: <Coffee className="w-8 h-8" />,
      title: "Crafty Kitchen",
      description: "Gourmet coffee, snacks, and team lunches to keep you fueled and focused.",
    },
    {
      icon: <Stethoscope className="w-8 h-8" />,
      title: "Wellness Program",
      description: "Mental health support, fitness stipends, and dedicated wellness initiatives.",
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: "Stock Options",
      description: "Be an owner. Every team member gets equity to share in our long-term success.",
    },
  ];

  return (
    <section className="relative w-full py-40 bg-white font-satoshi overflow-hidden">
      {/* Background Polish */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--zinc-50)_0%,_transparent_80%)] opacity-60" />
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
             <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Everything we offer</span>
          </div>
          <h4 className="text-6xl md:text-8xl font-black tracking-[-0.04em] text-black leading-[0.9]">
            Perks designed <br /><span className="text-zinc-300 italic">for humans.</span>
          </h4>
          <p className="text-xl md:text-2xl text-zinc-400 font-medium leading-tight tracking-tight max-w-lg mx-auto">
            We believe in taking care of our team. Here’s how we support your life and career.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto w-full"
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
          {benefits.map((benefit, index) => (
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
              className="group flex flex-col p-10 bg-zinc-50/50 rounded-[2.5rem] border border-zinc-100 hover:bg-white hover:border-zinc-200 hover:shadow-apple-hover transition-all duration-500"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-white rounded-2xl mb-8 text-black shadow-sm group-hover:scale-110 group-hover:bg-black group-hover:text-white transition-all duration-500">
                {benefit.icon}
              </div>
              <h3 className="text-2xl font-black text-black mb-4 tracking-tight">
                {benefit.title}
              </h3>
              <p className="text-lg font-medium text-zinc-400 leading-snug tracking-tight">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;
