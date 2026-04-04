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
    <div className="min-h-screen bg-gray-50 font-inter">
      <DashboardSidebar />
      <main className="ml-64 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
