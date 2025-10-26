"use client";

import { RoleProvider } from "@/contexts/role-context";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const KEY = "userId";
    let id = localStorage.getItem(KEY);

    const fallback = process.env.NEXT_PUBLIC_DEFAULT_USER_ID;

    if ((!id || id === "undefined") && fallback && fallback !== "undefined") {
      localStorage.setItem(KEY, fallback);
      id = fallback;
    }
  }, []);

  return (
    <RoleProvider>
      <SidebarProvider className="min-h-dvh w-full">{children}</SidebarProvider>
    </RoleProvider>
  );
}