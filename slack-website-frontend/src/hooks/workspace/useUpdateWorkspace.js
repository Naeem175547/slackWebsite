import { UPDATE_WORKSPACE } from "@/graphqlApi/workspace/mutation"
import { useMutation } from "@apollo/client/react"

export const useUpdateWorkspace=()=>{
    const [mutate,{data,error,loading}]=useMutation(UPDATE_WORKSPACE,{
        onCompleted:(data)=>{
            console.log("update operation completed..")
        },
        onError:(error)=>{
            console.log("update operation failed")
        }
    })
    return {
        updateWorkspaceMutation:mutate,
        isPending:loading,
        isSuccess:!!data,
        error
    }

}