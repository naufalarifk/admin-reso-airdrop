import { IcHandicapAll, IcHandicapBuy, IcHandicapSell } from "@/assets/icons"
import { Text } from "@/components"



const SellTab = () => {
    return (
        <section className="space-y-2">
            <div className="grid grid-cols-3 relative z-10 place-content-center">
                <div style={{
                    background: 'rgba(213, 83, 83, 0.16)'
                }} className="absolute h-full w-[10%] -z-10 right-0" />
                <Text className="bg-transparent text-center">66032.30</Text>
                <Text className="bg-transparent text-center">0.00732</Text>
                <Text className="bg-transparent text-center">483.35644</Text>
            </div>
            <div className="grid grid-cols-3 relative z-10 place-content-center">
                <div style={{
                    background: 'rgba(213, 83, 83, 0.16)'
                }} className="absolute h-full w-[10%] -z-10 right-0" />
                <Text className="bg-transparent text-center">66032.30</Text>
                <Text className="bg-transparent text-center">0.00732</Text>
                <Text className="bg-transparent text-center">483.35644</Text>
            </div>
            <div className="grid grid-cols-3 relative z-10 place-content-center">
                <div style={{
                    background: 'rgba(213, 83, 83, 0.16)'
                }} className="absolute h-full w-[10%] -z-10 right-0" />
                <Text className="bg-transparent text-center">66032.30</Text>
                <Text className="bg-transparent text-center">0.00732</Text>
                <Text className="bg-transparent text-center">483.35644</Text>
            </div>
            <div className="grid grid-cols-3 relative z-10 place-content-center">
                <div style={{
                    background: 'rgba(213, 83, 83, 0.16)'
                }} className="absolute h-full w-[10%] -z-10 right-0" />
                <Text className="bg-transparent text-center">66032.30</Text>
                <Text className="bg-transparent text-center">0.00732</Text>
                <Text className="bg-transparent text-center">483.35644</Text>
            </div>
            <div className="grid grid-cols-3 relative z-10 place-content-center">
                <div style={{
                    background: 'rgba(213, 83, 83, 0.16)'
                }} className="absolute h-full w-[10%] -z-10 right-0" />
                <Text className="bg-transparent text-center">66032.30</Text>
                <Text className="bg-transparent text-center">0.00732</Text>
                <Text className="bg-transparent text-center">483.35644</Text>
            </div>
        </section>)
}


const BuyTab = () => {
    return (
        <section className="space-y-2">
            <div className="grid grid-cols-3 relative z-10 place-content-center">
                <div style={{
                    background: 'rgba(14, 203, 129, 0.10)'
                }} className="absolute h-full w-[10%] -z-10 right-0" />
                <Text className="bg-transparent text-center">66032.30</Text>
                <Text className="bg-transparent text-center">0.00732</Text>
                <Text className="bg-transparent text-center">483.35644</Text>
            </div>
            <div className="grid grid-cols-3 relative z-10 place-content-center">
                <div style={{
                    background: 'rgba(14, 203, 129, 0.10)'
                }} className="absolute h-full w-[10%] -z-10 right-0" />
                <Text className="bg-transparent text-center">66032.30</Text>
                <Text className="bg-transparent text-center">0.00732</Text>
                <Text className="bg-transparent text-center">483.35644</Text>
            </div>
            <div className="grid grid-cols-3 relative z-10 place-content-center">
                <div style={{
                    background: 'rgba(14, 203, 129, 0.10)'
                }} className="absolute h-full w-[10%] -z-10 right-0" />
                <Text className="bg-transparent text-center">66032.30</Text>
                <Text className="bg-transparent text-center">0.00732</Text>
                <Text className="bg-transparent text-center">483.35644</Text>
            </div>
            <div className="grid grid-cols-3 relative z-10 place-content-center">
                <div style={{
                    background: 'rgba(14, 203, 129, 0.10)'
                }} className="absolute h-full w-[10%] -z-10 right-0" />
                <Text className="bg-transparent text-center">66032.30</Text>
                <Text className="bg-transparent text-center">0.00732</Text>
                <Text className="bg-transparent text-center">483.35644</Text>
            </div>
            <div className="grid grid-cols-3 relative z-10 place-content-center">
                <div style={{
                    background: 'rgba(14, 203, 129, 0.10)'
                }} className="absolute h-full w-[10%] -z-10 right-0" />
                <Text className="bg-transparent text-center">66032.30</Text>
                <Text className="bg-transparent text-center">0.00732</Text>
                <Text className="bg-transparent text-center">483.35644</Text>
            </div>
        </section>
    )
}


export const OrderBookSwap = () => {
    return (
        <section className="p-4 bg-[#181924] rounded-lg w-1/5">
            <div className="flex justify-between items-center">
                <Text className="text-lg font-semibold">Orderbook</Text>
                <div className="flex space-x-1">
                    <IcHandicapAll />
                    <IcHandicapBuy />
                    <IcHandicapSell />
                </div>
            </div>
            <div className="grid grid-cols-3">
                <Text className="text-center">Price USDT</Text>
                <Text className="text-center">Qty USDT</Text>
                <Text className="text-center">Total USDT</Text>
            </div>
            <SellTab />
            {/* New Price */}
            <div className="bg-[#0E0F19] rounded-lg flex items-center justify-between px-2 py-4 my-4">
                <Text className="text-red-500">69,398.54</Text>
                <Text>≈69,398.54 USD</Text>
            </div>
            <BuyTab />
        </section>
    )
}