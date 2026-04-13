"use client";

import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

export const AuthAnimation = ({ children }: PropsWithChildren) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};
