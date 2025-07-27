import { BankingLayout } from "@/components/layout/BankingLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MessageCircle,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Send,
  Bot,
  User,
  FileText,
  HelpCircle
} from "lucide-react";
import { useState } from "react";

const supportTickets = [
  {
    id: "SUP001",
    subject: "Unable to transfer funds",
    status: "open",
    priority: "high",
    created: "2024-01-15",
    lastUpdate: "2024-01-16",
    category: "technical"
  },
  {
    id: "SUP002",
    subject: "Credit card application status",
    status: "resolved",
    priority: "medium",
    created: "2024-01-10",
    lastUpdate: "2024-01-12",
    category: "account"
  },
  {
    id: "SUP003",
    subject: "Interest rate inquiry",
    status: "pending",
    priority: "low",
    created: "2024-01-08",
    lastUpdate: "2024-01-14",
    category: "general"
  }
];

const faqData = [
  {
    question: "How do I reset my password?",
    answer: "You can reset your password by clicking 'Forgot Password' on the login page, or through Settings > Security in your account.",
    category: "account"
  },
  {
    question: "What are the transfer limits?",
    answer: "Daily transfer limits are $10,000 for ACH transfers and $25,000 for wire transfers. Limits may be higher for premium accounts.",
    category: "transfers"
  },
  {
    question: "How long do wire transfers take?",
    answer: "Domestic wire transfers typically complete within 1 business day, while international transfers may take 3-5 business days.",
    category: "transfers"
  },
  {
    question: "Is my money FDIC insured?",
    answer: "Yes, all deposits are FDIC insured up to $250,000 per depositor, per bank, per ownership category.",
    category: "security"
  }
];

const chatMessages = [
  { sender: "bot", message: "Hello! I'm here to help you with your banking needs. How can I assist you today?", time: "10:30 AM" },
  { sender: "user", message: "I need help with a transfer that failed", time: "10:31 AM" },
  { sender: "bot", message: "I'd be happy to help you with that transfer issue. Can you provide me with the transaction ID or date when you attempted the transfer?", time: "10:31 AM" }
];

