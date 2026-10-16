import { useContext } from 'react';

import CreateChannelContext from '@/context/createChannelContext';

export const useCreateChannelModal=()=>{
    return useContext(CreateChannelContext);
};