import { BankingLayout } from "@/components/layout/BankingLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PiggyBank,
  Target,
  TrendingUp,
  Plus,
  Calendar,
  DollarSign,
  Plane,
  Home,
  Car,
  Shield
} from "lucide-react";
import { useState } from "react";

const savingsGoals = [
  {
    id: "1",
    name: "Emergency Fund",
    target: 10000,
    current: 8500,
    monthlyContribution: 500,
    icon: Shield,
    color: "from-green-500 to-emerald-600",
    deadline: "Dec 2024"
  },
  {
    id: "2",
    name: "Vacation to Europe",
    target: 5000,
    current: 2200,
    monthlyContribution: 300,
    icon: Plane,
    color: "from-blue-500 to-cyan-600",
    deadline: "Jun 2024"
  },
  {
    id: "3",
    name: "New Car",
    target: 15000,
    current: 3800,
    monthlyContribution: 400,
    icon: Car,
    color: "from-purple-500 to-indigo-600",
    deadline: "Dec 2025"
  },
  {
    id: "4",
    name: "House Down Payment",
    target: 50000,
    current: 12500,
    monthlyContribution: 1000,
    icon: Home,
    color: "from-orange-500 to-red-600",
    deadline: "Jan 2027"
  }
];

const savingsAccounts = [
  {
    name: "High Yield Savings",
    balance: 28750.00,
    apy: 4.5,
    type: "savings",
    features: ["No minimum balance", "FDIC insured", "Mobile banking"]
  },
  {
    name: "Certificate of Deposit",
    balance: 15000.00,
    apy: 5.2,
    type: "cd",
    features: ["12-month term", "Guaranteed rate", "Auto-renewal"]
  },
  {
    name: "Money Market",
    balance: 8500.00,
    apy: 3.8,
    type: "money_market",
    features: ["Check writing", "Debit card access", "Tiered rates"]
  }
];

const Savings = () => {
  const [newGoalName, setNewGoalName] = useState("");
  const [newGoalTarget, setNewGoalTarget] = useState("");
  const [newGoalContribution, setNewGoalContribution] = useState("");

  return (
    <BankingLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Savings & Goals</h1>
          <Button className="animated-gradient text-white">
            <Plus className="mr-2 h-4 w-4" />
            New Goal
          </Button>
        </div>

        {/* Savings Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass-card border-white/20">
            <CardContent className="p-6 text-center">
              <PiggyBank className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold">$52,250</div>
              <p className="text-sm text-muted-foreground">Total Savings</p>
            </CardContent>
          </Card>
          <Card className="glass-card border-white/20">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-success mx-auto mb-3" />
              <div className="text-2xl font-bold">4</div>
              <p className="text-sm text-muted-foreground">Active Goals</p>
            </CardContent>
          </Card>
          <Card className="glass-card border-white/20">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-warning mx-auto mb-3" />
              <div className="text-2xl font-bold">$2,200</div>
              <p className="text-sm text-muted-foreground">Monthly Savings</p>
            </CardContent>
          </Card>
          <Card className="glass-card border-white/20">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 text-accent mx-auto mb-3" />
              <div className="text-2xl font-bold">4.5%</div>
              <p className="text-sm text-muted-foreground">Avg. Interest</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Savings Goals */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Savings Goals</span>
                  <Button variant="outline" size="sm" className="glass-button">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Goal
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {savingsGoals.map((goal) => {
                  const progress = (goal.current / goal.target) * 100;
                  const monthsToGoal = Math.ceil((goal.target - goal.current) / goal.monthlyContribution);
                  
                  return (
                    <div key={goal.id} className="p-4 rounded-xl border border-white/20 hover:bg-white/5 transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${goal.color} flex items-center justify-center`}>
                            <goal.icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{goal.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Target: {goal.deadline}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="glass-button">
                          {progress.toFixed(0)}% Complete
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Current</p>
                          <p className="font-semibold">${goal.current.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Target</p>
                          <p className="font-semibold">${goal.target.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Monthly</p>
                          <p className="font-semibold">${goal.monthlyContribution}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Time Left</p>
                          <p className="font-semibold">{monthsToGoal} months</p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span>${goal.current.toLocaleString()}</span>
                          <span>${goal.target.toLocaleString()}</span>
                        </div>
                        <Progress value={progress} className="h-3" />
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="glass-button">
                          Add Money
                        </Button>
                        <Button variant="outline" size="sm" className="glass-button">
                          Edit Goal
                        </Button>
                        <Button variant="outline" size="sm" className="glass-button">
                          Auto-Save
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Create New Goal */}
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle>Create New Savings Goal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Goal Name</Label>
                    <Input
                      placeholder="e.g., Dream Vacation"
                      value={newGoalName}
                      onChange={(e) => setNewGoalName(e.target.value)}
                      className="glass-card border-white/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Target Amount</Label>
                    <Input
                      placeholder="$5,000"
                      value={newGoalTarget}
                      onChange={(e) => setNewGoalTarget(e.target.value)}
                      className="glass-card border-white/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Monthly Contribution</Label>
                    <Input
                      placeholder="$500"
                      value={newGoalContribution}
                      onChange={(e) => setNewGoalContribution(e.target.value)}
                      className="glass-card border-white/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Target Date</Label>
                    <Input
                      type="date"
                      className="glass-card border-white/20"
                    />
                  </div>
                </div>
                <Button className="w-full mt-4 animated-gradient text-white">
                  Create Savings Goal
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Savings Accounts */}
          <div className="space-y-6">
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle>Savings Accounts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {savingsAccounts.map((account, index) => (
                  <div key={index} className="p-4 rounded-xl border border-white/20 hover:bg-white/5 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{account.name}</h3>
                      <Badge className="bg-success/10 text-success">
                        {account.apy}% APY
                      </Badge>
                    </div>
                    
                    <div className="text-2xl font-bold mb-3">
                      ${account.balance.toLocaleString()}
                    </div>

                    <div className="space-y-2 mb-4">
                      {account.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <Button variant="outline" size="sm" className="w-full glass-button">
                      Manage Account
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Interest Earned */}
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle>Interest Earned</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">$2,347.50</div>
                    <p className="text-sm text-muted-foreground">This Year</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>High Yield Savings</span>
                      <span className="text-success">+$1,293.75</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Certificate of Deposit</span>
                      <span className="text-success">+$780.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Money Market</span>
                      <span className="text-success">+$323.00</span>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full glass-button">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Auto-Save Settings */}
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle>Auto-Save</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Round-up purchases</span>
                    <Badge className="bg-success/10 text-success">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Weekly transfer</span>
                    <Badge variant="outline">$200</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Goal contributions</span>
                    <Badge className="bg-success/10 text-success">Active</Badge>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full glass-button">
                    Manage Auto-Save
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

export default Savings;