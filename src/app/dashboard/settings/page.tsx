"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserButton } from "@clerk/nextjs";
import { Settings, Bell, Shield, Key } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto pb-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings, preferences, and notifications.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-2">
          <Button variant="secondary" className="w-full justify-start"><Settings className="mr-2 h-4 w-4" /> General</Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground"><Bell className="mr-2 h-4 w-4" /> Notifications</Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground"><Shield className="mr-2 h-4 w-4" /> Privacy & Security</Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground"><Key className="mr-2 h-4 w-4" /> API Keys</Button>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
              <CardDescription>Update your personal information associated with your JusticeAI account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 py-4 border-b border-border/50">
                <UserButton />
                <span className="text-sm font-medium">Manage Clerk Account</span>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input placeholder="Tanisha Singhal" defaultValue="Tanisha Singhal" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input type="email" placeholder="example@gmail.com" />
              </div>
              <Button onClick={() => alert("Settings saved successfully!")}>Save Changes</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
