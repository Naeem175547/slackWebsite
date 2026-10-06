import { Loader } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger,DropdownMenuContent,DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useGetWorkspaceById } from '@/hooks/workspace/useGetWorkspaceById';
import {useFetchWorkspaces} from '@/hooks/workspace/useFetchWorkspaces';

export const WorkspaceSwitcher = () => {

    const navigate = useNavigate();
    const { workspaceId } = useParams();
    const { isFetching, workspace } = useGetWorkspaceById(workspaceId);
    const {loading:isFetchingWorkspace,workspaces}=useFetchWorkspaces()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button
                    className='size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 font-semibold text-slate-800 text-xl'
                >
                    {isFetching ? (<Loader className='size-5 animate-spin' />) : workspace?.name.charAt(0).toUpperCase()}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem
                    className='cursor-pointer flex-col justify-start items-start'
                >
                    {workspace?.name}
                    <span className='text-xs text-muted-foregorund'>
                        (Active Workspace)
                    </span>
                </DropdownMenuItem>
                {isFetchingWorkspace ? ( <Loader className='size-5 animate-spin' /> ) : 
                    workspaces?.map((workspace) => {
                        if(workspace.id == workspaceId) {                            
                            return null;
                        }
                        return (
                            <DropdownMenuItem
                                className='cursor-pointer flex-col justify-start items-start'
                                onClick={() => navigate(`/workspaces/${workspace._id}`)}
                                key={workspace._id}
                            >
                                <p
                                    className='truncate'
                                >{workspace?.name}</p>
                            </DropdownMenuItem>
                        );
                    }
                        
                    )
                }

            </DropdownMenuContent>
            
        </DropdownMenu>
    );
};