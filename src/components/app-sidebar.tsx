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

export function AppSidebar() {
  const { role, toggleRole } = useRole();

  const items =
    role === "admin"
      ? [
          { title: "Home", url: "/", icon: Home },
          { title: "History", url: "/history", icon: Inbox },
        ]
      : [{ title: "Home", url: "/", icon: Home }];

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
                  <button onClick={toggleRole}>
                    <RefreshCcw />
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
