"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const isAdmin = (user: { role?: string | null }): boolean => {
  return user.role === "admin";
};

// GET handler - fetch careers, filtered by department if provided. 
// Used by both public and admin dashboards. Admin gets all, public gets published only?
// Wait, the API routes showed public GET only gets published jobs. Let's align with that. 
export async function getCareers(department?: string, isAdminRequest = false) {
  try {
    const where: any = {};
    if (!isAdminRequest) {
        where.status = "published";
    }

    if (department && department !== "All") {
      where.department = department;
    }

    const jobs = await prisma.job.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    return jobs.map((job) => ({
      id: job.id,
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      salary: job.salary,
      description: job.description,
      responsibilities: job.responsibilities as string[],
      requirements: job.requirements as string[],
      status: job.status,
      createdAt: job.createdAt,
      updatedAt: job.updatedAt,
    }));
  } catch (error) {
    console.error("Error fetching careers:", error);
    throw new Error("Failed to fetch careers");
  }
}

// GET handler - fetch a single published job by ID
export async function getCareer(id: string) {
  try {
    const job = await prisma.job.findUnique({
      where: { id },
    });

    if (!job || job.status !== "published") {
      throw new Error("Not found");
    }

    return {
      id: job.id,
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      salary: job.salary,
      description: job.description,
      responsibilities: job.responsibilities as string[],
      requirements: job.requirements as string[],
      status: job.status,
      createdAt: job.createdAt,
      updatedAt: job.updatedAt,
    };
  } catch (error) {
    if (error instanceof Error && error.message === "Not found") {
      throw error;
    }
    console.error("Error fetching job:", error);
    throw new Error("Failed to fetch job");
  }
}

// POST handler - create new job (admin only)
export async function createCareer(body: any) {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({ headers: reqHeaders });

  if (!session || !session.user || !isAdmin(session.user)) {
    throw new Error("Unauthorized");
  }

  try {
    const {
      title,
      department,
      location,
      type,
      salary,
      description,
      responsibilities,
      requirements,
      status = "draft",
    } = body;

    if (!title || !department || !location || !type || !salary || !description || !responsibilities || !requirements) {
      throw new Error("Missing required fields");
    }

    const job = await prisma.job.create({
      data: {
        title,
        department,
        location,
        type,
        salary,
        description,
        responsibilities,
        requirements,
        status,
      },
    });

    return {
      id: job.id,
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      salary: job.salary,
      description: job.description,
      responsibilities: job.responsibilities,
      requirements: job.requirements,
      status: job.status,
      createdAt: job.createdAt,
      updatedAt: job.updatedAt,
    };
  } catch (error) {
    console.error("Error creating career:", error);
    throw new Error("Failed to create career");
  }
}

// PUT handler - update job (admin only)
export async function updateCareer(id: string, body: any) {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({ headers: reqHeaders });

  if (!session || !session.user || !isAdmin(session.user)) {
    throw new Error("Unauthorized");
  }

  try {
    const {
      title,
      department,
      location,
      type,
      salary,
      description,
      responsibilities,
      requirements,
      status,
    } = body;

    const existingJob = await prisma.job.findUnique({
      where: { id },
    });

    if (!existingJob) {
      throw new Error("Job not found");
    }

    const updatedJob = await prisma.job.update({
      where: { id },
      data: {
        title,
        department,
        location,
        type,
        salary,
        description,
        responsibilities,
        requirements,
        status,
      },
    });

    return {
      id: updatedJob.id,
      title: updatedJob.title,
      department: updatedJob.department,
      location: updatedJob.location,
      type: updatedJob.type,
      salary: updatedJob.salary,
      description: updatedJob.description,
      responsibilities: updatedJob.responsibilities,
      requirements: updatedJob.requirements,
      status: updatedJob.status,
      createdAt: updatedJob.createdAt,
      updatedAt: updatedJob.updatedAt,
    };
  } catch (error) {
    console.error("Error updating job:", error);
    throw new Error("Failed to update job");
  }
}

// DELETE handler - delete job (admin only)
export async function deleteCareer(id: string) {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({ headers: reqHeaders });

  if (!session || !session.user || !isAdmin(session.user)) {
    throw new Error("Unauthorized");
  }

  try {
    const job = await prisma.job.findUnique({
      where: { id },
    });

    if (!job) {
      throw new Error("Job not found");
    }

    await prisma.job.delete({
      where: { id },
    });

    return { message: "Job deleted successfully" };
  } catch (error) {
    console.error("Error deleting job:", error);
    throw new Error("Failed to delete job");
  }
}
