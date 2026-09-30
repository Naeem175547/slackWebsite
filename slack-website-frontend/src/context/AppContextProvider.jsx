import React from 'react';
import { AuthContextProvider } from './AuthContext';
import combineContext from '@/utils/combineContext';
const AppContextProvider = combineContext(AuthContextProvider);
export default AppContextProvider;
