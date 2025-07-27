import { BankingLayout } from "@/components/layout/BankingLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings as SettingsIcon,
  Bell,
  Shield,
  CreditCard,
  Smartphone,
  Globe,
  Moon,
  Sun,
  Download,
  Trash2,
  AlertTriangle
} from "lucide-react";
import { useState } from "react";

const notificationSettings = [
  {
    category: "Account Alerts",
    settings: [
      { name: "Login notifications", description: "Get notified when someone logs into your account", enabled: true },
      { name: "Password changes", description: "Alert when password is changed", enabled: true },
      { name: "Account updates", description: "Notifications about account changes", enabled: false }
    ]
  },
  {
    category: "Transaction Alerts", 
    settings: [
      { name: "All transactions", description: "Get notified for every transaction", enabled: false },
      { name: "Large transactions", description: "Notify for transactions over $500", enabled: true },
      { name: "International transactions", description: "Alert for foreign transactions", enabled: true },
      { name: "Failed transactions", description: "Notify when transactions fail", enabled: true }
    ]
  },
  {
    category: "Marketing",
    settings: [
      { name: "Product updates", description: "News about new features and products", enabled: false },
      { name: "Promotional offers", description: "Special deals and promotions", enabled: false },
      { name: "Financial tips", description: "Educational content and tips", enabled: true }
    ]
  }
];

