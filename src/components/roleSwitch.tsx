"use client";

import { useRole } from "@/contexts/role-context";
import AdminComponent from "@/components/admin/adminComponent";
import UserComponent from "@/components/user/userComponent";

export default function RoleSwitch() {
  const { role } = useRole();

  return role === "user" ? <UserComponent /> : <AdminComponent />;
}
