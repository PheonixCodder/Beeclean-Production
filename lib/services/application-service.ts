import { Application, ApplicationStatus } from "@prisma/client";
import prisma from "../prisma";

export interface ApplicationData {
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone?: string;
  linkedin?: string;
  message?: string;
  resumeUrl?: string;
  status?: ApplicationStatus;
}

export interface ApplicationResponse {
  id: string;
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone?: string | null;
  linkedin?: string | null;
  message?: string | null;
  resumeUrl?: string | null;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
}

export class ApplicationService {
  /**
   * Create a new job application
   */
  static async createApplication(
    data: ApplicationData,
  ): Promise<ApplicationResponse> {
    const application = await prisma.application.create({
      data: {
        ...data,
        status: data.status || "pending",
      },
    });

    return this.formatResponse(application);
  }

  /**
   * Get all applications (admin only)
   */
  static async getAllApplications(): Promise<ApplicationResponse[]> {
    const applications = await prisma.application.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return applications.map(this.formatResponse);
  }

  /**
   * Update application status (admin only)
   */
  static async updateApplicationStatus(
    id: string,
    status: ApplicationStatus,
  ): Promise<ApplicationResponse> {
    const validStatuses: ApplicationStatus[] = [
      "pending",
      "reviewed",
      "accepted",
      "rejected",
    ];

    if (!validStatuses.includes(status)) {
      throw new Error(
        `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      );
    }

    const application = await prisma.application.update({
      where: { id },
      data: { status },
    });

    return this.formatResponse(application);
  }

  /**
   * Delete an application (admin only)
   */
  static async deleteApplication(id: string): Promise<void> {
    const existing = await prisma.application.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new Error("Application not found");
    }

    await prisma.application.delete({
      where: { id },
    });
  }

  /**
   * Format application record to API response shape
   */
  private static formatResponse(application: Application): ApplicationResponse {
    return {
      id: application.id,
      jobId: application.jobId,
      jobTitle: application.jobTitle,
      name: application.name,
      email: application.email,
      phone: application.phone,
      linkedin: application.linkedin,
      message: application.message,
      resumeUrl: application.resumeUrl,
      status: application.status,
      createdAt: application.createdAt.toISOString(),
      updatedAt: application.updatedAt.toISOString(),
    };
  }
}
