import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth/auth';
import { SigninCard } from './components/organisms/Auth/signInCard';
import NotFound from './pages/notFound/notFound';
import { SignupContainer } from './components/organisms/Auth/SignupContainer';
import { SigninContainer } from './components/organisms/Auth/SigninContainer';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<p>Homepage</p>} />
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
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
