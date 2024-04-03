import { Text } from "@/components"
export const BridgeSteps = ({ active }: { active: number }) => {

    return (
        <div className="flex justify-center bg-[#181924] p-6 border-[0.5px] border-[#FFFFFF1A] w-full lg:w-3/4 mx-auto min-w-sm rounded-xl bg-card-background">
            <div className="flex flex-col items-center">
                <Text className={`${active === 1 ? 'bg-[#F23F5D]' : 'bg-[#0E0F19]'} rounded-full w-8 h-8 relative`}><span className={`${active === 1 ? '' : 'text-[#9F9F9F]'} absolute inset-0 flex items-center justify-center`}>1</span></Text>
                <Text className="text-[#90A3BF]">Import</Text>
            </div>
            <hr className="mt-4 bg-[#0E0F19] h-px border-t-2 border-[#0E0F19] w-1/5" />
            <div className="flex flex-col items-center">
                <Text className={`${active === 2 ? 'bg-[#F23F5D]' : 'bg-[#0E0F19]'} rounded-full w-8 h-8 relative`}><span className={`${active === 2 ? '' : 'text-[#90A3BF]'} absolute inset-0 flex items-center justify-center`}>2</span></Text>
                <Text className="text-[#90A3BF]">Review</Text>
            </div>
            <hr className="mt-4 bg-[#0E0F19] h-px border-t-2 border-[#0E0F19] w-1/5" />
            <div className="flex flex-col items-center">
                <Text className={`${active === 3 ? 'bg-[#F23F5D]' : 'bg-[#0E0F19]'} rounded-full w-8 h-8 relative`}><span className={`${active === 3 ? '' : 'text-[#90A3BF]'} absolute inset-0 flex items-center justify-center`}>3</span></Text>
                <Text className="text-[#90A3BF]">Confirm</Text>
            </div>
            <hr className="mt-4 bg-[#0E0F19] h-px border-t-2 border-[#0E0F19] w-1/5" />
            <div className="flex flex-col items-center">
                <Text className={`${active === 4 ? 'bg-[#F23F5D]' : 'bg-[#0E0F19]'} rounded-full w-8 h-8 relative`}><span className={`${active === 4 ? '' : 'text-[#90A3BF]'} absolute inset-0 flex items-center justify-center`}>4</span></Text>
                <Text className="text-[#90A3BF]">Receive</Text>
            </div>
        </div>
    )
}