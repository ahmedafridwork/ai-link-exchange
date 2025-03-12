
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { BlurCard } from "@/components/ui/blur-card";
import { toast } from "@/hooks/use-toast";
import { Mail, Key, User, Phone, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signUpWithEmail } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) {
      toast({
        title: "Error",
        description: "Please enter your name, email, and password.",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    if (!email.includes('@') || !email.includes('.')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // Password validation
    if (password.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password should be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await signUpWithEmail(email, password, name, phone);
      // After signup, navigate to sign in page
      toast({
        title: "Account Created",
        description: "Please sign in with your new account.",
      });
      setTimeout(() => navigate("/signin"), 1500);
    } catch (error) {
      console.error("Error in signup form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BlurCard className="max-w-md w-full mx-auto p-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Create an Account</h1>
        <p className="text-muted-foreground text-sm mt-1">Sign up to start sharing AI resources</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center space-x-2">
            <User size={16} className="text-muted-foreground" />
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email <span className="text-red-500">*</span>
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
            Password <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center space-x-2">
            <Key size={16} className="text-muted-foreground" />
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password (min 6 characters)"
              required
              minLength={6}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium">
            Phone (optional)
          </label>
          <div className="flex items-center space-x-2">
            <Phone size={16} className="text-muted-foreground" />
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>
        </div>
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Signing Up..." : "Create Account"}
          <UserPlus size={16} className="ml-2" />
        </Button>
      </form>
      
      <div className="mt-6 text-center text-sm">
        <p>Already have an account? <Link to="/signin" className="text-primary hover:underline">Sign In</Link></p>
      </div>
    </BlurCard>
  );
}
