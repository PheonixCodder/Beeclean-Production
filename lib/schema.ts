import z from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { error: "Password is Required" }),
});

export type SignInValues = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    name: z.string().min(1, { error: "Name is required" }),
    email: z.string().email(),
    password: z.string().min(1, { error: "Password is required" }),
    confirmPassword: z
      .string()
      .min(1, { error: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignUpValues = z.infer<typeof signUpSchema>;
