import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JusticeAI | Free AI Legal Assistant",
  description: "AI-powered legal assistance for every Indian citizen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen">
              <div className="flex-1">
                {children}
              </div>
              {/* Global Legal Disclaimer */}
              <footer className="bg-destructive/10 border-t border-destructive/20 py-3 px-4 text-center mt-auto shrink-0 z-50">
                <p className="text-xs font-semibold text-destructive max-w-4xl mx-auto">
                  JusticeAI provides legal information and guidance and is not a substitute for a licensed lawyer. Users should consult qualified legal professionals for formal legal representation.
                </p>
              </footer>
            </div>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
