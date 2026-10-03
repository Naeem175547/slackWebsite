import React from 'react';
import { AuthContextProvider } from './AuthContext';
import { CreateWorkspaceContextProvider } from './CreateWorkspaceContext';
import combineContext from '@/utils/combineContext';
const AppContextProvider = combineContext(
  AuthContextProvider,
  CreateWorkspaceContextProvider
);
export default AppContextProvider;
