"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Briefcase,
  Users,
  Plus,
  Eye,
  TrendingUp,
} from "lucide-react";
import { useDashboardBlogs } from "@/hooks/dashboard/use-dashboard-blogs";
import { useDashboardCareers } from "@/hooks/dashboard/use-dashboard-careers";
import { useDashboardApplications } from "@/hooks/dashboard/use-dashboard-applications";

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
    transition: { duration: 0.5, ease: [0.42, 0, 0.58, 1] },
  },
};

export default function DashboardPage() {
  const { statusCounts: blogStats, isLoading: blogsLoading } =
    useDashboardBlogs();
  const { statusCounts: careerStats, isLoading: careersLoading } =
    useDashboardCareers();
  const { stats: appStats, isLoading: appsLoading } =
    useDashboardApplications();

  const statsCards = [
    {
      title: "Total Blogs",
      value: blogStats?.total || 0,
      icon: FileText,
      href: "/dashboard/blogs",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      loading: blogsLoading,
    },
    {
      title: "Job Postings",
      value: careerStats?.total || 0,
      icon: Briefcase,
      href: "/dashboard/career",
      color: "text-green-600",
      bgColor: "bg-green-50",
      loading: careersLoading,
      published: careerStats?.published,
      draft: careerStats?.draft,
    },
    {
      title: "Applications",
      value: appStats?.total || 0,
      icon: Users,
      href: "/dashboard/applications",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      loading: appsLoading,
      pending: appStats?.pending,
    },
  ];

  return (
    <motion.div
      className="min-h-screen bg-gray-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div  className="mb-8">
        <h1 className="text-5xl font-black tracking-tight text-gray-900">
          Dashboard
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Manage your content, jobs, and applications in one place.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        {statsCards.map((stat, index) => (
          <motion.div key={stat.title} >
            <Card className="rounded-3xl border-none shadow-apple bg-white hover:shadow-apple-hover transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      {stat.title}
                    </p>
                    {stat.loading ? (
                      <div className="h-8 w-16 bg-gray-200 animate-pulse rounded" />
                    ) : (
                      <p className="text-3xl font-black text-gray-900">
                        {stat.value}
                      </p>
                    )}
                    {stat.published !== undefined && (
                      <p className="text-xs text-gray-500 mt-1">
                        {stat.published} published, {stat.draft} drafts
                      </p>
                    )}
                    {stat.pending !== undefined && (
                      <p className="text-xs text-gray-500 mt-1">
                        {stat.pending} pending review
                      </p>
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-xl ${stat.bgColor} ${stat.color}`}
                  >
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
                <Link href={stat.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-4 text-gray-600 hover:text-gray-900"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div  className="mb-8">
        <Card className="rounded-3xl border-none shadow-apple bg-white">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/dashboard/blogs">
                <Button className="w-full py-6 rounded-xl bg-primary text-white hover:bg-primary/90 shadow-sm hover:shadow-md transition-all">
                  <Plus className="h-5 w-5 mr-2" />
                  Manage Blogs
                </Button>
              </Link>
              <Link href="/dashboard/career">
                <Button
                  variant="outline"
                  className="w-full py-6 rounded-xl border-gray-200"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Manage Jobs
                </Button>
              </Link>
              <Link href="/dashboard/applications">
                <Button
                  variant="outline"
                  className="w-full py-6 rounded-xl border-gray-200"
                >
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Review Applications
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activity Section */}
      <motion.div >
        <Card className="rounded-3xl border-none shadow-apple bg-white">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Recent Activity
            </h2>
            <div className="text-center py-12 text-gray-500">
              <p>Recent applications and updates will appear here.</p>
              <p className="text-sm mt-2">
                Use the quick actions above to get started.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
