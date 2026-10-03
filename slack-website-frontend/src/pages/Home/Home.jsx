import React, { useEffect } from 'react';
import { UserButton } from '@/components/atoms/UserButton/UserButton';
import { useFetchWorkspaces } from '@/hooks/workspace/useFetchWorkspaces';

export default function Home() {
  const { workspaces, loading, error } = useFetchWorkspaces();

  useEffect(() => {
    if (loading) return;
    console.log('Workspaces downloaded is', workspaces);
    if (!workspaces || workspaces.length === 0) {
      console.log('No workspaces found, creating one');
    }
  }, [loading, workspaces]);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <UserButton />
    </div>
  );
}
