import { WorkspaceContext } from "@/context/WorkspaceContext"
import { useContext } from "react"


export  function useCurrentWorkspace() {
  return (
    useContext(WorkspaceContext)
  )
}
