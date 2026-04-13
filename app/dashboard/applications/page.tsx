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
import { ApplicationCard } from "./components/application-card";
import { ApplicationDetail } from "./components/application-detail";
import { useDashboardApplications } from "@/hooks/dashboard/use-dashboard-applications";
import { Download, RefreshCw, Users, FileText, CheckCircle2 } from "lucide-react";
import type { Application } from "@/hooks/dashboard/use-dashboard-applications";

const ALL_STATUS = "All";

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

export default function DashboardApplicationsPage() {
  const [statusParam, setStatusParam] = useQueryState("status", {
    shallow: true,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  const selectedStatus = statusParam || ALL_STATUS;

  const {
    applications,
    stats,
    isLoading,
    error,
    updateStatus,
    deleteApplication,
    isUpdatingStatus,
    isDeleting,
    refetchApplications,
  } = useDashboardApplications();

  const statusCounts = stats;

  const filtered =
    selectedStatus === "All"
      ? applications
      : applications.filter((app: Application) => app.status === selectedStatus);

  const searchFiltered = filtered.filter(
    (app: Application) =>
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleView = (application: Application) => {
    setSelectedApplication(application);
    setDetailOpen(true);
  };

  const handleStatusChange = (id: string, status: string) => {
    updateStatus({ id, status });
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Something went wrong
          </h3>
          <p className="text-gray-600 mb-4">
            {error instanceof Error ? error.message : "Failed to load applications"}
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
               <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Candidate Pipeline</span>
            </div>
            <h1 className="text-6xl md:text-6xl font-black tracking-tight text-[#1a1a1a] leading-[1.1] font-satoshi">
              Applications
            </h1>
            <p className="font-semibold text-xl text-foreground/85 mt-6 leading-relaxed max-w-xl font-satoshi">
              Review candidates and build the next layer of our collective.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-zinc-50/50 border border-zinc-100 p-3 rounded-[2.5rem] shadow-sm">
            <div className="px-8 py-4 bg-white rounded-2xl shadow-apple-hover border border-zinc-100">
              <p className="text-[10px] font-black text-zinc-300 uppercase tracking-widest mb-1 text-center">Total</p>
              <p className="text-3xl font-black text-black text-center">{statusCounts.total}</p>
            </div>
            <div className="px-8 py-4">
              <p className="text-[10px] font-black text-zinc-300 uppercase tracking-widest mb-1 text-center">Pending</p>
              <p className="text-3xl font-black text-black text-center">{statusCounts.pending}</p>
            </div>
          </div>
        </div>
      </motion.div>

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
              <TabsTrigger value="pending" className="rounded-xl px-8 font-black uppercase tracking-widest text-[10px] text-zinc-300 data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-xl transition-all duration-300">
                Pending
              </TabsTrigger>
              <TabsTrigger value="reviewed" className="rounded-xl px-8 font-black uppercase tracking-widest text-[10px] text-zinc-300 data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-xl transition-all duration-300">
                Reviewed
              </TabsTrigger>
              <TabsTrigger value="accepted" className="rounded-xl px-8 font-black uppercase tracking-widest text-[10px] text-zinc-300 data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-xl transition-all duration-300">
                Accepted
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative flex-1 max-w-md w-full">
            <Input
              placeholder="Search applicants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 rounded-2xl border-zinc-100 bg-white focus:border-black focus:ring-black/5 font-medium pl-6 text-lg tracking-tight"
            />
          </div>
        </div>
      </motion.div>

      {/* Applications List */}
      <div className="space-y-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-40 bg-zinc-50/50 rounded-[3rem] border-2 border-dashed border-zinc-100">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-zinc-100 border-t-black rounded-full animate-spin mx-auto mb-8 shadow-sm" />
              <p className="text-black font-black uppercase tracking-widest text-xs">Accessing pipeline...</p>
              <p className="text-zinc-400 font-medium text-lg mt-3">Fetching current applications.</p>
            </div>
          </div>
        ) : searchFiltered.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-40 bg-white rounded-[3rem] border border-zinc-100 shadow-sm"
          >
            <div className="w-20 h-20 bg-zinc-50 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Users className="w-8 h-8 text-zinc-200" />
            </div>
            <p className="text-black font-black uppercase tracking-widest text-xs mb-3">
              {searchQuery ? "No matches found" : "No applications yet"}
            </p>
            <p className="text-zinc-400 font-medium text-xl leading-tight tracking-tight max-w-xs mx-auto">
              {searchQuery
                ? `We couldn't find any candidates matching "${searchQuery}"`
                : `New applications will appear here once candidates apply.`}
            </p>
          </motion.div>
        ) : (
          searchFiltered.map((app) => (
            <ApplicationCard
              key={app.id}
              application={app}
              onView={handleView}
              onStatusChange={handleStatusChange}
              onDelete={deleteApplication}
            />
          ))
        )}
      </div>

      <ApplicationDetail
        application={selectedApplication}
        open={detailOpen}
        onClose={() => {
          setDetailOpen(false);
          setSelectedApplication(null);
        }}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
