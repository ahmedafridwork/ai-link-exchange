
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
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function ProfileButton() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Button onClick={() => navigate('/signin')} variant="outline" size="sm" className="text-sm">
          Sign In
        </Button>
        <Button onClick={() => navigate('/signup')} variant="default" size="sm" className="text-sm">
          Sign Up
        </Button>
      </div>
    );
  }

  const userEmail = user.email || '';
  const userInitials = userEmail 
    ? userEmail.substring(0, 2).toUpperCase()
    : user.id.substring(0, 2).toUpperCase();
  
  const displayName = user.user_metadata?.full_name || userEmail || 'My Account';
  
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
          {displayName}
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
