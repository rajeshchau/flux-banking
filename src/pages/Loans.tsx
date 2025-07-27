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
  Home,
  Car,
  GraduationCap,
  Building2,
  Calculator,
  FileText,
  CheckCircle,
  Clock,
  DollarSign
} from "lucide-react";
import { useState } from "react";

const loanTypes = [
  {
    type: "Personal",
    icon: DollarSign,
    minAmount: 1000,
    maxAmount: 50000,
    minRate: 8.5,
    maxRate: 15.9,
    term: "12-84 months",
    description: "Flexible personal loans for any purpose"
  },
  {
    type: "Home",
    icon: Home,
    minAmount: 50000,
    maxAmount: 1000000,
    minRate: 3.2,
    maxRate: 6.8,
    term: "15-30 years",
    description: "Competitive rates for home purchases"
  },
  {
    type: "Auto",
    icon: Car,
    minAmount: 5000,
    maxAmount: 100000,
    minRate: 4.1,
    maxRate: 8.9,
    term: "12-84 months",
    description: "New and used vehicle financing"
  },
  {
    type: "Student",
    icon: GraduationCap,
    minAmount: 1000,
    maxAmount: 200000,
    minRate: 3.5,
    maxRate: 7.2,
    term: "5-20 years",
    description: "Education financing options"
  }
];

const currentLoans = [
  {
    id: "LOAN001",
    type: "Personal Loan",
    amount: 25000,
    balance: 18750,
    rate: 9.5,
    nextPayment: 425.50,
    dueDate: "Feb 15, 2024",
    status: "current"
  },
  {
    id: "LOAN002", 
    type: "Auto Loan",
    amount: 35000,
    balance: 28200,
    rate: 5.8,
    nextPayment: 589.75,
    dueDate: "Feb 20, 2024",
    status: "current"
  }
];

