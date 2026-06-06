"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Bot, User, Send, Mic, Image as ImageIcon, 
  FileText, Globe, Paperclip, Loader2, BookOpen,
  Scale, CalendarDays, Percent
} from "lucide-react";
import * as motion from "framer-motion/client";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: {
    source: string;
    section: string;
    confidence: number;
    lastUpdated: string;
  }[];
};

const SUGGESTED_PROMPTS = [
  "Can I file an FIR?",
  "What are my rights?",
  "What should I do next?",
  "Draft a complaint letter.",
  "Explain this legal notice."
];

export default function AILegalAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Namaste. I am JusticeAI, your personal legal assistant. How can I help you understand your legal rights or navigate an issue today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState("English");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;

    const newUserMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");
    setIsTyping(true);

    // Mock streaming response
    setTimeout(() => {
      setIsTyping(false);
      
      const textLower = text.toLowerCase();
      let replyContent = "";
      let replyCitations = [];

      if (textLower.includes("technova") || textLower.includes("defective") || textLower.includes("warranty") || textLower.includes("purchased")) {
        replyContent = "Based on the details provided regarding your defective smartphone, this falls under the purview of the Consumer Protection Act, 2019. Since the device overheated within two weeks and the service center refused a replacement despite the active warranty, the retailer and manufacturer may be liable for 'deficiency in service' and selling a 'defective product'. I recommend sending a formal Legal Notice to the manufacturer demanding a refund or replacement within 15 days before approaching the District Consumer Disputes Redressal Commission.";
        replyCitations = [
          { source: "Consumer Protection Act, 2019", section: "Section 2(11) & Section 35", confidence: 94, lastUpdated: "2019" },
          { source: "Sale of Goods Act, 1930", section: "Implied Warranty", confidence: 88, lastUpdated: "1930" }
        ];
      } else if (textLower.includes("husband") || textLower.includes("abuse") || textLower.includes("violence") || textLower.includes("divorce")) {
        replyContent = "I am very sorry to hear that you are going through this. Based on the Bharatiya Nyaya Sanhita (BNS) and the Protection of Women from Domestic Violence Act, 2005, you have immediate legal recourse. The physical assault and emotional abuse you described are penal offenses. You have the right to file an FIR, seek a Protection Order, and claim maintenance. Your safety is paramount—would you like me to help draft a formal police complaint or locate the nearest emergency women's shelter for you?";
        replyCitations = [
          { source: "Protection of Women from Domestic Violence Act", section: "Section 3 & Section 12", confidence: 98, lastUpdated: "2005" },
          { source: "Bharatiya Nyaya Sanhita (BNS)", section: "Section 85 (Cruelty)", confidence: 95, lastUpdated: "July 1, 2024" }
        ];
      } else if (textLower.includes("rent") || textLower.includes("deposit") || textLower.includes("landlord")) {
        replyContent = "Under the Transfer of Property Act and relevant State Rent Control Acts, a landlord cannot arbitrarily withhold a security deposit for 'painting charges' unless explicitly stated in your rental agreement. You are entitled to a full refund if you gave the proper notice period. I can draft a Legal Notice for recovery of dues if you'd like to proceed.";
        replyCitations = [
          { source: "Transfer of Property Act, 1882", section: "Section 108(q)", confidence: 92, lastUpdated: "1882" }
        ];
      } else {
        replyContent = "I have analyzed your query based on the Bharatiya Nyaya Sanhita (BNS) and recent precedents. To provide the most accurate legal guidance and cite the specific acts that protect you, could you provide a bit more context or upload any relevant documents (like a notice or contract)?";
        replyCitations = [
          { source: "JusticeAI General Legal Corpus", section: "Preliminary Analysis", confidence: 75, lastUpdated: "Today" }
        ];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: replyContent,
          citations: replyCitations
        }
      ]);
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Legal Assistant</h1>
          <p className="text-muted-foreground text-sm">Ask questions, draft complaints, or analyze documents.</p>
        </div>
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <select 
            className="text-sm bg-transparent border-none focus:ring-0 text-muted-foreground cursor-pointer outline-none"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Tamil</option>
            <option>Telugu</option>
            <option>Bengali</option>
          </select>
        </div>
      </div>

      {/* Chat Container */}
      <Card className="flex-1 flex flex-col overflow-hidden border-border/50 shadow-sm bg-background/50">
        
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <motion.div 
              key={msg.id} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
              )}
              
              <div className="flex flex-col gap-2 max-w-[80%]">
                <div className={`rounded-2xl px-5 py-3.5 text-sm ${
                  msg.role === "user" 
                    ? "bg-primary text-primary-foreground rounded-tr-sm" 
                    : "bg-secondary text-secondary-foreground rounded-tl-sm shadow-sm"
                }`}>
                  {msg.content}
                </div>
                
                {/* RAG Citations UI */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="mt-1 space-y-2">
                    {msg.citations.map((cite, i) => (
                      <div key={i} className="bg-background border border-border/60 rounded-xl p-3 shadow-sm flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-xs font-bold text-primary">
                            <Scale className="h-3.5 w-3.5" /> {cite.source}
                          </span>
                          <span className="flex items-center gap-1 text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 px-1.5 py-0.5 rounded">
                            <Percent className="h-3 w-3" /> {cite.confidence}% Match
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3" /> {cite.section}
                          </span>
                          <span className="flex items-center gap-1">
                            <CalendarDays className="h-3 w-3" /> Updated: {cite.lastUpdated}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {msg.role === "user" && (
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
              )}
            </motion.div>
          ))}

          {isTyping && (
            <div className="flex gap-4 justify-start">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div className="bg-secondary rounded-2xl rounded-tl-sm px-5 py-4 flex items-center gap-1 shadow-sm">
                <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border/50 bg-background">
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <Button 
                  key={prompt} 
                  variant="outline" 
                  size="sm"
                  className="rounded-full text-xs bg-secondary/50 hover:bg-secondary border-border/50"
                  onClick={() => handleSend(prompt)}
                >
                  {prompt}
                </Button>
              ))}
            </div>
          )}
          
          <div className="relative flex items-end gap-2 bg-secondary/30 border border-input rounded-2xl p-2 focus-within:ring-1 focus-within:ring-ring focus-within:border-ring transition-all">
            <div className="flex items-center gap-1 pb-1 px-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground">
                <ImageIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground">
                <FileText className="h-4 w-4" />
              </Button>
            </div>
            
            <textarea
              className="flex-1 max-h-32 min-h-[40px] bg-transparent border-none focus:outline-none resize-none py-2.5 px-2 text-sm leading-relaxed"
              placeholder="Type your legal query here..."
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            
            <div className="flex items-center gap-1 pb-1 pr-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground">
                <Mic className="h-4 w-4" />
              </Button>
              <Button 
                size="icon" 
                className="h-8 w-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => handleSend()}
                disabled={!input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="text-center mt-2">
            <span className="text-[10px] text-muted-foreground">JusticeAI can make mistakes. Always verify critical legal information with a professional.</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
