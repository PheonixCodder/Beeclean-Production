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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {job ? "Edit Job" : "Create New Job"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Job Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="e.g. Senior Software Engineer"
              required
              disabled={isSubmitting}
              className="rounded-xl"
            />
          </div>

          {/* Department, Location, Type, Salary (grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">Department *</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, department: e.target.value }))
                }
                placeholder="e.g. Engineering"
                required
                disabled={isSubmitting}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, location: e.target.value }))
                }
                placeholder="e.g. San Francisco, CA"
                required
                disabled={isSubmitting}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Job Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value: any) =>
                  setFormData((prev) => ({ ...prev, type: value }))
                }
                disabled={isSubmitting}
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="salary">Salary *</Label>
              <Input
                id="salary"
                value={formData.salary}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, salary: e.target.value }))
                }
                placeholder="e.g. $100k - $150k"
                required
                disabled={isSubmitting}
                className="rounded-xl"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Detailed job description"
              required
              disabled={isSubmitting}
              className="min-h-[120px] rounded-xl"
            />
          </div>

          {/* Responsibilities */}
          <div className="space-y-3">
            <Label>Responsibilities</Label>
            {formData.responsibilities.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={item}
                  onChange={(e) =>
                    updateListItem("responsibilities", index, e.target.value)
                  }
                  placeholder={`Responsibility ${index + 1}`}
                  disabled={isSubmitting}
                  className="rounded-xl"
                />
                {formData.responsibilities.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeListItem("responsibilities", index)}
                    disabled={isSubmitting}
                    className="h-10 w-10 shrink-0 text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addListItem("responsibilities")}
              disabled={isSubmitting}
              className="rounded-lg"
            >
              Add Responsibility
            </Button>
          </div>

          {/* Requirements */}
          <div className="space-y-3">
            <Label>Requirements</Label>
            {formData.requirements.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={item}
                  onChange={(e) =>
                    updateListItem("requirements", index, e.target.value)
                  }
                  placeholder={`Requirement ${index + 1}`}
                  disabled={isSubmitting}
                  className="rounded-xl"
                />
                {formData.requirements.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeListItem("requirements", index)}
                    disabled={isSubmitting}
                    className="h-10 w-10 shrink-0 text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addListItem("requirements")}
              disabled={isSubmitting}
              className="rounded-lg"
            >
              Add Requirement
            </Button>
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
                : job
                ? "Update Job"
                : "Create Job"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
