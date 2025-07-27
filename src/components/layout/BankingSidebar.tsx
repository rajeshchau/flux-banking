import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  ArrowLeftRight,
  Receipt,
  CreditCard,
  PiggyBank,
  Goal,
  MessageCircle,
  User,
  ChevronRight,
  Wallet,
  Settings,
  LogOut
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Transfer", url: "/transfer", icon: ArrowLeftRight },
  { title: "Transactions", url: "/transactions", icon: Receipt },
  { title: "Cards", url: "/cards", icon: CreditCard },
  { title: "Loans", url: "/loans", icon: PiggyBank },
  { title: "Savings & Goals", url: "/savings", icon: Goal },
  { title: "Support", url: "/support", icon: MessageCircle },
];

const bottomItems = [
  { title: "Profile", url: "/profile", icon: User },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function BankingSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const NavItem = ({ item, className = "" }: { item: any; className?: string }) => (
    <SidebarMenuItem>
      <SidebarMenuButton asChild className={className}>
        <NavLink
          to={item.url}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 ${
              isActive
                ? "bg-primary text-primary-foreground shadow-lg"
                : "hover:bg-white/10 text-foreground/80 hover:text-foreground"
            }`
          }
        >
          <item.icon className={`${isCollapsed ? "h-5 w-5" : "h-4 w-4"} flex-shrink-0`} />
          {!isCollapsed && <span className="font-medium">{item.title}</span>}
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  return (
    <Sidebar className={`glass-nav border-r border-white/10 ${isCollapsed ? "w-20" : "w-64"}`}>
      <SidebarContent className="flex flex-col h-full p-4">
        {/* Logo/Brand */}
        <div className="flex items-center gap-3 mb-8 px-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Wallet className="h-5 w-5 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="font-bold text-lg text-foreground">FluxBank</h1>
              <p className="text-xs text-muted-foreground">Secure Banking</p>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="glass-card p-3 mb-6">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-primary text-primary-foreground">
                JD
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground truncate">
                  John Doe
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  Premium Account
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup className="flex-1">
          <SidebarGroupLabel className={`${isCollapsed ? "sr-only" : ""} text-muted-foreground mb-2`}>
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <NavItem key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {bottomItems.map((item) => (
                <NavItem key={item.title} item={item} />
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button className="flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 hover:bg-red-500/10 text-red-500 hover:text-red-600 w-full">
                    <LogOut className={`${isCollapsed ? "h-5 w-5" : "h-4 w-4"} flex-shrink-0`} />
                    {!isCollapsed && <span className="font-medium">Logout</span>}
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Collapse Toggle */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <SidebarTrigger className="w-full glass-button p-2">
            <ChevronRight 
              className={`h-4 w-4 transition-transform duration-300 ${
                isCollapsed ? "" : "rotate-180"
              }`} 
            />
          </SidebarTrigger>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}