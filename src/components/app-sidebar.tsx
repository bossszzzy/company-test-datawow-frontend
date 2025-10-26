"use client";

import { Home, Inbox, RefreshCcw } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { useRole } from "@/contexts/role-context";
import Link from "next/link";
import { useState } from "react";
import { getUserIdForRole } from "@/services/auth";
import { toast } from "sonner";

export function AppSidebar() {
  const { role, refreshRole } = useRole();
  const [switching, setSwitching] = useState(false)

  const items =
    role === "admin"
      ? [
        { title: "Home", url: "/", icon: Home },
        { title: "History", url: "/history", icon: Inbox },
      ]
      : [{ title: "Home", url: "/", icon: Home }];

  const handleSwitch = async () => {
    if (!role) return;
    setSwitching(true);
    const nextRole = role === "admin" ? "user" : "admin";
    console.log('nextId', nextRole)
    try {
      const nextId = await getUserIdForRole(nextRole);
      localStorage.setItem("userId", nextId);
      await refreshRole();
      toast.success(`Switched to ${nextRole}`);
    } catch (e) {
      toast.error("Switch failed");
      console.error(e);
    } finally {
      setSwitching(false);
    }
  };

  return (
    <Sidebar className="border-r bg-background">
      <SidebarContent className="flex flex-col justify-between h-full">
        <SidebarGroup className="flex gap-4">
          <SidebarGroupLabel className="text-4xl mb-5 mt-2 text-black">
            {role === "admin" ? "Admin" : "User"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex gap-4">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button onClick={handleSwitch} disabled={switching}>
                    <RefreshCcw className={switching ? "animation-spin" : undefined} />
                    <span>
                      {role === "admin" ? "Switch to User" : "Switch to Admin"}
                    </span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="mb-12 ml-4">
          <Button>Logout</Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
