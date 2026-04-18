"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Eye,
  Trash2,
  Mail,
  Phone,
  FileText,
  MapPin,
} from "lucide-react";
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
import type { Application } from "@/features/dashboard/hooks/use-dashboard-applications";
import { FaLinkedin } from "react-icons/fa";

interface ApplicationCardProps {
  application: Application;
  onView: (application: Application) => void;
  onStatusChange: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}

const statusStyles: Record<string, string> = {
  pending: "bg-white text-zinc-400 border-zinc-100 shadow-sm",
  reviewed: "bg-zinc-50 text-black border-zinc-100 shadow-sm",
  accepted: "bg-black text-white border-black shadow-xl",
  rejected: "bg-zinc-100 text-zinc-300 border-transparent",
};

export function ApplicationCard({
  application,
  onView,
  onStatusChange,
  onDelete,
}: ApplicationCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleStatusChange = (value: string) => {
    onStatusChange(application.id, value);
  };

  const handleDelete = () => {
    onDelete(application.id);
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
              <div className="flex-1 min-w-0 font-satoshi">
                {/* Header: Name & Job */}
                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                  <h3 className="text-3xl font-black text-black tracking-[-0.03em] group-hover:underline decoration-zinc-100 decoration-4 underline-offset-8 transition-all">
                    {application.name}
                  </h3>
                  <Badge variant="secondary" className="bg-zinc-100 text-zinc-400 border-transparent rounded-full px-4 py-1.5 font-black text-[9px] uppercase tracking-widest w-fit">
                    {application.jobTitle}
                  </Badge>
                </div>

                {/* Contact Info */}
                <div className="flex flex-wrap gap-8 text-xs font-black uppercase tracking-widest text-zinc-300 mb-8">
                  <a
                    href={`mailto:${application.email}`}
                    className="flex items-center gap-2 text-zinc-400 hover:text-black transition-colors"
                  >
                    <Mail className="h-4 w-4" strokeWidth={2} />
                    {application.email}
                  </a>
                  {application.phone && (
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Phone className="h-4 w-4" strokeWidth={2} />
                      {application.phone}
                    </div>
                  )}
                  {application.linkedin && (
                    <a
                      href={application.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-black hover:opacity-70 transition-opacity"
                    >
                      <FaLinkedin className="h-4 w-4" />
                      LinkedIn Profile
                    </a>
                  )}
                </div>

                {/* Status & Date */}
                <div className="flex flex-wrap items-center gap-6 mb-8">
                  <Badge
                    variant="secondary"
                    className={`${statusStyles[application.status]} rounded-full px-5 py-2 text-[9px] font-black uppercase tracking-widest border transition-all duration-300`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full mr-2 ${application.status === 'accepted' ? 'bg-white animate-pulse' : 'bg-current opacity-30'}`} />
                    {application.status}
                  </Badge>
                  <span className="text-[10px] font-black text-zinc-200 uppercase tracking-widest flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-zinc-100" />
                    Applied • {new Date(application.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {/* Resume Button */}
                {application.resumeUrl && (
                  <div className="inline-block">
                    <a
                      href={application.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white border border-zinc-100 group/resume hover:border-black hover:shadow-xl transition-all duration-300"
                    >
                      <div className="p-2 rounded-xl bg-black transition-transform group-hover/resume:scale-110">
                         <FileText className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-[10px] font-black text-black uppercase tracking-widest">
                        View Dossier / Resume
                      </span>
                    </a>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <Select
                  value={application.status}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger className="h-14 w-[160px] rounded-2xl border-zinc-100 bg-white font-black text-[9px] uppercase tracking-widest shadow-sm hover:border-zinc-200 transition-all">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-zinc-100 font-satoshi p-2">
                    <SelectItem value="pending" className="font-black uppercase tracking-widest text-[9px] py-3 rounded-xl">Pending</SelectItem>
                    <SelectItem value="reviewed" className="font-black uppercase tracking-widest text-[9px] py-3 rounded-xl">Reviewed</SelectItem>
                    <SelectItem value="accepted" className="font-black uppercase tracking-widest text-[9px] py-3 rounded-xl text-green-600">Accepted</SelectItem>
                    <SelectItem value="rejected" className="font-black uppercase tracking-widest text-[9px] py-3 rounded-xl text-red-600">Rejected</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onView(application)}
                    className="flex-1 h-14 rounded-2xl bg-white border border-zinc-100 shadow-sm hover:bg-black hover:text-white hover:border-black hover:shadow-xl transition-all duration-300 group/btn"
                    title="View Details"
                  >
                    <Eye className="h-5 w-5 transition-transform group-hover/btn:scale-110" strokeWidth={1.5} />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowDeleteDialog(true)}
                    className="flex-1 h-14 rounded-2xl bg-white border border-zinc-100 shadow-sm text-zinc-300 hover:text-white hover:bg-black hover:border-black hover:shadow-xl transition-all duration-300 group/del"
                    title="Delete"
                  >
                    <Trash2 className="h-5 w-5 transition-transform group-hover/del:scale-110" strokeWidth={1.5} />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="rounded-[2.5rem] p-10 font-satoshi border-zinc-100">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-3xl font-black text-black tracking-tight">Erase Candidate?</AlertDialogTitle>
            <AlertDialogDescription className="text-xl text-zinc-400 font-medium leading-tight tracking-tight mt-4">
              Are you sure you want to delete the application from <span className="text-black font-black">{application.name}</span>? This decision is final.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-12 gap-4">
            <AlertDialogCancel className="h-14 px-8 rounded-2xl border-zinc-100 font-black uppercase tracking-widest text-[10px] hover:bg-zinc-50 transition-all">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="h-14 px-8 rounded-2xl bg-black text-white hover:bg-zinc-800 shadow-xl shadow-black/10 font-black uppercase tracking-widest text-[10px] transition-all"
            >
              Confirm Erasure
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
