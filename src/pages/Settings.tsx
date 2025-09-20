import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Save, Globe, Shield, Bell } from "lucide-react";

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">
              Configure your website and WordPress export settings
            </p>
          </div>
          <Button className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>

        <div className="grid gap-6 max-w-2xl">
          {/* Site Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Site Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Site Title</Label>
                <Input placeholder="My Awesome Website" />
              </div>
              <div className="space-y-2">
                <Label>Site Description</Label>
                <Textarea placeholder="A brief description of your website..." />
              </div>
              <div className="space-y-2">
                <Label>Site URL</Label>
                <Input placeholder="https://mywebsite.com" />
              </div>
            </CardContent>
          </Card>

          {/* WordPress Export Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                WordPress Export
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>WordPress Site URL</Label>
                <Input placeholder="https://yourwordpress.com" />
              </div>
              <div className="space-y-2">
                <Label>Username</Label>
                <Input placeholder="admin" />
              </div>
              <div className="space-y-2">
                <Label>Application Password</Label>
                <Input type="password" placeholder="•••••••••••" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-publish changes</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically publish changes to WordPress
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications about site updates
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Publishing alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when content is published
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}