import { SettingsIcon, LogOutIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/context/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/toast';

export const UserButton = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  async function handleLogout() {
    await logout();
    toast.add({
      title: 'Logged out',
      description: 'You have been logged out successfully.',
      variant: 'success',
    });
    navigate('/auth/signin');
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative outline-none">
        <Avatar className="size-10 transition hover:opacity-65">
          <AvatarImage src={auth?.user?.avatar} alt={auth?.user?.name} />
          <AvatarFallback>
            {auth?.user?.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem>
          <SettingsIcon className="mr-2 size-4 h-10" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleLogout}>
          <LogOutIcon className="mr-2 size-4 h-10" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
