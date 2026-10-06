import React, { useEffect } from 'react';
import { UserButton } from '@/components/atoms/UserButton/UserButton';
import { useFetchWorkspaces } from '@/hooks/workspace/useFetchWorkspaces';
import { useNavigate } from 'react-router-dom';
import useCreateWorkspaceModel from '@/hooks/context/useCreateWorkspaceModel';

export default function Home() {
  const { workspaces, loading,} = useFetchWorkspaces();
  const navigate = useNavigate();
  const {setOpenCreateWorkspaceModal}=useCreateWorkspaceModel()

  useEffect(() => {
    if (loading) return;
    console.log('Workspaces downloaded is', workspaces);
    if (!workspaces || workspaces.length === 0) {
      console.log('No workspaces found, creating one');
      setOpenCreateWorkspaceModal(true)

    } else {
      console.log('Workspaces found:', workspaces);
      navigate(`/workspaces/${workspaces[0].id}`);
    }
  }, [loading, workspaces, navigate]);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <UserButton />
    </div>
  );
}
