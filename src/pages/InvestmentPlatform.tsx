import { BankingLayout } from "@/components/layout/BankingLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Eye,
  Plus,
  Minus,
  BarChart3,
  Activity,
  Briefcase,
  Target,
  Search,
  Star
} from "lucide-react";
import { useState } from "react";

const portfolioData = [
  { name: "Jan", value: 45000 },
  { name: "Feb", value: 47500 },
  { name: "Mar", value: 46800 },
  { name: "Apr", value: 49200 },
  { name: "May", value: 52100 },
  { name: "Jun", value: 54800 },
  { name: "Jul", value: 56200 }
];

const holdings = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    shares: 25,
    avgPrice: 180.50,
    currentPrice: 195.23,
    change: 8.16,
    changePercent: 4.35,
    value: 4880.75,
    allocation: 18.2
  },
  {
    symbol: "GOOGL", 
    name: "Alphabet Inc.",
    shares: 15,
    avgPrice: 2650.30,
    currentPrice: 2789.12,
    change: 138.82,
    changePercent: 5.24,
    value: 41836.80,
    allocation: 28.5
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation", 
    shares: 30,
    avgPrice: 320.75,
    currentPrice: 334.89,
    change: 14.14,
    changePercent: 4.41,
    value: 10046.70,
    allocation: 22.8
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    shares: 12,
    avgPrice: 890.20,
    currentPrice: 825.43,
    change: -64.77,
    changePercent: -7.27,
    value: 9905.16,
    allocation: 15.1
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    shares: 8,
    avgPrice: 3200.85,
    currentPrice: 3445.67,
    change: 244.82,
    changePercent: 7.65,
    value: 27565.36,
    allocation: 15.4
  }
];

const marketData = [
  { symbol: "SPY", name: "SPDR S&P 500", price: 428.65, change: 2.35, changePercent: 0.55 },
  { symbol: "QQQ", name: "Invesco QQQ Trust", price: 367.89, change: -1.23, changePercent: -0.33 },
  { symbol: "IWM", name: "iShares Russell 2000", price: 198.45, change: 4.67, changePercent: 2.41 },
  { symbol: "VTI", name: "Vanguard Total Stock", price: 234.12, change: 1.89, changePercent: 0.81 }
];

const watchlist = [
  { symbol: "NVDA", name: "NVIDIA Corporation", price: 456.78, change: 12.34, changePercent: 2.78 },
  { symbol: "META", name: "Meta Platforms Inc.", price: 298.45, change: -5.67, changePercent: -1.86 },
  { symbol: "NFLX", name: "Netflix Inc.", price: 445.23, change: 8.91, changePercent: 2.04 },
  { symbol: "SPOT", name: "Spotify Technology", price: 167.89, change: -2.45, changePercent: -1.44 }
];

const COLORS = ['#3b82f6', '#22c55e', '#a855f7', '#f59e0b', '#ef4444'];

