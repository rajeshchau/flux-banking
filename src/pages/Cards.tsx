import { BankingLayout } from "@/components/layout/BankingLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CreditCard, 
  Plus, 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff,
  MoreVertical,
  Wallet,
  Shield,
  Zap
} from "lucide-react";
import { useState } from "react";

const cards = [
  {
    id: "1",
    type: "credit",
    name: "FluxBank Premium",
    last4: "4521",
    balance: 2340.50,
    limit: 10000,
    expiryDate: "12/26",
    status: "active",
    isVirtual: false,
    color: "from-blue-600 to-purple-600"
  },
  {
    id: "2", 
    type: "debit",
    name: "FluxBank Checking",
    last4: "7890",
    balance: 12450.80,
    limit: null,
    expiryDate: "08/27",
    status: "active",
    isVirtual: false,
    color: "from-emerald-600 to-teal-600"
  },
  {
    id: "3",
    type: "credit",
    name: "Virtual Shopping Card",
    last4: "1234",
    balance: 0,
    limit: 5000,
    expiryDate: "03/25",
    status: "locked",
    isVirtual: true,
    color: "from-orange-600 to-red-600"
  }
];

const Cards = () => {
  const [showCardNumbers, setShowCardNumbers] = useState<Record<string, boolean>>({});

  const toggleCardNumber = (cardId: string) => {
    setShowCardNumbers(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const CreditCardComponent = ({ card }: { card: typeof cards[0] }) => (
    <div className={`relative w-full h-48 rounded-2xl bg-gradient-to-br ${card.color} p-6 text-white overflow-hidden`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white transform translate-x-16 -translate-y-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white transform -translate-x-12 translate-y-12" />
      </div>
      
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {card.isVirtual ? (
              <Zap className="h-5 w-5" />
            ) : (
              <CreditCard className="h-5 w-5" />
            )}
            <span className="text-sm opacity-90">
              {card.isVirtual ? "Virtual" : card.type === "credit" ? "Credit" : "Debit"}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white/80 hover:text-white hover:bg-white/20 h-8 w-8"
            onClick={() => toggleCardNumber(card.id)}
          >
            {showCardNumbers[card.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>

        <div className="space-y-4">
          <div className="text-xl font-mono tracking-wider">
            {showCardNumbers[card.id] 
              ? `•••• •••• •••• ${card.last4}`
              : "•••• •••• •••• ••••"
            }
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs opacity-70">CARDHOLDER</p>
              <p className="text-sm font-medium">JOHN DOE</p>
            </div>
            <div>
              <p className="text-xs opacity-70">EXPIRES</p>
              <p className="text-sm font-medium">{card.expiryDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <BankingLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">My Cards</h1>
          <Button className="animated-gradient text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add New Card
          </Button>
        </div>

        {/* Card Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-card border-white/20">
            <CardContent className="p-6 text-center">
              <Wallet className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold">3</div>
              <p className="text-sm text-muted-foreground">Total Cards</p>
            </CardContent>
          </Card>
          <Card className="glass-card border-white/20">
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 text-success mx-auto mb-3" />
              <div className="text-2xl font-bold text-success">$7,659.50</div>
              <p className="text-sm text-muted-foreground">Available Credit</p>
            </CardContent>
          </Card>
          <Card className="glass-card border-white/20">
            <CardContent className="p-6 text-center">
              <CreditCard className="h-8 w-8 text-warning mx-auto mb-3" />
              <div className="text-2xl font-bold">$2,340.50</div>
              <p className="text-sm text-muted-foreground">Total Balance</p>
            </CardContent>
          </Card>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Card key={card.id} className="glass-card border-white/20 p-0 overflow-hidden">
              <div className="p-6 pb-4">
                <CreditCardComponent card={card} />
              </div>
              
              <CardContent className="px-6 pb-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{card.name}</h3>
                  <Badge 
                    variant={card.status === "active" ? "default" : "secondary"}
                    className={card.status === "active" ? "bg-success text-success-foreground" : ""}
                  >
                    {card.status}
                  </Badge>
                </div>

                {card.type === "credit" && card.limit && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Used Credit</span>
                      <span>${card.balance.toLocaleString()} / ${card.limit.toLocaleString()}</span>
                    </div>
                    <Progress value={(card.balance / card.limit) * 100} className="h-2" />
                  </div>
                )}

                {card.type === "debit" && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Available Balance</span>
                      <span className="font-semibold">${card.balance.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 glass-button"
                  >
                    {card.status === "active" ? (
                      <>
                        <Lock className="mr-2 h-4 w-4" />
                        Lock
                      </>
                    ) : (
                      <>
                        <Unlock className="mr-2 h-4 w-4" />
                        Unlock
                      </>
                    )}
                  </Button>
                  <Button variant="outline" size="icon" className="glass-button">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Card Application */}
        <Card className="glass-card border-white/20">
          <CardHeader>
            <CardTitle>Apply for New Card</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl border border-white/20 hover:border-primary/50 transition-colors cursor-pointer hover-lift">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Premium Credit Card</h3>
                    <p className="text-sm text-muted-foreground">Low APR, High Rewards</p>
                  </div>
                </div>
                <ul className="text-sm space-y-2 mb-4">
                  <li>• 2% cashback on all purchases</li>
                  <li>• No annual fee</li>
                  <li>• $50,000 credit limit</li>
                </ul>
                <Button variant="outline" className="w-full glass-button">
                  Apply Now
                </Button>
              </div>

              <div className="p-6 rounded-xl border border-white/20 hover:border-primary/50 transition-colors cursor-pointer hover-lift">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Virtual Shopping Card</h3>
                    <p className="text-sm text-muted-foreground">Safe Online Shopping</p>
                  </div>
                </div>
                <ul className="text-sm space-y-2 mb-4">
                  <li>• Instant virtual card generation</li>
                  <li>• Enhanced security features</li>
                  <li>• Spending limits & controls</li>
                </ul>
                <Button variant="outline" className="w-full glass-button">
                  Create Virtual Card
                </Button>
              </div>

              <div className="p-6 rounded-xl border border-white/20 hover:border-primary/50 transition-colors cursor-pointer hover-lift">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <Wallet className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Student Debit Card</h3>
                    <p className="text-sm text-muted-foreground">No Fees, Great Benefits</p>
                  </div>
                </div>
                <ul className="text-sm space-y-2 mb-4">
                  <li>• No monthly maintenance fees</li>
                  <li>• ATM fee reimbursements</li>
                  <li>• Mobile banking perks</li>
                </ul>
                <Button variant="outline" className="w-full glass-button">
                  Learn More
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </BankingLayout>
  );
};

export default Cards;