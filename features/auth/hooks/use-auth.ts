import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
  signInSchema,
  SignInValues,
  SignUpValues,
  signUpSchema,
} from "@/lib/schema";

type AuthMode = "sign-in" | "sign-up";

export const useAuth = (mode: AuthMode) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isSignIn = mode === "sign-in";

  const form = useForm<SignInValues | SignUpValues>({
    resolver: zodResolver(isSignIn ? signInSchema : signUpSchema),
    defaultValues: isSignIn
      ? { email: "", password: "" }
      : { name: "", email: "", password: "", confirmPassword: "" },
  });

  const handleSubmit = async (data: any) => {
    setError(null);
    setIsLoading(true);

    const options = {
      ...data,
      callbackURL: "/",
    };

    const apiCall = isSignIn
      ? authClient.signIn.email(options, {
          onSuccess: () => {
            router.push("/");
            setIsLoading(false);
          },
          onError: ({ error }) => {
            setError(error.message);
            setIsLoading(false);
          },
        })
      : authClient.signUp.email(options, {
          onSuccess: () => {
            router.push("/");
            setIsLoading(false);
          },
          onError: ({ error }) => {
            setError(error.message);
            setIsLoading(false);
          },
        });
  };

  return { form, error, isLoading, handleSubmit };
};
