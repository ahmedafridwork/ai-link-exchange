
import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/layout/hero-section";
import { FeaturedLinks } from "@/components/features/featured-links";
import { BlurCard } from "@/components/ui/blur-card";
import { Brain, Lightbulb, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16">
        <HeroSection />
        
        <div id="featured-content">
          <FeaturedLinks />
        </div>
        
        {/* How it works section */}
        <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
          <div className="container px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Join our community to discover and share the best AI resources
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <BlurCard className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Brain size={28} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Discover</h3>
                <p className="text-muted-foreground text-sm">
                  Explore a curated collection of AI tools, datasets, and learning resources
                </p>
              </BlurCard>
              
              <BlurCard className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Lightbulb size={28} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Learn</h3>
                <p className="text-muted-foreground text-sm">
                  Find tutorials, guides, and community insights to enhance your AI knowledge
                </p>
              </BlurCard>
              
              <BlurCard className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Share2 size={28} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Share</h3>
                <p className="text-muted-foreground text-sm">
                  Contribute your own discoveries and join discussions with fellow AI enthusiasts
                </p>
              </BlurCard>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl opacity-70" />
          </div>
          
          <div className="container px-6">
            <BlurCard className="max-w-4xl mx-auto text-center py-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Ready to join the AI community?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Sign up today and start sharing your favorite AI resources with developers 
                and enthusiasts from around the world.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="gap-2">
                  Create Account
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  Learn More
                </Button>
              </div>
            </BlurCard>
          </div>
        </section>
      </main>
      
      <footer className="bg-slate-50 dark:bg-slate-900/50 py-12">
        <div className="container px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-xl font-bold flex items-center">
                <span className="text-primary mr-1">AI</span>Link Exchange
              </div>
              <p className="text-muted-foreground text-sm mt-2">
                A community for AI enthusiasts
              </p>
            </div>
            
            <div className="flex gap-8">
              <div className="text-sm">
                <h4 className="font-semibold mb-3">Resources</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Browse All</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Latest</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Popular</a></li>
                </ul>
              </div>
              
              <div className="text-sm">
                <h4 className="font-semibold mb-3">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
                </ul>
              </div>
              
              <div className="text-sm">
                <h4 className="font-semibold mb-3">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border/40 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} AI Link Exchange. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
