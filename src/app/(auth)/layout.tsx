import { getSession } from "@/lib/session";

import { redirect } from "next/navigation";

import React from "react";

type Props = {
  children: React.ReactNode;
};

async function AuthLayout({ children }: Props) {
  const session = await getSession();

  if (session) {
    return redirect("/");
  }

  return (
    <main className="container mx-auto flex h-screen items-center justify-center">
      {children}
    </main>
  );
}

export default AuthLayout;
