import CareerHero from "@/components/career/hero";
import Benefits from "@/components/career/benefits";
import Openings from "@/components/career/openings";
import CTA from "@/components/career/cta";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import prisma from "@/lib/prisma";

export default async function CareerPage() {
  const jobs = await prisma.job.findMany({
    where: { status: "published" },
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
