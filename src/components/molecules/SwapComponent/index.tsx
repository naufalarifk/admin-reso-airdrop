import { IcBitcoin, IcDropdown, IcSwapHorizontal, IcThreeDots, IcThreeDotsVertical } from "@/assets/icons"
import { Input, Text, Button } from "@/components"

export const SwapComponent = () => {

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <Text>Pay:</Text>
                    <Text>0.00000 BTC</Text>
                </div>
                <div>
                    <Text>Balance:</Text>
                    <Text>560.05069 BTC</Text>
                </div>
            </div>

            <div className="bg-[#0E0F19] rounded-lg p-4 flex items-center space-x-2">
                <div className="flex items-center space-x-2 bg-[#171923] p-2 rounded-lg">
                    <IcBitcoin height="24" width="24" />
                    <Text>BTC</Text>
                    <IcThreeDotsVertical />
                </div>
                <Input placeholder="0.00" className="bg-transparent" />
                <Button>Max</Button>
            </div>
        </div>
    )
}