"use client";

import { useRole } from "@/contexts/role-context";
import UserComponent from "./user/userComponent";
import AdminComponent from "./admin/adminComponent";

export default function RoleChange() {
  const { role } = useRole();

    if (role === null) {
    return <div className="p-6 text-sm text-muted-foreground">Loading role...</div>;
  }

  return <div>{role === "user" ? <UserComponent /> : <AdminComponent />}</div>;
}
