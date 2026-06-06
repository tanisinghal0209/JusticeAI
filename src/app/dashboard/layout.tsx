import Link from "next/link";
import { 
  Home, Briefcase, Bot, FileText, PenTool, 
  BookOpen, Clock, Handshake, Settings 
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarLinks = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "My Cases", href: "/dashboard/cases", icon: Briefcase },
    { name: "AI Assistant", href: "/dashboard/ai", icon: Bot },
    { name: "Documents", href: "/dashboard/documents", icon: FileText },
    { name: "Complaint Generator", href: "/dashboard/complaints", icon: PenTool },
    { name: "Laws Database", href: "/dashboard/laws", icon: BookOpen },
    { name: "Timeline", href: "/dashboard/timeline", icon: Clock },
    { name: "Legal Aid", href: "/dashboard/aid", icon: Handshake },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-secondary/20 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
          <span className="text-xl font-bold text-sidebar-primary">JusticeAI</span>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                <Icon className="h-5 w-5" />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6">
          <h2 className="text-lg font-semibold">Dashboard</h2>
          {/* User Profile / Auth UI will go here */}
          <div className="h-8 w-8 rounded-full bg-primary/20"></div>
        </header>
        <div className="p-6 flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
