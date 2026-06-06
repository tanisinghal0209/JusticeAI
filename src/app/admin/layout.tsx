import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { 
  LayoutDashboard, BookOpen, Users, AlertTriangle, 
  MessageSquare, ShieldCheck, Database, Settings, LogOut,
  Activity
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 border-b md:border-r border-border bg-card flex flex-col">
        <div className="p-6 border-b border-border flex items-center justify-between md:justify-center">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="bg-destructive p-1.5 rounded-lg">
              <ShieldCheck className="h-5 w-5 text-destructive-foreground" />
            </div>
            <span className="font-bold text-xl tracking-tight">JusticeAI <span className="text-destructive">Admin</span></span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-secondary text-foreground">
            <LayoutDashboard className="h-4 w-4" /> Overview
          </Link>
          <div className="pt-4 pb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Management
          </div>
          <Link href="/admin/laws" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <BookOpen className="h-4 w-4" /> Manage Laws
          </Link>
          <Link href="/admin/cases" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <Database className="h-4 w-4" /> Manage Cases
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <Users className="h-4 w-4" /> Manage Users
          </Link>

          <div className="pt-4 pb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            AI & Moderation
          </div>
          <Link href="/admin/ai-monitoring" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <Activity className="h-4 w-4" /> AI Accuracy
          </Link>
          <Link href="/admin/moderation" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <AlertTriangle className="h-4 w-4" /> Content Moderation
          </Link>
          <Link href="/admin/feedback" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <MessageSquare className="h-4 w-4" /> User Feedback
          </Link>
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <UserButton />
            <span className="text-sm font-medium">Admin User</span>
          </div>
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            <LogOut className="h-4 w-4" /> Exit Admin
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

