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
import { X } from "lucide-react";
import { Career } from "@/hooks/dashboard/use-dashboard-careers";

type JobType = "Full-time" | "Part-time" | "Contract" | "Internship";

const isValidJobType = (type: string): type is JobType => {
  return ["Full-time", "Part-time", "Contract", "Internship"].includes(type);
};

interface JobFormProps {
  open: boolean;
  onClose: () => void;
  job: Career | null;
  onSubmit: (data: Partial<Career>) => void;
  isSubmitting: boolean;
}

export function JobForm({ open, onClose, job, onSubmit, isSubmitting }: JobFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "Full-time" as "Full-time" | "Part-time" | "Contract" | "Internship",
    salary: "",
    description: "",
    responsibilities: [] as string[],
    requirements: [] as string[],
    status: "draft" as "draft" | "published",
  });

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title,
        department: job.department,
        location: job.location,
        type: isValidJobType(job.type) ? job.type : "Full-time",
        salary: job.salary,
        description: job.description,
        responsibilities: job.responsibilities,
        requirements: job.requirements,
        status: job.status as "draft" | "published",
      });
    } else if (open) {
      setFormData({
        title: "",
        department: "",
        location: "",
        type: "Full-time",
        salary: "",
        description: "",
        responsibilities: [""],
        requirements: [""],
        status: "draft",
      });
    }
  }, [job, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      responsibilities: formData.responsibilities.filter((r) => r.trim() !== ""),
      requirements: formData.requirements.filter((r) => r.trim() !== ""),
    });
  };

  const addListItem = (field: "responsibilities" | "requirements") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const updateListItem = (
    field: "responsibilities" | "requirements",
    index: number,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const removeListItem = (
    field: "responsibilities" | "requirements",
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-[2.5rem] border-none shadow-2xl p-0 bg-white">
        <div className="sticky top-0 z-50 flex items-center justify-between p-8 bg-white/80 backdrop-blur-xl border-b border-zinc-100">
          <div>
            <DialogHeader>
              <DialogTitle className="text-3xl font-black text-black tracking-tighter font-satoshi">
                {job ? "Edit Position" : "Create New Opening"}
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
          {/* Title */}
          <div className="space-y-3">
            <Label htmlFor="title" className="text-xs font-black uppercase tracking-widest text-zinc-400">Position Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="e.g. Senior Software Engineer"
              required
              disabled={isSubmitting}
              className="h-14 rounded-2xl border-zinc-100 bg-zinc-50/50 focus:bg-white focus:border-black transition-all font-bold text-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label htmlFor="department" className="text-xs font-black uppercase tracking-widest text-zinc-400">Department</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, department: e.target.value }))
                }
                placeholder="e.g. Engineering"
                required
                disabled={isSubmitting}
                className="h-14 rounded-2xl border-zinc-100 bg-zinc-50/50 focus:bg-white focus:border-black transition-all font-bold"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="location" className="text-xs font-black uppercase tracking-widest text-zinc-400">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, location: e.target.value }))
                }
                placeholder="e.g. Remote / San Francisco"
                required
                disabled={isSubmitting}
                className="h-14 rounded-2xl border-zinc-100 bg-zinc-50/50 focus:bg-white focus:border-black transition-all font-bold"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="type" className="text-xs font-black uppercase tracking-widest text-zinc-400">Employment Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value: any) =>
                  setFormData((prev) => ({ ...prev, type: value }))
                }
                disabled={isSubmitting}
              >
                <SelectTrigger className="h-14 rounded-2xl border-zinc-100 bg-zinc-50/50 focus:bg-white focus:border-black transition-all font-bold">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-zinc-100">
                  <SelectItem value="Full-time" className="font-bold">Full-time</SelectItem>
                  <SelectItem value="Part-time" className="font-bold">Part-time</SelectItem>
                  <SelectItem value="Contract" className="font-bold">Contract</SelectItem>
                  <SelectItem value="Internship" className="font-bold">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label htmlFor="salary" className="text-xs font-black uppercase tracking-widest text-zinc-400">Salary Range</Label>
              <Input
                id="salary"
                value={formData.salary}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, salary: e.target.value }))
                }
                placeholder="e.g. $100k - $150k"
                required
                disabled={isSubmitting}
                className="h-14 rounded-2xl border-zinc-100 bg-zinc-50/50 focus:bg-white focus:border-black transition-all font-bold"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <Label htmlFor="description" className="text-xs font-black uppercase tracking-widest text-zinc-400">Job Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Tell us about the role..."
              required
              disabled={isSubmitting}
              className="min-h-[160px] rounded-[2rem] border-zinc-100 bg-zinc-50/50 focus:bg-white focus:border-black transition-all font-medium text-lg leading-relaxed p-6"
            />
          </div>

          {/* Responsibilities */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Responsibilities</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => addListItem("responsibilities")}
                disabled={isSubmitting}
                className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black hover:bg-zinc-50"
              >
                + Add Item
              </Button>
            </div>
            <div className="space-y-3">
              {formData.responsibilities.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <Input
                    value={item}
                    onChange={(e) =>
                      updateListItem("responsibilities", index, e.target.value)
                    }
                    placeholder={`Responsibility #${index + 1}`}
                    disabled={isSubmitting}
                    className="h-12 rounded-xl border-zinc-100 bg-zinc-50/50 focus:bg-white focus:border-black transition-all font-medium"
                  />
                  {formData.responsibilities.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeListItem("responsibilities", index)}
                      disabled={isSubmitting}
                      className="h-12 w-12 shrink-0 rounded-xl text-zinc-300 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Requirements</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => addListItem("requirements")}
                disabled={isSubmitting}
                className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black hover:bg-zinc-50"
              >
                + Add Item
              </Button>
            </div>
            <div className="space-y-3">
              {formData.requirements.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <Input
                    value={item}
                    onChange={(e) =>
                      updateListItem("requirements", index, e.target.value)
                    }
                    placeholder={`Requirement #${index + 1}`}
                    disabled={isSubmitting}
                    className="h-12 rounded-xl border-zinc-100 bg-zinc-50/50 focus:bg-white focus:border-black transition-all font-medium"
                  />
                  {formData.requirements.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeListItem("requirements", index)}
                      disabled={isSubmitting}
                      className="h-12 w-12 shrink-0 rounded-xl text-zinc-300 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="pt-4 border-t border-zinc-50">
            <div className="flex items-center justify-between p-6 rounded-[2rem] border border-zinc-100 bg-white shadow-sm">
                <div className="space-y-1">
                  <Label className="text-lg font-black text-black">Position Status</Label>
                  <p className="text-sm text-zinc-500 font-medium">Control visibility for applicants</p>
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
              Discard Changes
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-14 px-12 rounded-2xl bg-black text-white shadow-xl shadow-black/10 hover:bg-zinc-800 hover:-translate-y-1 transition-all duration-300 font-black text-lg"
            >
              {isSubmitting
                ? "Saving..."
                : job
                ? "Update Opening"
                : "Create Opening"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
