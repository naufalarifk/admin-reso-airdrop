import { cn } from '@/utils';
import { ReactNode } from 'react'

import { Text } from '@/components/atoms';

export const TopMarkets = ({
    classNameButton,
    classNameContent,
    icon,
    title,
    data
}: {
    title: string;
    icon: ReactNode;
    className?: string;
    classNameButton?: string;
    classNameContent?: string;
    data: {
        symbol: string;
        icon: string;
        price: string;
        changes: string;
    }[]
}) => {
    return (
        <div
            className={cn(
                `cursor-pointer border-animate-wrapper rounded-lg min-h-44`,
                classNameButton
            )}
        >
            <div
                className={cn(
                    `border-animate-content w-full gap-2 text-white bg-[#181924] rounded-lg p-4`,
                    classNameContent
                )}
            >

                <div className='flex items-center space-x-1'>
                    {icon}
                    <Text className='font-semibold text-base'>{title}</Text>
                </div>
                <hr className='my-3 border-[#F23F5D]' />
                <div className='space-y-2'>
                    {
                        data.map(item =>
                            <div className='grid grid-cols-3 gap-3'>
                                <div className='flex space-x-1 items-center'>
                                    <img className='rounded-full' alt='' src={item.icon} height={20} width={20} />
                                    <Text>{item.symbol}</Text>
                                </div>
                                <div><Text className='text-right'>{item.price}</Text></div>
                                <Text className={`${item.changes.includes('-') ? `text-[#EF454A]` : `text-[#33D49D]`} text-right`}>{item.changes}</Text>
                            </div>)
                    }
                </div>
            </div>
        </div>
    )
}

