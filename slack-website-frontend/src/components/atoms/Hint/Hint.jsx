import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export const Hint = ({ align, side, label, children }) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={50}>
                <TooltipTrigger render={children} />
                <TooltipContent
                    side={side}
                    align={align}
                    className="bg-black text-white p-2 rounded-lg border border-white/5"
                >
                    <p className='text-sm font-medium'>
                        {label}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};