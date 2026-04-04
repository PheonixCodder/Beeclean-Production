"use client";
import { use } from "react";
import JobDetail from "@/components/career/job-detail";
import ApplicationForm from "@/components/career/application-form";
import Values from "@/components/career/values";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { useCareer } from "@/hooks/use-career";
import { Loader2 } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

const JobPage = ({ params }: PageProps) => {
  const { id } = use(params);
  const { career, isLoading, error } = useCareer(id);

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader2 className="w-10 h-10 animate-spin text-primary opacity-50" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !career) {
    return (
      <div>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Job not found
            </h1>
            <p className="text-gray-600">
              The position you&apos;re looking for doesn&apos;t exist.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <JobDetail job={career} />
      <Values />
      <ApplicationForm jobTitle={career.title} jobId={career.id} />
      <Footer />
    </div>
  );
};

export default JobPage;
