
import { useState, useEffect } from "react";
import { LinkCard } from "./link-card";

// Sample data for featured links
const FEATURED_LINKS = [
  {
    id: "1",
    title: "ChatGPT: The AI Language Model",
    description: "OpenAI's ChatGPT is a conversational AI model that can engage in human-like text conversations on a wide range of topics.",
    url: "https://openai.com/chatgpt",
    tags: ["Language Model", "OpenAI", "Conversational"],
    image: "https://images.unsplash.com/photo-1655720031554-a929595ffad7?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "2",
    title: "Midjourney: AI Image Generation",
    description: "Midjourney is an AI program that generates images from textual descriptions, similar to OpenAI's DALL-E and Stable Diffusion.",
    url: "https://www.midjourney.com",
    tags: ["Image Generation", "Creative", "Visual"],
    image: "https://images.unsplash.com/photo-1679958157994-5238fdb3e28f?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "3",
    title: "GitHub Copilot: AI Coding Assistant",
    description: "GitHub Copilot is an AI pair programmer that offers autocomplete-style suggestions as you code, trained on billions of lines of code.",
    url: "https://github.com/features/copilot",
    tags: ["Coding", "Development", "GitHub"],
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "4",
    title: "Hugging Face: AI Community & Models",
    description: "Hugging Face is an AI community that provides tools and platforms to build, train and deploy machine learning models.",
    url: "https://huggingface.co",
    tags: ["Machine Learning", "Community", "Models"],
    image: "https://images.unsplash.com/photo-1591696331111-ef9586a5b7c2?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "5",
    title: "Anthropic Claude: Conversational AI",
    description: "Claude is a next-generation AI assistant from Anthropic, designed to be helpful, harmless, and honest.",
    url: "https://www.anthropic.com/claude",
    tags: ["Conversational", "Assistant", "Anthropic"],
    image: "https://images.unsplash.com/photo-1702511338766-5634cea682a9?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "6",
    title: "Runway: AI Video Generation",
    description: "Runway is a creative toolkit powered by AI that offers features like text-to-video, image-to-video, and more.",
    url: "https://runwayml.com",
    tags: ["Video", "Creative", "Generation"],
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1000&auto=format&fit=crop"
  }
];

export function FeaturedLinks() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Don't render on the server to avoid hydration issues with animations
  if (!isClient) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="container px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Featured AI Resources</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the most innovative AI tools and resources handpicked by our community
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_LINKS.map((link, index) => (
            <LinkCard
              key={link.id}
              title={link.title}
              description={link.description}
              url={link.url}
              tags={link.tags}
              image={link.image}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
