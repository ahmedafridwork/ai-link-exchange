
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, Plus, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProfileButton } from "@/components/auth/ProfileButton";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4",
        isScrolled
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link 
            to="/" 
            className="text-xl font-bold tracking-tight flex items-center"
          >
            <span className="text-primary mr-1">AI</span>
            <span className="relative">
              Link Exchange
              <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-primary/80 to-transparent"></span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/discover" className="nav-link">
            Discover
          </Link>
          <Link to="/my-links" className="nav-link">
            My Links
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" size="sm" className="gap-2 text-sm">
            <Search size={14} /> Search
          </Button>
          <Link to="/add-link">
            <Button size="sm" className="gap-2 text-sm">
              <Plus size={14} /> Add Link
            </Button>
          </Link>
          <ProfileButton />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 shadow-lg animate-fade-in">
          <div className="container mx-auto py-4 px-6 flex flex-col space-y-4">
            <Link
              to="/"
              className="py-2 px-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/discover"
              className="py-2 px-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Discover
            </Link>
            <Link
              to="/my-links"
              className="py-2 px-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              My Links
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              <Button variant="outline" className="justify-start gap-2">
                <Search size={16} /> Search
              </Button>
              <Link to="/add-link" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full justify-start gap-2">
                  <Plus size={16} /> Add Link
                </Button>
              </Link>
              <div className="py-2">
                <ProfileButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
