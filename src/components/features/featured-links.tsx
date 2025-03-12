
import { useState, useEffect } from "react";
import { LinkCard } from "./link-card";
import { fetchLinks, AILink } from "@/services/postService";
import { LoaderCircle } from "lucide-react";

export function FeaturedLinks() {
  const [links, setLinks] = useState<AILink[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadLinks = async () => {
      try {
        const data = await fetchLinks();
        setLinks(data);
      } catch (error) {
        console.error("Error loading links:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadLinks();
  }, []);

  return (
    <section className="py-16">
      <div className="container px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Featured AI Resources</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the most innovative AI tools and resources from our community
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <LoaderCircle className="animate-spin mr-2" />
            <span>Loading resources...</span>
          </div>
        ) : links.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No links available yet. Be the first to add one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {links.map((link, index) => (
              <LinkCard
                key={link.id}
                title={link.title || ""}
                description={link.description || ""}
                url={link.url || ""}
                tags={link.tags || ""}
                image={link.image || ""}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
