
import { useState } from "react";
import { ExternalLink, Bookmark, Share2 } from "lucide-react";
import { BlurCard } from "@/components/ui/blur-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LinkCardProps {
  title: string;
  description: string;
  url: string;
  tags: string[];
  image?: string;
  index: number;
}

export function LinkCard({ title, description, url, tags, image, index }: LinkCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Extract domain from URL for display
  const domain = new URL(url).hostname.replace("www.", "");
  
  return (
    <BlurCard
      className={cn(
        "flex flex-col h-full link-item-appear overflow-hidden",
        "group"
      )}
      style={{ "--appear-delay": index } as React.CSSProperties}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {image && (
        <div className="relative -mx-6 -mt-6 mb-6 h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        </div>
      )}
      
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.slice(0, 3).map((tag) => (
          <span key={tag} className="chip bg-primary/10 text-primary dark:bg-primary/20">
            {tag}
          </span>
        ))}
      </div>
      
      <h3 className="text-xl font-semibold mb-2 transition-colors group-hover:text-primary">
        {title}
      </h3>
      
      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
        {description}
      </p>
      
      <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/40">
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
        >
          <ExternalLink size={12} className="text-primary" />
          {domain}
        </a>
        
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bookmark size={16} className="text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Share2 size={16} className="text-muted-foreground" />
          </Button>
        </div>
      </div>
      
      <div className={cn(
        "absolute inset-0 bg-primary/5 opacity-0 transition-opacity duration-300 pointer-events-none",
        isHovered && "opacity-100"
      )} />
    </BlurCard>
  );
}
