import { BankingLayout } from "@/components/layout/BankingLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar,
  DollarSign,
  Zap,
  Clock,
  Check,
  AlertCircle,
  Plus,
  Search,
  Filter,
  Building,
  Smartphone,
  Wifi,
  Car,
  Home
} from "lucide-react";
import { useState } from "react";

const billCategories = [
  { icon: Zap, name: "Electricity", color: "text-yellow-600" },
  { icon: Home, name: "Rent/Mortgage", color: "text-blue-600" },
  { icon: Smartphone, name: "Phone", color: "text-green-600" },
  { icon: Wifi, name: "Internet", color: "text-purple-600" },
  { icon: Car, name: "Insurance", color: "text-red-600" },
  { icon: Building, name: "Water/Gas", color: "text-cyan-600" }
];

const upcomingBills = [
  {
    id: "BILL001",
    name: "Electric Company",
    category: "Electricity",
    amount: 120.50,
    dueDate: "2024-01-20",
    status: "upcoming",
    isRecurring: true,
    autopay: false
  },
  {
    id: "BILL002", 
    name: "Property Management",
    category: "Rent/Mortgage",
    amount: 1850.00,
    dueDate: "2024-01-25",
    status: "upcoming",
    isRecurring: true,
    autopay: true
  },
  {
    id: "BILL003",
    name: "Verizon Wireless",
    category: "Phone",
    amount: 85.99,
    dueDate: "2024-01-22",
    status: "upcoming",
    isRecurring: true,
    autopay: true
  },
  {
    id: "BILL004",
    name: "Internet Provider",
    category: "Internet",
    amount: 79.99,
    dueDate: "2024-01-18",
    status: "overdue",
    isRecurring: true,
    autopay: false
  },
  {
    id: "BILL005",
    name: "Car Insurance",
    category: "Insurance",
    amount: 145.75,
    dueDate: "2024-01-28",
    status: "upcoming",
    isRecurring: true,
    autopay: true
  }
];

const recentPayments = [
  {
    id: "PAY001",
    name: "Electric Company",
    amount: 115.25,
    paidDate: "2023-12-20",
    status: "paid",
    method: "Auto-pay"
  },
  {
    id: "PAY002",
    name: "Netflix Subscription", 
    amount: 15.99,
    paidDate: "2023-12-15",
    status: "paid",
    method: "Credit Card"
  },
  {
    id: "PAY003",
    name: "Water Department",
    amount: 65.40,
    paidDate: "2023-12-10",
    status: "paid",
    method: "Bank Transfer"
  }
];

