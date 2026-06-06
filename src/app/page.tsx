import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowRight, Scale, FileText, FileSignature, 
  Map, Library, ShieldCheck, Languages, Handshake
} from "lucide-react";
import * as motion from "framer-motion/client";

export default function LandingPage() {
  const features = [
    { title: "Legal Rights Explanation", icon: Scale, desc: "Understand your rights in simple, everyday language without legal jargon." },
    { title: "AI Document Analysis", icon: FileText, desc: "Upload contracts and notices. We'll identify risks and explain the terms." },
    { title: "Complaint Generator", icon: FileSignature, desc: "Draft legally compliant complaints and petitions in minutes." },
    { title: "Legal Roadmaps", icon: Map, desc: "Step-by-step guides on navigating various legal procedures." },
    { title: "Law Explorer", icon: Library, desc: "Search through the Indian Penal Code and constitution easily." },
    { title: "Case Assessment", icon: ShieldCheck, desc: "Evaluate the strength of your case based on past precedents." },
    { title: "Multilingual Support", icon: Languages, desc: "Access legal aid in 6 major Indian languages." },
    { title: "Legal Aid Discovery", icon: Handshake, desc: "Connect with verified pro-bono lawyers and NGOs." },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight">JusticeAI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/sign-in">
              <Button variant="ghost" className="text-sm">Log In</Button>
            </Link>
            <Link href="/sign-up">
              <Button className="text-sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-16 pb-24 md:pt-24 md:pb-32 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6">
              Know Your Rights.<br/>
              <span className="text-primary">Take Action.</span><br/>
              Get Justice.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              AI-powered legal assistance for every Indian citizen in simple language.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard?action=new-case">
                <Button size="lg" className="h-12 px-8 text-base shadow-lg hover:shadow-xl transition-all">
                  Start My Case <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard/documents">
                <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-background">
                  Upload Documents
                </Button>
              </Link>
              <Link href="/dashboard/laws">
                <Button size="lg" variant="ghost" className="h-12 px-8 text-base">
                  Explore Laws
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Hero Illustration Placeholder */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-16 w-full max-w-5xl aspect-video rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10 shadow-2xl overflow-hidden relative flex items-center justify-center"
          >
            {/* We can replace this with the generated image later */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 mix-blend-luminosity"></div>
            <div className="relative z-10 text-center space-y-4 p-8 bg-background/80 backdrop-blur-sm rounded-xl border border-border shadow-sm">
              <Scale className="h-12 w-12 text-primary mx-auto" />
              <h3 className="text-2xl font-bold">JusticeAI Intelligence Engine</h3>
              <p className="text-muted-foreground max-w-md">Analyzing millions of precedents and statutes to provide accurate, actionable legal guidance.</p>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-24 border-t border-border/50 bg-secondary/30 rounded-3xl mt-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Comprehensive Legal Aid</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to navigate the Indian legal system with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full border-border/50 hover:border-primary/50 hover:shadow-md transition-all duration-300 bg-card overflow-hidden group">
                    <CardContent className="p-6">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                        <Icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
