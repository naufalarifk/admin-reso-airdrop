import { IcBitcoin, IcCoinPairs } from "@/assets/icons"
import { MarketTicker } from "@/pages/Swap/hooks/usePublicMarkets"
import { Market } from "@/types/components"
import { Text } from "@/components/atoms"
import { useNavigate } from "react-router-dom"

/* eslint-disable @typescript-eslint/no-explicit-any */
export const CurrentMarket = ({ depth, ticker, market, currentMarket }: { depth: any, ticker: MarketTicker, market: Market[], currentMarket?: string }) => {

    const navigate = useNavigate()
    console.log('depth', depth)
    console.log('ticker', ticker)
    console.log('market', market)
    console.log('currentMarket', currentMarket)

    const marketId = currentMarket?.replace('-', '/')
    console.log('marketId', marketId)

    const timestamps = ['24H', '1W', '1M', '1Y']

    return (
        <section className="lg:block hidden">
            <div className="flex space-x-3">
                <IcCoinPairs className="bg-[#20232e] p-1 h-10 w-10 rounded-lg" />
                {
                    market.map(market =>
                        <div onClick={() => navigate(`/swap/${market.name.replace('/', '-')}`)} className={`${marketId === market.name ? 'bg-[#20232e]' : 'bg-transparent border border-[#20232e]'} py-1 px-2 rounded-lg flex space-x-1 items-center cursor-pointer`}>
                            <div className="relative h-6 w-8 m-1">
                                <IcBitcoin height={24} width={24} className="absolute z-10" />
                                <IcBitcoin height={24} width={24} className="absolute left-2" />
                            </div>
                            <Text className="font-semibold">{market.name}</Text>
                        </div>
                    )
                }
            </div>
            <div className="flex space-x-2 my-2 items-center">
                <div>
                    <div className="flex space-x-1 items-center">
                        <Text className="text-xl font-semibold">69,398.54</Text>
                        <Text className="text-green">+1.777 (1.82%)</Text>
                    </div>
                    <Text className="mt-1 text-[#90A3BF]">Nov 22, 2023, 09:00 AM</Text>
                </div>
                <Text className="text-xl text-">|</Text>
                <div>
                    <Text className="text-xs">Change 24H</Text>
                    <Text className="text-green">+1.82%</Text>
                </div>
                <div>
                    <Text className="text-xs">24h High</Text>
                    <Text className="text-green">+1.82%</Text>
                </div>
                <div>
                    <Text className="text-xs">24h Low</Text>
                    <Text className="text-green">+1.82%</Text>
                </div>
                <div>
                    <Text className="text-xs">24h Volume</Text>
                    <Text className="text-green">+1.82%</Text>
                </div>
                <div>
                    <Text className="text-xs">Transactions</Text>
                    <Text className="text-green">+1.82%</Text>
                </div>
                <div>
                    <Text className="text-xs">Total Liquidity</Text>
                    <Text className="text-green">+1.82%</Text>
                </div>
                <div className="flex space-x-1 bg-[#FE9F00] bg-opacity-10 p-2 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path opacity="0.2" d="M25.1201 14.6142L14.6201 25.1142C14.5394 25.1951 14.4436 25.2592 14.3381 25.3029C14.2327 25.3467 14.1196 25.3692 14.0054 25.3692C13.8912 25.3692 13.7781 25.3467 13.6727 25.3029C13.5672 25.2592 13.4714 25.1951 13.3907 25.1142L2.89071 14.6142C2.80989 14.5336 2.74576 14.4378 2.70201 14.3323C2.65826 14.2268 2.63574 14.1137 2.63574 13.9995C2.63574 13.8854 2.65826 13.7723 2.70201 13.6668C2.74576 13.5613 2.80989 13.4655 2.89071 13.3849L13.3962 2.88485C13.4768 2.80403 13.5727 2.7399 13.6781 2.69615C13.7836 2.6524 13.8967 2.62988 14.0109 2.62988C14.1251 2.62988 14.2381 2.6524 14.3436 2.69615C14.4491 2.7399 14.5449 2.80403 14.6256 2.88485L25.1256 13.3903C25.2864 13.5537 25.3761 13.7741 25.3751 14.0034C25.374 14.2327 25.2824 14.4523 25.1201 14.6142Z" fill="#FE9F00" />
                        <path d="M14 7.87518C14.232 7.87518 14.4546 7.96736 14.6187 8.13146C14.7828 8.29555 14.875 8.51811 14.875 8.75018V14.8752C14.875 15.1072 14.7828 15.3298 14.6187 15.4939C14.4546 15.658 14.232 15.7502 14 15.7502C13.7679 15.7502 13.5453 15.658 13.3812 15.4939C13.2171 15.3298 13.125 15.1072 13.125 14.8752V8.75018C13.125 8.51811 13.2171 8.29555 13.3812 8.13146C13.5453 7.96736 13.7679 7.87518 14 7.87518ZM12.6875 18.8127C12.6875 19.0723 12.7644 19.326 12.9087 19.5419C13.0529 19.7577 13.2579 19.9259 13.4977 20.0253C13.7375 20.1246 14.0014 20.1506 14.256 20.1C14.5106 20.0493 14.7445 19.9243 14.928 19.7408C15.1116 19.5572 15.2366 19.3233 15.2872 19.0687C15.3379 18.8141 15.3119 18.5502 15.2126 18.3104C15.1132 18.0706 14.945 17.8656 14.7291 17.7214C14.5133 17.5772 14.2596 17.5002 14 17.5002C13.6519 17.5002 13.318 17.6385 13.0719 17.8846C12.8257 18.1307 12.6875 18.4646 12.6875 18.8127ZM26.25 14.0002C26.2506 14.2294 26.2058 14.4564 26.1181 14.6682C26.0304 14.88 25.9016 15.0723 25.7392 15.2339L15.2337 25.7405C14.9058 26.0664 14.4623 26.2494 14 26.2494C13.5376 26.2494 13.0941 26.0664 12.7662 25.7405L2.26621 15.2339C1.94027 14.906 1.75732 14.4625 1.75732 14.0002C1.75732 13.5379 1.94027 13.0943 2.26621 12.7664L12.7717 2.25986C13.0996 1.93392 13.5431 1.75098 14.0054 1.75098C14.4678 1.75098 14.9113 1.93392 15.2392 2.25986L25.7446 12.7664C25.9061 12.9285 26.0339 13.121 26.1206 13.3328C26.2074 13.5445 26.2513 13.7714 26.25 14.0002ZM24.5 14.0002L14 3.50018L3.49996 14.0002L14 24.5002L24.5 14.0002Z" fill="#FE9F00" />
                    </svg>
                    <div>
                        <Text className="text-[#FE9F00]">Info</Text>
                        <Text className="text-[#FE9F00] font-semibold">This pair had low liquidity</Text>
                    </div>
                </div>
                <div className="flex space-x-2">
                    {
                        timestamps.map((timestamp) => <div className="bg-[#F23F5D] px-3 py-1 rounded-lg"><Text>{timestamp}</Text></div>)
                    }
                </div>
            </div>
        </section>
    )
}