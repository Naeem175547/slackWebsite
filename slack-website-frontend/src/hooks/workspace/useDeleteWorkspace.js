import { UPDATE_WORKSPACE } from "@/graphqlApi/workspace/mutation"
import { useMutation } from "@apollo/client/react"

export const useDeleteWorkspace=()=>{
    const [mutate,{data,error,loading}]=useMutation(UPDATE_WORKSPACE,{
        onCompleted:(data)=>{
            console.log("operation is completed")

        },
        onError:(error)=>{
            console.log("error found")
        }

    })
    return {
        deleteWorkspaceMutation:mutate,
        data,
        error,
        loading,
        isPending:loading,
        isSuccess:!!data

    }

}