"use client";

import { useRole } from "@/contexts/role-context";
import UserComponent from "./user/userComponent";
import AdminComponent from "./admin/adminComponent";

export default function RoleChange() {
  const { role } = useRole();
  return <div>{role === "user" ? <UserComponent /> : <AdminComponent />}</div>;
}
