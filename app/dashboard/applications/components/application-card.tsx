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
import type { Application } from "@/hooks/dashboard/use-dashboard-applications";
import { FaLinkedin } from "react-icons/fa";

interface ApplicationCardProps {
  application: Application;
  onView: (application: Application) => void;
  onStatusChange: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
  reviewed: "bg-blue-100 text-blue-700 hover:bg-blue-200",
  accepted: "bg-green-100 text-green-700 hover:bg-green-200",
  rejected: "bg-red-100 text-red-700 hover:bg-red-200",
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="rounded-2xl border border-gray-100 shadow-sm bg-white hover:shadow-md transition-all duration-200">
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                {/* Header: Name & Job */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
                  <h3 className="text-lg font-bold text-gray-900">
                    {application.name}
                  </h3>
                  <span className="text-gray-400 hidden md:inline">•</span>
                  <p className="text-sm text-gray-600 line-clamp-1">
                    {application.jobTitle}
                  </p>
                </div>

                {/* Contact Info */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                  <a
                    href={`mailto:${application.email}`}
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    {application.email}
                  </a>
                  {application.phone && (
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      {application.phone}
                    </div>
                  )}
                  {application.linkedin && (
                    <a
                      href={application.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 hover:underline"
                    >
                      <FaLinkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                  )}
                </div>

                {/* Status & Date */}
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <Badge
                    variant="secondary"
                    className={`${statusColors[application.status]} border-none`}
                  >
                    {application.status.charAt(0).toUpperCase() +
                      application.status.slice(1)}
                  </Badge>
                  <span className="text-xs text-gray-400">
                    Applied{" "}
                    {new Date(application.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {/* Resume */}
                {application.resumeUrl && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FileText className="h-4 w-4" />
                    <a
                      href={application.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {application.resumeUrl.split('/').pop()}
                    </a>
                  </div>
                )}

                {/* Message preview */}
                {application.message && (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {application.message}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Select
                  value={application.status}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger className="h-8 w-[130px] rounded-lg text-xs">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onView(application)}
                  className="h-8 px-3"
                  title="View Details"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowDeleteDialog(true)}
                  className="h-8 px-3 text-red-600 hover:text-red-700 hover:bg-red-50"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Application</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this application from{" "}
              {application.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
