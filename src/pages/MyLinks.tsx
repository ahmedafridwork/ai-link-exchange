
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { BlurCard } from "@/components/ui/blur-card";
import { Button } from "@/components/ui/button";
import { AILink, fetchUserLinks, deleteLink } from "@/services/postService";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Edit, Trash2, Plus, Link as LinkIcon, ExternalLink, LoaderCircle } from "lucide-react";

const MyLinks = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [links, setLinks] = useState<AILink[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const loadUserLinks = async () => {
      if (user) {
        try {
          const userLinks = await fetchUserLinks(user.id);
          setLinks(userLinks);
        } catch (error) {
          console.error("Error loading user links:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadUserLinks();
  }, [user]);

  if (!user) {
    navigate('/signin');
    return null;
  }

  const handleDeleteLink = async (id: number) => {
    setIsDeleting(true);
    try {
      const success = await deleteLink(id.toString());
      if (success) {
        setLinks(links.filter(link => link.id !== id));
      }
    } catch (error) {
      console.error("Error deleting link:", error);
    } finally {
      setIsDeleting(false);
      setConfirmDeleteId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">My Links</h1>
              <p className="text-muted-foreground mt-2">
                Manage your AI resource links
              </p>
            </div>
            <Button onClick={() => navigate('/add-link')} className="gap-2">
              <Plus size={16} />
              Add New Link
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <LoaderCircle className="animate-spin mr-2" />
              <span>Loading your links...</span>
            </div>
          ) : links.length === 0 ? (
            <BlurCard className="p-8 text-center">
              <h2 className="text-xl font-semibold mb-4">No links found</h2>
              <p className="text-muted-foreground mb-6">
                You haven't added any AI resource links yet. Add your first link to get started!
              </p>
              <Button onClick={() => navigate('/add-link')} className="gap-2">
                <Plus size={16} />
                Add Your First Link
              </Button>
            </BlurCard>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {links.map((link) => (
                <BlurCard key={link.id} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold line-clamp-1">
                      {link.title || "Untitled Link"}
                    </h2>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/edit-link/${link.id}`)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit size={16} />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <AlertDialog open={confirmDeleteId === link.id} onOpenChange={(open) => !open && setConfirmDeleteId(null)}>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setConfirmDeleteId(link.id || null)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 size={16} />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your link.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => link.id && handleDeleteLink(link.id)}
                              className="bg-destructive hover:bg-destructive/90"
                              disabled={isDeleting}
                            >
                              {isDeleting ? "Deleting..." : "Delete"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>

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
};

export default MyLinks;
