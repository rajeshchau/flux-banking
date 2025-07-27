import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { BankingSidebar } from "@/components/layout/BankingSidebar";
import { TopNavigation } from "@/components/layout/TopNavigation";

interface BankingLayoutProps {
  children: React.ReactNode;
}

export function BankingLayout({ children }: BankingLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <BankingSidebar />
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <TopNavigation />
          
          <main className="flex-1 overflow-y-auto custom-scrollbar">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}