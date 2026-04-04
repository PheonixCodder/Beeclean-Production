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

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  reviewed: "bg-blue-100 text-blue-700",
  accepted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
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
      <DialogContent className="max-w-2xl rounded-3xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Application Details
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Applicant Header */}
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">
                {application.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900">
                {application.name}
              </h3>
              <p className="text-gray-600">{application.jobTitle}</p>
              <div className="flex items-center gap-3 mt-2">
                <Badge
                  variant="secondary"
                  className={`${statusColors[application.status]} border-none`}
                >
                  {application.status.charAt(0).toUpperCase() +
                    application.status.slice(1)}
                </Badge>
                <span className="text-sm text-gray-500">
                  Applied{" "}
                  {new Date(application.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Status Update */}
          <div className="space-y-2">
            <Label>Update Status</Label>
            <Select
              value={application.status}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="reviewed">Reviewed</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Contact Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <a
                    href={`mailto:${application.email}`}
                    className="text-sm text-gray-900 hover:text-primary transition-colors"
                  >
                    {application.email}
                  </a>
                </div>
              </div>
              {application.phone && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm text-gray-900">{application.phone}</p>
                  </div>
                </div>
              )}
              {application.linkedin && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl md:col-span-2">
                  <FaLinkedin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-gray-500">LinkedIn</p>
                    <a
                      href={application.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
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
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Cover Letter</h4>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {application.message}
                </p>
              </div>
            </div>
          )}

          {/* Resume Download */}
          {application.resumeUrl && (
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Resume</h4>
              <Button
                variant="outline"
                className="rounded-xl w-full justify-start"
                asChild
              >
                <a href={application.resumeUrl} target="_blank" rel="noopener noreferrer">
                  <FileText className="h-5 w-5 mr-2" />
                  {application.resumeUrl.split('/').pop()}
                </a>
              </Button>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <Button variant="outline" onClick={onClose} className="rounded-xl">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
