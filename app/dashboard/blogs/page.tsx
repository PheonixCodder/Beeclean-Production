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
import { DashboardBlogCard } from "@/components/dashboard/blog-card";
import { useDashboardBlogs } from "@/hooks/dashboard/use-dashboard-blogs";
import { BlogEditor } from "./components/blog-editor";
import { Blog } from "@/hooks/dashboard/use-dashboard-blogs";

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
      <motion.div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-5xl font-black tracking-tight text-gray-900">
              Blog Management
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Create, edit, and manage your blog posts
            </p>
          </div>
          <Button
            size="lg"
            onClick={handleCreate}
            className="rounded-xl bg-[#1a1a1a] text-white shadow-apple hover:shadow-apple-hover hover:-translate-y-0.5 transition-all"
          >
            Create New Blog
          </Button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <Tabs
            value={selectedStatus}
            onValueChange={(value) =>
              setStatusParam(value === ALL_STATUS ? null : value)
            }
          >
            <TabsList className="rounded-xl bg-gray-100">
              <TabsTrigger value="All" className="rounded-lg">
                All
              </TabsTrigger>
              <TabsTrigger value="draft" className="rounded-lg">
                Drafts
              </TabsTrigger>
              <TabsTrigger value="published" className="rounded-lg">
                Published
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Input
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm rounded-xl border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </motion.div>

      {/* Blog List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading blogs...</p>
            </div>
          </div>
        ) : searchFiltered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
            <p className="text-lg text-gray-600 mb-2">
              {searchQuery
                ? `No blogs found matching "${searchQuery}"`
                : `No ${selectedStatus === "All" ? "" : selectedStatus} blogs yet`}
            </p>
            <Button onClick={handleCreate} variant="link" className="mt-2">
              Create your first blog
            </Button>
          </div>
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
