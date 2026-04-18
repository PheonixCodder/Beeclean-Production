"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, MapPin, Clock, Building2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import type { Career } from "@/features/dashboard/hooks/use-dashboard-careers";

interface DashboardJobCardProps {
  job: Career;
  onEdit: (job: Career) => void;
  onDelete: (id: string) => void;
}

export function DashboardJobCard({ job, onEdit, onDelete }: DashboardJobCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    onDelete(job.id);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <Card className="rounded-[2.5rem] border border-zinc-100 shadow-sm bg-zinc-50/50 hover:bg-white hover:border-zinc-200 hover:shadow-apple-hover transition-all duration-500 group">
          <CardContent className="p-10">
            <div className="flex items-start justify-between gap-10">
              <div className="flex-1 min-w-0">
                {/* Title & Status */}
                <div className="flex items-center gap-6 mb-6 flex-wrap">
                  <h3 className="text-3xl font-black text-black tracking-[-0.03em] line-clamp-1 font-satoshi group-hover:underline decoration-zinc-100 decoration-4 underline-offset-8 transition-all">
                    {job.title}
                  </h3>
                  <Badge
                    variant={job.status === "published" ? "default" : "secondary"}
                    className={
                      job.status === "published"
                        ? "bg-black text-white border-black rounded-full px-4 py-1.5 text-[9px] font-black uppercase tracking-widest"
                        : "bg-zinc-100 text-zinc-400 border-transparent rounded-full px-4 py-1.5 text-[9px] font-black uppercase tracking-widest"
                    }
                  >
                    {job.status === "published" ? (
                      <div className="flex items-center gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                         LIVE
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                         DRAFT
                      </div>
                    )}
                  </Badge>
                </div>

                {/* Meta Info Line */}
                <div className="flex items-center gap-8 text-[10px] text-zinc-300 font-black uppercase tracking-widest mb-8">
                  <span className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5" />
                    <span className="text-zinc-500">{job.department}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="text-zinc-500">{job.location}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-zinc-500">{job.type}</span>
                  </span>
                </div>

                {/* Salary & Description */}
                <div className="flex flex-col md:flex-row md:items-end gap-10">
                   <div className="shrink-0">
                      <p className="text-[8px] text-zinc-200 font-black uppercase tracking-widest mb-1">Renumeration</p>
                      <p className="text-4xl font-black text-black tracking-tighter leading-none">{job.salary}</p>
                   </div>
                   <div className="flex-1 border-l border-zinc-50 md:pl-10">
                      <p className="text-lg text-zinc-400 font-medium line-clamp-2 leading-relaxed tracking-tight">
                        {job.description}
                      </p>
                   </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onEdit(job)}
                  className="h-14 w-14 p-0 rounded-2xl bg-white border border-zinc-100 shadow-sm hover:bg-black hover:text-white hover:border-black hover:shadow-xl transition-all duration-300 group/btn"
                >
                  <Pencil className="h-5 w-5 transition-transform group-hover/btn:scale-110" strokeWidth={1.5} />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowDeleteDialog(true)}
                  className="h-14 w-14 p-0 rounded-2xl bg-white border border-zinc-100 shadow-sm text-zinc-300 hover:text-white hover:bg-black hover:border-black hover:shadow-xl transition-all duration-300 group/del"
                >
                  <Trash2 className="h-5 w-5 transition-transform group-hover/del:scale-110" strokeWidth={1.5} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="rounded-[2.5rem] p-10 font-satoshi border-zinc-100">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-3xl font-black text-black tracking-tight">Archive Position?</AlertDialogTitle>
            <AlertDialogDescription className="text-xl text-zinc-400 font-medium leading-tight tracking-tight mt-4">
              Are you sure you want to remove the <span className="text-black font-black">&quot;{job.title}&quot;</span> role from recruitment?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-12 gap-4">
            <AlertDialogCancel className="h-14 px-8 rounded-2xl border-zinc-100 font-black uppercase tracking-widest text-[10px] hover:bg-zinc-50 transition-all">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="h-14 px-8 rounded-2xl bg-black text-white hover:bg-zinc-800 shadow-xl shadow-black/10 font-black uppercase tracking-widest text-[10px] transition-all"
            >
              Confirm Archive
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
