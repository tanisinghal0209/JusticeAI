"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Users, Home, Briefcase, Gavel, Heart, ShieldAlert, 
  ShoppingCart, Landmark, GraduationCap, Map, UserPlus, 
  Scale, MoreHorizontal, Bot, ArrowRight, Loader2, UploadCloud
} from "lucide-react";
import * as motion from "framer-motion/client";

const categories = [
  { id: "family", title: "Family Law", icon: Users, subs: ["Divorce", "Child Custody", "Domestic Violence", "Maintenance"] },
  { id: "property", title: "Property Disputes", icon: Home, subs: ["Rent Issues", "Illegal Eviction", "Ownership Disputes", "Builder Fraud"] },
  { id: "employment", title: "Employment Law", icon: Briefcase, subs: ["Salary Issues", "Harassment", "Wrongful Termination", "Contract Violations"] },
  { id: "criminal", title: "Criminal Law", icon: Gavel, subs: ["FIR", "Assault", "Theft", "Fraud"] },
  { id: "womens_rights", title: "Women's Rights", icon: Heart, subs: ["Domestic Violence", "Dowry", "Workplace Harassment", "Stalking"] },
  { id: "cyber", title: "Cyber Crime", icon: ShieldAlert, subs: ["UPI Fraud", "Social Media Abuse", "Hacking", "Identity Theft"] },
  { id: "consumer", title: "Consumer Complaints", icon: ShoppingCart, subs: ["Refund Issues", "Product Defects", "Service Problems"] },
  { id: "financial", title: "Financial Disputes", icon: Landmark, subs: ["Loan Issues", "Banking Fraud", "Insurance Claims"] },
  { id: "education", title: "Education", icon: GraduationCap, subs: ["School Disputes", "Fee Refund", "Harassment"] },
  { id: "land", title: "Land Rights", icon: Map, subs: ["Agricultural Land", "Boundary Disputes", "Inheritance"] },
  { id: "senior", title: "Senior Citizen Rights", icon: UserPlus, subs: ["Maintenance", "Property Protection", "Elder Abuse"] },
  { id: "constitutional", title: "Constitutional Rights", icon: Scale, subs: ["Fundamental Rights", "Writ Petitions", "Discrimination"] },
  { id: "other", title: "Other", icon: MoreHorizontal, subs: ["Let AI classify your issue"] },
];

export default function StartCasePage() {
  const router = useRouter();
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  
  const [description, setDescription] = useState("");
  const [partyName, setPartyName] = useState("");
  const [incidentDate, setIncidentDate] = useState("");
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<{ category: string; confidence: number } | null>(null);

  // For the AI classification block (Other)
  const handleAiClassification = () => {
    if (!description.trim()) return;
    setIsAnalyzing(true);
    setAiResult(null);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAiResult({
        category: "Property Law → Tenant Rights → Security Deposit Dispute",
        confidence: 93
      });
    }, 2000);
  };

  // For formal form submission
  const handleSubmitForm = () => {
    if (!description.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      const randomId = Math.floor(Math.random() * 1000) + 100;
      router.push(`/dashboard/cases/${randomId}?title=${encodeURIComponent(selectedSubcategory!)}&category=${encodeURIComponent(selectedCategory!)}&desc=${encodeURIComponent(description)}`);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">What kind of legal issue are you facing?</h1>
        <p className="text-muted-foreground">Select a category below or describe your issue to let our AI classify it.</p>
      </div>

      {!selectedCategory ? (
        // STEP 1: Select Main Category
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Card 
                  className="h-full cursor-pointer hover:border-primary/50 hover:shadow-md transition-all group"
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="mb-4 p-3 bg-primary/5 rounded-lg w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{cat.title}</h3>
                    <div className="mt-auto flex flex-wrap gap-1">
                      {cat.subs.map((sub) => (
                        <span key={sub} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      ) : !selectedSubcategory ? (
        // STEP 2: Select Subcategory (or AI form for "Other")
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-3xl"
        >
          <Button 
            variant="ghost" 
            className="mb-6 -ml-4" 
            onClick={() => {
              setSelectedCategory(null);
              setAiResult(null);
              setDescription("");
            }}
          >
            ← Back to categories
          </Button>

          {selectedCategory === "other" ? (
            <Card className="border-border shadow-sm">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Bot className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold">AI Legal Intake</h2>
                    <p className="text-muted-foreground">Describe your situation in your own words.</p>
                  </div>
                </div>

                <textarea
                  className="w-full min-h-[150px] p-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-y mb-4"
                  placeholder="E.g., My landlord is refusing to return my security deposit of ₹50,000 even though I gave 2 months notice and left the flat in perfect condition..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                {!aiResult && (
                  <Button 
                    className="w-full h-12 text-base" 
                    onClick={handleAiClassification}
                    disabled={!description.trim() || isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Analyzing legal context...
                      </>
                    ) : (
                      "Analyze Issue"
                    )}
                  </Button>
                )}

                {aiResult && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400 mb-1">AI Classification Complete</p>
                        <h4 className="text-lg font-bold text-foreground">{aiResult.category}</h4>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Confidence</p>
                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold">
                          {aiResult.confidence}%
                        </span>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                      <Button className="h-11 px-8" onClick={() => setSelectedSubcategory("AI Generated Case")}>
                        Proceed to Intake Form <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-semibold mb-2">
                  {categories.find(c => c.id === selectedCategory)?.title}
                </h2>
                <p className="text-muted-foreground mb-8">Select the specific issue you are facing:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {categories.find(c => c.id === selectedCategory)?.subs.map(sub => (
                    <Button 
                      key={sub} 
                      variant="outline" 
                      className="w-full h-14 text-base justify-start px-6"
                      onClick={() => setSelectedSubcategory(sub)}
                    >
                      {sub}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      ) : (
        // STEP 3: The Intake Details Form
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-3xl"
        >
          <Button 
            variant="ghost" 
            className="mb-6 -ml-4" 
            onClick={() => {
              setSelectedSubcategory(null);
            }}
          >
            ← Back to subcategories
          </Button>

          <Card className="border-border shadow-sm">
            <CardContent className="p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-semibold">{selectedSubcategory} - Intake Form</h2>
                <p className="text-muted-foreground">Please provide preliminary details so our AI can begin analyzing your situation.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Opposing Party Name (Optional)</label>
                  <Input 
                    placeholder="e.g. Ramesh Kumar / XYZ Corp" 
                    value={partyName}
                    onChange={(e) => setPartyName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Approximate Date of Incident</label>
                  <Input 
                    type="date"
                    value={incidentDate}
                    onChange={(e) => setIncidentDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description of the Issue *</label>
                <textarea
                  className="w-full min-h-[150px] p-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-y"
                  placeholder="Provide a chronological summary of what happened. Include dates, locations, and specific actions taken by both parties..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Upload Initial Evidence (Optional)</label>
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:bg-secondary/50 transition-colors cursor-pointer">
                  <UploadCloud className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-foreground font-medium">Drag & drop files or click to upload</p>
                  <p className="text-xs text-muted-foreground mt-1">Supported: PDF, JPG, PNG (Max 10MB)</p>
                </div>
              </div>

              <div className="pt-4 border-t border-border/50 flex justify-end gap-4">
                <Button variant="outline" onClick={() => setSelectedSubcategory(null)}>Cancel</Button>
                <Button 
                  onClick={handleSubmitForm}
                  disabled={!description.trim() || isAnalyzing}
                  className="min-w-[200px]"
                >
                  {isAnalyzing ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing Details...</>
                  ) : (
                    "Submit & Analyze Case"
                  )}
                </Button>
              </div>

            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
