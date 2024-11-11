"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";

import { cn } from "@/lib/utils";

import Sidebar from "./sidebar";

type Props = {
  children: React.ReactNode;
};

function SidebarLayout({ children }: Props) {
  const sidebar = useStore(useSidebar, (x) => x);

  if (!sidebar) return null;

  const { getOpenState, settings } = sidebar;

  return (
    <>
      <Sidebar />

      <main
        className={cn(
          "min-h-screen flex-1 bg-background transition-[margin-left] duration-300 ease-in-out",
          !settings.disabled && (!getOpenState() ? "lg:ml-[90px]" : "lg:ml-72"),
        )}
      >
        {children}
      </main>
    </>
  );
}

export default SidebarLayout;
