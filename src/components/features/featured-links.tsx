
import { useState, useEffect } from "react";
import { LinkCard } from "@/components/features/link-card";
import { supabase } from "@/lib/supabase";
import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedLinks() {
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const { data, error } = await supabase
          .from("ai_links")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(6);

        if (error) {
          throw error;
        }

        // Process the data to ensure tags is an array
        const processedData = data.map(link => ({
          ...link,
          tags: link.tags ? link.tags.split(',').map((tag: string) => tag.trim()) : []
        }));

        setLinks(processedData);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching links:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  if (loading) {
    return (
      <div className="container px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-3">Featured Resources</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the latest and most popular AI tools and resources
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} className="h-[320px] rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container px-6 py-16 text-center">
        <h2 className="text-2xl text-red-500 mb-4">Error loading resources</h2>
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="container px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-3">Featured Resources</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover the latest and most popular AI tools and resources
        </p>
      </div>
      
      {links.length === 0 ? (
        <div className="text-center py-16">
          <h3 className="text-xl mb-2">No resources found</h3>
          <p className="text-muted-foreground">Be the first to add an AI resource!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((link, index) => (
            <LinkCard
              key={link.id}
              title={link.title || "Untitled"}
              description={link.description || "No description provided"}
              url={link.url || "#"}
              tags={link.tags}
              image={link.image || "/placeholder.svg"}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}
