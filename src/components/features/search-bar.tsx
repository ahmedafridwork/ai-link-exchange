
import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export function SearchBar({ 
  className, 
  placeholder = "Search AI tools, resources, and more...",
  onSearch
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = () => {
    if (onSearch && query.trim()) {
      onSearch(query);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setQuery("");
  };

  return (
    <div 
      className={cn(
        "relative w-full max-w-2xl mx-auto transition-all duration-300",
        isFocused ? "scale-[1.02]" : "scale-100",
        className
      )}
    >
      <div className={cn(
        "flex items-center glass-morphism px-4 py-3 rounded-full",
        isFocused && "ring-2 ring-primary/20"
      )}>
        <Search 
          size={18} 
          className={cn(
            "text-muted-foreground mr-3 transition-colors",
            isFocused && "text-primary"
          )} 
        />
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="bg-transparent border-none flex-1 focus:outline-none text-foreground placeholder:text-muted-foreground"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            className="h-8 w-8 rounded-full"
          >
            <X size={14} />
          </Button>
        )}
        <Button 
          onClick={handleSearch}
          className="ml-2 rounded-full"
          size="sm"
        >
          Search
        </Button>
      </div>
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-primary/20 blur-xl opacity-40 pointer-events-none" />
    </div>
  );
}
