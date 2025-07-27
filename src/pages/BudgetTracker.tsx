import { BankingLayout } from "@/components/layout/BankingLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar
} from "recharts";
import { 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Plus,
  Edit,
  AlertCircle,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { useState } from "react";

const budgetCategories = [
  { name: "Food & Dining", budgeted: 800, spent: 650, color: "#3b82f6" },
  { name: "Shopping", budgeted: 500, spent: 720, color: "#ef4444" },
  { name: "Transportation", budgeted: 300, spent: 280, color: "#22c55e" },
  { name: "Entertainment", budgeted: 200, spent: 180, color: "#a855f7" },
  { name: "Bills & Utilities", budgeted: 1200, spent: 1150, color: "#f59e0b" },
  { name: "Healthcare", budgeted: 400, spent: 320, color: "#06b6d4" },
];

const spendingTrends = [
  { month: "Jul", income: 5000, expenses: 3200, savings: 1800 },
  { month: "Aug", income: 5200, expenses: 3400, savings: 1800 },
  { month: "Sep", income: 5000, expenses: 3600, savings: 1400 },
  { month: "Oct", income: 5300, expenses: 3100, savings: 2200 },
  { month: "Nov", income: 5100, expenses: 3300, savings: 1800 },
  { month: "Dec", income: 5400, expenses: 3800, savings: 1600 },
  { month: "Jan", income: 5600, expenses: 3500, savings: 2100 }
];

const categorySpending = [
  { name: "Food", value: 650, percentage: 28 },
  { name: "Bills", value: 1150, percentage: 50 },
  { name: "Shopping", value: 720, percentage: 31 },
  { name: "Transport", value: 280, percentage: 12 },
];

const COLORS = ['#3b82f6', '#f59e0b', '#ef4444', '#22c55e'];

const financialGoals = [
  {
    name: "Emergency Fund",
    target: 10000,
    current: 7500,
    monthlyTarget: 500,
    deadline: "Dec 2024"
  },
  {
    name: "House Down Payment", 
    target: 50000,
    current: 15000,
    monthlyTarget: 1200,
    deadline: "Jun 2025"
  },
  {
    name: "Vacation Fund",
    target: 5000,
    current: 2800,
    monthlyTarget: 300,
    deadline: "Aug 2024"
  }
];

const BudgetTracker = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("current");
  const [newBudgetCategory, setNewBudgetCategory] = useState("");
  const [newBudgetAmount, setNewBudgetAmount] = useState("");

  const totalBudgeted = budgetCategories.reduce((sum, cat) => sum + cat.budgeted, 0);
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const remaining = totalBudgeted - totalSpent;

  const getSpendingStatus = (budgeted: number, spent: number) => {
    const percentage = (spent / budgeted) * 100;
    if (percentage >= 100) return "over";
    if (percentage >= 80) return "warning";
    return "good";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "over": return "text-destructive";
      case "warning": return "text-warning";
      default: return "text-success";
    }
  };

  return (
    <BankingLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Budget Tracker</h1>
          <div className="flex gap-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40 glass-card border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-card">
                <SelectItem value="current">This Month</SelectItem>
                <SelectItem value="last">Last Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button className="animated-gradient text-white">
              <Plus className="mr-2 h-4 w-4" />
              Add Budget
            </Button>
          </div>
        </div>

        {/* Budget Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass-card border-white/20">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold">${totalBudgeted.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">Total Budget</p>
            </CardContent>
          </Card>
          <Card className="glass-card border-white/20">
            <CardContent className="p-6 text-center">
              <TrendingDown className="h-8 w-8 text-destructive mx-auto mb-3" />
              <div className="text-2xl font-bold">${totalSpent.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">Total Spent</p>
            </CardContent>
          </Card>
          <Card className="glass-card border-white/20">
            <CardContent className="p-6 text-center">
              <TrendingUp className={`h-8 w-8 mx-auto mb-3 ${remaining >= 0 ? 'text-success' : 'text-destructive'}`} />
              <div className={`text-2xl font-bold ${remaining >= 0 ? 'text-success' : 'text-destructive'}`}>
                ${Math.abs(remaining).toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">
                {remaining >= 0 ? 'Remaining' : 'Over Budget'}
              </p>
            </CardContent>
          </Card>
          <Card className="glass-card border-white/20">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-warning mx-auto mb-3" />
              <div className="text-2xl font-bold">
                {((totalSpent / totalBudgeted) * 100).toFixed(0)}%
              </div>
              <p className="text-sm text-muted-foreground">Budget Used</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Budget Categories & Analytics */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="categories" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 glass-card">
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
                <TabsTrigger value="goals">Goals</TabsTrigger>
              </TabsList>

              <TabsContent value="categories">
                <Card className="glass-card border-white/20">
                  <CardHeader>
                    <CardTitle>Budget Categories</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {budgetCategories.map((category, index) => {
                      const percentage = (category.spent / category.budgeted) * 100;
                      const status = getSpendingStatus(category.budgeted, category.spent);
                      
                      return (
                        <div key={index} className="p-4 rounded-xl border border-white/20 hover:bg-white/5 transition-colors">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold">{category.name}</h3>
                            <div className="flex items-center gap-2">
                              <Badge className={
                                status === "over" ? "bg-destructive/10 text-destructive" :
                                status === "warning" ? "bg-warning/10 text-warning" :
                                "bg-success/10 text-success"
                              }>
                                {status === "over" ? "Over Budget" : 
                                 status === "warning" ? "Near Limit" : "On Track"}
                              </Badge>
                              <Button variant="outline" size="icon" className="h-6 w-6 glass-button">
                                <Edit className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                            <div>
                              <span className="text-muted-foreground">Budgeted: </span>
                              <span className="font-medium">${category.budgeted}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Spent: </span>
                              <span className={`font-medium ${getStatusColor(status)}`}>
                                ${category.spent}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Remaining: </span>
                              <span className={`font-medium ${getStatusColor(status)}`}>
                                ${category.budgeted - category.spent}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{percentage.toFixed(0)}% used</span>
                              <span>${category.budgeted - category.spent} left</span>
                            </div>
                            <Progress 
                              value={Math.min(percentage, 100)} 
                              className="h-2"
                              style={{ 
                                backgroundColor: status === "over" ? "rgb(239 68 68 / 0.2)" : undefined 
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="trends">
                <Card className="glass-card border-white/20">
                  <CardHeader>
                    <CardTitle>Spending Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 mb-6">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={spendingTrends}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                          <YAxis stroke="hsl(var(--muted-foreground))" />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: 'hsl(var(--card))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }}
                          />
                          <Area type="monotone" dataKey="income" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
                          <Area type="monotone" dataKey="expenses" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                          <Area type="monotone" dataKey="savings" stackId="3" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 rounded-xl bg-success/10 border border-success/20">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <ArrowUp className="h-4 w-4 text-success" />
                          <span className="font-medium text-success">Income Trend</span>
                        </div>
                        <p className="text-2xl font-bold text-success">+7.2%</p>
                        <p className="text-sm text-muted-foreground">vs last month</p>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <ArrowUp className="h-4 w-4 text-destructive" />
                          <span className="font-medium text-destructive">Expenses</span>
                        </div>
                        <p className="text-2xl font-bold text-destructive">+3.1%</p>
                        <p className="text-sm text-muted-foreground">vs last month</p>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-primary/10 border border-primary/20">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <ArrowUp className="h-4 w-4 text-primary" />
                          <span className="font-medium text-primary">Savings Rate</span>
                        </div>
                        <p className="text-2xl font-bold text-primary">37.5%</p>
                        <p className="text-sm text-muted-foreground">of income</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="goals">
                <Card className="glass-card border-white/20">
                  <CardHeader>
                    <CardTitle>Financial Goals</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {financialGoals.map((goal, index) => {
                      const progress = (goal.current / goal.target) * 100;
                      const monthsRemaining = Math.ceil((goal.target - goal.current) / goal.monthlyTarget);
                      
                      return (
                        <div key={index} className="p-4 rounded-xl border border-white/20 hover:bg-white/5 transition-colors">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold">{goal.name}</h3>
                            <Badge variant="outline">
                              Target: {goal.deadline}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                            <div>
                              <span className="text-muted-foreground">Current: </span>
                              <span className="font-medium">${goal.current.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Target: </span>
                              <span className="font-medium">${goal.target.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Monthly: </span>
                              <span className="font-medium">${goal.monthlyTarget}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Time Left: </span>
                              <span className="font-medium">{monthsRemaining} months</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{progress.toFixed(0)}% complete</span>
                              <span>${(goal.target - goal.current).toLocaleString()} remaining</span>
                            </div>
                            <Progress value={progress} className="h-3" />
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Spending Breakdown & Quick Actions */}
          <div className="space-y-6">
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle>Spending Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categorySpending}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categorySpending.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-2">
                  {categorySpending.map((category, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span>{category.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">${category.value}</span>
                        <span className="text-muted-foreground ml-2">({category.percentage}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle>Quick Budget Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start glass-button">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Category
                </Button>
                <Button variant="outline" className="w-full justify-start glass-button">
                  <Target className="mr-2 h-4 w-4" />
                  Set Budget Goal
                </Button>
                <Button variant="outline" className="w-full justify-start glass-button">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Set Spending Alerts
                </Button>
                <Button variant="outline" className="w-full justify-start glass-button">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  View Reports
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle>Add Budget Category</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Category Name</Label>
                  <Input
                    placeholder="e.g., Gym Membership"
                    value={newBudgetCategory}
                    onChange={(e) => setNewBudgetCategory(e.target.value)}
                    className="glass-card border-white/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Monthly Budget</Label>
                  <Input
                    placeholder="$100"
                    value={newBudgetAmount}
                    onChange={(e) => setNewBudgetAmount(e.target.value)}
                    className="glass-card border-white/20"
                  />
                </div>
                <Button className="w-full animated-gradient text-white">
                  Add Category
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BankingLayout>
  );
};

export default BudgetTracker;