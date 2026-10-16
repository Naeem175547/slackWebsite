import React from 'react';
import { AuthContextProvider } from './AuthContext';
import { CreateWorkspaceContextProvider } from './CreateWorkspaceContext';
import combineContext from '@/utils/combineContext';
import { WorkspacePreferencesModalContextProvider } from './WorkspacePreferencesModalContext';
import { CreateChannelContextProvider } from './createChannelContext';
const AppContextProvider = combineContext(
  AuthContextProvider,
  CreateWorkspaceContextProvider,
  WorkspacePreferencesModalContextProvider,
  CreateChannelContextProvider

);
export default AppContextProvider;
