import React from 'react';
import { AuthContextProvider } from './AuthContext';
import { CreateWorkspaceContextProvider } from './CreateWorkspaceContext';
import combineContext from '@/utils/combineContext';
import { WorkspacePreferencesModalContextProvider } from './WorkspacePreferencesModalContext';
import { CreateChannelContextProvider } from './createChannelContext';
import WorkspaceContextProvider from './WorkspaceContext';
import { SocketContextProvider } from './SocketContext';
import { ChannelMessagesProvider } from './ChannelMessages';
const AppContextProvider = combineContext(
  AuthContextProvider,
  ChannelMessagesProvider,
  SocketContextProvider,
  WorkspaceContextProvider,
  CreateWorkspaceContextProvider,
  WorkspacePreferencesModalContextProvider,
  CreateChannelContextProvider

);
export default AppContextProvider;
