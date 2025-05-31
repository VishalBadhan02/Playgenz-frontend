
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, Mail, Shield, Bell, Trash, Bookmark, RefreshCcw, FileText, 
  Globe, Database, CreditCard, Upload
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SystemSettings = () => {
  const { toast } = useToast();
  const [emailSettings, setEmailSettings] = useState({
    enableNotifications: true,
    enableMarketingEmails: false,
    notificationDigestFrequency: 'daily',
    replyToEmail: 'noreply@sportsfinder.com',
    supportEmail: 'support@sportsfinder.com',
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    passwordExpiryDays: 90,
    maximumLoginAttempts: 5,
    sessionTimeoutMinutes: 60,
    enableStrongPasswordPolicy: true,
  });

  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    debugMode: false,
    cacheDuration: 60,
    defaultPagination: 20,
    maxUploadSize: 5,
    enableSocialLogin: true,
    defaultCurrency: 'usd',
    defaultLanguage: 'en',
  });

  const [termsOfService, setTermsOfService] = useState(
    `# Terms of Service\n\nLast updated: June 15, 2023\n\nThese Terms of Service govern your use of our website and platform for organizing and joining sports activities. By using our Service, you agree to these Terms. Please read them carefully.\n\n## 1. Accounts\n\nWhen you create an account with us, you must provide accurate and complete information. You are responsible for safeguarding the password that you use to access the Service and for any activities that occur under your account.`
  );

  const [privacyPolicy, setPrivacyPolicy] = useState(
    `# Privacy Policy\n\nLast updated: June 15, 2023\n\nThis Privacy Policy describes how we collect, use, and disclose your personal information when you use our website and services.\n\n## 1. Information We Collect\n\nWe collect information that you provide directly to us, such as when you create an account, participate in community features, fill out a form, or otherwise communicate with us.`
  );

  const handleSaveEmailSettings = () => {
    toast({
      title: "Email Settings Saved",
      description: "Your email notification settings have been updated successfully."
    });
  };

  const handleSaveSecuritySettings = () => {
    toast({
      title: "Security Settings Saved",
      description: "Your security settings have been updated successfully."
    });
  };

  const handleSaveSystemSettings = () => {
    toast({
      title: "System Settings Saved",
      description: "System settings have been updated successfully."
    });
  };

  const handleSaveTermsOfService = () => {
    toast({
      title: "Terms of Service Updated",
      description: "The Terms of Service have been updated successfully."
    });
  };

  const handleSavePrivacyPolicy = () => {
    toast({
      title: "Privacy Policy Updated",
      description: "The Privacy Policy has been updated successfully."
    });
  };

  const handleDatabaseBackup = () => {
    toast({
      title: "Backup Started",
      description: "Database backup has been initiated. You will be notified when complete."
    });
  };

  const handleCacheClear = () => {
    toast({
      title: "Cache Cleared",
      description: "System cache has been cleared successfully."
    });
  };

  return (
    <div className="w-full p-4 md:p-6 space-y-6">
      <div className="flex flex-col gap-4 mb-6">
        <h2 className="text-xl font-semibold">System Settings</h2>
        <p className="text-muted-foreground">
          Configure application settings, policies, and system maintenance
        </p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4 overflow-x-auto w-full justify-start">
          <TabsTrigger value="general" className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            <span>Email</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-1">
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="policies" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span>Policies</span>
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="flex items-center gap-1">
            <RefreshCcw className="h-4 w-4" />
            <span>Maintenance</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General System Settings</CardTitle>
              <CardDescription>
                Configure basic system settings and defaults
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                    <Switch 
                      id="maintenance-mode" 
                      checked={systemSettings.maintenanceMode}
                      onCheckedChange={(checked) => 
                        setSystemSettings({...systemSettings, maintenanceMode: checked})
                      }
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    When enabled, the site will display a maintenance message to users
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="debug-mode">Debug Mode</Label>
                    <Switch 
                      id="debug-mode" 
                      checked={systemSettings.debugMode}
                      onCheckedChange={(checked) => 
                        setSystemSettings({...systemSettings, debugMode: checked})
                      }
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Enables detailed error messages and logging
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cache-duration">Cache Duration (minutes)</Label>
                  <Input
                    id="cache-duration"
                    type="number"
                    value={systemSettings.cacheDuration}
                    onChange={(e) => 
                      setSystemSettings({...systemSettings, cacheDuration: parseInt(e.target.value) || 0})
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-pagination">Default Pagination Size</Label>
                  <Input
                    id="default-pagination"
                    type="number"
                    value={systemSettings.defaultPagination}
                    onChange={(e) => 
                      setSystemSettings({...systemSettings, defaultPagination: parseInt(e.target.value) || 10})
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-upload">Max Upload Size (MB)</Label>
                  <Input
                    id="max-upload"
                    type="number"
                    value={systemSettings.maxUploadSize}
                    onChange={(e) => 
                      setSystemSettings({...systemSettings, maxUploadSize: parseInt(e.target.value) || 1})
                    }
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="social-login">Enable Social Login</Label>
                    <Switch 
                      id="social-login" 
                      checked={systemSettings.enableSocialLogin}
                      onCheckedChange={(checked) => 
                        setSystemSettings({...systemSettings, enableSocialLogin: checked})
                      }
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Allow users to sign in with social accounts (Google, Facebook, etc.)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-currency">Default Currency</Label>
                  <Select
                    value={systemSettings.defaultCurrency}
                    onValueChange={(value) => 
                      setSystemSettings({...systemSettings, defaultCurrency: value})
                    }
                  >
                    <SelectTrigger id="default-currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                      <SelectItem value="jpy">JPY (¥)</SelectItem>
                      <SelectItem value="cad">CAD ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-language">Default Language</Label>
                  <Select
                    value={systemSettings.defaultLanguage}
                    onValueChange={(value) => 
                      setSystemSettings({...systemSettings, defaultLanguage: value})
                    }
                  >
                    <SelectTrigger id="default-language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button onClick={handleSaveSystemSettings}>
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Notification Settings</CardTitle>
              <CardDescription>
                Configure how the system sends emails and notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enable-notifications">Email Notifications</Label>
                    <Switch 
                      id="enable-notifications" 
                      checked={emailSettings.enableNotifications}
                      onCheckedChange={(checked) => 
                        setEmailSettings({...emailSettings, enableNotifications: checked})
                      }
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Send email notifications for important events
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="marketing-emails">Marketing Emails</Label>
                    <Switch 
                      id="marketing-emails" 
                      checked={emailSettings.enableMarketingEmails}
                      onCheckedChange={(checked) => 
                        setEmailSettings({...emailSettings, enableMarketingEmails: checked})
                      }
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Send promotional and marketing emails to users
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="digest-frequency">Notification Digest Frequency</Label>
                  <Select
                    value={emailSettings.notificationDigestFrequency}
                    onValueChange={(value) => 
                      setEmailSettings({...emailSettings, notificationDigestFrequency: value})
                    }
                  >
                    <SelectTrigger id="digest-frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reply-to">Reply-To Email Address</Label>
                  <Input
                    id="reply-to"
                    type="email"
                    value={emailSettings.replyToEmail}
                    onChange={(e) => 
                      setEmailSettings({...emailSettings, replyToEmail: e.target.value})
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="support-email">Support Email Address</Label>
                  <Input
                    id="support-email"
                    type="email"
                    value={emailSettings.supportEmail}
                    onChange={(e) => 
                      setEmailSettings({...emailSettings, supportEmail: e.target.value})
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button onClick={handleSaveEmailSettings}>
                  Save Email Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure authentication and security policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                    <Switch 
                      id="two-factor" 
                      checked={securitySettings.twoFactorAuth}
                      onCheckedChange={(checked) => 
                        setSecuritySettings({...securitySettings, twoFactorAuth: checked})
                      }
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Require two-factor authentication for all administrators
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password-policy">Strong Password Policy</Label>
                    <Switch 
                      id="password-policy" 
                      checked={securitySettings.enableStrongPasswordPolicy}
                      onCheckedChange={(checked) => 
                        setSecuritySettings({...securitySettings, enableStrongPasswordPolicy: checked})
                      }
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Enforce strong password requirements
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                  <Input
                    id="password-expiry"
                    type="number"
                    value={securitySettings.passwordExpiryDays}
                    onChange={(e) => 
                      setSecuritySettings({...securitySettings, passwordExpiryDays: parseInt(e.target.value) || 90})
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-attempts">Maximum Login Attempts</Label>
                  <Input
                    id="login-attempts"
                    type="number"
                    value={securitySettings.maximumLoginAttempts}
                    onChange={(e) => 
                      setSecuritySettings({...securitySettings, maximumLoginAttempts: parseInt(e.target.value) || 5})
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    value={securitySettings.sessionTimeoutMinutes}
                    onChange={(e) => 
                      setSecuritySettings({...securitySettings, sessionTimeoutMinutes: parseInt(e.target.value) || 60})
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button onClick={handleSaveSecuritySettings}>
                  Save Security Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Legal Policies */}
        <TabsContent value="policies">
          <Card>
            <CardHeader>
              <CardTitle>Legal Documents</CardTitle>
              <CardDescription>
                Manage Terms of Service, Privacy Policy, and other legal documents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="terms-of-service" className="text-base font-medium">Terms of Service</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Last updated: June 15, 2023
                  </p>
                  <Textarea
                    id="terms-of-service"
                    rows={10}
                    value={termsOfService}
                    onChange={(e) => setTermsOfService(e.target.value)}
                    className="font-mono text-sm"
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveTermsOfService}>
                    Update Terms of Service
                  </Button>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t">
                <div>
                  <Label htmlFor="privacy-policy" className="text-base font-medium">Privacy Policy</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Last updated: June 15, 2023
                  </p>
                  <Textarea
                    id="privacy-policy"
                    rows={10}
                    value={privacyPolicy}
                    onChange={(e) => setPrivacyPolicy(e.target.value)}
                    className="font-mono text-sm"
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSavePrivacyPolicy}>
                    Update Privacy Policy
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Maintenance */}
        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle>System Maintenance</CardTitle>
              <CardDescription>
                Database backups, cache management, and system maintenance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Database className="h-5 w-5 text-primary" />
                      Database Backup
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Create a backup of the entire database. This process may take several minutes.
                    </p>
                    <div className="flex flex-col gap-4">
                      <Button onClick={handleDatabaseBackup}>
                        Start Backup
                      </Button>
                      <div className="text-xs text-muted-foreground">
                        Last backup: June 28, 2023 at 03:15 AM
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <RefreshCcw className="h-5 w-5 text-primary" />
                      Cache Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Clear the system cache to free up memory and resolve any caching issues.
                    </p>
                    <div className="flex flex-col gap-4">
                      <Button variant="outline" onClick={handleCacheClear}>
                        Clear Cache
                      </Button>
                      <div className="text-xs text-muted-foreground">
                        Cache last cleared: June 27, 2023 at 10:42 PM
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Trash className="h-5 w-5 text-primary" />
                      Clean Old Data
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Remove old logs, expired sessions, and temporary data from the system.
                    </p>
                    <Button variant="outline">
                      Clean System Data
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Upload className="h-5 w-5 text-primary" />
                      System Updates
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Check for and install available system updates.
                    </p>
                    <Button variant="outline">
                      Check for Updates
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemSettings;
