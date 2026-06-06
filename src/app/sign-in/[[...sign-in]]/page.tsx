import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5 mix-blend-luminosity"></div>
      <div className="relative z-10 w-full max-w-md p-6 flex flex-col items-center">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-primary mb-2">JusticeAI</h1>
          <p className="text-muted-foreground text-sm">Sign in to access your legal dashboard</p>
        </div>
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: 
                "bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm",
              card: "shadow-xl border border-border/50 bg-background/95 backdrop-blur-sm",
            }
          }}
          routing="path" 
          path="/sign-in" 
        />
      </div>
    </div>
  );
}
