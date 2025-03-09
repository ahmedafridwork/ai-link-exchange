
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { User, LogOut, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function ProfileButton() {
  const { user, signIn, signOut } = useAuth();
  
  if (!user) {
    return (
      <Button onClick={signIn} variant="outline" size="sm" className="gap-2 text-sm">
        <User size={14} /> Sign In
      </Button>
    );
  }

  const userInitials = user.email 
    ? user.email.substring(0, 2).toUpperCase()
    : user.id.substring(0, 2).toUpperCase();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.user_metadata?.avatar_url} />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          {user.user_metadata?.full_name || user.email || 'My Account'}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/my-links" className="cursor-pointer w-full flex items-center">
            My Links
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/add-link" className="cursor-pointer w-full flex items-center">
            <Plus className="mr-2 h-4 w-4" /> Add New Link
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut} className="text-red-600 cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" /> Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
