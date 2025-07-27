import { useState } from "react";
import { 
  Bell, 
  Search, 
  Settings, 
  User, 
  Moon, 
  Sun,
  Menu,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function TopNavigation() {
  const [isDark, setIsDark] = useState(false);
  const [notifications] = useState(3);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="glass-nav h-16 px-6 flex items-center justify-between border-b border-white/10">
      {/* Left side - Mobile trigger and search */}
      <div className="flex items-center gap-4 flex-1">
        <SidebarTrigger className="md:hidden glass-button p-2">
          <Menu className="h-4 w-4" />
        </SidebarTrigger>
        
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions, cards..."
            className="pl-10 glass-card border-white/20 focus:border-primary/50"
          />
        </div>
      </div>

      {/* Right side - Actions and profile */}
      <div className="flex items-center gap-3">
        {/* Quick Actions */}
        <Button variant="ghost" size="icon" className="glass-button relative">
          <Globe className="h-4 w-4" />
        </Button>

        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme}
          className="glass-button"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="glass-button relative">
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {notifications}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 glass-card">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start p-4">
              <div className="font-medium">Payment Received</div>
              <div className="text-sm text-muted-foreground">
                $2,500 from John Smith
              </div>
              <div className="text-xs text-muted-foreground mt-1">2 minutes ago</div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start p-4">
              <div className="font-medium">Card Transaction</div>
              <div className="text-sm text-muted-foreground">
                $45.99 at Amazon.com
              </div>
              <div className="text-xs text-muted-foreground mt-1">1 hour ago</div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start p-4">
              <div className="font-medium">Loan Payment Due</div>
              <div className="text-sm text-muted-foreground">
                $1,200 due in 3 days
              </div>
              <div className="text-xs text-muted-foreground mt-1">Today</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="glass-button p-1">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  JD
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 glass-card">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}