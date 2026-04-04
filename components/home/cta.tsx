"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <motion.section
      className="flex flex-col items-center justify-center py-20 px-4 text-center font-satoshi"
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
      {/* App Icon with Crown Image */}
      <motion.div
        className="relative mb-8"
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { type: "spring", stiffness: 200, damping: 20 },
          },
        }}
      >
        <img src="/logo.svg" alt="Beeclean Logo" className="w-20 h-20" />
        {/* Crown Image overlay */}
        <motion.img
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.5,
            duration: 0.6,
            type: "spring",
            stiffness: 300,
          }}
          src="/crown.png"
          alt="Crown"
          className="absolute -top-10 -right-6 w-16 h-16 rotate-20"
        />
      </motion.div>

      {/* App Store Stats Badge */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
        className="flex items-center gap-2 bg-gray-100 px-4 py-1.5 rounded-full mb-8"
      >
        <img src="/store.png" alt="App Store" className="w-4 h-4" />
        <span className="text-[13px] font-medium tracking-tight text-gray-600">
          200k downloads on AppStore
        </span>
      </motion.div>

      {/* Title & Description */}
      <motion.div
        className="max-w-2xl mb-10"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          },
        }}
      >
        <h1 className="text-4xl md:text-4xl font-extrabold tracking-tight text-black mb-6">
          The smartest way to keep your phone clean
        </h1>
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: 0.1, ease: "easeOut" },
            },
          }}
          className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium"
        >
          Join thousands who trust BeeClean to remove duplicates, organize
          photos, <br className="hidden md:block" />
          clean videos, detox their inbox, and reclaim valuable storage.
        </motion.p>
      </motion.div>

      {/* Download Button */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: 0.2, ease: "easeOut" },
          },
        }}
      >
        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button className="py-6 px-8 relative z-50 flex items-center gap-3 rounded-2xl cursor-pointer bg-[#1a1a1a] text-white hover:bg-black shadow-apple hover:shadow-apple-hover transition-all duration-200 text-[16px] font-bold tracking-tight">
            <img src="/apple.svg" width={24} alt="apple" className="mb-1" />
            Download for iPhone
          </Button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default CTA;
