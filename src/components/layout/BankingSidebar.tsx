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
  LogOut,
  BarChart3,
  Calculator,
  TrendingUp,
  Users,
  Shield,
  AlertTriangle,
  Building,
  FileText
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
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

// Regular user navigation
const userNavigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Transfer", url: "/transfer", icon: ArrowLeftRight },
  { title: "Transactions", url: "/transactions", icon: Receipt },
  { title: "Cards", url: "/cards", icon: CreditCard },
  { title: "Budget Tracker", url: "/budget", icon: BarChart3 },
  { title: "Bill Pay", url: "/bills", icon: Calculator },
  { title: "Loans", url: "/loans", icon: PiggyBank },
  { title: "Savings & Goals", url: "/savings", icon: Goal },
  { title: "Investments", url: "/investments", icon: TrendingUp },
  { title: "Support", url: "/support", icon: MessageCircle },
];

// Admin navigation
const adminNavigationItems = [
  { title: "Admin Dashboard", url: "/admin", icon: Shield },
  { title: "User Management", url: "/admin/users", icon: Users },
  { title: "Fraud Detection", url: "/admin/fraud", icon: AlertTriangle },
  { title: "System Monitor", url: "/admin/system", icon: Building },
  { title: "Reports", url: "/admin/reports", icon: FileText },
  { title: "User Dashboard", url: "/", icon: Home },
];

const bottomItems = [
  { title: "Profile", url: "/profile", icon: User },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function BankingSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { user, logout } = useAuth();
  const isCollapsed = state === "collapsed";

  // Determine navigation items based on user role
  const navigationItems = user?.isAdmin ? adminNavigationItems : userNavigationItems;

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
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
                : "hover:bg-accent text-sidebar-foreground hover:text-sidebar-foreground"
            }`
          }
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <item.icon className={`${isCollapsed ? "h-5 w-5" : "h-4 w-4"} flex-shrink-0`} />
          </motion.div>
          {!isCollapsed && <span className="font-medium">{item.title}</span>}
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  return (
    <Sidebar className={`border-r bg-sidebar ${isCollapsed ? "w-20" : "w-64"}`}>
      <SidebarContent className="flex flex-col h-full p-4">
        {/* Logo/Brand */}
        <div className="flex items-center gap-3 mb-8 px-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Wallet className="h-5 w-5 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="font-bold text-lg text-sidebar-foreground">FluxBank</h1>
              <p className="text-xs text-sidebar-foreground/60">Secure Banking</p>
            </div>
          )}
        </div>

        {/* User Profile */}
        <motion.div 
          className="bg-sidebar-accent border border-sidebar-border rounded-lg p-3 mb-6"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-sidebar-foreground truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-sidebar-foreground/70 truncate">
                    {user?.accountType} Account
                  </p>
                  {user?.isAdmin && (
                    <Badge variant="secondary" className="text-xs bg-red-500/10 text-red-600">
                      Admin
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Main Navigation */}
        <SidebarGroup className="flex-1">
          <SidebarGroupLabel className={`${isCollapsed ? "sr-only" : ""} text-sidebar-foreground/70 mb-2`}>
            {user?.isAdmin ? "Admin Panel" : "Banking Services"}
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
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/profile"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : "hover:bg-accent text-sidebar-foreground hover:text-sidebar-foreground"
                      }`
                    }
                  >
                    <User className={`${isCollapsed ? "h-5 w-5" : "h-4 w-4"} flex-shrink-0`} />
                    {!isCollapsed && <span className="font-medium">Profile</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/settings"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-lg font-medium"
                                                   : "hover:bg-accent text-sidebar-foreground hover:text-sidebar-foreground"
                      }`
                    }
                  >
                    <Settings className={`${isCollapsed ? "h-5 w-5" : "h-4 w-4"} flex-shrink-0`} />
                    {!isCollapsed && <span className="font-medium">Settings</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <motion.button 
                    onClick={handleLogout}
                     className="flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 hover:bg-destructive/10 text-destructive hover:text-destructive w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <LogOut className={`${isCollapsed ? "h-5 w-5" : "h-4 w-4"} flex-shrink-0`} />
                    {!isCollapsed && <span className="font-medium">Logout</span>}
                  </motion.button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Collapse Toggle */}
       <div className="mt-4 pt-4 border-t border-sidebar-border">
          <SidebarTrigger className="w-full hover:bg-sidebar-accent p-2 rounded-lg">
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
