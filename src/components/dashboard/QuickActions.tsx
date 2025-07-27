import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Send, 
  Receipt, 
  CreditCard, 
  PiggyBank, 
  QrCode, 
  ArrowUpDown 
} from "lucide-react";

const quickActions = [
  { 
    icon: Send, 
    label: "Send Money", 
    description: "Transfer to anyone",
    color: "bg-blue-500/10 text-blue-600"
  },
  { 
    icon: Receipt, 
    label: "Pay Bills", 
    description: "Utilities & more",
    color: "bg-green-500/10 text-green-600"
  },
  { 
    icon: QrCode, 
    label: "QR Pay", 
    description: "Scan & pay",
    color: "bg-purple-500/10 text-purple-600"
  },
  { 
    icon: CreditCard, 
    label: "Card Info", 
    description: "Manage cards",
    color: "bg-orange-500/10 text-orange-600"
  },
  { 
    icon: PiggyBank, 
    label: "Savings", 
    description: "Goals & deposits",
    color: "bg-pink-500/10 text-pink-600"
  },
  { 
    icon: ArrowUpDown, 
    label: "Exchange", 
    description: "Currency rates",
    color: "bg-indigo-500/10 text-indigo-600"
  }
];

export function QuickActions() {
  return (
    <Card className="glass-card border-white/20">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              className="h-auto p-4 flex flex-col items-center gap-3 glass-button hover:bg-white/10"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${action.color}`}>
                <action.icon className="h-6 w-6" />
              </div>
              <div className="text-center">
                <div className="font-medium text-sm">{action.label}</div>
                <div className="text-xs text-muted-foreground">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}