const Loans = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [selectedLoanType, setSelectedLoanType] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  const calculatePayment = () => {
    if (!loanAmount || !loanTerm || !selectedLoanType) return;
    
    const principal = parseFloat(loanAmount);
    const months = parseInt(loanTerm);
    const loanType = loanTypes.find(l => l.type === selectedLoanType);
    const rate = loanType ? loanType.minRate / 100 / 12 : 0.08 / 12;
    
    const payment = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    setMonthlyPayment(payment);
  };

  return (
    <BankingLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Loan Services</h1>
          <Button className="animated-gradient text-white">
            Apply for Loan
          </Button>
        </div>

        {/* Loan Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-card border-white/20">
            <CardContent className="p-6 text-center">
              <Building2 className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold">2</div>
              <p className="text-sm text-muted-foreground">Active Loans</p>
            </CardContent>
          </Card>
          <Card className="glass-card border-white/20">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 text-warning mx-auto mb-3" />
              <div className="text-2xl font-bold">$46,950</div>
              <p className="text-sm text-muted-foreground">Total Balance</p>
            </CardContent>
          </Card>
          <Card className="glass-card border-white/20">
            <CardContent className="p-6 text-center">
              <Calculator className="h-8 w-8 text-success mx-auto mb-3" />
              <div className="text-2xl font-bold">$1,015.25</div>
              <p className="text-sm text-muted-foreground">Next Payment</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Loan Calculator & Application */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="calculator" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 glass-card">
                <TabsTrigger value="calculator">Loan Calculator</TabsTrigger>
                <TabsTrigger value="apply">Apply for Loan</TabsTrigger>
              </TabsList>

              <TabsContent value="calculator">
                <Card className="glass-card border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5" />
                      EMI Calculator
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="loan-type">Loan Type</Label>
                        <Select value={selectedLoanType} onValueChange={setSelectedLoanType}>
                          <SelectTrigger className="glass-card border-white/20">
                            <SelectValue placeholder="Select loan type" />
                          </SelectTrigger>
                          <SelectContent className="glass-card">
                            {loanTypes.map((loan) => (
                              <SelectItem key={loan.type} value={loan.type}>
                                {loan.type} Loan
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="amount">Loan Amount ($)</Label>
                        <Input
                          id="amount"
                          placeholder="25,000"
                          value={loanAmount}
                          onChange={(e) => setLoanAmount(e.target.value)}
                          className="glass-card border-white/20"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="term">Term (months)</Label>
                        <Input
                          id="term"
                          placeholder="60"
                          value={loanTerm}
                          onChange={(e) => setLoanTerm(e.target.value)}
                          className="glass-card border-white/20"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Interest Rate</Label>
                        <Input
                          value={selectedLoanType ? `${loanTypes.find(l => l.type === selectedLoanType)?.minRate}% - ${loanTypes.find(l => l.type === selectedLoanType)?.maxRate}%` : "Select loan type"}
                          readOnly
                          className="glass-card border-white/20"
                        />
                      </div>
                    </div>

                    <Button 
                      onClick={calculatePayment}
                      className="w-full animated-gradient text-white"
                    >
                      Calculate EMI
                    </Button>

                    {monthlyPayment > 0 && (
                      <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/20">
                        <div className="text-center">
                          <h3 className="text-lg font-semibold mb-2">Estimated Monthly Payment</h3>
                          <div className="text-3xl font-bold text-primary">
                            ${monthlyPayment.toFixed(2)}
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            This is an estimate. Actual rates may vary based on credit score and other factors.
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="apply">
                <Card className="glass-card border-white/20">
                  <CardHeader>
                    <CardTitle>Loan Application</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Apply for a loan in just a few simple steps
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Application Steps */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                            1
                          </div>
                          <span className="text-sm font-medium">Personal Info</span>
                        </div>
                        <div className="flex-1 h-px bg-border mx-4" />
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-medium">
                            2
                          </div>
                          <span className="text-sm text-muted-foreground">Documents</span>
                        </div>
                        <div className="flex-1 h-px bg-border mx-4" />
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-medium">
                            3
                          </div>
                          <span className="text-sm text-muted-foreground">Review</span>
                        </div>
                      </div>

                      {/* Form Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Annual Income</Label>
                          <Input placeholder="$75,000" className="glass-card border-white/20" />
                        </div>
                        <div className="space-y-2">
                          <Label>Employment Type</Label>
                          <Select>
                            <SelectTrigger className="glass-card border-white/20">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent className="glass-card">
                              <SelectItem value="full-time">Full Time</SelectItem>
                              <SelectItem value="part-time">Part Time</SelectItem>
                              <SelectItem value="self-employed">Self Employed</SelectItem>
                              <SelectItem value="retired">Retired</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Loan Purpose</Label>
                          <Select>
                            <SelectTrigger className="glass-card border-white/20">
                              <SelectValue placeholder="Select purpose" />
                            </SelectTrigger>
                            <SelectContent className="glass-card">
                              <SelectItem value="debt-consolidation">Debt Consolidation</SelectItem>
                              <SelectItem value="home-improvement">Home Improvement</SelectItem>
                              <SelectItem value="vacation">Vacation</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Monthly Expenses</Label>
                          <Input placeholder="$3,500" className="glass-card border-white/20" />
                        </div>
                      </div>

                      <Button className="w-full animated-gradient text-white">
                        Continue Application
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Current Loans */}
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle>Your Current Loans</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentLoans.map((loan) => (
                  <div key={loan.id} className="p-4 rounded-xl border border-white/20 hover:bg-white/5 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">{loan.type}</h3>
                        <p className="text-sm text-muted-foreground">ID: {loan.id}</p>
                      </div>
                      <Badge variant={loan.status === "current" ? "default" : "secondary"}>
                        {loan.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Original Amount</p>
                        <p className="font-semibold">${loan.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Balance</p>
                        <p className="font-semibold">${loan.balance.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Interest Rate</p>
                        <p className="font-semibold">{loan.rate}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Next Payment</p>
                        <p className="font-semibold">${loan.nextPayment}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Paid</span>
                        <span>{Math.round(((loan.amount - loan.balance) / loan.amount) * 100)}%</span>
                      </div>
                      <Progress value={((loan.amount - loan.balance) / loan.amount) * 100} className="h-2" />
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="glass-button">
                        Make Payment
                      </Button>
                      <Button variant="outline" size="sm" className="glass-button">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Loan Types */}
          <div>
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle>Available Loan Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {loanTypes.map((loan) => (
                  <div key={loan.type} className="p-4 rounded-xl border border-white/20 hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <loan.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{loan.type} Loan</h3>
                        <p className="text-xs text-muted-foreground">{loan.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Amount:</span>
                        <span>${loan.minAmount.toLocaleString()} - ${loan.maxAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rate:</span>
                        <span>{loan.minRate}% - {loan.maxRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Term:</span>
                        <span>{loan.term}</span>
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="w-full mt-3 glass-button">
                      Learn More
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BankingLayout>
  );
};

export default Loans;