const Support = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(chatMessages);
  const [searchFaq, setSearchFaq] = useState("");

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const userMessage = {
      sender: "user" as const,
      message: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage("");
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        sender: "bot" as const,
        message: "Thank you for your message. I'm processing your request and will provide assistance shortly.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const filteredFaqs = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchFaq.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchFaq.toLowerCase())
  );

  return (
    <BankingLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Customer Support</h1>
          <Button className="animated-gradient text-white">
            <FileText className="mr-2 h-4 w-4" />
            New Ticket
          </Button>
        </div>

        {/* Quick Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-card border-white/20 hover-lift cursor-pointer">
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get instant help from our support team
              </p>
              <Badge className="bg-success/10 text-success">Available Now</Badge>
            </CardContent>
          </Card>

          <Card className="glass-card border-white/20 hover-lift cursor-pointer">
            <CardContent className="p-6 text-center">
              <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Phone Support</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Call us at 1-800-FLUX-BANK
              </p>
              <Badge className="bg-warning/10 text-warning">Mon-Fri 8AM-8PM</Badge>
            </CardContent>
          </Card>

          <Card className="glass-card border-white/20 hover-lift cursor-pointer">
            <CardContent className="p-6 text-center">
              <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Send us an email for detailed inquiries
              </p>
              <Badge variant="outline">24-48 hour response</Badge>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat and Tickets */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="chat" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 glass-card">
                <TabsTrigger value="chat">Live Chat</TabsTrigger>
                <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
              </TabsList>

              <TabsContent value="chat">
                <Card className="glass-card border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="h-5 w-5" />
                      AI Assistant
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Chat Messages */}
                      <div className="h-80 overflow-y-auto custom-scrollbar space-y-4 p-4 rounded-xl bg-muted/20">
                        {messages.map((message, index) => (
                          <div
                            key={index}
                            className={`flex items-start gap-3 ${
                              message.sender === 'user' ? 'flex-row-reverse' : ''
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              message.sender === 'user' 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-muted text-muted-foreground'
                            }`}>
                              {message.sender === 'user' ? (
                                <User className="h-4 w-4" />
                              ) : (
                                <Bot className="h-4 w-4" />
                              )}
                            </div>
                            <div className={`max-w-sm ${
                              message.sender === 'user' ? 'text-right' : ''
                            }`}>
                              <div className={`p-3 rounded-xl ${
                                message.sender === 'user'
                                  ? 'bg-primary text-primary-foreground ml-auto'
                                  : 'bg-white/10 border border-white/20'
                              }`}>
                                <p className="text-sm">{message.message}</p>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {message.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Message Input */}
                      <div className="flex gap-2">
                        <Input
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                          className="flex-1 glass-card border-white/20"
                        />
                        <Button onClick={sendMessage} className="glass-button">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tickets">
                <Card className="glass-card border-white/20">
                  <CardHeader>
                    <CardTitle>Your Support Tickets</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {supportTickets.map((ticket) => (
                      <div
                        key={ticket.id}
                        className="p-4 rounded-xl border border-white/20 hover:bg-white/5 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold">{ticket.subject}</h3>
                            <p className="text-sm text-muted-foreground">
                              Ticket #{ticket.id}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={ticket.status === 'resolved' ? 'default' : 'secondary'}
                              className={
                                ticket.status === 'resolved' 
                                  ? 'bg-success/10 text-success' 
                                  : ticket.status === 'open'
                                  ? 'bg-destructive/10 text-destructive'
                                  : 'bg-warning/10 text-warning'
                              }
                            >
                              {ticket.status === 'resolved' && <CheckCircle className="h-3 w-3 mr-1" />}
                              {ticket.status === 'open' && <AlertCircle className="h-3 w-3 mr-1" />}
                              {ticket.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                              {ticket.status}
                            </Badge>
                            <Badge variant="outline" className={
                              ticket.priority === 'high' ? 'border-destructive text-destructive' :
                              ticket.priority === 'medium' ? 'border-warning text-warning' :
                              'border-muted text-muted-foreground'
                            }>
                              {ticket.priority}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                          <div>
                            <span>Created: </span>
                            <span>{new Date(ticket.created).toLocaleDateString()}</span>
                          </div>
                          <div>
                            <span>Last Update: </span>
                            <span>{new Date(ticket.lastUpdate).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <Button variant="outline" size="sm" className="glass-button">
                          View Details
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Create New Ticket */}
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle>Submit New Support Request</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="glass-card border-white/20">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="glass-card">
                          <SelectItem value="technical">Technical Issue</SelectItem>
                          <SelectItem value="account">Account Question</SelectItem>
                          <SelectItem value="billing">Billing Inquiry</SelectItem>
                          <SelectItem value="feature">Feature Request</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Priority</Label>
                      <Select>
                        <SelectTrigger className="glass-card border-white/20">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent className="glass-card">
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Subject</Label>
                    <Input 
                      placeholder="Brief description of your issue"
                      className="glass-card border-white/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea 
                      placeholder="Please provide detailed information about your issue..."
                      className="glass-card border-white/20 min-h-[120px]"
                    />
                  </div>

                  <Button className="w-full animated-gradient text-white">
                    Submit Support Request
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ and Resources */}
          <div className="space-y-6">
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search FAQs..."
                      value={searchFaq}
                      onChange={(e) => setSearchFaq(e.target.value)}
                      className="pl-10 glass-card border-white/20"
                    />
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                    {filteredFaqs.map((faq, index) => (
                      <div 
                        key={index}
                        className="p-3 rounded-xl border border-white/20 hover:bg-white/5 transition-colors"
                      >
                        <h4 className="font-medium text-sm mb-2">{faq.question}</h4>
                        <p className="text-xs text-muted-foreground">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Phone Support</p>
                      <p className="text-xs text-muted-foreground">1-800-FLUX-BANK</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Email Support</p>
                      <p className="text-xs text-muted-foreground">support@fluxbank.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Business Hours</p>
                      <p className="text-xs text-muted-foreground">Mon-Fri: 8AM-8PM EST</p>
                      <p className="text-xs text-muted-foreground">Sat-Sun: 9AM-5PM EST</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Resources */}
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle>Support Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start glass-button">
                  <FileText className="mr-2 h-4 w-4" />
                  User Guide
                </Button>
                <Button variant="outline" className="w-full justify-start glass-button">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help Center
                </Button>
                <Button variant="outline" className="w-full justify-start glass-button">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Community Forum
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BankingLayout>
  );
};

export default Support;