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
    <div className="flex justify-center items-center gap-6">
      <Card className="w-full max-w-md overflow-hidden rounded-[2.5rem] border border-zinc-100 shadow-apple-hover bg-white/80 backdrop-blur-xl">
        <CardContent className="p-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="p-10 md:p-12"
            >
              <div className="flex flex-col gap-10">
                <div className="flex flex-col items-center text-center">
                   <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                    <img src="/logo.svg" alt="Beeclean" className="w-10 h-10 brightness-0 invert" />
                  </div>
                  <h1 className="text-4xl font-black tracking-[-0.04em] text-black mb-3 font-satoshi">
                    Join collective
                  </h1>
                  <p className="text-zinc-400 font-medium tracking-tight">
                    Create your workspace credentials
                  </p>
                </div>

                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-zinc-300">
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="John Doe"
                            disabled={isLoading}
                            className="h-14 rounded-2xl border-zinc-100 bg-zinc-50/50 focus:bg-white focus:border-black transition-all duration-300 font-medium px-6 text-lg tracking-tight"
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
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-zinc-300">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="m@example.com"
                            type="email"
                            disabled={isLoading}
                            className="h-14 rounded-2xl border-zinc-100 bg-zinc-50/50 focus:bg-white focus:border-black transition-all duration-300 font-medium px-6 text-lg tracking-tight"
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
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-zinc-300">
                          Secure Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="********"
                            type="password"
                            disabled={isLoading}
                            className="h-14 rounded-2xl border-zinc-100 bg-zinc-50/50 focus:bg-white focus:border-black transition-all duration-300 font-medium px-6 text-lg tracking-tight"
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
                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-zinc-300">
                          Confirm Secure Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="********"
                            type="password"
                            disabled={isLoading}
                            className="h-14 rounded-2xl border-zinc-100 bg-zinc-50/50 focus:bg-white focus:border-black transition-all duration-300 font-medium px-6 text-lg tracking-tight"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {!!error && (
                  <Alert className="bg-red-50 border-red-100 rounded-2xl p-4">
                    <GoAlert className="h-5 w-5 !text-red-600" />
                    <AlertTitle className="text-red-600 font-black tracking-tight text-sm">
                      {error}
                    </AlertTitle>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="h-16 w-full bg-black text-white hover:bg-zinc-800 rounded-2xl text-xs font-black uppercase tracking-widest shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-300 disabled:opacity-70"
                  disabled={isLoading}
                >
                  {isLoading ? "Provisioning..." : "Create Account"}
                </Button>

                <div className="text-center text-xs font-black uppercase tracking-widest text-zinc-300">
                   Already a member?{" "}
                  <Link
                    href="/sign-in"
                    className="text-black hover:underline underline-offset-8 decoration-2"
                  >
                    Enter collective
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
