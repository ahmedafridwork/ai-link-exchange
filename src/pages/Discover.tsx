import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { BlurCard } from "@/components/ui/blur-card";
import { Button } from "@/components/ui/button";
import { AILink, fetchAllLinks } from "@/services/postService";
import { Link as LinkIcon, ExternalLink, LoaderCircle, Search } from "lucide-react";

const Discover = () => {
  const [links, setLinks] = useState<AILink[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadLinks = async () => {
      try {
        const allLinks = await fetchAllLinks();
        setLinks(allLinks);
      } catch (error) {
        console.error("Error loading links:", error);
      } finally {
        setLoading(false);
      }
    };
    loadLinks();
  }, []);

  const filteredLinks = links.filter((link) =>
    link.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search links..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 pr-10 border rounded-md text-sm"
              />
              <Search size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
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
              <p className="text-muted-foreground">
                Try searching for a different keyword.
              </p>
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

                  {link.tags && link.tags.split(',').filter(Boolean).length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {link.tags.split(',').map((tag, i) => (
                        <div key={i} className="bg-primary/10 text-primary dark:bg-primary/20 px-2 py-1 rounded-md text-xs">
                          {tag}
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
};

export default Discover;
