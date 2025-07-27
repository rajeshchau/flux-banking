import { BankingLayout } from "@/components/layout/BankingLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, QrCode, ArrowRight, Clock, CheckCircle } from "lucide-react";
import { useState } from "react";

const Transfer = () => {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const recentContacts = [
    { name: "John Smith", account: "****1234", avatar: "/placeholder.svg" },
    { name: "Sarah Wilson", account: "****5678", avatar: "/placeholder.svg" },
    { name: "Mike Johnson", account: "****9012", avatar: "/placeholder.svg" },
  ];

  const recentTransfers = [
    { to: "John Smith", amount: "$500", time: "2 hours ago", status: "completed" },
    { to: "Sarah Wilson", amount: "$250", time: "1 day ago", status: "completed" },
    { to: "Mike Johnson", amount: "$100", time: "3 days ago", status: "pending" },
  ];

  return (
    <BankingLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Transfer Money</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transfer Form */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="send" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 glass-card">
                <TabsTrigger value="send">Send Money</TabsTrigger>
                <TabsTrigger value="receive">Receive Money</TabsTrigger>
              </TabsList>

              <TabsContent value="send" className="space-y-6">
                <Card className="glass-card border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Send className="h-5 w-5" />
                      Send Money
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="recipient">Recipient</Label>
                        <Input
                          id="recipient"
                          placeholder="Enter name, email, or phone number"
                          value={recipient}
                          onChange={(e) => setRecipient(e.target.value)}
                          className="glass-card border-white/20"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                            $
                          </span>
                          <Input
                            id="amount"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="pl-8 glass-card border-white/20"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="note">Note (Optional)</Label>
                        <Input
                          id="note"
                          placeholder="What's this for?"
                          className="glass-card border-white/20"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-1 animated-gradient text-white">
                        Send Money
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="glass-button">
                        <QrCode className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Contacts */}
                <Card className="glass-card border-white/20">
                  <CardHeader>
                    <CardTitle>Recent Contacts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {recentContacts.map((contact, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors"
                        >
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={contact.avatar} />
                            <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{contact.name}</p>
                            <p className="text-xs text-muted-foreground">{contact.account}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="receive" className="space-y-6">
                <Card className="glass-card border-white/20">
                  <CardHeader>
                    <CardTitle>Receive Money</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-6">
                    <div className="w-48 h-48 mx-auto bg-white rounded-xl p-4">
                      <div className="w-full h-full bg-black/10 rounded-lg flex items-center justify-center">
                        <QrCode className="h-20 w-20 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Your QR Code</h3>
                      <p className="text-sm text-muted-foreground">
                        Share this QR code for others to send you money instantly
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label>Account Number</Label>
                      <div className="flex gap-2">
                        <Input value="****1234" readOnly className="glass-card border-white/20" />
                        <Button variant="outline" className="glass-button">Copy</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Transfer History */}
          <div>
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle>Recent Transfers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentTransfers.map((transfer, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Send className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{transfer.to}</p>
                        <p className="text-xs text-muted-foreground">{transfer.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">{transfer.amount}</p>
                      <Badge
                        variant={transfer.status === "completed" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {transfer.status === "completed" ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <Clock className="h-3 w-3 mr-1" />
                        )}
                        {transfer.status}
                      </Badge>
                    </div>
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

export default Transfer;