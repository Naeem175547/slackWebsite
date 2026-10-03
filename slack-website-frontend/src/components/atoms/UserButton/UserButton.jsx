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
import { PencilIcon } from 'lucide-react';
import useCreateWorkspaceModel from '@/hooks/context/useCreateWorkspaceModel';

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

  const { setOpenCreateWorkspaceModal } = useCreateWorkspaceModel();

  const openWorkspaceCreateModal = () => {
    setOpenCreateWorkspaceModal(true);
  };

  if (!auth?.user) {
    return null;
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
        <DropdownMenuItem onClick={openWorkspaceCreateModal}>
          <PencilIcon className="size-4 mr-2 h-10" />
          Create Workspace
        </DropdownMenuItem>
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
