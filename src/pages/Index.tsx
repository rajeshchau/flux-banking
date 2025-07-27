import { BankingLayout } from "@/components/layout/BankingLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Wallet, 
  TrendingUp, 
  CreditCard, 
  PiggyBank,
  Eye,
  EyeOff,
  Plus
} from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/banking-hero.jpg";

const Index = () => {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <BankingLayout>
      <div className="p-6 space-y-6">
        {/* Hero Section */}
        <div 
          className="relative h-48 rounded-2xl overflow-hidden glass-card border-white/20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
            <p className="text-lg opacity-90">Manage your finances with confidence</p>
          </div>
        </div>

        {/* Account Balance Section */}
        <Card className="glass-card border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Total Balance</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBalance(!showBalance)}
                className="glass-button"
              >
                {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-bold">
                {showBalance ? "$47,582.50" : "••••••••"}
              </span>
              <span className="text-success text-sm font-medium">+12.5%</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Available across all accounts
            </p>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Checking Account"
            value="$12,450.80"
            subtitle="Account •••• 4521"
            icon={Wallet}
            trend={{ value: "2.3%", isPositive: true }}
          />
          <StatsCard
            title="Savings Account"
            value="$28,750.00"
            subtitle="High Yield Savings"
            icon={PiggyBank}
            trend={{ value: "4.5%", isPositive: true }}
          />
          <StatsCard
            title="Credit Cards"
            value="$6,381.70"
            subtitle="Available Credit"
            icon={CreditCard}
            trend={{ value: "1.2%", isPositive: false }}
          />
          <StatsCard
            title="Investments"
            value="$15,420.40"
            subtitle="Portfolio Value"
            icon={TrendingUp}
            trend={{ value: "8.7%", isPositive: true }}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <SpendingChart />
            <RecentTransactions />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <QuickActions />
            
            {/* Savings Goals */}
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Savings Goals</span>
                  <Button size="sm" variant="ghost" className="glass-button">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Goal
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Emergency Fund</span>
                    <span className="text-sm text-muted-foreground">$8,500 / $10,000</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Vacation</span>
                    <span className="text-sm text-muted-foreground">$2,200 / $5,000</span>
                  </div>
                  <Progress value={44} className="h-2" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">New Car</span>
                    <span className="text-sm text-muted-foreground">$3,800 / $15,000</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Credit Score */}
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle>Credit Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-success mb-2">742</div>
                  <div className="text-sm text-muted-foreground mb-4">Excellent</div>
                  <Progress value={74} className="h-2 mb-4" />
                  <Button variant="outline" size="sm" className="glass-button">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BankingLayout>
  );
};

export default Index;
