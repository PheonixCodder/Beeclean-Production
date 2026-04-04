import { z } from "zod";

// Application form validation schema
export const applicationSchema = z.object({
  jobId: z.string().min(1, { message: "Job ID is required" }),
  jobTitle: z.string().min(1, { message: "Job title is required" }).max(200),
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(200),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .regex(/^\+?[\d\s\-()]+$/, { message: "Invalid phone number format" })
    .max(20)
    .optional()
    .or(z.literal("")),
  linkedin: z
    .string()
    .url({ message: "Invalid LinkedIn URL" })
    .max(500)
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .max(2000, { message: "Message too long (max 2000 characters)" })
    .optional(),
});

// Blog creation/update schema
export const blogSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(200),
  content: z.string().min(1, { message: "Content is required" }),
  slug: z
    .string()
    .min(1, { message: "Slug is required" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Invalid slug format (use lowercase, numbers, hyphens)",
    }),
  excerpt: z.string().max(500).optional(),
  description: z.string().max(1000).optional(),
  tags: z.array(z.string()).max(10).optional(),
  thumbnail: z
    .string()
    .url({ message: "Thumbnail must be a valid URL" })
    .optional()
    .or(z.literal("")),
  featured: z.boolean().optional(),
  status: z.enum(["draft", "published"], {
    error: () => "Status must be 'draft' or 'published'",
  }),
});

// Job validation schema (if used in forms)
export const jobSchema = z.object({
  title: z.string().min(1).max(200),
  department: z.string().min(1).max(100),
  location: z.string().min(1).max(100),
  type: z.string().min(1).max(50),
  salary: z.string().max(100).optional(),
  description: z.string().min(1),
  responsibilities: z.array(z.string()).max(20),
  requirements: z.array(z.string()).max(20),
  status: z.enum(["draft", "published"]),
});

// Helper function to validate application data
export function validateApplication(data: unknown) {
  return applicationSchema.parse(data);
}

// Helper function to validate blog data
export function validateBlog(data: unknown) {
  return blogSchema.parse(data);
}

// Generic validation wrapper for API routes
export async function validateFormData<T>(
  formData: FormData,
  schema: z.ZodSchema<T>,
): Promise<T> {
  const data = Object.fromEntries(formData.entries());
  return schema.parse(data);
}
