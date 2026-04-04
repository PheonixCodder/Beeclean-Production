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
import { DashboardJobCard } from "./components/job-card";
import { useDashboardCareers } from "@/hooks/dashboard/use-dashboard-careers";
import { JobForm } from "./components/job-form";
import { Career } from "@/hooks/dashboard/use-dashboard-careers";

const ALL_STATUS = "All";

export default function DashboardCareerPage() {
  const [statusParam, setStatusParam] = useQueryState("status", {
    shallow: true,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Career | null>(null);

  const selectedStatus = statusParam || ALL_STATUS;

  const {
    careers,
    getFilteredCareers,
    isLoading,
    error,
    createCareer,
    updateCareer,
    deleteCareer,
    isCreating,
    isUpdating,
    isDeleting,
    statusCounts,
  } = useDashboardCareers();

  const filtered = getFilteredCareers(selectedStatus);
  const searchFiltered = filtered.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (job: Career) => {
    setEditingJob(job);
    setFormOpen(true);
  };

  const handleCreate = () => {
    setEditingJob(null);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingJob(null);
  };

  const handleSubmitJob = (data: Partial<Career>) => {
    if (editingJob) {
      updateCareer({ ...editingJob, ...data } as Parameters<typeof updateCareer>[0]);
    } else {
      createCareer(data as Parameters<typeof createCareer>[0]);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Something went wrong
          </h3>
          <p className="text-gray-600 mb-4">
            {error instanceof Error ? error.message : "Failed to load jobs"}
          </p>
          <Button onClick={() => window.location.reload()}>Try again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-5xl font-black tracking-tight text-gray-900">
              Job Management
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Create and manage job postings
            </p>
          </div>
          <Button
            size="lg"
            onClick={handleCreate}
            className="rounded-xl bg-[#1a1a1a] text-white shadow-apple hover:shadow-apple-hover hover:-translate-y-0.5 transition-all"
          >
            Post New Job
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Total Jobs</p>
          <p className="text-2xl font-bold text-gray-900">{statusCounts.total}</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Published</p>
          <p className="text-2xl font-bold text-green-600">{statusCounts.published}</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Drafts</p>
          <p className="text-2xl font-bold text-gray-600">{statusCounts.draft}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6">
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
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm rounded-xl border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Job List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading jobs...</p>
            </div>
          </div>
        ) : searchFiltered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
            <p className="text-lg text-gray-600 mb-2">
              {searchQuery
                ? `No jobs found matching "${searchQuery}"`
                : `No ${selectedStatus === "All" ? "" : selectedStatus} jobs yet`}
            </p>
            <Button onClick={handleCreate} variant="link" className="mt-2">
              Create your first job posting
            </Button>
          </div>
        ) : (
          searchFiltered.map((job) => (
            <DashboardJobCard
              key={job.id}
              job={job}
              onEdit={handleEdit}
              onDelete={deleteCareer}
            />
          ))
        )}
      </div>

      <JobForm
        open={formOpen}
        onClose={handleCloseForm}
        job={editingJob}
        onSubmit={handleSubmitJob}
        isSubmitting={isCreating || isUpdating}
      />
    </div>
  );
}
