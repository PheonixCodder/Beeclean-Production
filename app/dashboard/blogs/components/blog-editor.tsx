"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { X } from "lucide-react";
import type { Blog } from "@/hooks/dashboard/use-dashboard-blogs";

interface BlogEditorProps {
  open: boolean;
  onClose: () => void;
  blog: Blog | null;
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}

export function BlogEditor({
  open,
  onClose,
  blog,
  onSubmit,
  isSubmitting,
}: BlogEditorProps) {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    description: "",
    tags: [] as string[],
    thumbnail: "",
    featured: false,
    status: "draft" as "draft" | "published",
  });

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        slug: blog.slug,
        content: "", // Content not returned in list, would fetch separately
        excerpt: "",
        description: "",
        tags: [],
        thumbnail: "",
        featured: blog.featured,
        status: blog.status as "draft" | "published",
      });
    } else if (open) {
      setFormData({
        title: "",
        slug: "",
        content: "",
        excerpt: "",
        description: "",
        tags: [],
        thumbnail: "",
        featured: false,
        status: "draft",
      });
    }
  }, [blog, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      tags: formData.tags.filter((tag) => tag.trim() !== ""),
    });
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: !prev.slug || prev.slug === generateSlug(prev.title) ? generateSlug(title) : prev.slug,
    }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsString = e.target.value;
    const tagsArray = tagsString.split(",").map((t) => t.trim());
    setFormData((prev) => ({ ...prev, tags: tagsArray }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-2xl max-h-[90vh] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {blog ? "Edit Blog" : "Create New Blog"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="Enter blog title"
              required
              disabled={isSubmitting}
              className="rounded-xl"
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
              placeholder="url-friendly-slug"
              required
              disabled={isSubmitting}
              className="rounded-xl"
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Content (MDX) *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
              placeholder="Write your blog content in MDX format..."
              required
              disabled={isSubmitting}
              className="min-h-[300px] rounded-xl font-mono text-sm"
            />
            <p className="text-xs text-gray-500">
              Supports MDX formatting. Use # for headings, ** for bold, etc.
            </p>
          </div>

          {/* Excerpt & Description (two columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Short teaser for the blog"
                disabled={isSubmitting}
                className="min-h-[100px] rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Meta Description (SEO)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description for search engines"
                disabled={isSubmitting}
                className="min-h-[100px] rounded-xl"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              value={formData.tags.join(", ")}
              onChange={handleTagsChange}
              placeholder="React, Next.js, Tutorial"
              disabled={isSubmitting}
              className="rounded-xl"
            />
          </div>

          {/* Thumbnail & Featured (two columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="thumbnail">Thumbnail Image URL</Label>
              <Input
                id="thumbnail"
                value={formData.thumbnail}
                onChange={(e) => setFormData((prev) => ({ ...prev, thumbnail: e.target.value }))}
                placeholder="https://..."
                disabled={isSubmitting}
                className="rounded-xl"
              />
              <p className="text-xs text-gray-500">
                Enter URL for blog thumbnail image. Cloud upload UI coming soon.
              </p>
            </div>
            <div className="flex items-center justify-between space-x-2 rounded-xl border border-gray-200 p-4">
              <div className="space-y-0.5">
                <Label htmlFor="featured">Featured</Label>
                <p className="text-sm text-gray-500">
                  Highlight this blog on the homepage
                </p>
              </div>
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, featured: checked }))
                }
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: "draft" | "published") =>
                setFormData((prev) => ({ ...prev, status: value }))
              }
              disabled={isSubmitting}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-[#1a1a1a] text-white shadow-apple hover:shadow-apple-hover hover:-translate-y-0.5 transition-all"
            >
              {isSubmitting
                ? "Saving..."
                : blog
                ? "Update Blog"
                : "Create Blog"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
