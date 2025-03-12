
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { createLink, updateLink, AILink } from "@/services/postService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BlurCard } from "@/components/ui/blur-card";
import { toast } from "@/hooks/use-toast";
import { Tag, X, Link as LinkIcon, Save, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface LinkFormProps {
  initialData?: AILink;
  isEditing?: boolean;
}

export function LinkForm({ initialData, isEditing = false }: LinkFormProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState<Omit<AILink, 'id' | 'created_at' | 'user_id'>>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    url: initialData?.url || "",
    tags: initialData?.tags || "",
    image: initialData?.image || "",
  });
  
  // Track tags separately as an array for UI manipulation, but store as string in formData
  const [tagArray, setTagArray] = useState<string[]>(
    typeof initialData?.tags === 'string' 
      ? initialData.tags.split(',').filter(Boolean) 
      : Array.isArray(initialData?.tags) 
        ? initialData.tags.filter(tag => typeof tag === 'string') as string[]
        : []
  );
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (!user) {
    return (
      <BlurCard className="max-w-3xl mx-auto p-8">
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertDescription>
            You need to be signed in to add or edit links.
          </AlertDescription>
        </Alert>
        <div className="flex gap-3">
          <Button onClick={() => navigate('/signin')}>Sign In</Button>
          <Button variant="outline" onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </BlurCard>
    );
  }
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Only description is mandatory
    if (!formData.description?.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 10) {
      newErrors.description = "Description should be at least 10 characters";
    }
    
    // URL validation only if provided
    if (formData.url?.trim()) {
      try {
        new URL(formData.url);
      } catch (e) {
        newErrors.url = "Please enter a valid URL";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddTag = () => {
    if (tagInput.trim() && !tagArray.includes(tagInput.trim())) {
      const newTagArray = [...tagArray, tagInput.trim()];
      setTagArray(newTagArray);
      // Update formData with comma-separated string of tags
      setFormData(prev => ({
        ...prev,
        tags: newTagArray.join(',')
      }));
      setTagInput("");
    }
  };
  
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    const newTagArray = tagArray.filter(tag => tag !== tagToRemove);
    setTagArray(newTagArray);
    // Update formData with comma-separated string of tags
    setFormData(prev => ({
      ...prev,
      tags: newTagArray.join(',')
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the form errors before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (isEditing && initialData?.id) {
        await updateLink(initialData.id.toString(), formData);
        toast({
          title: "Success",
          description: "Link updated successfully!",
        });
      } else {
        await createLink({
          ...formData,
          user_id: user.id,
        });
        toast({
          title: "Success",
          description: "Link added successfully!",
        });
      }
      navigate('/my-links');
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Error",
        description: "Failed to save link. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <BlurCard className="max-w-3xl mx-auto p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium">
            Title <span className="text-muted-foreground">(optional)</span>
          </label>
          <Input
            id="title"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            placeholder="Enter a descriptive title"
            className={errors.title ? "border-red-500" : ""}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium">
            Description <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="description"
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            placeholder="Provide a detailed description of the AI resource"
            rows={4}
            className={errors.description ? "border-red-500" : ""}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="url" className="block text-sm font-medium">
            URL <span className="text-muted-foreground">(optional)</span>
          </label>
          <div className="flex items-center space-x-2">
            <LinkIcon size={16} className="text-muted-foreground" />
            <Input
              id="url"
              name="url"
              value={formData.url || ""}
              onChange={handleChange}
              placeholder="https://example.com"
              className={errors.url ? "border-red-500" : ""}
            />
          </div>
          {errors.url && <p className="text-red-500 text-sm">{errors.url}</p>}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="image" className="block text-sm font-medium">
            Image URL <span className="text-muted-foreground">(optional)</span>
          </label>
          <Input
            id="image"
            name="image"
            value={formData.image || ""}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
          <p className="text-xs text-muted-foreground">
            Add an image URL to make your link stand out
          </p>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="tags" className="block text-sm font-medium">
            Tags <span className="text-muted-foreground">(optional)</span>
          </label>
          <div className="flex items-center space-x-2">
            <Tag size={16} className="text-muted-foreground" />
            <Input
              id="tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="Add tag and press Enter"
              className={errors.tags ? "border-red-500" : ""}
            />
            <Button type="button" size="sm" onClick={handleAddTag}>
              Add
            </Button>
          </div>
          {errors.tags && <p className="text-red-500 text-sm">{errors.tags}</p>}
          
          {tagArray.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tagArray.map((tag) => (
                <div key={tag} className="bg-primary/10 text-primary dark:bg-primary/20 px-2 py-1 rounded-md text-sm flex items-center gap-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex justify-end gap-3 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/my-links')}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="gap-2">
            <Save size={16} />
            {isSubmitting ? "Saving..." : isEditing ? "Update Link" : "Add Link"}
          </Button>
        </div>
      </form>
    </BlurCard>
  );
}
