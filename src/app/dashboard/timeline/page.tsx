"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Briefcase, FileText, Bot } from "lucide-react";

const GLOBAL_TIMELINE = [
  { date: "Oct 20, 2024", title: "Generated Legal Notice", desc: "For Case #123 (Security Deposit Dispute)", icon: FileText, color: "text-blue-500" },
  { date: "Oct 18, 2024", title: "Evidence Added", desc: "Uploaded Rental Agreement", icon: Briefcase, color: "text-emerald-500" },
  { date: "Oct 15, 2024", title: "New Case Opened", desc: "Security Deposit Dispute created", icon: Briefcase, color: "text-primary" },
  { date: "Oct 10, 2024", title: "AI Consultation", desc: "Discussed tenant rights under Maharashtra Rent Control Act", icon: Bot, color: "text-purple-500" },
];

export default function TimelinePage() {
  return (
    <div className="max-w-4xl mx-auto pb-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Global Timeline</h1>
        <p className="text-muted-foreground">A chronological history of all your interactions, cases, and documents on JusticeAI.</p>
      </div>

      <Card className="border-border">
        <CardHeader className="bg-secondary/30 border-b border-border/50 pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="h-5 w-5 text-primary" /> Activity History
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-8">
          <div className="space-y-8">
            {GLOBAL_TIMELINE.map((event, i) => {
              const Icon = event.icon;
              return (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center shrink-0 z-10 border-4 border-background">
                      <Icon className={`h-4 w-4 ${event.color}`} />
                    </div>
                    {i !== GLOBAL_TIMELINE.length - 1 && <div className="w-[2px] h-full bg-border -mt-2" />}
                  </div>
                  <div className="pt-2 pb-6">
                    <p className="text-xs font-semibold text-muted-foreground mb-1">{event.date}</p>
                    <p className="text-base font-semibold text-foreground">{event.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{event.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
