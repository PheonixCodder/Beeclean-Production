"use client";

import Link from "next/link";
import { GoAlert } from "react-icons/go";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";

export const SignUpView = () => {
  const { form, error, isLoading, handleSubmit } = useAuth("sign-up");

  return (
    <div className="flex justify-center items-center min-h-screen gap-6">
      <Card className="w-full max-w-md overflow-hidden rounded-3xl border-none shadow-xl transition-shadow duration-300">
        <CardContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="p-6 md:p-8"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-4xl font-black tracking-tight text-gray-900 mb-2 font-satoshi">
                      Welcome!
                    </h1>
                    <p className="font-inter text-base text-muted-foreground">
                      Create your account
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="John Doe"
                            disabled={isLoading}
                            className="rounded-lg"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="m@example.com"
                            type="email"
                            disabled={isLoading}
                            className="rounded-lg"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="********"
                            type="password"
                            disabled={isLoading}
                            className="rounded-lg"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="********"
                            type="password"
                            disabled={isLoading}
                            className="rounded-lg"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {!!error && (
                    <Alert className="bg-destructive/10 border-destructive/20">
                      <GoAlert className="h-4 w-4 !text-destructive" />
                      <AlertTitle className="text-destructive">
                        {error}
                      </AlertTitle>
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-[#1a1a1a] text-white shadow-apple hover:shadow-apple-hover hover:bg-black/90 rounded-xl text-sm font-bold tracking-tight transition-all duration-200 disabled:opacity-70"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Sign Up"}
                  </Button>

                  <div className="font-inter text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                      href="/sign-in"
                      className="underline underline-offset-4 text-primary hover:text-primary/80"
                    >
                      Sign In
                    </Link>
                  </div>
                </div>
              </form>
            </Form>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};
