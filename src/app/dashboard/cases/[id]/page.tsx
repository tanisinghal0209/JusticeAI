"use client";

import { use, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, Activity, Scale, ShieldAlert, FileSearch, 
  Map as MapIcon, Clock, CheckCircle2, Circle, ChevronDown, 
  ChevronUp, AlertCircle, CalendarDays, UploadCloud
} from "lucide-react";
import * as motion from "framer-motion/client";

// Mock data for Default Case (Rental Dispute)
const DEFAULT_ROADMAP = [
  { id: 1, title: "Understand Rights", desc: "Review relevant laws (Maharashtra Rent Control Act) to understand tenant protections against arbitrary deposit withholding.", status: "completed" },
  { id: 2, title: "Collect Evidence", desc: "Gather the signed rental agreement, rent receipts, WhatsApp conversations regarding move-out, and photos of the flat condition.", status: "in-progress" },
  { id: 3, title: "Send Notice", desc: "Draft and dispatch a formal Legal Notice to the landlord demanding the return of the deposit within 15 days.", status: "pending" },
  { id: 4, title: "File Complaint", desc: "If the notice is ignored, file a formal complaint with the Rent Controller or Small Causes Court.", status: "pending" },
  { id: 5, title: "Approach Authority", desc: "Attend the initial mediation or conciliation hearing called by the authorities.", status: "pending" },
  { id: 6, title: "Court Action", desc: "Proceed with formal litigation if mediation fails.", status: "pending" },
];

const DEFAULT_TIMELINE = [
  { date: "Oct 15, 2024", title: "Incident Date", desc: "Landlord officially refused to return the deposit via email." },
  { date: "Oct 18, 2024", title: "Evidence Added", desc: "Uploaded Rental Agreement and WhatsApp screenshots." },
  { date: "Oct 20, 2024", title: "AI Consultation", desc: "Evaluated case strength and generated Legal Notice draft." },
];

// Mock data for New Intakes
const NEW_ROADMAP = [
  { id: 1, title: "Initial Intake", desc: "You have successfully submitted your preliminary case description to JusticeAI.", status: "completed" },
  { id: 2, title: "Collect Evidence", desc: "Upload relevant documents, photographs, medical records, or screenshots to strengthen your case.", status: "in-progress" },
  { id: 3, title: "Consult Legal Aid", desc: "Review your options with a certified legal professional or NGO.", status: "pending" },
  { id: 4, title: "Formal Action", desc: "Draft complaints, file FIRs, or send legal notices based on counsel.", status: "pending" },
];

const NEW_TIMELINE = [
  { date: "Just now", title: "Case Created", desc: "Intake form submitted and AI preliminary analysis triggered." },
];

