
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { fetchUserLinks, deleteLink, AILink } from "@/services/postService";
import { Navbar } from "@/components/layout/navbar";
import { BlurCard } from "@/components/ui/blur-card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const MyLinks = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [links, setLinks] = useState<AILink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [linkToDelete, setLinkToDelete] = useState<string | null>(null);

  useEffect(() => {
    const loadLinks = async () => {
      if (user) {
        const userLinks = await fetchUserLinks(user.id);
        setLinks(userLinks);
      }
      setIsLoading(false);
    };

    if (!loading) {
      loadLinks();
    }
  }, [user, loading]);

  const handleDelete = async () => {
    if (linkToDelete) {
      const success = await deleteLink(linkToDelete);
      if (success) {
        setLinks(links.filter(link => link.id !== linkToDelete));
      }
      setLinkToDelete(null);
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container px-6">
            <div className="max-w-5xl mx-auto">
              <BlurCard className="p-12 text-center">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="h-8 bg-primary/10 rounded w-1/4 mb-6"></div>
                  <div className="h-4 bg-primary/10 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-primary/10 rounded w-2/3"></div>
                </div>
              </BlurCard>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container px-6">
            <div className="max-w-5xl mx-auto">
              <BlurCard className="p-12 text-center">
                <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
                <p className="text-muted-foreground mb-6">
                  Please sign in to view your links
                </p>
                <Button onClick={() => navigate('/')}>Go Home</Button>
              </BlurCard>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">My Links</h1>
              <Button onClick={() => navigate('/add-link')} className="gap-2">
                <Plus size={16} /> Add New Link
              </Button>
            </div>

            {links.length === 0 ? (
              <BlurCard className="p-12 text-center">
                <h2 className="text-2xl font-semibold mb-4">No Links Yet</h2>
                <p className="text-muted-foreground mb-6">
                  You haven't added any AI links yet. Start sharing your favorite resources with the community!
                </p>
                <Button onClick={() => navigate('/add-link')} className="gap-2">
                  <Plus size={16} /> Add Your First Link
                </Button>
              </BlurCard>
            ) : (
              <div className="space-y-4">
                {links.map((link) => (
                  <BlurCard
                    key={link.id}
                    className="p-6 group hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {link.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {link.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {link.tags.map((tag) => (
                            <span key={tag} className="chip bg-primary/10 text-primary dark:bg-primary/20 px-2 py-1 rounded-md text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors w-fit"
                        >
                          <ExternalLink size={12} className="text-primary" />
                          {new URL(link.url).hostname.replace("www.", "")}
                        </a>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/edit-link/${link.id}`)}
                          className="h-8 w-8 p-0"
                        >
                          <Pencil size={16} />
                          <span className="sr-only">Edit</span>
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                              onClick={() => setLinkToDelete(link.id as string)}
                            >
                              <Trash2 size={16} />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Link</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{link.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel onClick={() => setLinkToDelete(null)}>
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </BlurCard>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyLinks;
