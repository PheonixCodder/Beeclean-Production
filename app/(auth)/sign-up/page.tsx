import { SignUpView } from "@/features/auth/ui/pages/signup-view";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!!session) redirect("/dashboard");
  return <SignUpView />;
};

export default Page;
