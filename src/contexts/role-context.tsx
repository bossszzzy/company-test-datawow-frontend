"use client";

import { Role } from "@/types/types";
import * as React from "react";
import { RoleContextType } from "@/types/types";

const RoleContext = React.createContext<RoleContextType | null>(null);

const STORAGE_KEY = "app_role";

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = React.useState<Role>("admin");

  React.useEffect(() => {
    const saved = (typeof window !== "undefined" &&
      localStorage.getItem(STORAGE_KEY)) as Role | null;
    if (saved === "admin" || saved === "user") setRole(saved);
  }, []);

  const toggleRole = React.useCallback(() => {
    setRole((prev) => {
      const next = prev === "admin" ? "user" : "admin";
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const value = React.useMemo(
    () => ({ role, toggleRole, setRole }),
    [role, toggleRole]
  );

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const ctx = React.useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within <RoleProvider>");
  return ctx;
}
