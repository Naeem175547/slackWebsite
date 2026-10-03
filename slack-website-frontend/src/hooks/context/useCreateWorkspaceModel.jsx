import React from 'react';
import { useContext } from 'react';
import CreateWorkspaceContext from '../../context/CreateWorkspaceContext';
export default function useCreateWorkspaceModel() {
  return useContext(CreateWorkspaceContext);
}
