import { IcBitcoin, IcDropdown } from "@/assets/icons"
import { Input, Text } from "@/components"
import './index.css'
export const SwapInput = ({ val }: { val?: string }) => {
    return (
        <div className="flex items-center justify-between bg-[#0E0F19] p-4 border-[0.5px] border-[#FFFFFF1A] w-full min-w-sm rounded-xl">
            <Input value={val} className="bg-transparent bridge-input w-1/2" placeholder="0.00" />
            <div className="flex items-center justify-end space-x-1 w-1/2">
                <IcBitcoin />
                <Text className="text-white">BTC (Bitcoin)</Text>
                <IcDropdown />
            </div>
        </div>
    )
}