"use client";

import { use } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, BookOpen, ShieldCheck, 
  Gavel, HelpCircle, FileText, Scale
} from "lucide-react";
import * as motion from "framer-motion/client";

export default function LawDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  // Mock data for the specific law based on ID
  // In a real app, this would be fetched from the database
  const lawTitle = id === "bns" ? "Bharatiya Nyaya Sanhita (BNS)" : 
                   id === "cpa" ? "Consumer Protection Act, 2019" : 
                   "Legal Act Overview";

  return (
    <div className="max-w-4xl mx-auto pb-12 space-y-8">
      <div>
        <Link href="/dashboard/laws">
          <Button variant="ghost" className="mb-6 -ml-4 text-muted-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Laws
          </Button>
        </Link>
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">{lawTitle}</h1>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">Criminal Law</span>
          <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm font-semibold rounded-full">Passed: 2023</span>
        </div>
      </div>

      <div className="grid gap-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-border">
            <CardHeader className="bg-secondary/30 border-b border-border/50">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="h-5 w-5 text-primary" /> Overview & Purpose
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-muted-foreground leading-relaxed">
                The {lawTitle} replaces the colonial-era Indian Penal Code (IPC). Its primary purpose is to modernize the justice system, prioritizing offenses against women and children, introducing community service as a penalty for minor crimes, and defining terrorism and organized crime clearly.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-border">
            <CardHeader className="bg-secondary/30 border-b border-border/50">
              <CardTitle className="flex items-center gap-2 text-lg">
                <ShieldCheck className="h-5 w-5 text-emerald-600" /> Rights Protected
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3 text-muted-foreground list-disc list-inside">
                <li>Right to register a Zero FIR at any police station regardless of jurisdiction.</li>
                <li>Right to receive a free copy of the FIR immediately.</li>
                <li>Enhanced protection for victims of sexual offenses and minors.</li>
                <li>Protection against deceptive promises to marry.</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="h-full border-destructive/20">
              <CardHeader className="bg-destructive/5 border-b border-destructive/10">
                <CardTitle className="flex items-center gap-2 text-lg text-destructive">
                  <Gavel className="h-5 w-5" /> Penalties
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-4">The Act introduces structured penalties including:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between border-b border-border pb-2">
                    <span className="font-medium text-foreground">Organized Crime</span>
                    <span className="text-destructive font-semibold">Life or Death</span>
                  </li>
                  <li className="flex justify-between border-b border-border pb-2">
                    <span className="font-medium text-foreground">Snatching</span>
                    <span className="text-destructive font-semibold">Up to 3 Years</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium text-foreground">Petty Theft</span>
                    <span className="text-emerald-600 font-semibold">Community Service</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="h-full border-border">
              <CardHeader className="bg-secondary/30 border-b border-border/50">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5 text-blue-600" /> Examples in Practice
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="bg-secondary/30 p-3 rounded-lg border border-border/50">
                  <p className="text-sm font-semibold mb-1">Scenario: Mobile Snatching</p>
                  <p className="text-xs text-muted-foreground">Under the old IPC, this was treated as simple theft. Under BNS Section 302, snatching is a distinct offense carrying a strict penalty of up to 3 years.</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="border-border">
            <CardHeader className="bg-secondary/30 border-b border-border/50">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Scale className="h-5 w-5 text-primary" /> Recent Judgments & Precedents
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="pb-4 border-b border-border">
                  <h4 className="font-semibold text-primary">State vs. ABC (2024)</h4>
                  <p className="text-sm text-muted-foreground mt-1">Clarified the application of the newly introduced 'community service' provision for first-time petty offenders under BNS, emphasizing restorative justice.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="border-border">
            <CardHeader className="bg-secondary/30 border-b border-border/50">
              <CardTitle className="flex items-center gap-2 text-lg">
                <HelpCircle className="h-5 w-5 text-primary" /> FAQs
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <h4 className="font-medium">Does this mean the IPC is completely invalid now?</h4>
                <p className="text-sm text-muted-foreground mt-1">For crimes committed after July 1, 2024, the BNS applies. For crimes committed before this date, the IPC will continue to apply during trials.</p>
              </div>
              <div className="pt-4 border-t border-border/50">
                <h4 className="font-medium">Can I file a case under BNS digitally?</h4>
                <p className="text-sm text-muted-foreground mt-1">Yes, the BNSS (the procedural counterpart) mandates the allowance of digital/electronic filing of FIRs and evidence.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
