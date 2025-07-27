import { BankingLayout } from "@/components/layout/BankingLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  FileText,
  Camera,
  Edit,
  CheckCircle,
  AlertTriangle,
  Clock
} from "lucide-react";
import { useState } from "react";

const kycDocuments = [
  {
    type: "Government ID",
    status: "verified",
    uploadDate: "2024-01-10",
    expiryDate: "2025-12-15"
  },
  {
    type: "Proof of Address",
    status: "verified",
    uploadDate: "2024-01-10",
    expiryDate: "2024-06-30"
  },
  {
    type: "Income Verification",
    status: "pending",
    uploadDate: "2024-01-15",
    expiryDate: null
  }
];

const securitySettings = [
  {
    name: "Two-Factor Authentication",
    enabled: true,
    description: "SMS-based 2FA protection"
  },
  {
    name: "Biometric Login",
    enabled: false,
    description: "Fingerprint and Face ID"
  },
  {
    name: "Login Alerts",
    enabled: true,
    description: "Email notifications for new logins"
  },
  {
    name: "Transaction Alerts",
    enabled: true,
    description: "Real-time transaction notifications"
  }
];

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    dateOfBirth: "1990-05-15"
  });

  const getKycProgress = () => {
    const verified = kycDocuments.filter(doc => doc.status === "verified").length;
    return (verified / kycDocuments.length) * 100;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "pending":
        return <Clock className="h-4 w-4 text-warning" />;
      case "rejected":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-success/10 text-success";
      case "pending":
        return "bg-warning/10 text-warning";
      case "rejected":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-muted/10 text-muted-foreground";
    }
  };

  return (
    <BankingLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Profile & Settings</h1>
          <Button 
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "outline" : "default"}
            className={isEditing ? "glass-button" : "animated-gradient text-white"}
          >
            <Edit className="mr-2 h-4 w-4" />
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 glass-card">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="kyc">KYC Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <Card className="glass-card border-white/20">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Manage your personal details and contact information
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Profile Picture */}
                      <div className="flex items-center gap-6">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                            {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <Button variant="outline" className="glass-button">
                            <Camera className="mr-2 h-4 w-4" />
                            Change Photo
                          </Button>
                          <p className="text-sm text-muted-foreground mt-2">
                            JPG, PNG or GIF. Max size 2MB.
                          </p>
                        </div>
                      </div>

                      {/* Personal Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={profileData.firstName}
                            onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                            disabled={!isEditing}
                            className="glass-card border-white/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={profileData.lastName}
                            onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                            disabled={!isEditing}
                            className="glass-card border-white/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                            disabled={!isEditing}
                            className="glass-card border-white/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                            disabled={!isEditing}
                            className="glass-card border-white/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dob">Date of Birth</Label>
                          <Input
                            id="dob"
                            type="date"
                            value={profileData.dateOfBirth}
                            onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                            disabled={!isEditing}
                            className="glass-card border-white/20"
                          />
                        </div>
                      </div>

                      {/* Address Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Address Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="address">Street Address</Label>
                            <Input
                              id="address"
                              value={profileData.address}
                              onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                              disabled={!isEditing}
                              className="glass-card border-white/20"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              value={profileData.city}
                              onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                              disabled={!isEditing}
                              className="glass-card border-white/20"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Input
                              id="state"
                              value={profileData.state}
                              onChange={(e) => setProfileData({...profileData, state: e.target.value})}
                              disabled={!isEditing}
                              className="glass-card border-white/20"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="zipCode">ZIP Code</Label>
                            <Input
                              id="zipCode"
                              value={profileData.zipCode}
                              onChange={(e) => setProfileData({...profileData, zipCode: e.target.value})}
                              disabled={!isEditing}
                              className="glass-card border-white/20"
                            />
                          </div>
                        </div>
                      </div>

                      {isEditing && (
                        <div className="flex gap-3">
                          <Button className="animated-gradient text-white">
                            Save Changes
                          </Button>
                          <Button variant="outline" onClick={() => setIsEditing(false)} className="glass-button">
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card className="glass-card border-white/20">
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Manage your account security and privacy settings
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Password Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Password & Authentication</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Current Password</Label>
                          <Input
                            type="password"
                            placeholder="Enter current password"
                            className="glass-card border-white/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>New Password</Label>
                          <Input
                            type="password"
                            placeholder="Enter new password"
                            className="glass-card border-white/20"
                          />
                        </div>
                      </div>
                      <Button variant="outline" className="glass-button">
                        Change Password
                      </Button>
                    </div>

                    {/* Security Features */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Security Features</h3>
                      <div className="space-y-4">
                        {securitySettings.map((setting, index) => (
                          <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-white/20">
                            <div>
                              <h4 className="font-medium">{setting.name}</h4>
                              <p className="text-sm text-muted-foreground">{setting.description}</p>
                            </div>
                            <Badge 
                              className={setting.enabled ? "bg-success/10 text-success" : "bg-muted/10 text-muted-foreground"}
                            >
                              {setting.enabled ? "Enabled" : "Disabled"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Login Sessions */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Active Sessions</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-xl border border-white/20">
                          <div>
                            <p className="font-medium">Current Session</p>
                            <p className="text-sm text-muted-foreground">Chrome on Windows • New York, NY</p>
                          </div>
                          <Badge className="bg-success/10 text-success">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl border border-white/20">
                          <div>
                            <p className="font-medium">Mobile App</p>
                            <p className="text-sm text-muted-foreground">iPhone • Last seen 2 hours ago</p>
                          </div>
                          <Button variant="outline" size="sm" className="glass-button">
                            Revoke
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="kyc">
                <Card className="glass-card border-white/20">
                  <CardHeader>
                    <CardTitle>KYC Verification</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Verify your identity to unlock all banking features
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* KYC Progress */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Verification Progress</h3>
                        <Badge className="bg-primary/10 text-primary">
                          {Math.round(getKycProgress())}% Complete
                        </Badge>
                      </div>
                      <Progress value={getKycProgress()} className="h-3" />
                    </div>

                    {/* Document Status */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Document Status</h3>
                      <div className="space-y-3">
                        {kycDocuments.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-white/20">
                            <div className="flex items-center gap-3">
                              {getStatusIcon(doc.status)}
                              <div>
                                <h4 className="font-medium">{doc.type}</h4>
                                <p className="text-sm text-muted-foreground">
                                  Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
                                  {doc.expiryDate && (
                                    <span> • Expires: {new Date(doc.expiryDate).toLocaleDateString()}</span>
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(doc.status)}>
                                {doc.status}
                              </Badge>
                              <Button variant="outline" size="sm" className="glass-button">
                                {doc.status === "pending" ? "View" : "Update"}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Upload New Document */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Upload Additional Documents</h3>
                      <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center">
                        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h4 className="font-medium mb-2">Upload Document</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Drag and drop files here or click to browse
                        </p>
                        <Button variant="outline" className="glass-button">
                          Choose Files
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Profile Summary */}
          <div className="space-y-6">
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle>Profile Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Avatar className="h-20 w-20 mx-auto mb-4">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                      {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold">{profileData.firstName} {profileData.lastName}</h3>
                  <p className="text-sm text-muted-foreground">Premium Account Holder</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{profileData.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{profileData.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{profileData.city}, {profileData.state}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Member since Jan 2024</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle>Account Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Account Verification</span>
                  <Badge className="bg-success/10 text-success">Verified</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">KYC Status</span>
                  <Badge className="bg-warning/10 text-warning">In Progress</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">2FA Security</span>
                  <Badge className="bg-success/10 text-success">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Account Type</span>
                  <Badge className="bg-primary/10 text-primary">Premium</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start glass-button">
                  <Shield className="mr-2 h-4 w-4" />
                  Security Settings
                </Button>
                <Button variant="outline" className="w-full justify-start glass-button">
                  <FileText className="mr-2 h-4 w-4" />
                  Account Statements
                </Button>
                <Button variant="outline" className="w-full justify-start glass-button">
                  <User className="mr-2 h-4 w-4" />
                  Close Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BankingLayout>
  );
};

export default Profile;