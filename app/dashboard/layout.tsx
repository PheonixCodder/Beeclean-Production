import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardSidebar from "@/components/layout/dashboard-sidebar";
import { headers } from "next/headers";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check authentication and admin role
  const session = await auth.api.getSession({
    headers: await headers() 
  });

  if (!session || !session.user) {
    redirect("/sign-in");
  }

  // Check if user has admin role
  // if (session.user.role !== "admin") {
  //   redirect("/"); // Or show unauthorized page
  // }

  return (
    <div className="min-h-screen bg-white font-satoshi relative overflow-hidden">
      {/* Background Polish */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[radial-gradient(circle_at_center,_var(--zinc-50)_0%,_transparent_70%)] opacity-70" />
      </div>

      <DashboardSidebar />
      
      <main className="lg:ml-64 min-h-screen relative z-10">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 py-20">
          {children}
        </div>
      </main>
    </div>
  );
}
