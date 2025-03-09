
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { BlurCard } from "@/components/ui/blur-card";
import { toast } from "@/hooks/use-toast";
import { Mail, Key, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signInWithEmail } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await signInWithEmail(email, password);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BlurCard className="max-w-md w-full mx-auto p-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Sign In</h1>
        <p className="text-muted-foreground text-sm mt-1">Sign in to your account to continue</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <div className="flex items-center space-x-2">
            <Mail size={16} className="text-muted-foreground" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <div className="flex items-center space-x-2">
            <Key size={16} className="text-muted-foreground" />
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
        </div>
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Signing In..." : "Sign In"}
          <LogIn size={16} className="ml-2" />
        </Button>
      </form>
      
      <div className="mt-6 text-center text-sm">
        <p>Don't have an account? <Link to="/signup" className="text-primary hover:underline">Sign Up</Link></p>
      </div>
    </BlurCard>
  );
}
