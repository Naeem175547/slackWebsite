import React from 'react';
import { AuthContextProvider } from './AuthContext';
import { CreateWorkspaceContextProvider } from './CreateWorkspaceContext';
import combineContext from '@/utils/combineContext';
import { WorkspacePreferencesModalContextProvider } from './WorkspacePreferencesModalContext';
const AppContextProvider = combineContext(
  AuthContextProvider,
  CreateWorkspaceContextProvider,
  WorkspacePreferencesModalContextProvider
);
export default AppContextProvider;
