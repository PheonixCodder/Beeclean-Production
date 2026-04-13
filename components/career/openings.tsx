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
    <section className="relative w-full py-40 bg-white font-satoshi overflow-hidden">
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
             <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Current Openings</span>
          </div>
          <h4 className="text-6xl md:text-8xl font-black tracking-[-0.04em] text-black leading-[0.9]">
            Help us build <br /><span className="text-zinc-300 italic">the future.</span>
          </h4>
          <p className="text-xl md:text-2xl text-zinc-400 font-medium leading-tight tracking-tight max-w-lg mx-auto">
            Find your niche. We're looking for talented individuals who want to make a difference.
          </p>
        </motion.div>

        {/* List Section */}
        <div className="max-w-5xl mx-auto w-full min-h-[400px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-40">
              <Loader2 className="w-12 h-12 animate-spin text-zinc-200" />
            </div>
          ) : careers.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-zinc-100 rounded-[3rem] w-full"
            >
              <div className="w-20 h-20 bg-zinc-50 rounded-2xl flex items-center justify-center mb-8">
                <Briefcase className="w-8 h-8 text-black opacity-20" />
              </div>
              <h3 className="text-3xl font-black text-black tracking-tight mb-4">
                No openings right now
              </h3>
              <p className="text-zinc-400 max-w-xs font-medium text-lg leading-snug">
                We're not hiring at the moment, but check back soon for new opportunities.
              </p>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
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
              {careers.map((job) => (
                <motion.div
                  key={job.id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className="group"
                >
                  <Link href={`/career/${job.id}`}>
                    <div className="relative h-full flex flex-col p-10 bg-zinc-50 border border-zinc-100 rounded-[2.5rem] hover:bg-white hover:border-zinc-200 hover:shadow-apple-hover transition-all duration-500 overflow-hidden">
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-10">
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-3">
                              {job.department}
                            </span>
                            <h3 className="text-3xl font-black text-black tracking-tight leading-tight group-hover:text-black transition-colors">
                              {job.title}
                            </h3>
                          </div>
                          <div className="p-3 rounded-full bg-white border border-zinc-100 shadow-sm opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                            <ArrowRight className="w-5 h-5 text-black" />
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-6 mb-12">
                          <div className="flex items-center gap-2 text-zinc-400 font-medium">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{job.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-zinc-400 font-medium">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{job.type}</span>
                          </div>
                        </div>

                        <div className="mt-auto pt-8 border-t border-zinc-100 flex items-center justify-between">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-300 mb-1">Estimated Salary</p>
                            <span className="text-2xl font-black text-black tracking-tighter">{job.salary}</span>
                          </div>
                          <span className="text-sm font-black uppercase tracking-widest text-black/20 group-hover:text-black transition-colors">Apply</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Openings;
