/* eslint-disable @typescript-eslint/no-explicit-any */
import { IcNewListing, IcTopGainers, IcTopMoving } from "@/assets/icons"
import { Button, ButtonGlow, Footer, Text, TopMarkets } from "@/components"
import { usePublicMarket, usePublicMarketTicker } from "../Swap/hooks/usePublicMarkets";
// import { getAllMarketTicker } from "@/api/services/public/markets";
// import { useEffect } from "react";
import { Link } from "react-router-dom";
import './index.css'


export const MarketOverview = () => {

    const market = usePublicMarket(state => state.market);
    const marketTicker = usePublicMarketTicker(state => state.market_ticker);
    // const updateMarketTicker = usePublicMarketTicker(state => state.updateMarketTickerState);

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
            changes: '-2.54%',
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

    const top_gainers = [
        {
            symbol: 'ETH',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
            price: '9,428.23',
            changes: '+8.24%',
        },
        {
            symbol: 'DOGE',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/74.png',
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

    const top_moving = [
        {
            symbol: 'USDC',
            icon: '/images/usdc.png',
            price: '0.014',
            changes: '+5.54%',
        },
        {
            symbol: 'ETH',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
            price: '9,428.23',
            changes: '+8.24%',
        },
        {
            symbol: 'DOGE',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/74.png',
            price: '65,594.89',
            changes: '-3.06%',
        },
    ]

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const marketTicker = await getAllMarketTicker();

    //             updateMarketTicker(marketTicker);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();

    //     const intervalId = setInterval(fetchData, 5000);
    //     return () => clearInterval(intervalId);
    // }, [updateMarketTicker]);

    const dummy = [
        {
            name: 'MEME/USDT',
            avg_price: '11,452.92',
            price_change: '+7.58%',
            highLow: '11,652.92 / 11,352.92',
            volume: '$2,183.52',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/28301.png'
        },
        {
            name: 'SOL/USDT',
            avg_price: '65,594.89',
            price_change: '-3.06%',
            highLow: '65,137.09 / 65,862.44',
            volume: '$183.52',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png'
        },
        {
            name: 'BOME/USDT',
            avg_price: '65,594.89',
            price_change: '+8.24%',
            highLow: '65,137.09 / 65,862.44',
            volume: '$183.52',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/29870.png'
        },
        {
            name: 'WIF/USDT',
            avg_price: '11,452.92',
            price_change: '+7.58%',
            highLow: '11,652.92 / 11,352.92',
            volume: '$2,183.52',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/28752.png'
        },
        {
            name: 'JUP/USDT',
            avg_price: '11,452.92',
            price_change: '-3.06%',
            highLow: '11,652.92 / 11,352.92',
            volume: '$2,183.52',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/29210.png'
        },
        {
            name: 'RAY/USDT',
            avg_price: '11,452.92',
            price_change: '-3.06%',
            highLow: '11,652.92 / 11,352.92',
            volume: '$2,183.52',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/8526.png'
        },

    ]

    // const data_dummy = [...combinedArray, ...dummy]


    return (
        <>
            <main className="w-4/5 mx-auto max-w-7xl">
                <Text className="text-center lg:text-3xl text-lg font-semibold mt-10">
                    Reso <span className="text-[#F23F5D]">Markets Overview</span>
                </Text>

                <div className="overflow-x-scroll">
                    <div className="grid grid-cols-3 mt-10 gap-6 lg:w-full w-[200vw]">
                        <TopMarkets data={new_listings} icon={<IcNewListing />} title="New Listing" />
                        <TopMarkets data={top_gainers} icon={<IcTopGainers />} title="Top Gainers" />
                        <TopMarkets data={top_moving} icon={<IcTopMoving />} title="Top Moving" />
                    </div>
                </div>
                <div className="bg-[#181924] rounded-lg py-6 px-4 my-10">
                    <div className="flex lg:flex-row flex-col justify-between space-y-4">
                        <div className="flex lg:items-center justify-start lg:space-x-2">
                            <Button className="bg-transparent text-gray-300 font-semibold">Favorite</Button>
                            <ButtonGlow classNameButton="rounded-lg w-16" classNameContent="rounded-lg w-16 bg-[#F23F5D]">All</ButtonGlow>
                        </div>
                        <div className="border border-[#9F9F9F] rounded-lg px-4 py-2 flex items-center justify-between lg:min-w-48 lg:w-auto w-full">
                            <Text className="text-[#9F9F9F]">Search Markets</Text>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M6.66732 12.0007C7.85064 12.0004 8.99985 11.6043 9.93198 10.8753L12.8626 13.806L13.8053 12.8633L10.8747 9.93265C11.604 9.00043 12.0004 7.85094 12.0007 6.66732C12.0007 3.72665 9.60798 1.33398 6.66732 1.33398C3.72665 1.33398 1.33398 3.72665 1.33398 6.66732C1.33398 9.60798 3.72665 12.0007 6.66732 12.0007ZM6.66732 2.66732C8.87332 2.66732 10.6673 4.46132 10.6673 6.66732C10.6673 8.87332 8.87332 10.6673 6.66732 10.6673C4.46132 10.6673 2.66732 8.87332 2.66732 6.66732C2.66732 4.46132 4.46132 2.66732 6.66732 2.66732Z" fill="#9F9F9F" />
                            </svg>
                        </div>
                    </div>

                    <div className="lg:grid grid-cols-5 text-left mt-4 mb-2 hidden">
                        <Text>Pair</Text>
                        <Text>Price</Text>
                        <Text>24h Change (%)</Text>
                        <Text>24h High/Low</Text>
                        <Text>Volume</Text>
                    </div>
                    <div className="space-y-2 my-8">
                        {
                            dummy.map(item =>
                                <>
                                    {
                                        item.name.includes('SOL') || item.name.includes('MEME') ?
                                            <Link to={`/trade/${item.name.replace('/', '-')}`} className="flex justify-between lg:grid lg:grid-cols-5 bg-[#0E0F19] p-2 rounded-lg text-left items-center">
                                                <div className="flex space-x-2 items-center justify-start">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                        <g clip-path="url(#clip0_3792_2584)">
                                                            <path d="M4 10.2111L3.05573 16L8 13.2669L12.9442 16L12 10.2111L16 6.11145L10.4721 5.26688L8 0L5.52786 5.26688L0 6.11145L4 10.2111ZM2.58234 6.99369L5.70066 6.51726C6.09206 6.45745 6.43041 6.19898 6.60545 5.82606L8 2.85497L9.39455 5.82606C9.56959 6.19898 9.90794 6.45745 10.2993 6.51726L13.4176 6.99369L11.1612 9.30637C10.878 9.59664 10.7488 10.0149 10.8156 10.4247L11.3483 13.6903L8.55919 12.1485C8.20911 11.955 7.79089 11.955 7.44081 12.1485L4.6517 13.6903L5.18438 10.4247C5.25124 10.0149 5.122 9.59664 4.83878 9.30637L2.58234 6.99369Z" fill="#9F9F9F" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_3792_2584">
                                                                <rect width="16" height="16" fill="white" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    <div className="relative m-1 size-6 overflow-hidden rounded-full object-cover"><img src={item.icon} alt="" /></div>
                                                    <Text>{item.name}</Text>
                                                </div>
                                                <Text>{item.avg_price}</Text>
                                                <Text className={`${item.price_change.includes('+') ? 'text-[#33D49D]' : 'text-[#EF454A]'} `}>{item.price_change}</Text>
                                                <Text className="lg:block hidden">{item.highLow}</Text>
                                                <Text className="lg:block hidden">{item.volume}</Text>
                                            </Link>
                                            :
                                            <div className="flex justify-between lg:grid lg:grid-cols-5 bg-[#0E0F19] bg-opacity-60 p-2 rounded-lg text-left items-center">
                                                <div className="flex space-x-2 items-center justify-start">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                        <g clip-path="url(#clip0_3792_2584)">
                                                            <path d="M4 10.2111L3.05573 16L8 13.2669L12.9442 16L12 10.2111L16 6.11145L10.4721 5.26688L8 0L5.52786 5.26688L0 6.11145L4 10.2111ZM2.58234 6.99369L5.70066 6.51726C6.09206 6.45745 6.43041 6.19898 6.60545 5.82606L8 2.85497L9.39455 5.82606C9.56959 6.19898 9.90794 6.45745 10.2993 6.51726L13.4176 6.99369L11.1612 9.30637C10.878 9.59664 10.7488 10.0149 10.8156 10.4247L11.3483 13.6903L8.55919 12.1485C8.20911 11.955 7.79089 11.955 7.44081 12.1485L4.6517 13.6903L5.18438 10.4247C5.25124 10.0149 5.122 9.59664 4.83878 9.30637L2.58234 6.99369Z" fill="#9F9F9F" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_3792_2584">
                                                                <rect width="16" height="16" fill="white" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    <div className="relative m-1 size-6 overflow-hidden rounded-full object-cover"><img src={item.icon} alt="" /></div>
                                                    <Text>{item.name}</Text>
                                                </div>
                                                <Text>{item.avg_price}</Text>
                                                <Text className={`${item.price_change.includes('+') ? 'text-[#33D49D]' : 'text-[#EF454A]'} `}>{item.price_change}</Text>
                                                <Text className="lg:block hidden">{item.highLow}</Text>
                                                <Text className="lg:block hidden">{item.volume}</Text>
                                            </div>
                                    }

                                </>
                            )
                        }

                    </div>

                </div>
            </main>
            <Footer />
        </>
    )
}