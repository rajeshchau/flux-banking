import { BankingLayout } from "@/components/layout/BankingLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users,
  CreditCard,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Ban,
  Eye,
  Edit,
  Trash2
} from "lucide-react";
import { useState } from "react";

const dashboardStats = [
  {
    title: "Total Users",
    value: "12,847",
    change: "+234",
    changeType: "positive" as const,
    icon: Users
  },
  {
    title: "Total Deposits",
    value: "$45.2M",
    change: "+8.2%",
    changeType: "positive" as const,
    icon: DollarSign
  },
  {
    title: "Active Loans",
    value: "3,421",
    change: "-12",
    changeType: "negative" as const,
    icon: FileText
  },
  {
    title: "Revenue",
    value: "$2.1M",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: TrendingUp
  }
];

const recentUsers = [
  {
    id: "USR001",
    name: "Alice Johnson",
    email: "alice@email.com",
    status: "active",
    kycStatus: "verified",
    accountType: "premium",
    balance: 45620.50,
    joinDate: "2024-01-15"
  },
  {
    id: "USR002",
    name: "Bob Smith",
    email: "bob@email.com", 
    status: "suspended",
    kycStatus: "pending",
    accountType: "basic",
    balance: 1250.75,
    joinDate: "2024-01-14"
  },
  {
    id: "USR003",
    name: "Carol Davis",
    email: "carol@email.com",
    status: "active",
    kycStatus: "rejected",
    accountType: "business",
    balance: 78945.20,
    joinDate: "2024-01-13"
  }
];

const fraudAlerts = [
  {
    id: "FRD001",
    userId: "USR045",
    userName: "John Suspicious",
    type: "Multiple failed login attempts",
    severity: "high",
    amount: null,
    timestamp: "2024-01-16 14:30:00"
  },
  {
    id: "FRD002", 
    userId: "USR123",
    userName: "Jane Doe",
    type: "Large international transfer",
    severity: "medium",
    amount: 50000,
    timestamp: "2024-01-16 13:15:00"
  },
  {
    id: "FRD003",
    userId: "USR089",
    userName: "Mike Wilson",
    type: "Unusual spending pattern",
    severity: "low",
    amount: 15000,
    timestamp: "2024-01-16 11:45:00"
  }
];

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("overview");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success/10 text-success";
      case "suspended": return "bg-destructive/10 text-destructive";
      case "pending": return "bg-warning/10 text-warning";
      default: return "bg-muted/10 text-muted-foreground";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-destructive/10 text-destructive";
      case "medium": return "bg-warning/10 text-warning";
      case "low": return "bg-blue-500/10 text-blue-600";
      default: return "bg-muted/10 text-muted-foreground";
    }
  };

  return (
    <BankingLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-2">
            <Button variant="outline" className="glass-button">
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
            <Button className="animated-gradient text-white">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Security Alert
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardStats.map((stat, index) => (
            <Card key={index} className="glass-card border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-2xl font-bold">
                        {stat.value}
                      </h3>
                      <span className={`text-sm font-medium ${
                        stat.changeType === 'positive' ? 'text-success' : 'text-destructive'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Admin Functions */}
          <div className="lg:col-span-2">
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 glass-card">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="loans">Loans</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <Card className="glass-card border-white/20">
                  <CardHeader>
                    <CardTitle>System Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* System Health */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-success/10 border border-success/20">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span className="font-medium text-success">API Status</span>
                        </div>
                        <p className="text-sm text-muted-foreground">All systems operational</p>
                      </div>
                      <div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-warning" />
                          <span className="font-medium text-warning">Maintenance</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Scheduled: Tonight 2AM</p>
                      </div>
                      <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-blue-600" />
                          <span className="font-medium text-blue-600">Performance</span>
                        </div>
                        <p className="text-sm text-muted-foreground">99.8% uptime this month</p>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div>
                      <h3 className="font-semibold mb-4">Recent Admin Activity</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-xl border border-white/20">
                          <div>
                            <p className="font-medium text-sm">User KYC approved</p>
                            <p className="text-xs text-muted-foreground">Alice Johnson • 2 hours ago</p>
                          </div>
                          <Badge className="bg-success/10 text-success">Approved</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl border border-white/20">
                          <div>
                            <p className="font-medium text-sm">Loan application reviewed</p>
                            <p className="text-xs text-muted-foreground">Bob Smith • 4 hours ago</p>
                          </div>
                          <Badge className="bg-warning/10 text-warning">Pending</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl border border-white/20">
                          <div>
                            <p className="font-medium text-sm">Fraud alert investigated</p>
                            <p className="text-xs text-muted-foreground">System Alert • 6 hours ago</p>
                          </div>
                          <Badge className="bg-destructive/10 text-destructive">Resolved</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="users">
                <Card className="glass-card border-white/20">
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentUsers.map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-4 rounded-xl border border-white/20 hover:bg-white/5 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Users className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                              <p className="text-xs text-muted-foreground">
                                Balance: ${user.balance.toLocaleString()} • Joined: {new Date(user.joinDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <Badge className={getStatusColor(user.status)}>
                                {user.status}
                              </Badge>
                              <div className="flex gap-1 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {user.accountType}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {user.kycStatus}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <Button variant="outline" size="icon" className="h-8 w-8 glass-button">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="icon" className="h-8 w-8 glass-button">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="icon" className="h-8 w-8 glass-button">
                                <Ban className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="transactions">
                <Card className="glass-card border-white/20">
                  <CardHeader>
                    <CardTitle>Transaction Monitoring</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Transaction monitoring interface coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="loans">
                <Card className="glass-card border-white/20">
                  <CardHeader>
                    <CardTitle>Loan Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Loan management interface coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Fraud Alerts & Quick Actions */}
          <div className="space-y-6">
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Fraud Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {fraudAlerts.map((alert) => (
                  <div key={alert.id} className="p-3 rounded-xl border border-white/20 hover:bg-white/5 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm">{alert.type}</p>
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      User: {alert.userName}
                    </p>
                    {alert.amount && (
                      <p className="text-sm text-muted-foreground mb-1">
                        Amount: ${alert.amount.toLocaleString()}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {new Date(alert.timestamp).toLocaleString()}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm" className="flex-1 glass-button">
                        Investigate
                      </Button>
                      <Button variant="outline" size="sm" className="glass-button">
                        Dismiss
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start glass-button">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Button>
                <Button variant="outline" className="w-full justify-start glass-button">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Card Controls
                </Button>
                <Button variant="outline" className="w-full justify-start glass-button">
                  <FileText className="mr-2 h-4 w-4" />
                  Review Loans
                </Button>
                <Button variant="outline" className="w-full justify-start glass-button">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Security Center
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BankingLayout>
  );
};

export default AdminDashboard;