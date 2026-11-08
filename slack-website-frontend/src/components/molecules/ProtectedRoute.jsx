import { LucideLoader2 } from 'lucide-react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '@/hooks/context/useAuth';
export const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();
  const location = useLocation();

  if (auth.isLoading) {
    return (
      <div>
        <LucideLoader2 className="animate-spin" />
        Loading...
      </div>
    );
  }

  if (!auth.user || !auth.token) {
    return (
      <Navigate
        to="/auth/signin"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  return children;
};
