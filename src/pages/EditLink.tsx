
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/navbar";
import { LinkForm } from "@/components/features/link-form";
import { supabase } from "@/lib/supabase";
import { AILink } from "@/services/postService";
import { BlurCard } from "@/components/ui/blur-card";
import { LoaderCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const EditLink = () => {
  const { id } = useParams<{ id: string }>();
  const [link, setLink] = useState<AILink | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLink = async () => {
      try {
        if (!user) {
          navigate('/signin');
          return;
        }

        const { data, error } = await supabase
          .from('ai_links')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        
        // Check if the link belongs to the current user
        if (data.user_id !== user.id) {
          setError("You don't have permission to edit this link");
          return;
        }
        
        setLink(data);
      } catch (err) {
        console.error('Error fetching link:', err);
        setError("Failed to load link data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchLink();
    }
  }, [id, user, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Edit Link</h1>
            <p className="text-muted-foreground mt-2">
              Update your AI resource details
            </p>
          </div>
          
          {loading ? (
            <BlurCard className="max-w-3xl mx-auto p-8 flex justify-center items-center">
              <LoaderCircle className="animate-spin mr-2" />
              <span>Loading link data...</span>
            </BlurCard>
          ) : error ? (
            <BlurCard className="max-w-3xl mx-auto p-8 text-center">
              <p className="text-red-500">{error}</p>
            </BlurCard>
          ) : link ? (
            <LinkForm initialData={link} isEditing />
          ) : (
            <BlurCard className="max-w-3xl mx-auto p-8 text-center">
              <p className="text-red-500">Link not found</p>
            </BlurCard>
          )}
        </div>
      </main>
    </div>
  );
};

export default EditLink;