const InvestmentPlatform = () => {
  const [selectedTab, setSelectedTab] = useState("portfolio");
  const [searchTicker, setSearchTicker] = useState("");
  const [orderType, setOrderType] = useState("market");
  const [orderSide, setOrderSide] = useState("buy");

  const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0);
  const totalGainLoss = holdings.reduce((sum, holding) => {
    const gainLoss = (holding.currentPrice - holding.avgPrice) * holding.shares;
    return sum + gainLoss;
  }, 0);
  const totalGainLossPercent = (totalGainLoss / (totalValue - totalGainLoss)) * 100;

  const allocationData = holdings.map((holding, index) => ({
    name: holding.symbol,
    value: holding.allocation,
    fill: COLORS[index % COLORS.length]
  }));

  return (
    <BankingLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Investment Platform</h1>
          <div className="flex gap-2">
            <Button variant="outline" className="glass-button">
              <BarChart3 className="mr-2 h-4 w-4" />
              Market Analysis
            </Button>
            <Button className="animated-gradient text-white">
              <Plus className="mr-2 h-4 w-4" />
              Place Order
            </Button>
          </div>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass-card border-white/20">
            <CardContent className="p-6 text-center">
              <Briefcase className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">Portfolio Value</p>
            </CardContent>
          </Card>
          <Card className="glass-card border-white/20">
            <CardContent className="p-6 text-center">
              <TrendingUp className={`h-8 w-8 mx-auto mb-3 ${totalGainLoss >= 0 ? 'text-success' : 'text-destructive'}`} />
              <div className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-success' : 'text-destructive'}`}>
                {totalGainLoss >= 0 ? '+' : ''}${totalGainLoss.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">Total Gain/Loss</p>
            </CardContent>
          </Card>
          <Card className="glass-card border-white/20">
            <CardContent className="p-6 text-center">
              <Activity className={`h-8 w-8 mx-auto mb-3 ${totalGainLossPercent >= 0 ? 'text-success' : 'text-destructive'}`} />
              <div className={`text-2xl font-bold ${totalGainLossPercent >= 0 ? 'text-success' : 'text-destructive'}`}>
                {totalGainLossPercent >= 0 ? '+' : ''}{totalGainLossPercent.toFixed(2)}%
              </div>
              <p className="text-sm text-muted-foreground">Total Return</p>
            </CardContent>
          </Card>
          <Card className="glass-card border-white/20">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-warning mx-auto mb-3" />
              <div className="text-2xl font-bold">5</div>
              <p className="text-sm text-muted-foreground">Holdings</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Investment Interface */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 glass-card">
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="trade">Trade</TabsTrigger>
                <TabsTrigger value="research">Research</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="portfolio">
                <div className="space-y-6">
                  {/* Portfolio Performance Chart */}
                  <Card className="glass-card border-white/20">
                    <CardHeader>
                      <CardTitle>Portfolio Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={portfolioData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                            <YAxis stroke="hsl(var(--muted-foreground))" />
                            <Tooltip 
                              contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px'
                              }}
                            />
                            <Area 
                              type="monotone" 
                              dataKey="value" 
                              stroke="hsl(var(--primary))" 
                              fill="hsl(var(--primary))" 
                              fillOpacity={0.3}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Holdings */}
                  <Card className="glass-card border-white/20">
                    <CardHeader>
                      <CardTitle>Your Holdings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {holdings.map((holding) => (
                        <div key={holding.symbol} className="flex items-center justify-between p-4 rounded-xl border border-white/20 hover:bg-white/5 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                              <span className="font-bold text-sm text-primary">{holding.symbol}</span>
                            </div>
                            <div>
                              <h3 className="font-semibold">{holding.symbol}</h3>
                              <p className="text-sm text-muted-foreground">{holding.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {holding.shares} shares • Avg: ${holding.avgPrice}
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="font-semibold">${holding.value.toLocaleString()}</p>
                            <p className="text-sm">${holding.currentPrice}</p>
                            <div className="flex items-center gap-1">
                              {holding.change >= 0 ? (
                                <TrendingUp className="h-3 w-3 text-success" />
                              ) : (
                                <TrendingDown className="h-3 w-3 text-destructive" />
                              )}
                              <span className={`text-sm ${holding.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                                {holding.change >= 0 ? '+' : ''}{holding.changePercent.toFixed(2)}%
                              </span>
                            </div>
                          </div>

                          <div className="flex gap-2 ml-4">
                            <Button variant="outline" size="sm" className="glass-button">
                              <Plus className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="glass-button">
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="glass-button">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="trade">
                <Card className="glass-card border-white/20">
                  <CardHeader>
                    <CardTitle>Place Order</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Stock Search */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Stock Symbol</label>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search stocks (e.g., AAPL)"
                            value={searchTicker}
                            onChange={(e) => setSearchTicker(e.target.value.toUpperCase())}
                            className="pl-10 glass-card border-white/20"
                          />
                        </div>
                      </div>

                      {/* Order Type and Side */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Order Type</label>
                          <Select value={orderType} onValueChange={setOrderType}>
                            <SelectTrigger className="glass-card border-white/20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="glass-card">
                              <SelectItem value="market">Market Order</SelectItem>
                              <SelectItem value="limit">Limit Order</SelectItem>
                              <SelectItem value="stop">Stop Order</SelectItem>
                              <SelectItem value="stop-limit">Stop-Limit Order</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Order Side</label>
                          <Select value={orderSide} onValueChange={setOrderSide}>
                            <SelectTrigger className="glass-card border-white/20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="glass-card">
                              <SelectItem value="buy">Buy</SelectItem>
                              <SelectItem value="sell">Sell</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Quantity and Price */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Quantity</label>
                          <Input
                            placeholder="Number of shares"
                            className="glass-card border-white/20"
                          />
                        </div>
                        {orderType !== "market" && (
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Price ($)</label>
                            <Input
                              placeholder="Limit price"
                              className="glass-card border-white/20"
                            />
                          </div>
                        )}
                      </div>

                      {/* Order Preview */}
                      <div className="p-4 rounded-xl bg-muted/20 border border-white/10">
                        <h4 className="font-medium mb-2">Order Preview</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Order Type:</span>
                            <span className="capitalize">{orderType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Side:</span>
                            <span className={`capitalize ${orderSide === 'buy' ? 'text-success' : 'text-destructive'}`}>
                              {orderSide}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Estimated Cost:</span>
                            <span>$0.00</span>
                          </div>
                        </div>
                      </div>

                      <Button className={`w-full ${orderSide === 'buy' ? 'bg-success hover:bg-success/90' : 'bg-destructive hover:bg-destructive/90'} text-white`}>
                        {orderSide === 'buy' ? 'Place Buy Order' : 'Place Sell Order'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="research">
                <Card className="glass-card border-white/20">
                  <CardHeader>
                    <CardTitle>Market Research</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Research tools and market analysis coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history">
                <Card className="glass-card border-white/20">
                  <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Investment transaction history coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Market Data & Watchlist */}
          <div className="space-y-6">
            {/* Portfolio Allocation */}
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle>Portfolio Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={allocationData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {allocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-2">
                  {holdings.map((holding, index) => (
                    <div key={holding.symbol} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span>{holding.symbol}</span>
                      </div>
                      <span className="font-medium">{holding.allocation.toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Market Overview */}
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle>Market Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {marketData.map((market) => (
                  <div key={market.symbol} className="flex items-center justify-between p-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors">
                    <div>
                      <p className="font-medium text-sm">{market.symbol}</p>
                      <p className="text-xs text-muted-foreground">{market.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">${market.price}</p>
                      <div className="flex items-center gap-1">
                        {market.change >= 0 ? (
                          <TrendingUp className="h-3 w-3 text-success" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-destructive" />
                        )}
                        <span className={`text-xs ${market.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                          {market.changePercent >= 0 ? '+' : ''}{market.changePercent.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Watchlist */}
            <Card className="glass-card border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Watchlist</CardTitle>
                  <Button variant="outline" size="sm" className="glass-button">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {watchlist.map((stock) => (
                  <div key={stock.symbol} className="flex items-center justify-between p-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <Star className="h-4 w-4 text-warning" />
                      <div>
                        <p className="font-medium text-sm">{stock.symbol}</p>
                        <p className="text-xs text-muted-foreground">{stock.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">${stock.price}</p>
                      <div className="flex items-center gap-1">
                        {stock.change >= 0 ? (
                          <TrendingUp className="h-3 w-3 text-success" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-destructive" />
                        )}
                        <span className={`text-xs ${stock.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                          {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                        </span>
                      </div>
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

export default InvestmentPlatform;