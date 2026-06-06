"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  PenTool, FileText, Download, CheckCircle2, 
  ArrowRight, FileSignature, ShieldAlert, Building2
} from "lucide-react";
import * as motion from "framer-motion/client";

const COMPLAINT_TYPES = [
  { id: "police", name: "Police Complaint", icon: ShieldAlert },
  { id: "fir", name: "FIR Draft", icon: FileSignature },
  { id: "legal_notice", name: "Legal Notice", icon: FileText },
  { id: "consumer", name: "Consumer Complaint", icon: Building2 },
  { id: "hr", name: "HR Complaint", icon: PenTool },
  { id: "rti", name: "RTI Application", icon: FileText },
  { id: "cyber", name: "Cyber Crime Complaint", icon: ShieldAlert },
];

export default function ComplaintGeneratorPage() {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState("");
  const [context, setContext] = useState("");
  const [draft, setDraft] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setDraft(
`To,
The Station House Officer,
[Police Station Name],
[City, State, Zip Code]

Date: ${new Date().toLocaleDateString()}

Subject: Complaint regarding [Briefly state the issue, e.g., online fraud]

Respected Sir/Madam,

I, [Your Name], residing at [Your Address], state as follows:

1. That on [Date of Incident], I was subjected to [describe incident briefly].
2. Based on the facts provided: ${context}
3. I therefore request you to kindly register an FIR under the appropriate sections of the Bharatiya Nyaya Sanhita (BNS) / Information Technology Act and initiate an immediate investigation.

I have attached all available evidence (screenshots, bank statements) with this complaint.

Thanking you,

Yours faithfully,

[Your Signature]
[Your Printed Name]
[Contact Number]
[Email Address]`
      );
      setIsGenerating(false);
      setStep(3);
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Complaint Generator</h1>
        <p className="text-muted-foreground">Follow this guided workflow to draft legally sound complaints and notices.</p>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-border -z-10"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 transition-all duration-500" style={{ width: `${(step - 1) * 50}%` }}></div>
        
        {[1, 2, 3].map((s) => (
          <div key={s} className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm border-2 transition-colors duration-300 ${step >= s ? "bg-primary border-primary text-primary-foreground" : "bg-background border-border text-muted-foreground"}`}>
            {step > s ? <CheckCircle2 className="h-5 w-5" /> : s}
          </div>
        ))}
      </div>

      {/* Step 1: Select Type */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-xl font-semibold mb-6">Step 1: What type of document do you need?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {COMPLAINT_TYPES.map((type) => {
              const Icon = type.icon;
              return (
                <Card 
                  key={type.id} 
                  className={`cursor-pointer transition-all hover:border-primary/50 hover:shadow-md ${selectedType === type.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border"}`}
                  onClick={() => setSelectedType(type.id)}
                >
                  <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                    <Icon className={`h-8 w-8 ${selectedType === type.id ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="font-medium">{type.name}</span>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="mt-8 flex justify-end">
            <Button disabled={!selectedType} onClick={() => setStep(2)}>
              Next Step <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}

      {/* Step 2: Provide Context */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader>
              <CardTitle>Step 2: Provide the Facts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Briefly describe what happened. Our AI will format this into a formal, legally structured complaint.</p>
              <textarea
                className="w-full min-h-[200px] p-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-y"
                placeholder="E.g., Yesterday around 4 PM, I received a fraudulent call..."
                value={context}
                onChange={(e) => setContext(e.target.value)}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={handleGenerate} disabled={!context.trim() || isGenerating}>
                {isGenerating ? "Drafting Document..." : "Generate Draft"}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}

      {/* Step 3: Edit and Download */}
      {step === 3 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSignature className="h-5 w-5 text-primary" /> Review and Edit Draft
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-1 bg-secondary/50 rounded-t-lg border border-b-0 border-border flex gap-2">
                <Button variant="ghost" size="sm" className="h-8 text-xs font-semibold">Bold</Button>
                <Button variant="ghost" size="sm" className="h-8 text-xs font-semibold italic">Italic</Button>
                <Button variant="ghost" size="sm" className="h-8 text-xs font-semibold underline">Underline</Button>
              </div>
              <textarea
                className="w-full min-h-[400px] p-6 border border-border bg-background focus:outline-none focus:ring-1 focus:ring-ring rounded-b-lg text-sm leading-relaxed font-mono"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setStep(2)}>Back to Edit Facts</Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Download className="mr-2 h-4 w-4" /> Download DOCX
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
