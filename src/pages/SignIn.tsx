
import { Navbar } from "@/components/layout/navbar";
import { SignInForm } from "@/components/auth/SignInForm";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const SignIn = () => {
  const { user } = useAuth();

  // Redirect if already signed in
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container px-6">
          <SignInForm />
        </div>
      </main>
    </div>
  );
};

export default SignIn;
