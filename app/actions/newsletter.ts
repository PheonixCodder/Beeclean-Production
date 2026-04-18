"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export async function subscribeNewsletter(email: string) {
  try {
    const validatedData = newsletterSchema.parse({ email });

    const existing = await prisma.newsletter.findUnique({
      where: { email: validatedData.email },
    });

    if (existing) {
      if (!existing.isActive) {
        await prisma.newsletter.update({
          where: { email: validatedData.email },
          data: { isActive: true },
        });
        return { success: true, message: "Welcome back! Your subscription has been renewed." };
      }
      return { success: false, message: "You are already subscribed to the newsletter!" };
    }

    await prisma.newsletter.create({
      data: {
        email: validatedData.email,
        isActive: true,
      },
    });

    return { success: true, message: "Successfully subscribed to the Beeclean Journal!" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.message };
    }
    console.error("Newsletter subscription error: ", error);
    return { success: false, message: "An unexpected error occurred. Please try again." };
  }
}

export async function getNewsletters() {
  try {
    const newsletters = await prisma.newsletter.findMany({
      orderBy: { createdAt: "desc" },
    });
    return newsletters;
  } catch (error) {
    console.error("Error fetching newsletters:", error);
    throw new Error("Failed to fetch newsletters");
  }
}
