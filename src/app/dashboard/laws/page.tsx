"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Search, BookOpen, Scale, FileText, 
  ShieldCheck, ArrowRight, Library, Briefcase, 
  Car, Heart, Monitor, Landmark
} from "lucide-react";
import * as motion from "framer-motion/client";

const LAWS = [
  { 
    id: "bns", 
    title: "Bharatiya Nyaya Sanhita (BNS)", 
    desc: "The primary criminal code of India, replacing the Indian Penal Code (IPC). Covers major crimes and punishments.", 
    icon: Scale,
    searchTags: ["section 302", "murder", "section 420", "cheating", "fraud", "criminal", "theft", "rape", "snatching", "ipc", "punishment", "section 120", "conspiracy", "section 498a"]
  },
  { 
    id: "bnss", 
    title: "Bharatiya Nagarik Suraksha Sanhita (BNSS)", 
    desc: "The procedural criminal law, replacing the CrPC. Details how arrests, bail, and trials are conducted.", 
    icon: ShieldCheck,
    searchTags: ["crpc", "bail", "arrest", "fir", "police", "trial", "warrant", "section 144", "section 163"]
  },
  { 
    id: "bsa", 
    title: "Bharatiya Sakshya Adhiniyam (BSA)", 
    desc: "The law of evidence, replacing the Indian Evidence Act. Defines what constitutes admissible proof in court.", 
    icon: BookOpen,
    searchTags: ["evidence", "proof", "witness", "electronic record", "admissible", "court"]
  },
  { 
    id: "cpa", 
    title: "Consumer Protection Act", 
    desc: "Protects the interests of consumers against defective products, deficient services, and unfair trade practices.", 
    icon: FileText,
    searchTags: ["consumer", "defective", "refund", "ecommerce", "service", "complaint", "forum"]
  },
  { 
    id: "itact", 
    title: "Information Technology Act, 2000", 
    desc: "Primary law dealing with cybercrime and electronic commerce in India.", 
    icon: Monitor,
    searchTags: ["cyber", "hacking", "section 66", "section 67", "online fraud", "data privacy", "computer"]
  },
  { 
    id: "hma", 
    title: "Hindu Marriage Act, 1955", 
    desc: "Regulates marriage, divorce, and restitution of conjugal rights among Hindus.", 
    icon: Heart,
    searchTags: ["divorce", "marriage", "section 13", "alimony", "mutual consent", "annulment", "spouse"]
  },
  { 
    id: "tpa", 
    title: "Transfer of Property Act, 1882", 
    desc: "Governs the transfer of property by sale, lease, mortgage, and gift.", 
    icon: Landmark,
    searchTags: ["property", "lease", "rent", "tenant", "mortgage", "gift", "landlord", "section 108"]
  },
  { 
    id: "ica", 
    title: "Indian Contract Act, 1872", 
    desc: "Defines the core rules relating to the formulation, execution, and breach of contracts.", 
    icon: Briefcase,
    searchTags: ["contract", "agreement", "breach", "damages", "void", "valid", "consideration"]
  },
  { 
    id: "mva", 
    title: "Motor Vehicles Act, 1988", 
    desc: "Regulates traffic rules, vehicle registration, and compensation for road accidents.", 
    icon: Car,
    searchTags: ["traffic", "challan", "accident", "insurance", "driving license", "compensation"]
  },
  { 
    id: "pocso", 
    title: "POCSO Act, 2012", 
    desc: "Protection of Children from Sexual Offences Act. Enacted to protect children from offenses of sexual assault and harassment.", 
    icon: ShieldCheck,
    searchTags: ["child", "minor", "abuse", "harassment", "protection"]
  },
  { 
    id: "rti", 
    title: "Right to Information (RTI) Act", 
    desc: "Sets out the practical regime for citizens to secure access to information under the control of public authorities.", 
    icon: FileText,
    searchTags: ["information", "government", "public", "appeal", "application"]
  },
  { 
    id: "dva", 
    title: "Domestic Violence Act, 2005", 
    desc: "Provides more effective protection of the rights of women who are victims of violence occurring within the family.", 
    icon: Heart,
    searchTags: ["violence", "abuse", "woman", "protection officer", "maintenance", "residence order"]
  },
  { 
    id: "labour", 
    title: "Labour Laws & Codes", 
    desc: "Consolidated codes concerning occupational safety, health, working conditions, and wages.", 
    icon: Briefcase,
    searchTags: ["salary", "wages", "termination", "hr", "pf", "gratuity", "employee", "employer"]
  },
];

export default function LawExplorerPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLaws = LAWS.filter((law) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    
    const matchesTitle = law.title.toLowerCase().includes(query);
    const matchesDesc = law.desc.toLowerCase().includes(query);
    const matchesTags = law.searchTags.some(tag => tag.toLowerCase().includes(query));
    
    // MOCK DEEP SEARCH: If the user searches for *any* section number, we simulate finding it in the core codes
    const isGenericSectionQuery = query.startsWith("section ") || query.startsWith("sec ");
    const matchesDeepSearch = isGenericSectionQuery && (law.id === "bns" || law.id === "bnss" || law.id === "bsa");
    
    return matchesTitle || matchesDesc || matchesTags || matchesDeepSearch;
  });

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Law Explorer</h1>
        <p className="text-muted-foreground">Search and understand Indian laws, acts, and specific sections.</p>
      </div>

      <div className="relative mb-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
          className="w-full pl-12 h-14 text-base rounded-xl bg-background border-border shadow-sm focus-visible:ring-primary"
          placeholder="Search for 'Divorce', 'Section 420', 'Cyber Crime', or 'BNS'..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLaws.map((law, index) => {
          const Icon = law.icon;
          return (
            <motion.div 
              key={law.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/dashboard/laws/${law.id}`}>
                <Card className="h-full hover:border-primary/50 hover:shadow-md transition-all group">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="p-3 bg-secondary/50 rounded-lg w-fit mb-4 group-hover:bg-primary/10 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{law.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                      {law.desc}
                    </p>
                    <div className="flex items-center text-sm font-semibold text-primary mt-auto">
                      Explore Act <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>
      
      {filteredLaws.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          No acts or sections found matching "{searchQuery}". Try a broader term.
        </div>
      )}
    </div>
  );
}
