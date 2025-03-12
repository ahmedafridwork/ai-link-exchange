
import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { SearchBar } from "@/components/features/search-bar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Add a small delay for the animation to feel more natural
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const scrollToContent = () => {
    const content = document.getElementById('featured-content');
    if (content) {
      content.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-float opacity-60" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-blue-400/10 blur-3xl animate-float opacity-40" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="container px-6 py-12 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <span className={cn(
            "chip bg-primary/10 text-primary mb-6 text-sm invisible",
            isLoaded && "animate-fade-in !visible"
          )}>
            The Community for AI Enthusiasts
          </span>
          
          <h1 className={cn(
            "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 invisible",
            isLoaded && "animate-fade-in !visible"
          )}
            style={{ animationDelay: '100ms' }}
          >
            Discover, Share & Explore <br />
            <span className="text-primary">AI Resources</span>
          </h1>
          
          <p className={cn(
            "text-muted-foreground text-lg md:text-xl mb-12 max-w-2xl mx-auto invisible",
            isLoaded && "animate-fade-in !visible"
          )}
            style={{ animationDelay: '200ms' }}
          >
            Find the best AI tools, models, and resources – curated by the community
            for developers, designers, and AI enthusiasts.
          </p>
          
          <div className={cn(
            "max-w-2xl mx-auto mb-16 invisible",
            isLoaded && "animate-fade-in !visible"
          )}
            style={{ animationDelay: '300ms' }}
          >
            <SearchBar />
          </div>
          
          <div className={cn(
            "flex flex-wrap gap-4 justify-center invisible",
            isLoaded && "animate-fade-in !visible"
          )}
            style={{ animationDelay: '400ms' }}
          >
            <Link to="/signup">
              <Button size="lg" className="gap-2">
                Join the Community
              </Button>
            </Link>
            <Link to="/discover">
              <Button size="lg" variant="outline" className="gap-2">
                Browse Resources
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <button 
        onClick={scrollToContent}
        className={cn(
          "absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors",
          "invisible",
          isLoaded && "animate-fade-in !visible"
        )}
        style={{ animationDelay: '500ms' }}
      >
        <span className="text-sm mb-2">Scroll to explore</span>
        <ArrowDown size={20} className="animate-bounce" />
      </button>
    </section>
  );
}
