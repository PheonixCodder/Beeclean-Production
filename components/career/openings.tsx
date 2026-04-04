"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, ArrowRight, Loader2, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Career } from "@/hooks/use-careers";

interface OpeningsProps {
  careers: Career[];
  isLoading?: boolean;
  error?: any;
}

const Openings = ({ careers, isLoading, error }: OpeningsProps) => {
  return (
    <motion.div
    key={careers.length}
      className="flex flex-col pt-30 items-center font-satoshi bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.15, delayChildren: 0.1 },
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
        <h4 className="text-4xl font-black text-gray-900">Open positions</h4>
        <p className="text-[16px] max-w-md text-center text-foreground/80 font-[550]">
          Find your niche. We&apos;re looking for talented individuals who want to
          make a difference.
        </p>
      </motion.div>

      {/* Conditional Rendering Logic starts here */}
      <div className="w-full max-w-5xl mx-auto px-8 min-h-[400px] flex flex-col items-center">
        {isLoading ? (
          // 1. Loading Spinner State
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary opacity-50" />
          </div>
        ) : careers.length === 0 ? (
          // 2. Empty State
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl w-full"
          >
            <Briefcase className="w-12 h-12 text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900">
              No openings right now
            </h3>
            <p className="text-gray-500 max-w-xs mt-2">
              We don&apos;t have any positions open at the moment, but check back
              soon!
            </p>
          </motion.div>
        ) : (
          // 3. Grid List State
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.2 },
              },
            }}
          >
            {careers.map((job) => (
              <motion.div
                key={job.id}
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
                <Link href={`/career/${job.id}`}>
                  <Card className="rounded-3xl border-none shadow-sm overflow-hidden bg-[#F6F6F6] cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                            {job.title}
                          </h3>
                          <p className="text-sm text-gray-500 font-medium">
                            {job.department}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{job.type}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-lg font-bold ">{job.salary}</span>
                        <motion.div
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-900 hover:text-primary hover:bg-white/50"
                          >
                            Apply now
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Openings;
