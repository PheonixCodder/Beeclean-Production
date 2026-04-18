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
import type { Blog } from "@/features/dashboard/hooks/use-dashboard-blogs";

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
                  <h3 className="text-3xl font-black text-black tracking-[-0.03em] line-clamp-1 font-satoshi decoration-black/0 group-hover:decoration-black/10 underline transition-all">
                    {blog.title}
                  </h3>
                  <div className="flex items-center gap-3">
                    {blog.featured && (
                      <Badge
                        variant="secondary"
                        className="bg-black text-white border-black rounded-full px-4 py-1.5 text-[9px] font-black uppercase tracking-widest"
                      >
                        <Star className="h-3 w-3 mr-2 fill-current" />
                        Featured
                      </Badge>
                    )}
                    <Badge
                      variant={blog.status === "published" ? "default" : "secondary"}
                      className={
                        blog.status === "published"
                          ? "bg-white text-black border-zinc-100 shadow-sm rounded-full px-4 py-1.5 text-[9px] font-black uppercase tracking-widest hover:bg-zinc-50"
                          : "bg-zinc-100 text-zinc-400 border-transparent rounded-full px-4 py-1.5 text-[9px] font-black uppercase tracking-widest"
                      }
                    >
                      {blog.status === "published" ? (
                        <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse mr-2" />
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 mr-2" />
                      )}
                      {blog.status}
                    </Badge>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-8 text-xs text-zinc-400 mb-8 font-black uppercase tracking-widest">
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
                    Slug • <span className="text-zinc-500">{blog.slug}</span>
                  </span>
                  {blog.author && (
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
                      Author • <span className="text-zinc-500">{blog.author.name}</span>
                    </span>
                  )}
                </div>

                {/* Dates & Metrics */}
                <div className="flex items-center gap-10">
                   <div className="flex items-center gap-8 text-[10px] text-zinc-300 font-black uppercase tracking-widest">
                    {blog.publishedAt && (
                      <span className="flex flex-col gap-1">
                        <span className="text-[8px] text-zinc-200">Release Date</span>
                        {format(new Date(blog.publishedAt), "MMM d, yyyy")}
                      </span>
                    )}
                    <span className="flex flex-col gap-1">
                        <span className="text-[8px] text-zinc-200">Creation</span>
                        {format(new Date(blog.createdAt), "MMM d, yyyy")}
                    </span>
                    <span className="flex flex-col gap-1">
                        <span className="text-[8px] text-zinc-200">Classification</span>
                        {blog._count.categories} CATEGORIES
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onEdit(blog)}
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
            <AlertDialogTitle className="text-3xl font-black text-black tracking-tight">Delete Post?</AlertDialogTitle>
            <AlertDialogDescription className="text-xl text-zinc-400 font-medium leading-tight tracking-tight mt-4">
              Are you sure you want to delete <span className="text-black font-black">&quot;{blog.title}&quot;</span>? This collective knowledge will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-12 gap-4">
            <AlertDialogCancel className="h-14 px-8 rounded-2xl border-zinc-100 font-black uppercase tracking-widest text-[10px] hover:bg-zinc-50 transition-all">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="h-14 px-8 rounded-2xl bg-black text-white hover:bg-zinc-800 shadow-xl shadow-black/10 font-black uppercase tracking-widest text-[10px] transition-all"
            >
              Confirm Deletion
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
