import { BankingLayout } from "@/components/layout/BankingLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search,
  Filter,
  Download,
  Calendar,
  ArrowUpDown,
  ArrowUpRight,
  ArrowDownLeft
} from "lucide-react";
import { useState } from "react";

const transactions = [
  {
    id: "TXN001",
    date: "2024-01-15",
    description: "Salary Payment",
    category: "Income",
    amount: 5000,
    type: "credit",
    status: "completed",
    account: "Checking"
  },
  {
    id: "TXN002",
    date: "2024-01-14",
    description: "Grocery Shopping",
    category: "Food",
    amount: 145.67,
    type: "debit",
    status: "completed",
    account: "Checking"
  },
  {
    id: "TXN003",
    date: "2024-01-13",
    description: "Electric Bill",
    category: "Utilities",
    amount: 89.50,
    type: "debit",
    status: "completed",
    account: "Checking"
  },
  {
    id: "TXN004",
    date: "2024-01-12",
    description: "Online Transfer",
    category: "Transfer",
    amount: 1000,
    type: "credit",
    status: "pending",
    account: "Savings"
  },
  {
    id: "TXN005",
    date: "2024-01-11",
    description: "Netflix Subscription",
    category: "Entertainment",
    amount: 15.99,
    type: "debit",
    status: "completed",
    account: "Credit Card"
  },
];

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterAccount, setFilterAccount] = useState("all");

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || transaction.type === filterType;
    const matchesAccount = filterAccount === "all" || transaction.account === filterAccount;
    
    return matchesSearch && matchesType && matchesAccount;
  });

  return (
    <BankingLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Transaction History</h1>
          <Button className="animated-gradient text-white">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>

        {/* Filters */}
        <Card className="glass-card border-white/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 glass-card border-white/20"
                  />
                </div>
              </div>
              
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-40 glass-card border-white/20">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent className="glass-card">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="credit">Credit</SelectItem>
                  <SelectItem value="debit">Debit</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterAccount} onValueChange={setFilterAccount}>
                <SelectTrigger className="w-full md:w-40 glass-card border-white/20">
                  <SelectValue placeholder="Account" />
                </SelectTrigger>
                <SelectContent className="glass-card">
                  <SelectItem value="all">All Accounts</SelectItem>
                  <SelectItem value="Checking">Checking</SelectItem>
                  <SelectItem value="Savings">Savings</SelectItem>
                  <SelectItem value="Credit Card">Credit Card</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="glass-button">
                <Calendar className="mr-2 h-4 w-4" />
                Date Range
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Transaction Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-card border-white/20">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-success">+$5,250.00</div>
              <p className="text-sm text-muted-foreground">Total Credits</p>
            </CardContent>
          </Card>
          <Card className="glass-card border-white/20">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-destructive">-$251.16</div>
              <p className="text-sm text-muted-foreground">Total Debits</p>
            </CardContent>
          </Card>
          <Card className="glass-card border-white/20">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold">$4,998.84</div>
              <p className="text-sm text-muted-foreground">Net Change</p>
            </CardContent>
          </Card>
        </div>

        {/* Transactions Table */}
        <Card className="glass-card border-white/20">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10">
                    <TableHead className="w-[100px]">
                      <Button variant="ghost" className="p-0 h-auto font-medium">
                        Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Account</TableHead>
                    <TableHead className="text-right">
                      <Button variant="ghost" className="p-0 h-auto font-medium">
                        Amount
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id} className="border-white/10 hover:bg-white/5">
                      <TableCell className="font-medium">
                        {new Date(transaction.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            transaction.type === 'credit' 
                              ? 'bg-success/10 text-success' 
                              : 'bg-destructive/10 text-destructive'
                          }`}>
                            {transaction.type === 'credit' ? (
                              <ArrowDownLeft className="h-4 w-4" />
                            ) : (
                              <ArrowUpRight className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{transaction.description}</div>
                            <div className="text-sm text-muted-foreground">ID: {transaction.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="glass-button">
                          {transaction.category}
                        </Badge>
                      </TableCell>
                      <TableCell>{transaction.account}</TableCell>
                      <TableCell className="text-right">
                        <span className={`font-semibold ${
                          transaction.type === 'credit' ? 'text-success' : 'text-foreground'
                        }`}>
                          {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                        >
                          {transaction.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </BankingLayout>
  );
};

export default Transactions;