"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRole } from "@/contexts/role-context";

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const { role } = useRole();
  const router = useRouter();

  useEffect(() => {
    if (role && role !== "admin") router.replace("/");
  }, [role, router]);

  if (role === null) {
    return <div className="p-6 text-sm text-muted-foreground">Loading...</div>;
  }
  if (role !== "admin") return null;

  return <>{children}</>;
}
