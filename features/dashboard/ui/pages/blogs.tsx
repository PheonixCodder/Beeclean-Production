"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { DashboardBlogCard } from "@/features/dashboard/ui/components/blog-card";
import { useDashboardBlogs } from "@/features/dashboard/hooks/use-dashboard-blogs";
import { BlogEditor } from "@/features/dashboard/ui/components/blog-editor";
import { Blog } from "@/features/dashboard/hooks/use-dashboard-blogs";
import { FileText } from "lucide-react";

const ALL_STATUS = "All";

export default function DashboardBlogsPage() {
  const [statusParam, setStatusParam] = useQueryState("status", {
    shallow: true,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  const selectedStatus = statusParam || ALL_STATUS;

  const {
    blogs,
    getFilteredBlogs,
    isLoading,
    error,
    createBlog,
    updateBlog,
    deleteBlog,
    isCreating,
    isUpdating,
    isDeleting,
  } = useDashboardBlogs();

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setEditorOpen(true);
  };

  const handleCreate = () => {
    setEditingBlog(null);
    setEditorOpen(true);
  };

  const handleCloseEditor = () => {
    setEditorOpen(false);
    setEditingBlog(null);
  };

  const filtered = getFilteredBlogs(selectedStatus);

  const searchFiltered = filtered.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Something went wrong
          </h3>
          <p className="text-gray-600 mb-4">
            {error instanceof Error ? error.message : "Failed to load blogs"}
          </p>
          <Button onClick={() => window.location.reload()}>Try again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div className="mb-20" >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-50 border border-zinc-100 shadow-sm mb-8">
               <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Content Management</span>
            </div>
            <h1 className="text-6xl md:text-6xl font-black tracking-tight text-[#1a1a1a] leading-[1.1] font-satoshi">
              Blogs
            </h1>
            <p className="font-semibold text-xl text-foreground/85 mt-6 leading-relaxed max-w-xl">
              Manage your technical articles, insights, and device deep-dives.
            </p>
          </div>
          <Button
            size="sm"
            onClick={handleCreate}
            className="h-20 px-12 rounded-2xl bg-black text-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:bg-zinc-800 transition-all duration-300 font-black uppercase tracking-widest text-xs font-satoshi"
          >
            Create New Blog
          </Button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div className="mb-12" >
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center p-8 bg-zinc-50/50 border border-zinc-100 rounded-[2.5rem]">
          <Tabs
            value={selectedStatus}
            onValueChange={(value) =>
              setStatusParam(value === ALL_STATUS ? null : value)
            }
            className="w-full md:w-auto"
          >
            <TabsList className="h-14 rounded-2xl bg-white border border-zinc-100 p-1.5 shadow-sm">
              <TabsTrigger value="All" className="rounded-xl px-8 font-black uppercase tracking-widest text-[10px] text-zinc-300 data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-xl transition-all duration-300">
                All
              </TabsTrigger>
              <TabsTrigger value="draft" className="rounded-xl px-8 font-black uppercase tracking-widest text-[10px] text-zinc-300 data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-xl transition-all duration-300">
                Drafts
              </TabsTrigger>
              <TabsTrigger value="published" className="rounded-xl px-8 font-black uppercase tracking-widest text-[10px] text-zinc-300 data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-xl transition-all duration-300">
                Published
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative flex-1 max-w-md w-full">
            <Input
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 rounded-2xl border-zinc-100 bg-white focus:border-black focus:ring-black/5 font-medium pl-6 text-lg tracking-tight"
            />
          </div>
        </div>
      </motion.div>

      {/* Blog List */}
      <div className="space-y-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-40 bg-zinc-50/50 rounded-[3rem] border-2 border-dashed border-zinc-100">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-zinc-100 border-t-black rounded-full animate-spin mx-auto mb-8 shadow-sm" />
              <p className="text-black font-black uppercase tracking-widest text-xs">Accessing content...</p>
              <p className="text-zinc-400 font-medium text-lg leading-tight tracking-tight mt-3">Loading your blogs.</p>
            </div>
          </div>
        ) : searchFiltered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-40 bg-white rounded-[3rem] border border-zinc-100 shadow-sm"
          >
            <div className="w-20 h-20 bg-zinc-50 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <FileText className="w-8 h-8 text-zinc-200" />
            </div>
            <p className="text-black font-black uppercase tracking-widest text-xs mb-3">
              {searchQuery ? "No matches found" : "No content yet"}
            </p>
            <p className="text-zinc-400 font-medium text-xl leading-tight tracking-tight mb-12 max-w-xs mx-auto">
              {searchQuery
                ? `We couldn't find any blogs matching "${searchQuery}"`
                : `Start your journey by creating your first blog post.`}
            </p>
            <Button 
            size="sm"
              onClick={handleCreate} 
              className="h-16 px-10 rounded-2xl bg-black text-white hover:bg-zinc-800 shadow-xl shadow-black/10 font-black uppercase tracking-widest text-xs"
            >
              Create first post
            </Button>
          </motion.div>
        ) : (
          searchFiltered.map((blog) => (
            <DashboardBlogCard
              key={blog.id}
              blog={blog}
              onEdit={handleEdit}
              onDelete={deleteBlog}
            />
          ))
        )}
      </div>

      <BlogEditor
        open={editorOpen}
        onClose={handleCloseEditor}
        blog={editingBlog}
        onSubmit={editingBlog ? updateBlog : createBlog}
        isSubmitting={isCreating || isUpdating}
      />
    </div>
  );
}
