import { IcCoinPairs } from "@/assets/icons"
import { MarketTicker } from "@/pages/Swap/hooks/usePublicMarkets"
import { Market } from "@/types/components"

/* eslint-disable @typescript-eslint/no-explicit-any */
export const CurrentMarket = ({ depth, ticker, market }: { depth: any, ticker: MarketTicker, market: Market[] }) => {
    console.log('depth', depth)
    console.log('ticker', ticker)
    console.log('market', market)
    return (
        <section>
            <div>
                <IcCoinPairs />
            </div>
            <div className="flex justify-between">

            </div>
        </section>
    )
}