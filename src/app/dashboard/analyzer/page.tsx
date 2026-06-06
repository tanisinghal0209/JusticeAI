"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, ShieldAlert, Languages, ArrowRight, 
  UploadCloud, Search, CheckCircle2 
} from "lucide-react";
import * as motion from "framer-motion/client";

export default function PDFAnalyzerPage() {
  const [analyzed, setAnalyzed] = useState(false);

  return (
    <div className="max-w-6xl mx-auto pb-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">PDF Analyzer</h1>
        <p className="text-muted-foreground">Upload complex legal documents and let AI break them down into simple terms.</p>
      </div>

      {!analyzed ? (
        <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-colors bg-secondary/10">
          <CardContent className="flex flex-col items-center justify-center py-24 text-center">
            <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <UploadCloud className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Upload Legal Document</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Supported: Rental Agreement, Employment Contract, Legal Notice, Court Summons, FIR, etc.
            </p>
            <Button size="lg" className="h-12 px-8" onClick={() => setAnalyzed(true)}>
              Analyze Document
            </Button>
          </CardContent>
        </Card>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-xl">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Employment_Contract_Final.pdf</h2>
                <p className="text-sm text-muted-foreground">Classified as: Employment Contract</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => setAnalyzed(false)}>Upload Another</Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-primary" /> Document Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This is a standard employment contract between Tech Solutions Ltd and the employee. It outlines an annual compensation of ₹12,00,000, a probation period of 6 months, and standard benefits. The notice period is set at 90 days.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-destructive/50 bg-destructive/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <ShieldAlert className="h-5 w-5" /> Risky Clauses Identified
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-background rounded-lg border border-border">
                    <h4 className="text-sm font-semibold mb-1">Clause 12.4: Non-Compete</h4>
                    <p className="text-sm text-muted-foreground italic mb-2">"The Employee shall not engage in any similar business or employment for a period of 2 years post-termination within the territory of India."</p>
                    <p className="text-sm font-medium text-destructive">Risk: Extremely broad geographically and temporally. Under Section 27 of the Indian Contract Act, such broad non-competes are often void and unenforceable.</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Languages className="h-5 w-5 text-primary" /> Plain Language Translation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Original Legal Text (Clause 8)</h4>
                    <p className="text-sm italic mb-4">"The Company reserves the right to terminate this Agreement without cause by providing 30 days' written notice, or payment in lieu thereof, at its sole discretion."</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-xs font-semibold uppercase text-primary mb-1">English Translation</h4>
                        <p className="text-sm">The company can fire you at any time without giving a reason. If they do, they must either give you 30 days' notice or pay you for those 30 days immediately.</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold uppercase text-primary mb-1">Hindi (हिंदी) Translation</h4>
                        <p className="text-sm font-medium">कंपनी आपको किसी भी समय बिना कारण बताए नौकरी से निकाल सकती है। यदि वे ऐसा करते हैं, तो उन्हें आपको 30 दिन पहले नोटिस देना होगा या तुरंत 30 दिन का वेतन देना होगा।</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" /> Next Step Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">1</span>
                      <p className="text-sm">Ask HR to clarify or narrow down the scope of the Non-Compete clause (Clause 12.4) before signing.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">2</span>
                      <p className="text-sm">Confirm if the 90-day notice period applies during the 6-month probation period, as the contract is ambiguous.</p>
                    </li>
                  </ul>
                  <Button className="w-full mt-6">
                    Chat with AI about this document <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
