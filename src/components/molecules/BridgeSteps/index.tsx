import { Text } from "@/components"
export const BridgeSteps = ({ active }: { active: number }) => {

    return (
        <div className="flex justify-center bg-[#5D636F1A] p-6 border-[0.5px] border-[#FFFFFF1A] w-full lg:w-3/4 mx-auto min-w-sm rounded-xl bg-card-background from-[rgba(93,99,111,0.1)] to-[rgba(94,95,97,0.5)]">
            <div className="flex flex-col items-center">
                <Text className={`${active === 1 ? 'bg-[#FE9F00]' : 'bg-[#201e21] border border-[#27272a]'} rounded-full w-8 h-8 relative`}><span className={`${active === 1 ? '' : 'text-[#9F9F9F]'} absolute inset-0 flex items-center justify-center`}>1</span></Text>
                <Text className="text-[#9F9F9F]">Import</Text>
            </div>
            <hr className="mt-4 bg-gradient-to-r from-gray-900 via-gray-800 to-black h-px w-1/5" />
            <div className="flex flex-col items-center">
                <Text className={`${active === 2 ? 'bg-[#FE9F00]' : 'bg-[#201e21] border border-[#27272a]'} rounded-full w-8 h-8 relative`}><span className={`${active === 2 ? '' : 'text-[#9F9F9F]'} absolute inset-0 flex items-center justify-center`}>2</span></Text>
                <Text className="text-[#9F9F9F]">Review</Text>
            </div>
            <hr className="mt-4  ml-0 bg-gradient-to-r from-gray-900 via-gray-800 to-black h-px w-1/5" />
            <div className="flex flex-col items-center">
                <Text className={`${active === 3 ? 'bg-[#FE9F00]' : 'bg-[#201e21] border border-[#27272a]'} rounded-full w-8 h-8 relative`}><span className={`${active === 3 ? '' : 'text-[#9F9F9F]'} absolute inset-0 flex items-center justify-center`}>3</span></Text>
                <Text className="text-[#9F9F9F]">Confirm</Text>
            </div>
            <hr className="mt-4 bg-gradient-to-r from-gray-900 via-gray-800 to-black h-px w-1/5" />
            <div className="flex flex-col items-center">
                <Text className={`${active === 4 ? 'bg-[#FE9F00]' : 'bg-[#201e21] border border-[#27272a]'} rounded-full w-8 h-8 relative`}><span className={`${active === 4 ? '' : 'text-[#9F9F9F]'} absolute inset-0 flex items-center justify-center`}>4</span></Text>
                <Text className="text-[#9F9F9F]">Receive</Text>
            </div>
        </div>
    )
}