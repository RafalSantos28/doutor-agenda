import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { usersToClinicsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import SignOutButton from "./_components/sign-out-button";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/authentication");
  }

  // verificar se o usuário já possui uma clínica
  const clinics = await db.query.usersToClinicsTable.findMany({
    where: eq(usersToClinicsTable.userId, session.user.id),
  });

  if (clinics.length === 0) {
    redirect("/clinic-form");
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
