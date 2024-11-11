import { SidebarLayout } from "@/components/shared/sidebar-layout";

import { getSession } from "@/lib/session";

import { redirect } from "next/navigation";

import React from "react";

type Props = {
  children: React.ReactNode;
};

async function RootLayout({ children }: Props) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }
  return <SidebarLayout>{children}</SidebarLayout>;
}

export default RootLayout;