const paymentMethods = [
  {
    type: "card",
    name: "•••• •••• •••• 4521",
    brand: "Visa",
    isDefault: true,
    expires: "12/26"
  },
  {
    type: "card", 
    name: "•••• •••• •••• 7890",
    brand: "Mastercard",
    isDefault: false,
    expires: "08/27"
  },
  {
    type: "bank",
    name: "Checking Account ••••1234",
    brand: "FluxBank",
    isDefault: false,
    expires: null
  }
];

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("USD");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <BankingLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Settings</h1>
          <Button className="animated-gradient text-white">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="general" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 glass-card">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="payment">Payment</TabsTrigger>
              </TabsList>

              <TabsContent value="general">
                <Card className="glass-card border-white/20">
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Manage your app preferences and display settings
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Appearance */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Appearance</h3>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Dark Mode</Label>
                          <p className="text-sm text-muted-foreground">
                            Toggle between light and dark themes
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sun className="h-4 w-4" />
                          <Switch 
                            checked={isDarkMode}
                            onCheckedChange={toggleDarkMode}
                          />
                          <Moon className="h-4 w-4" />
                        </div>
                      </div>
                    </div>

                    {/* Language & Region */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Language & Region</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Language</Label>
                          <Select value={language} onValueChange={setLanguage}>
                            <SelectTrigger className="glass-card border-white/20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="glass-card">
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="es">Español</SelectItem>
                              <SelectItem value="fr">Français</SelectItem>
                              <SelectItem value="de">Deutsch</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Currency</Label>
                          <Select value={currency} onValueChange={setCurrency}>
                            <SelectTrigger className="glass-card border-white/20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="glass-card">
                              <SelectItem value="USD">USD - US Dollar</SelectItem>
                              <SelectItem value="EUR">EUR - Euro</SelectItem>
                              <SelectItem value="GBP">GBP - British Pound</SelectItem>
                              <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Data & Privacy */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Data & Privacy</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-base">Analytics</Label>
                            <p className="text-sm text-muted-foreground">
                              Help improve our service by sharing usage data
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-base">Personalization</Label>
                            <p className="text-sm text-muted-foreground">
                              Allow personalized recommendations
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications">
                <Card className="glass-card border-white/20">
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Choose what notifications you want to receive
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {notificationSettings.map((category, categoryIndex) => (
                      <div key={categoryIndex} className="space-y-4">
                        <h3 className="text-lg font-semibold">{category.category}</h3>
                        <div className="space-y-3">
                          {category.settings.map((setting, settingIndex) => (
                            <div key={settingIndex} className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-base">{setting.name}</Label>
                                <p className="text-sm text-muted-foreground">
                                  {setting.description}
                                </p>
                              </div>
                              <Switch defaultChecked={setting.enabled} />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    {/* Delivery Methods */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Delivery Methods</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch defaultChecked id="email-notifications" />
                          <Label htmlFor="email-notifications" className="flex items-center gap-2">
                            <Bell className="h-4 w-4" />
                            Email
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch defaultChecked id="push-notifications" />
                          <Label htmlFor="push-notifications" className="flex items-center gap-2">
                            <Smartphone className="h-4 w-4" />
                            Push
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="sms-notifications" />
                          <Label htmlFor="sms-notifications" className="flex items-center gap-2">
                            <Smartphone className="h-4 w-4" />
                            SMS
                          </Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card className="glass-card border-white/20">
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Manage your account security and access controls
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Two-Factor Authentication */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
                      <div className="flex items-center justify-between p-4 rounded-xl border border-white/20">
                        <div className="space-y-0.5">
                          <Label className="text-base">SMS Authentication</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive verification codes via SMS
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={twoFactorEnabled ? "bg-success/10 text-success" : "bg-muted/10 text-muted-foreground"}>
                            {twoFactorEnabled ? "Enabled" : "Disabled"}
                          </Badge>
                          <Switch 
                            checked={twoFactorEnabled}
                            onCheckedChange={setTwoFactorEnabled}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Session Management */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Session Management</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-base">Auto-logout</Label>
                            <p className="text-sm text-muted-foreground">
                              Automatically sign out after inactivity
                            </p>
                          </div>
                          <Select defaultValue="30">
                            <SelectTrigger className="w-32 glass-card border-white/20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="glass-card">
                              <SelectItem value="15">15 minutes</SelectItem>
                              <SelectItem value="30">30 minutes</SelectItem>
                              <SelectItem value="60">1 hour</SelectItem>
                              <SelectItem value="never">Never</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Biometric Settings */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Biometric Authentication</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-base">Fingerprint Login</Label>
                            <p className="text-sm text-muted-foreground">
                              Use fingerprint to login on mobile devices
                            </p>
                          </div>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-base">Face ID</Label>
                            <p className="text-sm text-muted-foreground">
                              Use Face ID for authentication
                            </p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payment">
                <Card className="glass-card border-white/20">
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Manage your payment methods and billing preferences
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Saved Payment Methods */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Saved Payment Methods</h3>
                        <Button variant="outline" className="glass-button">
                          Add Method
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {paymentMethods.map((method, index) => (
                          <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-white/20">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                {method.type === "card" ? (
                                  <CreditCard className="h-5 w-5 text-primary" />
                                ) : (
                                  <Globe className="h-5 w-5 text-primary" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium">{method.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {method.brand}
                                  {method.expires && ` • Expires ${method.expires}`}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {method.isDefault && (
                                <Badge className="bg-primary/10 text-primary">Default</Badge>
                              )}
                              <Button variant="outline" size="sm" className="glass-button">
                                Edit
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Transaction Limits */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Transaction Limits</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Daily Transfer Limit</Label>
                          <Select defaultValue="10000">
                            <SelectTrigger className="glass-card border-white/20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="glass-card">
                              <SelectItem value="1000">$1,000</SelectItem>
                              <SelectItem value="5000">$5,000</SelectItem>
                              <SelectItem value="10000">$10,000</SelectItem>
                              <SelectItem value="25000">$25,000</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>ATM Withdrawal Limit</Label>
                          <Select defaultValue="500">
                            <SelectTrigger className="glass-card border-white/20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="glass-card">
                              <SelectItem value="200">$200</SelectItem>
                              <SelectItem value="500">$500</SelectItem>
                              <SelectItem value="1000">$1,000</SelectItem>
                              <SelectItem value="2000">$2,000</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Settings Summary */}
          <div className="space-y-6">
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle>Settings Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Two-Factor Auth</span>
                  <Badge className="bg-success/10 text-success">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Notifications</span>
                  <Badge className="bg-success/10 text-success">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Auto-logout</span>
                  <Badge variant="outline">30 minutes</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Theme</span>
                  <Badge variant="outline">{isDarkMode ? "Dark" : "Light"}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Language</span>
                  <Badge variant="outline">English</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle>Account Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start glass-button">
                  <Download className="mr-2 h-4 w-4" />
                  Download Data
                </Button>
                <Button variant="outline" className="w-full justify-start glass-button">
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  Reset Settings
                </Button>
                <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive border-destructive/20 hover:bg-destructive/10">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Account
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/20 border-destructive/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  Danger Zone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  These actions cannot be undone. Please proceed with caution.
                </p>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full text-destructive border-destructive/20 hover:bg-destructive/10">
                    Close Account
                  </Button>
                  <Button variant="outline" size="sm" className="w-full text-destructive border-destructive/20 hover:bg-destructive/10">
                    Delete All Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BankingLayout>
  );
};

export default Settings;