import { IcBitcoin, IcCoinPairs } from "@/assets/icons"
import { MarketTicker } from "@/pages/Swap/hooks/usePublicMarkets"
import { Market } from "@/types/components"
import { Text } from "@/components/atoms"

/* eslint-disable @typescript-eslint/no-explicit-any */
export const CurrentMarket = ({ depth, ticker, market }: { depth: any, ticker: MarketTicker, market: Market[] }) => {
    console.log('depth', depth)
    console.log('ticker', ticker)
    console.log('market', market)
    return (
        <section>
            <div className="flex space-x-3">
                <IcCoinPairs className="bg-[#20232e] p-1 h-10 w-10 rounded-lg" />
                <div className="bg-[#20232e] py-1 px-2 rounded-lg flex space-x-1 items-center">
                    <div className="relative h-6 w-8 m-1">
                        <IcBitcoin height={24} width={24} className="absolute z-10" />
                        <IcBitcoin height={24} width={24} className="absolute left-2" />
                    </div>
                    <Text className="font-semibold">BTC/USDT</Text>
                </div>
                <div className="bg-[#20232e] py-1 px-2 rounded-lg flex space-x-1 items-center">
                    <div className="relative h-6 w-8 m-1">
                        <IcBitcoin height={24} width={24} className="absolute z-10" />
                        <IcBitcoin height={24} width={24} className="absolute left-2" />
                    </div>
                    <Text className="font-semibold">BTC/USDT</Text>
                </div>
                <div className="bg-[#20232e] py-1 px-2 rounded-lg flex space-x-1 items-center">
                    <div className="relative h-6 w-8 m-1">
                        <IcBitcoin height={24} width={24} className="absolute z-10" />
                        <IcBitcoin height={24} width={24} className="absolute left-2" />
                    </div>
                    <Text className="font-semibold">BTC/USDT</Text>
                </div>
            </div>
            <div className="flex justify-between">
                <div>
                    <div className="flex space-x-1">
                        <Text>69,398.54</Text>
                        <Text className="text-green">+1.777</Text>
                    </div>
                    <Text>Nov 22, 2023, 09:00 AM</Text>
                </div>

            </div>
        </section>
    )
}