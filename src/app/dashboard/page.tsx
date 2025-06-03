import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import SignOutButton from "./components/sign-out-button";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/authentication");
  }

  return (
    <div className="flex h-full flex-col items-start justify-center">
      <h1 className="text-2xl font-bold">Parabéns, você está logado!</h1>
      <p className="text-muted-foreground text-sm">{session?.user?.name}</p>
      <p className="text-muted-foreground text-sm">{session?.user?.email}</p>
      <SignOutButton />
    </div>
  );
};

export default DashboardPage;
