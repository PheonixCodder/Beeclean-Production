"use client";

import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { FaLinkedin } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Phone,
  FileText,
  MapPin,
  Briefcase,
  MessageSquare,
  X,
  Download,
} from "lucide-react";
import type { Application } from "@/hooks/dashboard/use-dashboard-applications";

const statusStyles: Record<string, string> = {
  pending: "bg-zinc-100 text-black border-zinc-200",
  reviewed: "bg-black text-white border-black",
  accepted: "bg-zinc-100 text-black border-zinc-200",
  rejected: "bg-white text-zinc-400 border-zinc-100",
};

interface ApplicationDetailProps {
  application: Application | null;
  open: boolean;
  onClose: () => void;
  onStatusChange: (id: string, status: string) => void;
}

export function ApplicationDetail({
  application,
  open,
  onClose,
  onStatusChange,
}: ApplicationDetailProps) {
  if (!application) return null;

  const handleStatusChange = (value: string) => {
    onStatusChange(application.id, value);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-[2.5rem] border-none shadow-2xl p-0 bg-white">
        <div className="sticky top-0 z-50 flex items-center justify-between p-8 bg-white/80 backdrop-blur-xl border-b border-zinc-100">
          <div>
            <DialogHeader>
              <DialogTitle className="text-3xl font-black text-black tracking-tighter font-satoshi">
                Application Profile
              </DialogTitle>
            </DialogHeader>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-zinc-100"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-8 space-y-10 font-satoshi">
          {/* Applicant Header */}
          <div className="flex items-center gap-6 p-8 bg-zinc-50/50 rounded-[2rem] border border-zinc-100">
            <div className="h-24 w-24 rounded-full bg-black flex items-center justify-center text-white text-4xl font-black shadow-xl shadow-black/10">
              {application.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-3xl font-black text-black tracking-tighter">
                  {application.name}
                </h3>
                <Badge
                  variant="secondary"
                  className={`${statusStyles[application.status]} rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest border shadow-sm`}
                >
                  {application.status}
                </Badge>
              </div>
              <p className="text-xl font-bold text-zinc-400 tracking-tight mb-3">
                Applying for <span className="text-black">{application.jobTitle}</span>
              </p>
              <div className="flex items-center gap-3">
                <span className="text-xs font-black text-zinc-300 uppercase tracking-widest">
                  Submitted • {new Date(application.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Status Update */}
            <div className="space-y-4">
              <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Review Status</Label>
              <Select
                value={application.status}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger className="h-14 rounded-2xl border-zinc-100 bg-white font-black text-sm uppercase tracking-widest shadow-sm">
                  <SelectValue placeholder="Update status" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-zinc-100">
                  <SelectItem value="pending" className="font-bold">Pending</SelectItem>
                  <SelectItem value="reviewed" className="font-bold">Reviewed</SelectItem>
                  <SelectItem value="accepted" className="font-bold">Accepted</SelectItem>
                  <SelectItem value="rejected" className="font-bold">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Resume Link */}
            {application.resumeUrl && (
              <div className="space-y-4">
                <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Attached Documents</Label>
                <Button
                  variant="outline"
                  className="h-14 rounded-2xl w-full justify-between items-center px-6 border-zinc-100 hover:border-black transition-all group"
                  asChild
                >
                  <a href={application.resumeUrl} target="_blank" rel="noopener noreferrer">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-black" />
                      <span className="font-black text-black uppercase tracking-tighter">Download Resume</span>
                    </div>
                    <Download className="h-5 w-5 text-zinc-300 group-hover:text-black transition-colors" />
                  </a>
                </Button>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Contact Details</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-6 bg-white border border-zinc-100 rounded-3xl group hover:border-black transition-colors">
                <div className="h-12 w-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-black group-hover:text-white transition-all">
                  <Mail className="h-5 w-5" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Email</p>
                  <a
                    href={`mailto:${application.email}`}
                    className="text-lg font-bold text-black tracking-tight"
                  >
                    {application.email}
                  </a>
                </div>
              </div>
              {application.phone && (
                <div className="flex items-center gap-4 p-6 bg-white border border-zinc-100 rounded-3xl group hover:border-black transition-colors">
                  <div className="h-12 w-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-black group-hover:text-white transition-all">
                    <Phone className="h-5 w-5" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Phone</p>
                    <p className="text-lg font-bold text-black tracking-tight">{application.phone}</p>
                  </div>
                </div>
              )}
              {application.linkedin && (
                <div className="flex items-center gap-4 p-6 bg-white border border-zinc-100 rounded-3xl group hover:border-black transition-colors md:col-span-2">
                  <div className="h-12 w-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-black group-hover:text-white transition-all">
                    <FaLinkedin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">LinkedIn Profile</p>
                    <a
                      href={application.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-bold text-black tracking-tight"
                    >
                      {application.linkedin}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Message */}
          {application.message && (
            <div className="space-y-4">
              <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Statement of Purpose</Label>
              <div className="p-8 bg-zinc-50 border border-zinc-100 rounded-[2rem]">
                <p className="text-lg text-black font-medium leading-relaxed whitespace-pre-wrap italic">
                  &ldquo;{application.message}&rdquo;
                </p>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-end pt-8 border-t border-zinc-50">
            <Button 
               size="lg"
               onClick={onClose} 
               className="h-14 px-12 rounded-2xl bg-black text-white shadow-xl shadow-black/10 hover:bg-zinc-800 hover:-translate-y-1 transition-all duration-300 font-bold text-lg"
            >
              Done Reviewing
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
