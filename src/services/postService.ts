
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

export interface AILink {
  id?: number;
  title?: string;
  description?: string;
  url?: string;
  tags?: string | string[];
  image?: string;
  user_id: string;
  created_at?: string;
}

export async function fetchAllLinks(): Promise<AILink[]> {
  try {
    const { data, error } = await supabase
      .from('ai_links')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching all links:', error);
    toast({
      title: "Failed to load links",
      description: "There was an error loading the AI links. Please try again.",
      variant: "destructive",
    });
    return [];
  }
}

export async function fetchLinks(): Promise<AILink[]> {
  try {
    const { data, error } = await supabase
      .from('ai_links')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching links:', error);
    toast({
      title: "Failed to load links",
      description: "There was an error loading the AI links. Please try again.",
      variant: "destructive",
    });
    return [];
  }
}

export async function createLink(link: Omit<AILink, 'id' | 'created_at'>): Promise<AILink | null> {
  try {
    // Ensure we're not sending any undefined values
    const cleanLink = {
      title: link.title || '',
      description: link.description || '',
      url: link.url || '',
      tags: link.tags || '',
      image: link.image || '',
      user_id: link.user_id,
    };
    
    const { data, error } = await supabase
      .from('ai_links')
      .insert([cleanLink])
      .select()
      .single();

    if (error) {
      throw error;
    }

    toast({
      title: "Link Added",
      description: "Your AI link has been successfully added.",
    });

    return data;
  } catch (error) {
    console.error('Error creating link:', error);
    toast({
      title: "Failed to add link",
      description: "There was an error adding your AI link. Please try again.",
      variant: "destructive",
    });
    return null;
  }
}

export async function updateLink(id: string, link: Partial<AILink>): Promise<AILink | null> {
  try {
    const { data, error } = await supabase
      .from('ai_links')
      .update(link)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    toast({
      title: "Link Updated",
      description: "Your AI link has been successfully updated.",
    });

    return data;
  } catch (error) {
    console.error('Error updating link:', error);
    toast({
      title: "Failed to update link",
      description: "There was an error updating your AI link. Please try again.",
      variant: "destructive",
    });
    return null;
  }
}

export async function deleteLink(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('ai_links')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    toast({
      title: "Link Deleted",
      description: "Your AI link has been successfully deleted.",
    });

    return true;
  } catch (error) {
    console.error('Error deleting link:', error);
    toast({
      title: "Failed to delete link",
      description: "There was an error deleting your AI link. Please try again.",
      variant: "destructive",
    });
    return false;
  }
}

export async function fetchUserLinks(userId: string): Promise<AILink[]> {
  try {
    const { data, error } = await supabase
      .from('ai_links')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching user links:', error);
    toast({
      title: "Failed to load your links",
      description: "There was an error loading your AI links. Please try again.",
      variant: "destructive",
    });
    return [];
  }
}
