
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/layout/navbar";
import { BlurCard } from "@/components/ui/blur-card";
import { AILink, fetchAllLinks } from "@/services/postService";
import { Link as LinkIcon, ExternalLink, LoaderCircle } from "lucide-react";
import { SearchBar } from "@/components/features/search-bar";

const Discover = () => {
  const [links, setLinks] = useState<AILink[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  useEffect(() => {
    const loadLinks = async () => {
      try {
        const allLinks = await fetchAllLinks();
        setLinks(allLinks);
        console.log("Loaded links:", allLinks);
      } catch (error) {
        console.error("Error loading links:", error);
      } finally {
        setLoading(false);
      }
    };
    loadLinks();
  }, []);

  useEffect(() => {
    // Update local search when URL param changes
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchParams(query ? { search: query } : {});
  };

  const filteredLinks = links.filter((link) => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    
    // Search in title
    if (link.title && link.title.toLowerCase().includes(searchLower)) return true;
    
    // Search in description
    if (link.description && link.description.toLowerCase().includes(searchLower)) return true;
    
    // Search in tags
    if (link.tags) {
      if (typeof link.tags === 'string') {
        const tagArray = link.tags.split(',');
        for (const tag of tagArray) {
          if (tag.trim().toLowerCase().includes(searchLower)) return true;
        }
      } else if (Array.isArray(link.tags)) {
        for (const tag of link.tags) {
          if (typeof tag === 'string' && tag.trim().toLowerCase().includes(searchLower)) return true;
        }
      }
    }
    
    // Search in URL
    if (link.url && link.url.toLowerCase().includes(searchLower)) return true;
    
    return false;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Discover Links</h1>
              <p className="text-muted-foreground mt-2">
                Explore AI resource links shared by the community.
              </p>
            </div>
            <div className="w-full md:w-80">
              <SearchBar 
                inline={true} 
                className="w-full" 
                placeholder="Search links..."
                onSearch={handleSearch}
              />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <LoaderCircle className="animate-spin mr-2" />
              <span>Loading links...</span>
            </div>
          ) : filteredLinks.length === 0 ? (
            <BlurCard className="p-8 text-center">
              <h2 className="text-xl font-semibold mb-4">No links found</h2>
              {searchQuery ? (
                <p className="text-muted-foreground">
                  No results found for "{searchQuery}". Try searching for a different keyword.
                </p>
              ) : (
                <p className="text-muted-foreground">
                  No links have been added yet. Be the first to share an AI resource!
                </p>
              )}
            </BlurCard>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredLinks.map((link) => (
                <BlurCard key={link.id} className="p-6">
                  <h2 className="text-xl font-semibold line-clamp-1">
                    {link.title || "Untitled Link"}
                  </h2>
                  <p className="text-muted-foreground line-clamp-3 mb-4">
                    {link.description}
                  </p>

                  {link.url && (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-primary hover:underline mb-4"
                    >
                      <LinkIcon size={14} className="mr-1" />
                      {link.url}
                      <ExternalLink size={12} className="ml-1" />
                    </a>
                  )}

                  {link.tags && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {(typeof link.tags === 'string' 
                        ? link.tags.split(',') 
                        : Array.isArray(link.tags) 
                          ? link.tags 
                          : [])
                        .filter(Boolean)
                        .map((tag, i) => (
                          <div key={i} className="bg-primary/10 text-primary dark:bg-primary/20 px-2 py-1 rounded-md text-xs">
                            {typeof tag === 'string' ? tag.trim() : tag}
                          </div>
                      ))}
                    </div>
                  )}
                </BlurCard>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Discover;
