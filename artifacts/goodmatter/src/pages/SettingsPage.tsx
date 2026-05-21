import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/auth-context";
import {
  Settings,
  User,
  Bell,
  Shield,
  CreditCard,
  Palette,
  Globe,
  Trash2,
  Save,
} from "lucide-react";

const SECTIONS = [
  { id: "profile",       label: "Profile",        icon: User },
  { id: "notifications", label: "Notifications",  icon: Bell },
  { id: "security",      label: "Security",       icon: Shield },
  { id: "billing",       label: "Billing",        icon: CreditCard },
  { id: "appearance",    label: "Appearance",     icon: Palette },
  { id: "preferences",   label: "Preferences",    icon: Globe },
];

export default function SettingsPage() {
  const { role } = useAuth();
  const [active, setActive] = useState("profile");
  const [notifications, setNotifications] = useState({
    dealAlerts: true,
    investorMessages: true,
    weeklyDigest: false,
    productUpdates: true,
  });
  const [darkMode, setDarkMode] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Layout>
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-white/[0.06] px-6 py-4">
        <div className="flex items-center gap-3">
          <Settings className="w-5 h-5 text-primary" />
          <h1 className="font-display font-bold text-xl text-white">Settings</h1>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-0 max-w-5xl mx-auto w-full px-6 py-8">
        {/* Sidebar nav */}
        <nav className="md:w-48 flex-shrink-0 mb-6 md:mb-0 md:mr-8">
          <div className="space-y-0.5">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
                  active === s.id
                    ? "bg-primary/15 text-white border-l-2 border-primary"
                    : "text-white/45 hover:bg-white/[0.04] hover:text-white/80"
                }`}
              >
                <s.icon className={`w-4 h-4 flex-shrink-0 ${active === s.id ? "text-primary" : ""}`} />
                {s.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1 min-w-0">

          {active === "profile" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-white font-semibold text-base mb-1">Profile Information</h2>
                <p className="text-white/40 text-sm">Update your personal details and public profile.</p>
              </div>
              <Separator className="bg-white/[0.06]" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white/60 text-xs uppercase tracking-wider">Full Name</Label>
                  <Input placeholder="Your name" className="mt-1.5 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/25 rounded-xl focus-visible:ring-primary" />
                </div>
                <div>
                  <Label className="text-white/60 text-xs uppercase tracking-wider">Email</Label>
                  <Input placeholder="you@company.com" className="mt-1.5 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/25 rounded-xl focus-visible:ring-primary" />
                </div>
                <div>
                  <Label className="text-white/60 text-xs uppercase tracking-wider">Phone</Label>
                  <Input placeholder="+91 98765 43210" className="mt-1.5 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/25 rounded-xl focus-visible:ring-primary" />
                </div>
                <div>
                  <Label className="text-white/60 text-xs uppercase tracking-wider">Role</Label>
                  <Input value={role ? role.charAt(0).toUpperCase() + role.slice(1) : "Not logged in"} readOnly className="mt-1.5 bg-white/[0.03] border-white/[0.08] text-white/50 rounded-xl cursor-not-allowed" />
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-white/60 text-xs uppercase tracking-wider">Company / Fund Name</Label>
                  <Input placeholder="Startup or fund name" className="mt-1.5 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/25 rounded-xl focus-visible:ring-primary" />
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-white/60 text-xs uppercase tracking-wider">Bio</Label>
                  <textarea
                    placeholder="Short bio visible to the network…"
                    rows={3}
                    className="mt-1.5 w-full bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-white/25 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/40 resize-none"
                  />
                </div>
              </div>
              <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-white rounded-xl gap-2">
                <Save className="w-4 h-4" />
                {saved ? "Saved!" : "Save Changes"}
              </Button>
            </div>
          )}

          {active === "notifications" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-white font-semibold text-base mb-1">Notification Preferences</h2>
                <p className="text-white/40 text-sm">Choose what you want to be notified about.</p>
              </div>
              <Separator className="bg-white/[0.06]" />
              <div className="space-y-4">
                {[
                  { key: "dealAlerts",        label: "Deal Alerts",          desc: "New deals matching your criteria" },
                  { key: "investorMessages",  label: "Investor Messages",    desc: "Direct messages from investors" },
                  { key: "weeklyDigest",      label: "Weekly Digest",        desc: "Summary of activity every Monday" },
                  { key: "productUpdates",    label: "Product Updates",      desc: "New features and announcements" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div>
                      <p className="text-sm font-medium text-white">{item.label}</p>
                      <p className="text-xs text-white/40 mt-0.5">{item.desc}</p>
                    </div>
                    <Switch
                      checked={notifications[item.key as keyof typeof notifications]}
                      onCheckedChange={(v) => setNotifications((n) => ({ ...n, [item.key]: v }))}
                    />
                  </div>
                ))}
              </div>
              <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-white rounded-xl gap-2">
                <Save className="w-4 h-4" />
                {saved ? "Saved!" : "Save Changes"}
              </Button>
            </div>
          )}

          {active === "security" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-white font-semibold text-base mb-1">Security</h2>
                <p className="text-white/40 text-sm">Manage your account security and active sessions.</p>
              </div>
              <Separator className="bg-white/[0.06]" />
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <p className="text-sm font-medium text-white mb-1">Two-Factor Authentication</p>
                  <p className="text-xs text-white/40 mb-3">Add an extra layer of security to your account.</p>
                  <Button variant="outline" size="sm" className="border-white/10 text-white/70 hover:text-white rounded-xl">Enable 2FA</Button>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <p className="text-sm font-medium text-white mb-1">Active Sessions</p>
                  <p className="text-xs text-white/40 mb-3">You are currently signed in on 1 device.</p>
                  <Button variant="outline" size="sm" className="border-white/10 text-white/70 hover:text-white rounded-xl">Revoke All Sessions</Button>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <p className="text-sm font-medium text-white mb-1">Change Login Method</p>
                  <p className="text-xs text-white/40 mb-3">Switch between OTP and Google login.</p>
                  <Button variant="outline" size="sm" className="border-white/10 text-white/70 hover:text-white rounded-xl">Manage Login</Button>
                </div>
              </div>
            </div>
          )}

          {active === "billing" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-white font-semibold text-base mb-1">Billing & Subscription</h2>
                <p className="text-white/40 text-sm">Manage your plan and payment details.</p>
              </div>
              <Separator className="bg-white/[0.06]" />
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">Free Plan</p>
                    <p className="text-xs text-white/40 mt-0.5">Limited access to deal feed and network</p>
                  </div>
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-white rounded-xl">Upgrade</Button>
                </div>
              </div>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <p className="text-sm font-medium text-white mb-1">Payment Method</p>
                  <p className="text-xs text-white/40 mb-3">No payment method on file.</p>
                  <Button variant="outline" size="sm" className="border-white/10 text-white/70 hover:text-white rounded-xl">Add Card</Button>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <p className="text-sm font-medium text-white mb-1">Billing History</p>
                  <p className="text-xs text-white/40">No invoices yet.</p>
                </div>
              </div>
            </div>
          )}

          {active === "appearance" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-white font-semibold text-base mb-1">Appearance</h2>
                <p className="text-white/40 text-sm">Customize how GoodMatter looks for you.</p>
              </div>
              <Separator className="bg-white/[0.06]" />
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div>
                    <p className="text-sm font-medium text-white">Dark Mode</p>
                    <p className="text-xs text-white/40 mt-0.5">Use dark theme across the platform</p>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div>
                    <p className="text-sm font-medium text-white">Compact View</p>
                    <p className="text-xs text-white/40 mt-0.5">Reduce spacing in feed and lists</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
          )}

          {active === "preferences" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-white font-semibold text-base mb-1">Preferences</h2>
                <p className="text-white/40 text-sm">Set your deal and network preferences.</p>
              </div>
              <Separator className="bg-white/[0.06]" />
              <div className="space-y-4">
                <div>
                  <Label className="text-white/60 text-xs uppercase tracking-wider">Preferred Sectors</Label>
                  <Input placeholder="e.g. Fintech, SaaS, Climate" className="mt-1.5 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/25 rounded-xl focus-visible:ring-primary" />
                </div>
                <div>
                  <Label className="text-white/60 text-xs uppercase tracking-wider">Investment Stage</Label>
                  <Input placeholder="e.g. Pre-seed, Seed, Series A" className="mt-1.5 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/25 rounded-xl focus-visible:ring-primary" />
                </div>
                <div>
                  <Label className="text-white/60 text-xs uppercase tracking-wider">Geography</Label>
                  <Input placeholder="e.g. India, SEA, Global" className="mt-1.5 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white/25 rounded-xl focus-visible:ring-primary" />
                </div>
              </div>
              <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-white rounded-xl gap-2">
                <Save className="w-4 h-4" />
                {saved ? "Saved!" : "Save Changes"}
              </Button>
              <Separator className="bg-white/[0.06]" />
              <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20">
                <p className="text-sm font-semibold text-destructive mb-1">Danger Zone</p>
                <p className="text-xs text-white/40 mb-3">Permanently delete your account and all data.</p>
                <Button variant="outline" size="sm" className="border-destructive/30 text-destructive hover:bg-destructive/10 rounded-xl gap-2">
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete Account
                </Button>
              </div>
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
}
