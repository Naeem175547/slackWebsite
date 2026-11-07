import React, { Children, createContext, useState } from 'react'

export const WorkspaceContext=createContext()
export default function WorkspaceContextProvider({children}) {
    const [currentWorkspace,setCurrentWorkspace]=useState(null)

  return (
    <WorkspaceContext.Provider value={{currentWorkspace,setCurrentWorkspace}}>
        {children}
    </WorkspaceContext.Provider>
  )
}