export default function CaseDetailPage({ 
  params,
  searchParams
}: { 
  params: Promise<{ id: string }>,
  searchParams: Promise<{ title?: string, category?: string, desc?: string }>
}) {
  const resolvedParams = use(params);
  const resolvedSearchParams = use(searchParams);
  const [expandedStep, setExpandedStep] = useState<number>(2);

  const isDefaultCase = !resolvedSearchParams.title;
  const pageTitle = resolvedSearchParams.title || "Security Deposit Dispute";
  const categoryName = resolvedSearchParams.category 
    ? resolvedSearchParams.category.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase()) 
    : "Property Law";

  const desc = resolvedSearchParams.desc || "";
  const descLower = desc.toLowerCase();

  // Smart Dynamic Mock Generation
  let caseSummary = "";
  let relevantLaws: string[] = [];
  let probability = 85;
  let strongEvidence: string[] = [];
  let weakEvidence: string[] = [];
  let missingEvidence: string[] = [];

  if (isDefaultCase) {
    caseSummary = `Tenant vacated property after full notice period. Landlord is withholding ₹50,000 security deposit citing "painting charges" not stipulated in the agreement.`;
    relevantLaws = ["Section 108 of Transfer of Property Act", "Maharashtra Rent Control Act (Unlawful deduction)"];
    probability = 85;
    strongEvidence = ["Signed Rental Agreement", "WhatsApp logs approving move-out"];
    weakEvidence = ["Photos of flat (undated)"];
    missingEvidence = ["Final handover checklist"];
  } else {
    // Inject the user's exact description if provided
    caseSummary = desc ? `"${desc}"` : `New intake for ${pageTitle}. The AI is awaiting uploaded evidence, notices, and relevant documents to generate a full case assessment.`;
    
    // Dynamic Laws extraction based on keywords
    if (descLower.includes("husband") || descLower.includes("abuse") || descLower.includes("domestic violence")) {
      relevantLaws = ["Protection of Women from Domestic Violence Act, 2005", "BNS Section 85 (Husband or relative subjecting woman to cruelty)", "BNS Section 115 (Voluntarily causing hurt)"];
    } else if (descLower.includes("warranty") || descLower.includes("defective") || descLower.includes("consumer") || descLower.includes("retailer") || descLower.includes("purchase")) {
      relevantLaws = ["Consumer Protection Act, 2019 (Section 2(11) - Defect in goods)", "Sale of Goods Act, 1930", "Unfair Trade Practices Act"];
    } else if (descLower.includes("salary") || descLower.includes("employment") || descLower.includes("termination")) {
      relevantLaws = ["Industrial Disputes Act, 1947", "Payment of Wages Act", "Specific Relief Act (Breach of Contract)"];
    } else {
      relevantLaws = ["Awaiting evidence upload to determine exact legal sections.", "Reviewing provided testimony..."];
    }

    // Dynamic Probability
    if (desc.length > 300) probability = 92;
    else if (desc.length > 100) probability = 78;
    else probability = 65;

    // Dynamic Evidence Extraction
    const extracted: string[] = [];
    if (descLower.includes("invoice") || descLower.includes("receipt") || descLower.includes("bill")) extracted.push("Purchase/Transaction Invoice");
    if (descLower.includes("photo") || descLower.includes("photograph")) extracted.push("Photographic Evidence");
    if (descLower.includes("message") || descLower.includes("whatsapp") || descLower.includes("email")) extracted.push("Digital Communications");
    if (descLower.includes("warranty")) extracted.push("Warranty Card");
    if (descLower.includes("medical") || descLower.includes("clinic") || descLower.includes("doctor")) extracted.push("Medical Records/Reports");
    if (descLower.includes("police") || descLower.includes("fir")) extracted.push("Police Complaint/FIR");

    if (extracted.length > 0) {
      strongEvidence = extracted;
      weakEvidence = ["Verbal witness statements"];
      missingEvidence = ["Formal Legal Notice Copy", "Affidavits"];
    } else {
      strongEvidence = ["Self-reported testimony via intake form"];
      weakEvidence = ["Awaiting documentary proof"];
      missingEvidence = ["Photographs, invoices, or official records"];
    }
  }

  return (
    <div className="max-w-6xl mx-auto pb-12 space-y-8">
      {/* Header */}
      <div>
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-4 -ml-4 text-muted-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">{pageTitle}</h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Scale className="h-4 w-4" /> {categoryName}</span>
              <span>•</span>
              <span>Case ID: {resolvedParams.id}</span>
              <span>•</span>
              <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-500/10 text-amber-600 border border-amber-500/20">Action Required</span>
            </div>
          </div>
          <Link href="/dashboard/complaints">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Generate Legal Notice
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Analytics & Summary */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Case Strength Analyzer */}
          <Card className="border-border">
            <CardHeader className="bg-secondary/30 border-b border-border/50 pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="h-5 w-5 text-primary" /> Case Strength Analyzer
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold mb-2">Case Summary</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed bg-secondary/30 p-3 rounded-lg">
                    {caseSummary}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">Relevant Laws & Violations</h4>
                  <ul className="text-sm text-muted-foreground space-y-2 bg-secondary/30 p-3 rounded-lg">
                    {relevantLaws.map((law, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        {law}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Strength Meter */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <h4 className="text-sm font-semibold">Case Strength & Probability</h4>
                  <span className="text-xl font-bold text-emerald-600">{probability}%</span>
                </div>
                <div className="h-4 w-full bg-secondary rounded-full overflow-hidden flex">
                  <motion.div 
                    initial={{ width: 0 }} animate={{ width: `${100 - probability}%` }} 
                    className="bg-destructive h-full"
                    title={`Weak Area (${100 - probability}%)`}
                  />
                  <motion.div 
                    initial={{ width: 0 }} animate={{ width: `${probability}%` }} 
                    transition={{ delay: 0.3 }}
                    className="bg-emerald-500 h-full"
                    title={`Strong Evidence (${probability}%)`}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Weak (0-30%)</span>
                  <span>Moderate (31-70%)</span>
                  <span className="text-emerald-600 font-semibold">Strong (71-100%)</span>
                </div>
              </div>

              {/* Evidence Tracker */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border/50">
                <div className="bg-emerald-500/5 border border-emerald-500/20 p-3 rounded-lg">
                  <h5 className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-2 uppercase">Strong Evidence</h5>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {strongEvidence.map((ev, i) => <li key={i}>• {ev}</li>)}
                  </ul>
                </div>
                <div className="bg-amber-500/5 border border-amber-500/20 p-3 rounded-lg">
                  <h5 className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-2 uppercase">Weak Evidence</h5>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {weakEvidence.map((ev, i) => <li key={i}>• {ev}</li>)}
                  </ul>
                </div>
                <div className="bg-destructive/5 border border-destructive/20 p-3 rounded-lg">
                  <h5 className="text-xs font-semibold text-destructive mb-2 uppercase">Missing Evidence</h5>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {missingEvidence.map((ev, i) => <li key={i}>• {ev}</li>)}
                  </ul>
                  <Link href="/dashboard/documents">
                    <Button variant="link" className="text-[10px] h-auto p-0 text-primary mt-2">Upload Now</Button>
                  </Link>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Smart Legal Roadmap */}
          <Card className="border-border">
            <CardHeader className="bg-secondary/30 border-b border-border/50 pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapIcon className="h-5 w-5 text-primary" /> Smart Legal Roadmap
              </CardTitle>
              <CardDescription>Your customized step-by-step path to resolution.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {(isDefaultCase ? DEFAULT_ROADMAP : NEW_ROADMAP).map((step, index, arr) => (
                  <div key={step.id} className="relative">
                    {/* Connecting line */}
                    {index !== arr.length - 1 && (
                      <div className={`absolute left-3.5 top-8 bottom-[-16px] w-[2px] ${step.status === "completed" ? "bg-primary" : "bg-border"}`} />
                    )}
                    
                    <div className="flex items-start gap-4">
                      {/* Status Icon */}
                      <div className="relative z-10 mt-1 shrink-0">
                        {step.status === "completed" ? (
                          <CheckCircle2 className="h-7 w-7 text-primary bg-background rounded-full" />
                        ) : step.status === "in-progress" ? (
                          <div className="h-7 w-7 rounded-full border-2 border-amber-500 bg-background flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                          </div>
                        ) : (
                          <Circle className="h-7 w-7 text-muted-foreground bg-background rounded-full" />
                        )}
                      </div>

                      {/* Content Card */}
                      <div 
                        className={`flex-1 rounded-xl border ${step.status === "in-progress" ? "border-amber-500/50 bg-amber-500/5" : "border-border bg-card"} transition-all`}
                      >
                        <div 
                          className="px-4 py-3 flex items-center justify-between cursor-pointer"
                          onClick={() => setExpandedStep(expandedStep === step.id ? 0 : step.id)}
                        >
                          <h4 className={`font-semibold ${step.status === "completed" ? "text-foreground" : step.status === "in-progress" ? "text-amber-700 dark:text-amber-400" : "text-muted-foreground"}`}>
                            {index + 1}. {step.title}
                          </h4>
                          {expandedStep === step.id ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                        </div>
                        
                        {expandedStep === step.id && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }} 
                            animate={{ height: "auto", opacity: 1 }}
                            className="px-4 pb-4 pt-0"
                          >
                            <p className="text-sm text-muted-foreground">{step.desc}</p>
                            {step.status === "in-progress" && (
                              <Link href="/dashboard/documents">
                                <Button size="sm" className="mt-3 text-xs bg-amber-600 hover:bg-amber-700 text-white">
                                  Action Required: Add Evidence
                                </Button>
                              </Link>
                            )}
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Right Column: Timeline & Quick Actions */}
        <div className="space-y-6">
          
          {/* Case Timeline */}
          <Card className="border-border">
            <CardHeader className="bg-secondary/30 border-b border-border/50 pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="h-5 w-5 text-primary" /> Case Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {(isDefaultCase ? DEFAULT_TIMELINE : NEW_TIMELINE).map((event, i, arr) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center mt-1">
                      <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                      {i !== arr.length - 1 && <div className="w-[1px] h-full bg-border mt-2" />}
                    </div>
                    <div className="pb-4">
                      <p className="text-xs font-semibold text-primary mb-1 flex items-center gap-1">
                        <CalendarDays className="h-3 w-3" /> {event.date}
                      </p>
                      <p className="text-sm font-medium text-foreground">{event.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{event.desc}</p>
                    </div>
                  </div>
                ))}
                
                {/* Pending next step */}
                <div className="flex gap-3 opacity-50">
                  <div className="flex flex-col items-center mt-1">
                    <div className="h-2.5 w-2.5 rounded-full border-2 border-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1 flex items-center gap-1">
                      <CalendarDays className="h-3 w-3" /> Pending
                    </p>
                    <p className="text-sm font-medium text-foreground">{isDefaultCase ? "Send Legal Notice" : "Upload Evidence"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/dashboard/documents" className="block w-full">
                <Button variant="outline" className="w-full justify-start text-sm">
                  <UploadCloud className="mr-2 h-4 w-4" /> Upload New Evidence
                </Button>
              </Link>
              <Link href="/dashboard/aid" className="block w-full">
                <Button variant="outline" className="w-full justify-start text-sm">
                  <ShieldAlert className="mr-2 h-4 w-4" /> Talk to a Lawyer
                </Button>
              </Link>
              <Link href="/dashboard/cases" className="block w-full">
                <Button variant="outline" className="w-full justify-start text-sm text-destructive hover:text-destructive">
                  <AlertCircle className="mr-2 h-4 w-4" /> Close Case
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
