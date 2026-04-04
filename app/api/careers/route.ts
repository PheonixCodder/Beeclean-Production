import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { checkRateLimit, getRateLimitHeaders } from '@/lib/ratelimit';

// GET handler - fetch all published careers
export async function GET(request: NextRequest) {
  try {
    // Rate limiting - extract IP address
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    const isAllowed = await checkRateLimit(ip, 'public');
    if (!isAllowed) {
      const headers = await getRateLimitHeaders(ip, 'public');
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const department = searchParams.get("department");

    const where: any = {
      status: "published",
    };

    if (department && department !== "All") {
      where.department = department;
    }

    const jobs = await prisma.job.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    // Format the response to match frontend Career interface
    const formattedJobs = jobs.map((job) => ({
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
      createdAt: job.createdAt.toISOString(),
      updatedAt: job.updatedAt.toISOString(),
    }));

    return NextResponse.json(formattedJobs);
  } catch (error) {
    console.error("Error fetching careers:", error);
    return NextResponse.json(
      { error: "Failed to fetch careers" },
      { status: 500 }
    );
  }
}

// POST handler - create new job (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Rate limiting for authenticated users (write operations)
    const userId = session.user.id;
    const isAllowed = await checkRateLimit(userId, 'write');
    if (!isAllowed) {
      const headers = await getRateLimitHeaders(userId, 'write');
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers }
      );
    }

    const body = await request.json();
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
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
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

    return NextResponse.json(
      {
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
        createdAt: job.createdAt.toISOString(),
        updatedAt: job.updatedAt.toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating career:", error);
    return NextResponse.json(
      { error: "Failed to create career" },
      { status: 500 }
    );
  }
}
