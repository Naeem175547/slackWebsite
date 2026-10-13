import { UPDATE_WORKSPACE } from "@/graphqlApi/workspace/mutation"
import { useMutation } from "@apollo/client/react"
import { toast } from "@/components/ui/toast"

export const useUpdateWorkspace=()=>{
    const [mutate,{data,error,loading}]=useMutation(UPDATE_WORKSPACE,{
        onCompleted:(data)=>{
        toast.add({
          title: 'Workspace Updated',
          description: data.UpdateWorkspace.message,
          type: 'success',
        });
        },
        onError:(error)=>{
            toast.add({
          title: 'Workspace Update Failed',
          description: error.message,
          type: 'error',
        });
        }
    })
    return {
        updateWorkspaceMutation:mutate,
        isPending:loading,
        isSuccess:!!data,
        error
    }

}
