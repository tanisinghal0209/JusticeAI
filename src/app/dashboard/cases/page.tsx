"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Scale, ArrowRight, Plus } from "lucide-react";
import * as motion from "framer-motion/client";

const CASES = [
  { id: "123", title: "Security Deposit Dispute", type: "Property Law", status: "Action Required", date: "Oct 15, 2024" },
  { id: "124", title: "Defective Product Refund", type: "Consumer Complaints", status: "Pending Resolution", date: "Sep 28, 2024" },
  { id: "125", title: "Unlawful Termination", type: "Employment Law", status: "Closed", date: "Aug 10, 2024" },
];

export default function CasesPage() {
  return (
    <div className="max-w-6xl mx-auto pb-12 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">My Cases</h1>
          <p className="text-muted-foreground">Manage and track your active legal disputes.</p>
        </div>
        <Link href="/dashboard/cases/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Start New Case
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {CASES.map((c, index) => (
          <motion.div 
            key={c.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/dashboard/cases/${c.id}`}>
              <Card className="hover:border-primary/50 transition-colors group">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-secondary/50 rounded-lg group-hover:bg-primary/10 transition-colors">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{c.title}</h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1"><Scale className="h-3 w-3" /> {c.type}</span>
                        <span>•</span>
                        <span>Opened: {c.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                      c.status === 'Action Required' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' : 
                      c.status === 'Closed' ? 'bg-secondary text-muted-foreground border-border' : 
                      'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                    }`}>
                      {c.status}
                    </span>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
