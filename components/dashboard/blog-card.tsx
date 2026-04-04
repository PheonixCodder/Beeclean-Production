"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Pencil,
  Trash2,
  Eye,
  Star,
  FileText,
  MoreVertical,
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
import type { Blog } from "@/hooks/dashboard/use-dashboard-blogs";

interface BlogCardProps {
  blog: Blog;
  onEdit: (blog: Blog) => void;
  onDelete: (id: string) => void;
}

export function DashboardBlogCard({ blog, onEdit, onDelete }: BlogCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    onDelete(blog.id);
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
                {/* Title & Status */}
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                    {blog.title}
                  </h3>
                  {blog.featured && (
                    <Badge
                      variant="secondary"
                      className="bg-yellow-50 text-yellow-700 border-yellow-200"
                    >
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      Featured
                    </Badge>
                  )}
                  <Badge
                    variant={blog.status === "published" ? "default" : "secondary"}
                    className={
                      blog.status === "published"
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-gray-100 text-gray-700"
                    }
                  >
                    {blog.status === "published" ? (
                      <Eye className="h-3 w-3 mr-1" />
                    ) : (
                      <FileText className="h-3 w-3 mr-1" />
                    )}
                    {blog.status}
                  </Badge>
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span>Slug: {blog.slug}</span>
                  {blog.author && (
                    <span>By {blog.author.name.split(" ")[0]}</span>
                  )}
                </div>

                {/* Dates */}
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  {blog.publishedAt && (
                    <span>
                      Published: {format(new Date(blog.publishedAt), "MMM d, yyyy")}
                    </span>
                  )}
                  <span>
                    Created: {format(new Date(blog.createdAt), "MMM d, yyyy")}
                  </span>
                  <span>{blog._count.categories} categories</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onEdit(blog)}
                  className="h-8 px-3"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowDeleteDialog(true)}
                  className="h-8 px-3 text-red-600 hover:text-red-700 hover:bg-red-50"
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
            <AlertDialogTitle>Delete Blog</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{blog.title}&quot;? This action cannot
              be undone.
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
