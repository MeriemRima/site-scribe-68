import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Layout,
  FileText,
  Image,
  Settings,
  ChevronLeft,
  PlusCircle,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const navigationItems = [
  {
    title: "Templates",
    url: "/",
    icon: Layout,
    description: "Browse WordPress templates",
  },
  {
    title: "Pages",
    url: "/pages",
    icon: FileText,
    description: "Manage your pages",
  },
  {
    title: "Media",
    url: "/media",
    icon: Image,
    description: "Upload and manage media",
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    description: "Configure your site",
  },
];

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const getNavClassName = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-primary text-primary-foreground font-medium shadow-sm"
      : "hover:bg-sidebar-accent text-sidebar-foreground";

  return (
    <Sidebar
      className="transition-all duration-300"
      collapsible="icon"
    >
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold text-sidebar-foreground">
                WP Builder
              </h2>
              <p className="text-sm text-muted-foreground">
                Create beautiful sites
              </p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="h-8 w-8 p-0 hover:bg-sidebar-accent"
          >
            <ChevronLeft
              className={`h-4 w-4 transition-transform ${
                isCollapsed ? "rotate-180" : ""
              }`}
            />
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        {!isCollapsed && (
          <div className="mb-4 px-2">
            <Button className="w-full justify-start gap-2" size="sm">
              <PlusCircle className="h-4 w-4" />
              New Project
            </Button>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="transition-colors duration-200"
                  >
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={getNavClassName}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!isCollapsed && (
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{item.title}</span>
                          <span className="text-xs text-muted-foreground">
                            {item.description}
                          </span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}