import { BankingLayout } from "@/components/layout/BankingLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Spotlight } from "@/components/ui/spotlight";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { 
  Wallet, 
  TrendingUp, 
  CreditCard, 
  PiggyBank,
  Eye,
  EyeOff,
  Plus,
  Users,
  Shield,
  AlertTriangle,
  Building,
  DollarSign,
  Activity
} from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/banking-hero.jpg";

const Index = () => {
  const [showBalance, setShowBalance] = useState(true);
  const { user } = useAuth();

  // If user is admin, show admin dashboard
  if (user?.isAdmin) {
    return <AdminOverview />;
  }

  // Regular user dashboard
  return <UserDashboard showBalance={showBalance} setShowBalance={setShowBalance} />;
};

// Admin Overview Component
const AdminOverview = () => {
  const adminStats = [
    { title: "Total Users", value: "12,847", change: "+234", isPositive: true, icon: Users },
    { title: "Total Deposits", value: "$45.2M", change: "+8.2%", isPositive: true, icon: DollarSign },
    { title: "Active Loans", value: "3,421", change: "-12", isPositive: false, icon: Building },
    { title: "System Health", value: "99.8%", change: "+0.1%", isPositive: true, icon: Shield },
  ];

  return (
    <BankingLayout>
      <div className="p-6 space-y-6 relative overflow-hidden">
        <Spotlight className="top-40 left-0 md:left-60 md:-top-20" fill="white" />
        
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <TextGenerateEffect 
              words="Admin Control Center" 
              className="text-3xl font-bold"
            />
            <p className="text-muted-foreground mt-2">Monitor and manage your banking operations</p>
          </div>
          <Button className="animated-gradient text-white">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Security Alert
          </Button>
        </motion.div>

        {/* Admin Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {adminStats.map((stat, index) => (
            <BackgroundGradient key={index} className="rounded-[22px] p-1">
              <StatsCard
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                trend={{ value: stat.change, isPositive: stat.isPositive }}
                className="bg-background/80 backdrop-blur-sm border-0"
              />
            </BackgroundGradient>
          ))}
        </motion.div>

        {/* Admin Bento Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
            <BentoGridItem
              title="User Management"
              description="Monitor user activities, KYC status, and account verifications"
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
                  <div className="flex items-center justify-center w-full h-full">
                    <Users className="h-12 w-12 text-primary opacity-80" />
                  </div>
                </div>
              }
              className="md:col-span-2"
              icon={<Users className="h-4 w-4 text-primary" />}
            />
            <BentoGridItem
              title="Security Monitor"
              description="Real-time fraud detection and security alerts"
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-red-200 dark:from-red-900 dark:to-red-800 to-red-100 relative">
                  <div className="flex items-center justify-center w-full h-full">
                    <Shield className="h-12 w-12 text-red-500 opacity-80" />
                  </div>
                </div>
              }
              className="md:col-span-1"
              icon={<Shield className="h-4 w-4 text-red-500" />}
            />
            <BentoGridItem
              title="System Analytics"
              description="Performance metrics and system health monitoring"
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-blue-200 dark:from-blue-900 dark:to-blue-800 to-blue-100 relative">
                  <div className="flex items-center justify-center w-full h-full">
                    <Activity className="h-12 w-12 text-blue-500 opacity-80" />
                  </div>
                </div>
              }
              className="md:col-span-1"
              icon={<Activity className="h-4 w-4 text-blue-500" />}
            />
          </BentoGrid>
        </motion.div>
      </div>
    </BankingLayout>
  );
};

// User Dashboard Component  
const UserDashboard = ({ showBalance, setShowBalance }: { showBalance: boolean; setShowBalance: (show: boolean) => void }) => {

  return (
    <BankingLayout>
      <div className="p-6 space-y-6 relative overflow-hidden">
        <Spotlight className="top-40 left-0 md:left-60 md:-top-20" fill="white" />
        
        {/* Hero Section */}
        <motion.div 
          className="relative h-48 rounded-2xl overflow-hidden glass-card border-white/20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 p-8 text-white">
            <TextGenerateEffect 
              words="Welcome back, John!" 
              className="text-3xl font-bold mb-2 text-white"
            />
            <p className="text-lg opacity-90">Manage your finances with confidence</p>
          </div>
        </motion.div>

        {/* Account Balance Section */}
        <BackgroundGradient className="rounded-[22px] p-1">
          <Card className="glass-card border-0 bg-background/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Total Balance</h2>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowBalance(!showBalance)}
                    className="glass-button"
                  >
                    {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </motion.div>
              </div>
              <motion.div 
                className="flex items-baseline gap-2 mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="text-4xl font-bold">
                  {showBalance ? "$47,582.50" : "••••••••"}
                </span>
                <span className="text-success text-sm font-medium">+12.5%</span>
              </motion.div>
              <p className="text-sm text-muted-foreground">
                Available across all accounts
              </p>
            </CardContent>
          </Card>
        </BackgroundGradient>

        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <BackgroundGradient className="rounded-[22px] p-1">
            <StatsCard
              title="Checking Account"
              value="$12,450.80"
              subtitle="Account •••• 4521"
              icon={Wallet}
              trend={{ value: "2.3%", isPositive: true }}
              className="bg-background/80 backdrop-blur-sm border-0"
            />
          </BackgroundGradient>
          <BackgroundGradient className="rounded-[22px] p-1">
            <StatsCard
              title="Savings Account"
              value="$28,750.00"
              subtitle="High Yield Savings"
              icon={PiggyBank}
              trend={{ value: "4.5%", isPositive: true }}
              className="bg-background/80 backdrop-blur-sm border-0"
            />
          </BackgroundGradient>
          <BackgroundGradient className="rounded-[22px] p-1">
            <StatsCard
              title="Credit Cards"
              value="$6,381.70"
              subtitle="Available Credit"
              icon={CreditCard}
              trend={{ value: "1.2%", isPositive: false }}
              className="bg-background/80 backdrop-blur-sm border-0"
            />
          </BackgroundGradient>
          <BackgroundGradient className="rounded-[22px] p-1">
            <StatsCard
              title="Investments"
              value="$15,420.40"
              subtitle="Portfolio Value"
              icon={TrendingUp}
              trend={{ value: "8.7%", isPositive: true }}
              className="bg-background/80 backdrop-blur-sm border-0"
            />
          </BackgroundGradient>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <BackgroundGradient className="rounded-[22px] p-1">
              <div className="bg-background/80 backdrop-blur-sm rounded-[20px]">
                <SpendingChart />
              </div>
            </BackgroundGradient>
            <BackgroundGradient className="rounded-[22px] p-1">
              <div className="bg-background/80 backdrop-blur-sm rounded-[20px]">
                <RecentTransactions />
              </div>
            </BackgroundGradient>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <BackgroundGradient className="rounded-[22px] p-1">
              <div className="bg-background/80 backdrop-blur-sm rounded-[20px]">
                <QuickActions />
              </div>
            </BackgroundGradient>
            
            {/* Savings Goals */}
            <BackgroundGradient className="rounded-[22px] p-1">
              <Card className="glass-card border-0 bg-background/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Savings Goals</span>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Button size="sm" variant="ghost" className="glass-button">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Goal
                      </Button>
                    </motion.div>
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
            </BackgroundGradient>

            {/* Credit Score */}
            <BackgroundGradient className="rounded-[22px] p-1">
              <Card className="glass-card border-0 bg-background/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Credit Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <motion.div 
                      className="text-3xl font-bold text-success mb-2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      742
                    </motion.div>
                    <div className="text-sm text-muted-foreground mb-4">Excellent</div>
                    <Progress value={74} className="h-2 mb-4" />
                    <Button variant="outline" size="sm" className="glass-button">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </BackgroundGradient>
          </div>
        </motion.div>
      </div>
    </BankingLayout>
  );
};

export default Index;
