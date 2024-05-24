/* eslint-disable @typescript-eslint/no-explicit-any */
import { IcNewListing, IcTopGainers, IcTopMoving } from "@/assets/icons"
import { Button, ButtonGlow, Footer, Text, TopMarkets } from "@/components"
import { usePublicMarket, usePublicMarketTicker } from "../Swap/hooks/usePublicMarkets";
import { Market } from "@/types/components";
import { getAllMarketTicker } from "@/api/services/public/markets";
import { useEffect } from "react";

export const MarketOverview = () => {

    const market = usePublicMarket(state => state.market);
    const marketTicker = usePublicMarketTicker(state => state.market_ticker);
    const updateMarketTicker = usePublicMarketTicker(state => state.updateMarketTickerState);

    const combinedData: { [key: string]: any } = { ...marketTicker };

    market.forEach(item => {
        combinedData[item.id] = {
            ...combinedData[item.id],
            ...item
        };
    });

    const combinedArray = Object.values(combinedData);

    console.log('combined', combinedArray);

    console.log('market', market)
    console.log('marketTicker', marketTicker)

    const new_listings = [
        {
            symbol: 'SOL',
            icon: '/images/sol.png',
            price: '3,433.67',
            changes: '-254.%',
        },
        {
            symbol: 'BOME',
            icon: '/images/bome.png',
            price: '65,594.89',
            changes: '-3.06%',
        },
        {
            symbol: 'USDC',
            icon: '/images/usdc.png',
            price: '0.014',
            changes: '+5.54%',
        },
    ]

    useEffect(() => {
        const fetchData = async () => {
            try {
                const marketTicker = await getAllMarketTicker();

                updateMarketTicker(marketTicker);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        const intervalId = setInterval(fetchData, 5000);
        return () => clearInterval(intervalId);
    }, [updateMarketTicker]);

    const dummy: Market[] = [
    ]

    const data_dummy = [...combinedArray, ...dummy]


    return (
        <>
            <main className="w-4/5 mx-auto max-w-7xl">
                <Text className="text-center text-3xl font-semibold">
                    Reso <span className="text-[#F23F5D]">Markets Overview</span>
                </Text>

                <div className="grid grid-cols-3 mt-4 gap-6">
                    <TopMarkets data={new_listings} icon={<IcNewListing />} title="New Listing" />
                    <TopMarkets data={new_listings} icon={<IcTopGainers />} title="Top Gainers" />
                    <TopMarkets data={new_listings} icon={<IcTopMoving />} title="Top Moving" />
                </div>

                <div className="bg-[#181924] rounded-lg py-6 px-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <Button className="bg-transparent text-gray-300 font-semibold">Favorite</Button>
                            <ButtonGlow classNameButton="rounded-lg w-16" classNameContent="rounded-lg w-16 bg-[#F23F5D]">All</ButtonGlow>
                        </div>
                        <div className="border border-[#9F9F9F] rounded-lg px-4 py-2 flex items-center justify-between min-w-48">
                            <Text className="text-[#9F9F9F]">Search Markets</Text>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M6.66732 12.0007C7.85064 12.0004 8.99985 11.6043 9.93198 10.8753L12.8626 13.806L13.8053 12.8633L10.8747 9.93265C11.604 9.00043 12.0004 7.85094 12.0007 6.66732C12.0007 3.72665 9.60798 1.33398 6.66732 1.33398C3.72665 1.33398 1.33398 3.72665 1.33398 6.66732C1.33398 9.60798 3.72665 12.0007 6.66732 12.0007ZM6.66732 2.66732C8.87332 2.66732 10.6673 4.46132 10.6673 6.66732C10.6673 8.87332 8.87332 10.6673 6.66732 10.6673C4.46132 10.6673 2.66732 8.87332 2.66732 6.66732C2.66732 4.46132 4.46132 2.66732 6.66732 2.66732Z" fill="#9F9F9F" />
                            </svg>
                        </div>
                    </div>

                    <div className="grid grid-cols-5">
                        <Text>Pair</Text>
                        <Text>Price</Text>
                        <Text>24h Change (%)</Text>
                        <Text>24h High/Low</Text>
                        <Text>Volume</Text>
                    </div>
                    <div className="">
                        {
                            data_dummy.map(item =>
                                <div className="grid grid-cols-5 bg-[#0E0F19]">
                                    <Text>{item?.name}</Text>
                                    <Text>{item?.ticker?.avg_price.substring(0, 6)}</Text>
                                    <Text>{item?.ticker?.price_change_percent}</Text>
                                    <Text>{item?.ticker?.high.substring(0, 6)}/{item?.ticker?.low.substring(0, 6)}</Text>
                                    <Text>{item?.ticker?.volume}</Text>
                                </div>)
                        }
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}