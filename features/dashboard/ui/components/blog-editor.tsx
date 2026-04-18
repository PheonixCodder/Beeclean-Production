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
import type { Blog } from "@/features/dashboard/hooks/use-dashboard-blogs";

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
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-[2.5rem] border-none shadow-2xl p-0 bg-white">
        <div className="sticky top-0 z-50 flex items-center justify-between p-8 bg-white/80 backdrop-blur-xl border-b border-zinc-100">
          <div>
            <DialogHeader>
              <DialogTitle className="text-3xl font-black text-black tracking-tighter font-satoshi">
                {blog ? "Edit Post" : "Compose New Post"}
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

        <form onSubmit={handleSubmit} className="p-8 space-y-8 font-satoshi">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Title */}
            <div className="space-y-3">
              <Label htmlFor="title" className="text-xs font-black uppercase tracking-widest text-zinc-400">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="The future of cleaning..."
                required
                disabled={isSubmitting}
                className="h-14 rounded-2xl border-zinc-100 bg-zinc-50/50 focus:bg-white focus:border-black transition-all font-bold text-lg"
              />
            </div>

            {/* Slug */}
            <div className="space-y-3">
              <Label htmlFor="slug" className="text-xs font-black uppercase tracking-widest text-zinc-400">URL Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                placeholder="the-future-of-cleaning"
                required
                disabled={isSubmitting}
                className="h-14 rounded-2xl border-zinc-100 bg-zinc-50/50 focus:bg-white focus:border-black transition-all font-bold"
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="content" className="text-xs font-black uppercase tracking-widest text-zinc-400">Content (MDX)</Label>
              <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">Markdown Supported</span>
            </div>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
              placeholder="Start writing your story..."
              required
              disabled={isSubmitting}
              className="min-h-[400px] rounded-[2rem] border-zinc-100 bg-zinc-50/50 focus:bg-white focus:border-black transition-all font-medium text-lg leading-relaxed p-6"
            />
          </div>

          {/* Excerpt & Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label htmlFor="excerpt" className="text-xs font-black uppercase tracking-widest text-zinc-400">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                placeholder="A short teaser..."
                disabled={isSubmitting}
                className="min-h-[120px] rounded-2xl border-zinc-100 bg-zinc-50/50 focus:bg-white focus:border-black transition-all font-medium"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="description" className="text-xs font-black uppercase tracking-widest text-zinc-400">SEO Meta Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Search engine snippet..."
                disabled={isSubmitting}
                className="min-h-[120px] rounded-2xl border-zinc-100 bg-zinc-50/50 focus:bg-white focus:border-black transition-all font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {/* Tags */}
            <div className="space-y-3">
              <Label htmlFor="tags" className="text-xs font-black uppercase tracking-widest text-zinc-400">Tags (comma separated)</Label>
              <Input
                id="tags"
                value={formData.tags.join(", ")}
                onChange={handleTagsChange}
                placeholder="Cleaning, Tips, iOS"
                disabled={isSubmitting}
                className="h-14 rounded-2xl border-zinc-100 bg-zinc-50/50 focus:bg-white focus:border-black transition-all font-bold"
              />
            </div>

            {/* Thumbnail */}
            <div className="space-y-3">
              <Label htmlFor="thumbnail" className="text-xs font-black uppercase tracking-widest text-zinc-400">Image URL</Label>
              <Input
                id="thumbnail"
                value={formData.thumbnail}
                onChange={(e) => setFormData((prev) => ({ ...prev, thumbnail: e.target.value }))}
                placeholder="https://..."
                disabled={isSubmitting}
                className="h-14 rounded-2xl border-zinc-100 bg-zinc-50/50 focus:bg-white focus:border-black transition-all font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="flex items-center justify-between p-6 rounded-[2rem] border border-zinc-100 bg-zinc-50/50">
              <div className="space-y-1">
                <Label htmlFor="featured" className="text-lg font-black text-black">Featured Post</Label>
                <p className="text-sm text-zinc-500 font-medium">
                  Highlight this on the homepage
                </p>
              </div>
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, featured: checked }))
                }
                disabled={isSubmitting}
                className="data-[state=checked]:bg-black"
              />
            </div>

            <div className="flex items-center justify-between p-6 rounded-[2rem] border border-zinc-100 bg-white shadow-sm">
                <div className="space-y-1">
                  <Label className="text-lg font-black text-black">Status</Label>
                  <p className="text-sm text-zinc-500 font-medium">Control visibility</p>
                </div>
                <Select
                  value={formData.status}
                  onValueChange={(value: "draft" | "published") =>
                    setFormData((prev) => ({ ...prev, status: value }))
                  }
                  disabled={isSubmitting}
                >
                  <SelectTrigger className="w-40 h-12 rounded-xl border-zinc-100 bg-zinc-50 font-bold">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-zinc-100">
                    <SelectItem value="draft" className="font-bold">Draft</SelectItem>
                    <SelectItem value="published" className="font-bold">Published</SelectItem>
                  </SelectContent>
                </Select>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-4 pt-8 border-t border-zinc-50">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isSubmitting}
              className="h-14 px-8 rounded-2xl font-bold text-zinc-400 hover:text-black hover:bg-zinc-50"
            >
              Discard
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-14 px-12 rounded-2xl bg-black text-white shadow-xl shadow-black/10 hover:bg-zinc-800 hover:-translate-y-1 transition-all duration-300 font-black text-lg"
            >
              {isSubmitting
                ? "Saving..."
                : blog
                ? "Update Post"
                : "Publish Post"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
