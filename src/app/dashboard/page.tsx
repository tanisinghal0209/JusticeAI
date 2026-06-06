import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, FileText, PenTool, Bot } from "lucide-react";

export default function DashboardHome() {
  const stats = [
    { title: "Active Cases", value: "2", icon: Briefcase, color: "text-blue-600" },
    { title: "Documents Uploaded", value: "14", icon: FileText, color: "text-emerald-600" },
    { title: "Complaints Generated", value: "3", icon: PenTool, color: "text-amber-600" },
    { title: "AI Consultations", value: "8", icon: Bot, color: "text-purple-600" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
        <p className="text-muted-foreground mt-1">Here's an overview of your legal matters.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No recent activity to show.</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Suggested Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4 p-3 bg-secondary/50 rounded-lg">
              <Bot className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium">Continue AI Consultation</p>
                <p className="text-xs text-muted-foreground">Pick up where you left off regarding "Property Dispute".</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
