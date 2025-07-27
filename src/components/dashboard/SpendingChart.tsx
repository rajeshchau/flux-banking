import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const spendingData = [
  { month: 'Jan', spending: 2400, income: 4000 },
  { month: 'Feb', spending: 1398, income: 3000 },
  { month: 'Mar', spending: 2800, income: 4500 },
  { month: 'Apr', spending: 3908, income: 4800 },
  { month: 'May', spending: 4800, income: 5200 },
  { month: 'Jun', spending: 3800, income: 4900 },
];

export function SpendingChart() {
  return (
    <Card className="glass-card border-white/20">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Spending Overview</CardTitle>
        <p className="text-sm text-muted-foreground">
          Monthly income vs spending trends
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={spendingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="income" 
                stroke="hsl(var(--success))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--success))' }}
              />
              <Line 
                type="monotone" 
                dataKey="spending" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}