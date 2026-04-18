"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { fileTypeFromBuffer } from "file-type";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import z from "zod";
import { validateApplication, validateFormData } from "@/lib/validators";
import { checkRateLimit } from "@/lib/ratelimit";
import { ApplicationStatus } from "@prisma/client";

const isAdmin = (user: { role?: string | null }): boolean => {
  return user.role === "admin";
};

const MIME_EXTENSIONS: Record<string, string> = {
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docx",
};

function getExtensionFromMime(mime: string): string {
  return MIME_EXTENSIONS[mime] || "bin";
}

export async function getApplications() {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({ headers: reqHeaders });

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  if (!isAdmin(session.user)) {
    throw new Error("Forbidden");
  }

  try {
    const applications = await prisma.application.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return applications;
  } catch (error) {
    console.error("Error fetching applications:", error);
    throw new Error("Failed to fetch applications");
  }
}

export async function submitApplication(formData: FormData) {
  try {
    const reqHeaders = await headers();
    const ip =
      reqHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      reqHeaders.get("x-real-ip") ||
      "unknown";

    const isAllowed = await checkRateLimit(ip, "public");
    if (!isAllowed) {
      throw new Error("Too many requests. Please try again later.");
    }

    const data = Object.fromEntries(formData.entries());
    const validated = validateApplication(data);

    const file = formData.get("resume") as File | null;
    let resumeUrl: string | null = null;

    if (file && file.size > 0) {
      const MAX_FILE_SIZE = 10 * 1024 * 1024;
      if (file.size > MAX_FILE_SIZE) {
        throw new Error("File too large. Maximum size is 10MB.");
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const mimeInfo = await fileTypeFromBuffer(buffer);

      const ALLOWED_MIME_TYPES = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!mimeInfo || !ALLOWED_MIME_TYPES.includes(mimeInfo.mime)) {
        throw new Error("Invalid file type. Only PDF, DOC, and DOCX files are allowed.");
      }

      const extension = mimeInfo.ext || getExtensionFromMime(mimeInfo.mime);
      const safeFilename = `${crypto.randomUUID()}.${extension}`;

      const uploadDir = path.join(process.cwd(), "public", "uploads");
      const filePath = path.join(uploadDir, safeFilename);

      await fs.mkdir(uploadDir, { recursive: true });
      await fs.writeFile(filePath, buffer);

      resumeUrl = `/uploads/${safeFilename}`;
    }

    const { jobId, jobTitle, name, email, phone, linkedin, message } =
      validated;

    const application = await prisma.application.create({
      data: {
        jobId,
        jobTitle,
        name,
        email,
        phone: phone || null,
        linkedin: linkedin || null,
        message: message || null,
        ...(resumeUrl && { resumeUrl }),
        status: "pending",
      },
    });

    return { message: "Application submitted successfully", application };
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error("Validation failed");
    }
    console.error("Error submitting application:", error);
    throw error instanceof Error ? error : new Error("Failed to submit application");
  }
}

export async function updateApplicationStatus(id: string, status: ApplicationStatus) {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({ headers: reqHeaders });

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  if (!isAdmin(session.user)) {
    throw new Error("Forbidden");
  }

  if (!id || !status) {
    throw new Error("Missing required fields: id, status");
  }

  const validStatuses = ["pending", "reviewed", "accepted", "rejected"];
  if (!validStatuses.includes(status)) {
    throw new Error(`Invalid status. Must be one of: ${validStatuses.join(", ")}`);
  }

  try {
    const application = await prisma.application.update({
      where: { id },
      data: { status },
    });

    return application;
  } catch (error) {
    console.error("Error updating application status:", error);
    throw new Error("Failed to update application status");
  }
}

export async function deleteApplication(id: string) {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({ headers: reqHeaders });

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  if (!isAdmin(session.user)) {
    throw new Error("Forbidden");
  }

  if (!id) {
    throw new Error("Missing application ID");
  }

  try {
    const application = await prisma.application.findUnique({
      where: { id },
    });

    if (!application) {
      throw new Error("Application not found");
    }

    await prisma.application.delete({
      where: { id },
    });

    return { message: "Application deleted successfully" };
  } catch (error) {
    console.error("Error deleting application:", error);
    throw new Error("Failed to delete application");
  }
}
