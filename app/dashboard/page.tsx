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
    transition: { duration: 0.5, ease: [0.42, 0, 0.58, 1] as const },
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
      loading: blogsLoading,
    },
    {
      title: "Job Postings",
      value: careerStats?.total || 0,
      icon: Briefcase,
      href: "/dashboard/career",
      loading: careersLoading,
      published: careerStats?.published,
      draft: careerStats?.draft,
    },
    {
      title: "Applications",
      value: appStats?.total || 0,
      icon: Users,
      href: "/dashboard/applications",
      loading: appsLoading,
      pending: appStats?.pending,
    },
  ];

  return (
    <motion.div
      className="min-h-screen font-satoshi"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div className="mb-24" variants={itemVariants}>
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-50 border border-zinc-100 shadow-sm mb-8">
           <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
           <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">System Overview</span>
        </div>
        <h1 className="text-6xl md:text-6xl font-black tracking-tight text-[#1a1a1a] leading-[1.1]">
          Dashboard
        </h1>
        <p className="font-semibold text-xl text-foreground/85 mt-6 leading-relaxed max-w-xl">
          Manage your content, jobs, and applications in one place.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
      >
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            variants={itemVariants}
            className="h-full"
          >
            <Card className="rounded-[2.5rem] border border-zinc-100 shadow-sm bg-zinc-50/50 hover:bg-white hover:border-zinc-200 hover:shadow-apple-hover transition-all duration-500 h-full flex flex-col group">
              <CardContent className="p-10 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-300 mb-3">
                        {stat.title}
                      </p>
                      {stat.loading ? (
                        <div className="h-12 w-24 bg-zinc-100 animate-pulse rounded-xl" />
                      ) : (
                        <p className="text-5xl font-black text-black tracking-tighter leading-none">
                          {stat.value}
                        </p>
                      )}
                      {(stat.published !== undefined || stat.pending !== undefined) && (
                         <div className="flex items-center gap-2 mt-4">
                           <div className="w-1.5 h-1.5 rounded-full bg-zinc-200" />
                           <p className="text-xs text-zinc-400 font-black uppercase tracking-widest">
                             {stat.published !== undefined ? `${stat.published} LIVE • ${stat.draft} DRAFT` : `${stat.pending} PENDING`}
                           </p>
                         </div>
                      )}
                    </div>
                    <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-white shadow-sm border border-zinc-100 text-zinc-300 group-hover:text-black group-hover:bg-zinc-50 transition-all duration-500">
                      <stat.icon className="h-7 w-7" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>

                <Link href={stat.href} className="mt-12">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full h-14 rounded-2xl text-zinc-400 hover:text-black hover:bg-zinc-50 font-black uppercase tracking-widest text-[10px] transition-all duration-300 border border-transparent hover:border-zinc-100"
                  >
                    <Eye className="h-4 w-4 mr-3" strokeWidth={2.5} />
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div className="mb-16" variants={itemVariants}>
        <Card className="rounded-[3rem] border border-zinc-100 shadow-sm bg-zinc-50/30 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-radial-gradient(circle_at_center,_var(--zinc-100)_0%,_transparent_70%) opacity-30 pointer-events-none" />
          <CardContent className="p-12 relative z-10">
            <h2 className="text-3xl font-black text-black tracking-tight mb-10">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link href="/dashboard/blogs">
                <Button className="w-full h-20 rounded-2xl bg-black text-white hover:bg-zinc-800 shadow-xl shadow-black/10 transition-all duration-300 font-black uppercase tracking-widest text-xs">
                  <Plus className="h-5 w-5 mr-3" strokeWidth={3} />
                  Manage Blogs
                </Button>
              </Link>
              <Link href="/dashboard/career">
                <Button
                  variant="outline"
                  className="w-full h-20 rounded-2xl border-zinc-100 bg-white text-black hover:bg-zinc-50 shadow-sm transition-all duration-300 font-black uppercase tracking-widest text-xs"
                >
                  <Plus className="h-5 w-5 mr-3" strokeWidth={3} />
                  Manage Jobs
                </Button>
              </Link>
              <Link href="/dashboard/applications">
                <Button
                  variant="outline"
                  className="w-full h-20 rounded-2xl border-zinc-100 bg-white text-black hover:bg-zinc-50 shadow-sm transition-all duration-300 font-black uppercase tracking-widest text-xs"
                >
                  <TrendingUp className="h-5 w-5 mr-3" strokeWidth={3} />
                  Review Applications
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activity Section */}
      <motion.div variants={itemVariants}>
        <Card className="rounded-[3rem] border border-zinc-100 shadow-sm bg-white">
          <CardContent className="p-12">
            <h2 className="text-3xl font-black text-black tracking-tight mb-10">
              Recent Activity
            </h2>
            <div className="text-center py-24 bg-zinc-50/50 rounded-[2.5rem] border-2 border-dashed border-zinc-100">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-zinc-100 flex items-center justify-center mx-auto mb-8">
                <TrendingUp className="w-8 h-8 text-zinc-200" />
              </div>
              <p className="text-black font-black uppercase tracking-widest text-xs mb-3">No recent updates</p>
              <p className="text-zinc-400 font-medium text-lg leading-tight tracking-tight max-w-xs mx-auto">
                Recent applications and updates will appear here once the system is active.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
