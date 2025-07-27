import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUpRight, ArrowDownLeft, MoreHorizontal } from "lucide-react";

const transactions = [
  {
    id: "1",
    type: "credit",
    amount: 2500,
    description: "Salary Payment",
    sender: "ABC Corporation",
    time: "2 hours ago",
    status: "completed"
  },
  {
    id: "2", 
    type: "debit",
    amount: 85.50,
    description: "Online Shopping",
    sender: "Amazon.com",
    time: "5 hours ago",
    status: "completed"
  },
  {
    id: "3",
    type: "credit",
    amount: 150,
    description: "Freelance Payment",
    sender: "Client XYZ",
    time: "1 day ago",
    status: "completed"
  },
  {
    id: "4",
    type: "debit",
    amount: 45.99,
    description: "Subscription",
    sender: "Netflix",
    time: "2 days ago",
    status: "completed"
  },
  {
    id: "5",
    type: "debit",
    amount: 1200,
    description: "Rent Payment",
    sender: "Property Manager",
    time: "3 days ago",
    status: "pending"
  }
];

export function RecentTransactions() {
  return (
    <Card className="glass-card border-white/20">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
          View All
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center
                ${transaction.type === 'credit' 
                  ? 'bg-success/10 text-success' 
                  : 'bg-destructive/10 text-destructive'
                }
              `}>
                {transaction.type === 'credit' ? (
                  <ArrowDownLeft className="h-4 w-4" />
                ) : (
                  <ArrowUpRight className="h-4 w-4" />
                )}
              </div>
              
              <div className="flex-1">
                <p className="font-medium text-sm">{transaction.description}</p>
                <p className="text-xs text-muted-foreground">
                  {transaction.sender} • {transaction.time}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className={`font-semibold text-sm ${
                  transaction.type === 'credit' ? 'text-success' : 'text-foreground'
                }`}>
                  {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                </p>
                <Badge 
                  variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {transaction.status}
                </Badge>
              </div>
              
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}