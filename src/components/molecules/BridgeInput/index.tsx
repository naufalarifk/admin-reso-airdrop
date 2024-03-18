import { IcBitcoin, IcDropdown } from "@/assets/icons"
import { Input, Text } from "@/components"
import './index.css'
export const BridgeInput = () => {
    return (
        <div className="flex items-center justify-between bg-[#5D636F1A] p-4 border-[0.5px] border-[#FFFFFF1A] w-full min-w-sm rounded-xl bg-card-background from-[rgba(93,99,111,0.1)] to-[rgba(25,30,40,0.5)]">
            <div className="flex items-center space-x-1 w-1/2">
                <IcBitcoin />
                <Text className="text-white">BTC (Bitcoin)</Text>
                <IcDropdown />
            </div>
            <Input className="bg-transparent text-right bridge-input w-1/2" placeholder="0.00" />
        </div>
    )
}