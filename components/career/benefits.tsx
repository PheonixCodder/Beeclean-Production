"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Coffee, Plane, Laptop, Stethoscope, Gift } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: "Health & Insurance",
      description: "Comprehensive medical, dental, and vision coverage for you and your family",
    },
    {
      icon: <Plane className="w-8 h-8 text-purple-500" />,
      title: "Flexible PTO",
      description: "Unlimited vacation days and flexible sick leave to recharge when you need",
    },
    {
      icon: <Laptop className="w-8 h-8 text-green-500" />,
      title: "Remote First",
      description: "Work from anywhere. We trust you to deliver results, not hours",
    },
    {
      icon: <Coffee className="w-8 h-8 text-orange-500" />,
      title: "Crafty Kitchen",
      description: " Gourmet coffee, snacks, and team lunches to keep you fueled",
    },
    {
      icon: <Stethoscope className="w-8 h-8 text-red-500" />,
      title: "Wellness Program",
      description: "Mental health support, fitness stipends, and wellness initiatives",
    },
    {
      icon: <Gift className="w-8 h-8 text-yellow-500" />,
      title: "Stock Options",
      description: "Be an owner. Every team member gets equity to share in our success",
    },
  ];

  return (
    <motion.div
      className="flex flex-col pt-30 items-center font-satoshi bg-gray-50"
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
        <h4 className="text-4xl font-black text-gray-900">Perks & benefits</h4>
        <p className="text-[16px] max-w-md text-center text-foreground/80 font-[550]">
          We believe in taking care of our team. Here&apos;s what makes BeeClean a great place to grow your career.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8 max-w-6xl mx-auto"
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
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: "easeOut" },
              },
            }}
            whileHover={{ y: -4 }}
          >
            <Card className="rounded-3xl border-none shadow-sm overflow-hidden bg-white h-full">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-xl shrink-0">
                    {benefit.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-gray-900">{benefit.title}</h3>
                    <p className="text-gray-500 leading-relaxed text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Benefits;
