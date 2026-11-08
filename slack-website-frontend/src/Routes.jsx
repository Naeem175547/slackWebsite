import { Navigate, Route, Routes } from 'react-router-dom';

import { ProtectedRoute } from './components/molecules/ProtectedRoute';
import { SigninContainer } from './components/organisms/Auth/SigninContainer';
import { SignupContainer } from './components/organisms/Auth/SignupContainer';
import { useAuth } from './hooks/context/useAuth';
import Auth from './pages/Auth/auth';
import Home from './pages/Home/Home';
import NotFound from './pages/notFound/notFound';
import Channel from './pages/workspace/channel/channel';
import { JoinPage } from './pages/workspace/joinPage';
import { WorkspaceLayout } from './pages/workspace/layout';

// Logged-out visitors go to sign-in; logged-in users see `loggedIn`
const AuthRedirect = ({ loggedIn }) => {
  const { auth } = useAuth();
  if (auth.isLoading) return null;
  if (!auth.user || !auth.token) return <Navigate to="/auth/signin" replace />;
  return loggedIn;
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/auth/signup"
        element={
          <Auth>
            <SignupContainer />
          </Auth>
        }
      />
      <Route
        path="/auth/signin"
        element={
          <Auth>
            <SigninContainer />
          </Auth>
        }
      />
      <Route
        path="/workspaces/:workspaceId"
        element={
          <ProtectedRoute>
            <WorkspaceLayout>Workspace</WorkspaceLayout>
          </ProtectedRoute>
        }
      />
              <Route
        path='/workspaces/join/:workspaceId' element={<ProtectedRoute><JoinPage/></ProtectedRoute>}
        />
        <Route 
            path="/workspaces/:workspaceId/channels/:channelId"
            element={<ProtectedRoute><WorkspaceLayout><Channel/></WorkspaceLayout></ProtectedRoute>} />

      <Route path="/" element={<AuthRedirect loggedIn={<Navigate to="/home" replace />} />} />
      <Route path="/*" element={<AuthRedirect loggedIn={<NotFound />} />} />
    </Routes>
  );
}
