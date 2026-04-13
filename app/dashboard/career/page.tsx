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
import { Download, RefreshCw, Briefcase, TrendingUp, FileText, Plus } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.42, 0, 0.58, 1] as const },
  },
};

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
      <motion.div className="mb-20" variants={itemVariants}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-50 border border-zinc-100 shadow-sm mb-8">
               <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Talent Acquisition</span>
            </div>
            <h1 className="text-6xl md:text-6xl font-black tracking-tight text-[#1a1a1a] leading-[1.1] font-satoshi">
              Career Openings
            </h1>
            <p className="font-semibold text-xl text-foreground/85 mt-6 leading-relaxed max-w-xl font-satoshi">
              Manage your job listings and scale the collective.
            </p>
          </div>
          <Button
            size="lg"
            onClick={handleCreate}
            className="h-20 px-12 rounded-2xl bg-black text-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:bg-zinc-800 transition-all duration-300 font-black uppercase tracking-widest text-xs font-satoshi"
          >
            Add New Position
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {[
          { label: "Total Jobs", value: statusCounts.total, icon: Briefcase },
          { label: "Published", value: statusCounts.published, icon: TrendingUp },
          { label: "Drafts", value: statusCounts.draft, icon: FileText },
        ].map((stat, i) => (
          <div key={i} className="group relative bg-zinc-50/50 p-10 rounded-[2.5rem] border border-zinc-100 hover:bg-white hover:border-zinc-200 hover:shadow-apple-hover transition-all duration-500 overflow-hidden">
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-300 mb-3">{stat.label}</p>
              <p className="text-5xl font-black text-black tracking-tighter leading-none">{stat.value}</p>
            </div>
            <stat.icon className="absolute right-8 bottom-8 w-16 h-16 text-black opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-500" strokeWidth={3} />
          </div>
        ))}
      </div>

      {/* Filters */}
      <motion.div className="mb-12" variants={itemVariants}>
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
                Live
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative flex-1 max-w-md w-full">
            <Input
              placeholder="Search listings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 rounded-2xl border-zinc-100 bg-white focus:border-black focus:ring-black/5 font-medium pl-6 text-lg tracking-tight"
            />
          </div>
        </div>
      </motion.div>

      {/* Career List */}
      <div className="space-y-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-40 bg-zinc-50/50 rounded-[3rem] border-2 border-dashed border-zinc-100">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-zinc-100 border-t-black rounded-full animate-spin mx-auto mb-8 shadow-sm" />
              <p className="text-black font-black uppercase tracking-widest text-xs">Accessing listings...</p>
              <p className="text-zinc-400 font-medium text-lg mt-3">Fetching current opportunities.</p>
            </div>
          </div>
        ) : searchFiltered.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-40 bg-white rounded-[3rem] border border-zinc-100 shadow-sm"
          >
            <div className="w-20 h-20 bg-zinc-50 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Briefcase className="w-8 h-8 text-zinc-200" />
            </div>
            <p className="text-black font-black uppercase tracking-widest text-xs mb-3">
              {searchQuery ? "No matches found" : "No listings yet"}
            </p>
            <p className="text-zinc-400 font-medium text-xl leading-tight tracking-tight mb-12 max-w-xs mx-auto">
              {searchQuery
                ? `We couldn't find any positions matching "${searchQuery}"`
                : `Scale your team by posting your first job opening.`}
            </p>
            <Button 
              onClick={handleCreate} 
              className="h-16 px-10 rounded-2xl bg-black text-white hover:bg-zinc-800 shadow-xl shadow-black/10 font-black uppercase tracking-widest text-xs"
            >
              Post opening
            </Button>
          </motion.div>
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
