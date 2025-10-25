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

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "History",
    url: "/history",
    icon: Inbox,
  },
  {
    title: "Switch to User",
    url: "",
    icon: RefreshCcw,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r bg-background">
      <SidebarContent className="flex flex-col justify-between h-full">
        <SidebarGroup className="flex gap-4">
          <SidebarGroupLabel className="text-4xl mb-5 mt-2 text-black">
            Admin
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex gap-4">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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
