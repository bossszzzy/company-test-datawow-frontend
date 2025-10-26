"use client";

import { Role } from "@/types/types";
import { RoleContextType } from "@/types/types";
import { fetchMe } from "@/services/auth";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const RoleContext = createContext<RoleContextType | null>(null);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>("admin");

  const refreshRole = useCallback(async () => {
    try {
      const me = await fetchMe();
      setRole(me.role);
    } catch {
      setRole('user');
    }
  }, []);

  useEffect(() => {
    refreshRole()
  }, [refreshRole])

  const value = useMemo(
    () => ({ role, refreshRole }),
    [role, refreshRole]
  );

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within <RoleProvider>");
  return ctx;
}
