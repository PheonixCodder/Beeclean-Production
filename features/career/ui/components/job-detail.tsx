"use client";
import { motion } from "framer-motion";
import { MapPin, Clock, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Career } from "@/features/career/hooks/use-career";

interface JobDetailProps {
  job: Career;
}

const JobDetail = ({ job }: JobDetailProps) => {
  return (
    <motion.div
      className="flex flex-col pt-30 items-center font-satoshi bg-white"
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
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut" },
            },
          }}
        >
          <Link href="/career">
            <Button
              variant="ghost"
              className="mb-6 text-gray-600 hover:text-gray-900 -ml-4"
            >
              ← Back to all positions
            </Button>
          </Link>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut" },
            },
          }}
        >
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
              {job.department}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
              {job.type}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 leading-tight mb-6">
            {job.title}
          </h1>

          <div className="flex flex-wrap gap-6 mb-8 text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="font-medium">{job.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="font-medium">{job.type}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              <span className="font-medium">BeeClean</span>
            </div>
          </div>

          <div className="mb-8 p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl border border-primary/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">Salary Range</p>
                <p className="text-3xl font-black">{job.salary}</p>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="rounded-xl">
                  Apply Now
                </Button>
              </motion.div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-10"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this role</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{job.description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-10"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What you&apos;ll do</h2>
              <ul className="space-y-3">
                {job.responsibilities.map((resp, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-3 text-gray-600 text-lg"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary mt-3 shrink-0" />
                    {resp}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What we&apos;re looking for</h2>
              <ul className="space-y-3">
                {job.requirements.map((req, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-3 text-gray-600 text-lg"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary mt-3 shrink-0" />
                    {req}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default JobDetail;
