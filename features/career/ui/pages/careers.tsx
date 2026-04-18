import CareerHero from "@/features/career/ui/components/hero";
import Benefits from "@/features/career/ui/components/benefits";
import Openings from "@/features/career/ui/components/openings";
import CTA from "@/features/career/ui/components/cta";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import prisma from "@/lib/prisma";
import { JobStatus } from "@prisma/client";

export default async function CareerPage() {
  const jobs = await prisma.job.findMany({
    where: { status: JobStatus.published },
    orderBy: { createdAt: "desc" },
  });

  const careers = jobs.map((job) => ({
    id: job.id,
    title: job.title,
    department: job.department,
    location: job.location,
    type: job.type,
    salary: job.salary,
    description: job.description,
    responsibilities: job.responsibilities as string[],
    requirements: job.requirements as string[],
  }));

  return (
    <div>
      <Navbar />
      <CareerHero />
      <Openings careers={careers} isLoading={false} error={null} />
      <CTA />
      <Footer />
    </div>
  );
}
