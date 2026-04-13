import { PropsWithChildren } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AuthAnimation } from "@/components/auth/auth-layout";

const AuthLayout = async ({ children }: Readonly<PropsWithChildren>) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!!session) {
    redirect("/");
  }

  return (
    <div className="bg-white flex min-h-svh flex-col items-center justify-center p-6 md:p-10 relative overflow-hidden font-satoshi">
      {/* Background Polish */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-zinc-100/50 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-zinc-100/50 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
      </div>
      
      <div className="w-full max-w-sm md:max-w-3xl relative z-10">
        <AuthAnimation>{children}</AuthAnimation>
      </div>
    </div>
  );
};

export default AuthLayout;
