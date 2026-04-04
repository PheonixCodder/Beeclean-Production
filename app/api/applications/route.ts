import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { fileTypeFromBuffer } from "file-type";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import z from "zod";
import { validateApplication, validateFormData } from "@/lib/validators";
import { checkRateLimit, getRateLimitHeaders } from "@/lib/ratelimit";

// Helper function to check admin role
const isAdmin = (user: { role?: string | null }): boolean => {
  return user.role === "admin";
};

// MIME type to extension mapping
const MIME_EXTENSIONS: Record<string, string> = {
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docx",
};

function getExtensionFromMime(mime: string): string {
  return MIME_EXTENSIONS[mime] || "bin";
}

// GET handler - fetch all applications (admin only)
export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!isAdmin(session.user)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const applications = await prisma.application.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 },
    );
  }
}

// POST handler - submit new job application (public)
export async function POST(request: NextRequest) {
  try {
    // Rate limiting - extract IP address
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const isAllowed = await checkRateLimit(ip, "public");
    if (!isAllowed) {
      const headers = await getRateLimitHeaders(ip, "public");
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers },
      );
    }

    const formData = await request.formData();

    // Validate form fields using Zod
    const data = Object.fromEntries(formData.entries());
    const validated = validateApplication(data);

    // Extract and handle file upload
    const file = formData.get("resume") as File | null;
    let resumeUrl: string | null = null;

    if (file) {
      // 1. Size validation (max 10MB)
      const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: "File too large. Maximum size is 10MB." },
          { status: 400 },
        );
      }

      // 2. MIME type validation using magic bytes
      const buffer = Buffer.from(await file.arrayBuffer());
      const mimeInfo = await fileTypeFromBuffer(buffer);

      const ALLOWED_MIME_TYPES = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!mimeInfo || !ALLOWED_MIME_TYPES.includes(mimeInfo.mime)) {
        return NextResponse.json(
          {
            error:
              "Invalid file type. Only PDF, DOC, and DOCX files are allowed.",
          },
          { status: 400 },
        );
      }

      // 3. Generate safe filename
      const extension = mimeInfo.ext || getExtensionFromMime(mimeInfo.mime);
      const safeFilename = `${crypto.randomUUID()}.${extension}`;

      // 4. Save file to uploads directory
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      const filePath = path.join(uploadDir, safeFilename);

      // Ensure upload directory exists
      await fs.mkdir(uploadDir, { recursive: true });

      // Write file to disk
      await fs.writeFile(filePath, buffer);

      // Store the URL path (relative to public)
      resumeUrl = `/uploads/${safeFilename}`;
    }

    // Use validated data
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

    return NextResponse.json(
      {
        message: "Application submitted successfully",
        application,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error submitting application:", error);

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: error.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 },
    );
  }
}

// PATCH handler - update application status (admin only)
export async function PATCH(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!isAdmin(session.user)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing required fields: id, status" },
        { status: 400 },
      );
    }

    const validStatuses = ["pending", "reviewed", "accepted", "rejected"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        {
          error: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
        },
        { status: 400 },
      );
    }

    const application = await prisma.application.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(application);
  } catch (error) {
    console.error("Error updating application status:", error);
    return NextResponse.json(
      { error: "Failed to update application status" },
      { status: 500 },
    );
  }
}

// DELETE handler - delete application (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!isAdmin(session.user)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing application ID" },
        { status: 400 },
      );
    }

    const application = await prisma.application.findUnique({
      where: { id },
    });

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 },
      );
    }

    await prisma.application.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Application deleted successfully" });
  } catch (error) {
    console.error("Error deleting application:", error);
    return NextResponse.json(
      { error: "Failed to delete application" },
      { status: 500 },
    );
  }
}
