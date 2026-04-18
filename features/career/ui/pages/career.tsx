import { notFound } from "next/navigation";
import JobDetail from "@/features/career/ui/components/job-detail";
import Values from "@/features/career/ui/components/values";
import ApplicationForm from "@/features/career/ui/components/application-form";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import prisma from "@/lib/prisma";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function JobPage({ params }: PageProps) {
  const { id } = await params;
  const job = await prisma.job.findUnique({
    where: { id },
  });

  if (!job || job.status !== "published") {
    notFound();
  }

  const career = {
    id: job.id,
    title: job.title,
    department: job.department,
    location: job.location,
    type: job.type,
    salary: job.salary,
    description: job.description,
    responsibilities: job.responsibilities as string[],
    requirements: job.requirements as string[],
  };

  return (
    <div>
      <Navbar />
      <JobDetail job={career} />
      <Values />
      <ApplicationForm jobTitle={career.title} jobId={career.id} />
      <Footer />
    </div>
  );
}