const BillPay = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [selectedBills, setSelectedBills] = useState<string[]>([]);

  const totalUpcoming = upcomingBills
    .filter(bill => bill.status === "upcoming")
    .reduce((sum, bill) => sum + bill.amount, 0);

  const overdueBills = upcomingBills.filter(bill => bill.status === "overdue");
  const autopayBills = upcomingBills.filter(bill => bill.autopay);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-success/10 text-success";
      case "upcoming": return "bg-primary/10 text-primary";
      case "overdue": return "bg-destructive/10 text-destructive";
      default: return "bg-muted/10 text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid": return <Check className="h-4 w-4" />;
      case "upcoming": return <Clock className="h-4 w-4" />;
      case "overdue": return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    const categoryData = billCategories.find(cat => cat.name === category);
    if (!categoryData) return Building;
    return categoryData.icon;
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <BankingLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Bill Pay</h1>
          <Button className="animated-gradient text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add New Bill
          </Button>
        </div>

        {/* Bill Pay Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass-card border-white/20">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold">${totalUpcoming.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">Upcoming Bills</p>
            </CardContent>
          </Card>
          <Card className="glass-card border-white/20">
            <CardContent className="p-6 text-center">
              <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-3" />
              <div className="text-2xl font-bold">{overdueBills.length}</div>
              <p className="text-sm text-muted-foreground">Overdue Bills</p>
            </CardContent>
          </Card>
          <Card className="glass-card border-white/20">
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 text-success mx-auto mb-3" />
              <div className="text-2xl font-bold">{autopayBills.length}</div>
              <p className="text-sm text-muted-foreground">Auto-pay Active</p>
            </CardContent>
          </Card>
          <Card className="glass-card border-white/20">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-warning mx-auto mb-3" />
              <div className="text-2xl font-bold">5</div>
              <p className="text-sm text-muted-foreground">Due This Week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bills Management */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="upcoming" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 glass-card">
                <TabsTrigger value="upcoming">Upcoming Bills</TabsTrigger>
                <TabsTrigger value="history">Payment History</TabsTrigger>
                <TabsTrigger value="recurring">Recurring Bills</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming">
                <Card className="glass-card border-white/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Upcoming Bills</CardTitle>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="glass-button">
                          <Filter className="mr-2 h-4 w-4" />
                          Filter
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="glass-button"
                          disabled={selectedBills.length === 0}
                        >
                          Pay Selected ({selectedBills.length})
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Search and Filter */}
                      <div className="flex gap-4">
                        <div className="flex-1 relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search bills..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 glass-card border-white/20"
                          />
                        </div>
                        <Select value={filterCategory} onValueChange={setFilterCategory}>
                          <SelectTrigger className="w-40 glass-card border-white/20">
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent className="glass-card">
                            <SelectItem value="all">All Categories</SelectItem>
                            {billCategories.map((category) => (
                              <SelectItem key={category.name} value={category.name}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Bills List */}
                      <div className="space-y-3">
                        {upcomingBills.map((bill) => {
                          const daysUntilDue = getDaysUntilDue(bill.dueDate);
                          const CategoryIcon = getCategoryIcon(bill.category);
                          
                          return (
                            <div
                              key={bill.id}
                              className="flex items-center justify-between p-4 rounded-xl border border-white/20 hover:bg-white/5 transition-colors"
                            >
                              <div className="flex items-center gap-4">
                                <input
                                  type="checkbox"
                                  checked={selectedBills.includes(bill.id)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedBills([...selectedBills, bill.id]);
                                    } else {
                                      setSelectedBills(selectedBills.filter(id => id !== bill.id));
                                    }
                                  }}
                                  className="rounded"
                                />
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                  <CategoryIcon className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <h3 className="font-semibold">{bill.name}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    {bill.category} • Due {new Date(bill.dueDate).toLocaleDateString()}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {daysUntilDue > 0 ? `${daysUntilDue} days left` : 
                                     daysUntilDue === 0 ? 'Due today' : 
                                     `${Math.abs(daysUntilDue)} days overdue`}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3">
                                <div className="text-right">
                                  <p className="font-semibold">${bill.amount.toFixed(2)}</p>
                                  <div className="flex items-center gap-2">
                                    <Badge className={getStatusColor(bill.status)}>
                                      {getStatusIcon(bill.status)}
                                      {bill.status}
                                    </Badge>
                                    {bill.autopay && (
                                      <Badge variant="outline" className="text-xs">
                                        Auto-pay
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="glass-button"
                                  disabled={bill.status === "overdue"}
                                >
                                  {bill.status === "overdue" ? "Overdue" : "Pay Now"}
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history">
                <Card className="glass-card border-white/20">
                  <CardHeader>
                    <CardTitle>Payment History</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentPayments.map((payment) => (
                      <div
                        key={payment.id}
                        className="flex items-center justify-between p-4 rounded-xl border border-white/20"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                            <Check className="h-4 w-4 text-success" />
                          </div>
                          <div>
                            <p className="font-medium">{payment.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Paid on {new Date(payment.paidDate).toLocaleDateString()} via {payment.method}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${payment.amount.toFixed(2)}</p>
                          <Badge className="bg-success/10 text-success">
                            <Check className="h-3 w-3 mr-1" />
                            Paid
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="recurring">
                <Card className="glass-card border-white/20">
                  <CardHeader>
                    <CardTitle>Recurring Bills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Recurring bills management interface coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Quick Actions & Calendar */}
          <div className="space-y-6">
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle>Bill Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">This Week</div>
                  {upcomingBills.slice(0, 3).map((bill) => {
                    const daysUntilDue = getDaysUntilDue(bill.dueDate);
                    return (
                      <div key={bill.id} className="flex items-center justify-between p-2 rounded-lg border border-white/10">
                        <div>
                          <p className="text-sm font-medium">{bill.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(bill.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold">${bill.amount}</p>
                          <p className="text-xs text-muted-foreground">
                            {daysUntilDue === 0 ? 'Today' : `${daysUntilDue}d`}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start glass-button">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Bill
                </Button>
                <Button variant="outline" className="w-full justify-start glass-button">
                  <Zap className="mr-2 h-4 w-4" />
                  Setup Auto-pay
                </Button>
                <Button variant="outline" className="w-full justify-start glass-button">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Payments
                </Button>
                <Button variant="outline" className="w-full justify-start glass-button">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Payment Reminders
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle>Bill Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {billCategories.map((category) => (
                  <div key={category.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <category.icon className={`h-5 w-5 ${category.color}`} />
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-card border-white/20 border-warning/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-warning">
                  <AlertCircle className="h-5 w-5" />
                  Overdue Alert
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  You have {overdueBills.length} overdue bill{overdueBills.length !== 1 ? 's' : ''} totaling ${overdueBills.reduce((sum, bill) => sum + bill.amount, 0).toFixed(2)}.
                </p>
                <Button variant="outline" className="w-full text-warning border-warning/20 hover:bg-warning/10">
                  Pay Overdue Bills
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BankingLayout>
  );
};

export default BillPay;