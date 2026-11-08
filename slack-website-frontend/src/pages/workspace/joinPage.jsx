import { useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import VerificationInputModule from 'react-verification-input';

import { Button } from '@/components/ui/button';
import { useJoinWorkspace } from '@/hooks/workspace/useJoinWorkspace';




export const JoinPage = () => {

    const { workspaceId } = useParams();
    const VerificationInput = VerificationInputModule.default ?? VerificationInputModule;
    const navigate=useNavigate();
    const [searchParams] = useSearchParams();
    // Invite links carry the code as ?code=XXXXXX so it can be pre-filled
    const codeFromLink = (searchParams.get('code') || '').trim().toUpperCase().slice(0, 6);
    const [code, setCode] = useState(codeFromLink);
    const {joinWorkspaceMutation,isPending}=useJoinWorkspace(workspaceId, {
        onAlreadyMember: () => navigate(`/workspaces/${workspaceId}`, { replace: true }),
    });

    // VerificationInput passes the entered code to onComplete
    async function handleAddMemberToWorkspace(joinCode) {
        if(isPending) return;
        try{
            const { data } = await joinWorkspaceMutation(joinCode);
            if(data?.joinWorkspace?.success){
                navigate(`/workspaces/${workspaceId}`);
            }
        }
        catch(error){
            // toast (and redirect for existing members) is handled by useJoinWorkspace
            console.log('Error in joining workspace',error);
        }
    }
    return (
        <div
            className="h-[100vh] flex flex-col gap-y-8 items-center justify-center p-8 bg-white rounded-lg shadow-sm"
        >
            <div
                className="flex flex-col gap-y-4 items-center justify-center"
            >
                <div
                    className='flex flex-col gap-y-2 items-center'
                >
                    <h1
                        className="font-bold text-3xl"
                    >
                        Join Workspace
                    </h1>

                    <p>
                        {isPending ? 'Joining workspace...' : 'Enter the code you received to join the workspace'}
                    </p>
                </div>

                <VerificationInput 
                    value={code}
                    onChange={(value) => setCode(value.toUpperCase())}
                    onComplete={handleAddMemberToWorkspace}
                    length={6}
                    classNames={{
                        container: 'flex gap-x-2',
                        character: 'h-auto rounded-md border border-gray-300 flex items-center justify-center text-lg font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
                        characterInactive: 'bg-muted',
                        characterFilled: 'bg-white text-black',
                        characterSelected: 'bg-white text-black',
                    }}
                    autoFocus
                />

            </div>

            <div
                className='flex gap-x-4'
            >
                {/* Needed when the code was pre-filled from the invite link (no typing = no onComplete) */}
                <Button
                    size="lg"
                    disabled={code.length !== 6 || isPending}
                    onClick={() => handleAddMemberToWorkspace(code)}
                >
                    {isPending ? 'Joining...' : 'Join'}
                </Button>
                <Button size="lg" variant="outline" >
                    <Link to={`/workspaces/${workspaceId}`}>
                        Back to the workspace
                    </Link>
                </Button>
            </div>

            
            
        </div>
    );
};