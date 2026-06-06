"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  UploadCloud, FileText, FileSearch, ShieldAlert, 
  CalendarDays, MapPin, BadgeIndianRupee, Scale, 
  ListChecks, AlertTriangle, MessageSquare, Loader2,
  FileCheck, Users
} from "lucide-react";
import * as motion from "framer-motion/client";
import Link from "next/link";

type UploadState = "idle" | "uploading" | "analyzing" | "complete";

export default function DocumentCenterPage() {
  const [uploadState, setUploadState] = useState<UploadState>("idle");

  const handleUpload = () => {
    setUploadState("uploading");
    
    // Simulate upload
    setTimeout(() => {
      setUploadState("analyzing");
      
      // Simulate OCR and analysis
      setTimeout(() => {
        setUploadState("complete");
      }, 3000);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto pb-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Document Center</h1>
        <p className="text-muted-foreground">Upload your legal documents for AI-powered OCR and risk analysis.</p>
      </div>

      {uploadState === "idle" && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-colors bg-secondary/10">
            <CardContent className="flex flex-col items-center justify-center py-24 text-center">
              <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <UploadCloud className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Drag & Drop Documents</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Supported formats: PDF, DOCX, JPG, PNG, and Scanned Documents up to 50MB.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="h-12 px-8" onClick={handleUpload}>
                  Browse Files
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {(uploadState === "uploading" || uploadState === "analyzing") && (
        <Card className="border-border shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-32 text-center">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-6" />
            <h3 className="text-xl font-semibold mb-2">
              {uploadState === "uploading" ? "Uploading Rent_Agreement_2024.pdf..." : "Running OCR & Legal Analysis..."}
            </h3>
            <p className="text-muted-foreground max-w-sm">
              {uploadState === "uploading" 
                ? "Securely transferring your document to our encrypted servers." 
                : "Extracting clauses, identifying risks, and cross-referencing Indian laws."}
            </p>
          </CardContent>
        </Card>
      )}

      {uploadState === "complete" && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Left Column: Extraction Details */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader className="bg-secondary/30 border-b border-border/50 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Rent_Agreement_2024.pdf</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">Processed successfully</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border/50">
                  <div className="p-4 flex items-start gap-3">
                    <Users className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold uppercase text-muted-foreground">Entities</p>
                      <p className="text-sm">Rajesh Kumar (Landlord)<br/>Anita Sharma (Tenant)</p>
                    </div>
                  </div>
                  <div className="p-4 flex items-start gap-3">
                    <CalendarDays className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold uppercase text-muted-foreground">Dates</p>
                      <p className="text-sm">Start: 01-Jan-2024<br/>End: 30-Nov-2024</p>
                    </div>
                  </div>
                  <div className="p-4 flex items-start gap-3">
                    <BadgeIndianRupee className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold uppercase text-muted-foreground">Financials</p>
                      <p className="text-sm">Rent: ₹25,000/month<br/>Deposit: ₹75,000</p>
                    </div>
                  </div>
                  <div className="p-4 flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold uppercase text-muted-foreground">Property</p>
                      <p className="text-sm">Flat 4B, Sunrise Apts, Andheri East, Mumbai</p>
                    </div>
                  </div>
                  <div className="p-4 flex items-start gap-3">
                    <Scale className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold uppercase text-muted-foreground">Legal Ref.</p>
                      <p className="text-sm">Maharashtra Rent Control Act, 1999</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full h-12" variant="outline" onClick={() => setUploadState("idle")}>
              Upload Another Document
            </Button>
          </div>

          {/* Right Column: AI Analysis */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileSearch className="h-5 w-5 text-primary" />
                  <CardTitle>AI Document Analysis</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-primary mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4" /> Summary
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed bg-secondary/30 p-4 rounded-lg">
                    This is an 11-month Leave and License agreement for a residential property in Mumbai. The tenant is required to pay a monthly rent of ₹25,000 and a refundable security deposit of ₹75,000. The lock-in period is defined as 6 months.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-destructive mb-2 flex items-center gap-2">
                      <ShieldAlert className="h-4 w-4" /> Key Risks
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-2 bg-destructive/5 p-4 rounded-lg border border-destructive/10">
                      <li className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-destructive mt-1.5 shrink-0" />
                        Clause 7 allows the landlord to terminate with only 15 days notice, which deviates from standard 30-day norms.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-destructive mt-1.5 shrink-0" />
                        Maintenance charges are not explicitly capped, leaving room for arbitrary increases.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-amber-600 mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" /> Missing Info
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-2 bg-amber-500/5 p-4 rounded-lg border border-amber-500/20">
                      <li className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        No explicit clause on whether painting charges will be deducted from the deposit at move-out.
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-emerald-600 mb-2 flex items-center gap-2">
                    <ListChecks className="h-4 w-4" /> Recommended Actions
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-2 bg-emerald-500/5 p-4 rounded-lg border border-emerald-500/20">
                    <li className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      Request an amendment to Clause 7 to increase the termination notice period to 30 days.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      Ensure the agreement is formally registered; notarization alone is not fully legally binding in Maharashtra for leave and license.
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" /> Chat with this Document
                  </h3>
                  <p className="text-primary-foreground/80 text-sm">Have specific questions? Ask JusticeAI.</p>
                </div>
                <Link href="/dashboard/ai">
                  <Button variant="secondary" className="bg-background text-foreground hover:bg-background/90">
                    Ask Questions
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}
    </div>
  );
}

