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
import { Download, RefreshCw } from "lucide-react";
import type { Application } from "@/hooks/dashboard/use-dashboard-applications";

const ALL_STATUS = "All";

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

  const filtered =
    selectedStatus === "All"
      ? applications
      : applications.filter((app) => app.status === selectedStatus);

  const searchFiltered = filtered.filter(
    (app) =>
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

  const handleDelete = (id: string) => {
    deleteApplication(id);
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
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-5xl font-black tracking-tight text-gray-900">
              Applications
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Review and manage job applications
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetchApplications()}
            className="rounded-xl"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {[
          { label: "Total", value: stats.total, color: "text-gray-900" },
          { label: "Pending", value: stats.pending, color: "text-yellow-600" },
          { label: "Reviewed", value: stats.reviewed, color: "text-blue-600" },
          { label: "Accepted", value: stats.accepted, color: "text-green-600" },
          { label: "Rejected", value: stats.rejected, color: "text-red-600" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm"
          >
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
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
              <TabsTrigger value="pending" className="rounded-lg">
                Pending
              </TabsTrigger>
              <TabsTrigger value="reviewed" className="rounded-lg">
                Reviewed
              </TabsTrigger>
              <TabsTrigger value="accepted" className="rounded-lg">
                Accepted
              </TabsTrigger>
              <TabsTrigger value="rejected" className="rounded-lg">
                Rejected
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Input
            placeholder="Search by name, email, or job..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm rounded-xl border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Application List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading applications...</p>
            </div>
          </div>
        ) : searchFiltered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
            <p className="text-lg text-gray-600 mb-2">
              {searchQuery
                ? `No applications found matching "${searchQuery}"`
                : `No ${selectedStatus === "All" ? "" : selectedStatus} applications yet`}
            </p>
          </div>
        ) : (
          searchFiltered.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              onView={handleView}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
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
