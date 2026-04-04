"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white font-satoshi flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-2xl"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-24 h-24 mx-auto mb-8 flex items-center justify-center bg-gray-50 rounded-full"
        >
          <Search className="w-12 h-12 text-gray-300" />
        </motion.div>

        <h1 className="text-6xl font-black text-gray-900 mb-6">404</h1>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Article Not Found
        </h2>

        <p className="text-lg text-muted-foreground leading-relaxed mb-10">
          We couldn&apos;t find the article you&apos;re looking for. It might
          have been moved or doesn&apos;t exist.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/blogs">
            <Button
              size="lg"
              className="rounded-xl bg-[#1a1a1a] text-white shadow-apple hover:shadow-apple-hover"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to all articles
            </Button>
          </Link>

          <Link href="/">
            <Button
              variant="outline"
              size="lg"
              className="rounded-xl border-gray-200 text-gray-900 hover:bg-gray-50"
            >
              Go to Homepage
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
