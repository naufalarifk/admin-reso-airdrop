/* eslint-disable @typescript-eslint/no-explicit-any */
import { IcNewListing, IcTopGainers, IcTopMoving } from '@/assets/icons';
import { Button, ButtonGlow, Footer, Input, Text, TopMarkets } from '@/components';
// import { getAllMarketTicker } from "@/api/services/public/markets";
// import { useEffect } from "react";
import { Link } from 'react-router-dom';
import './index.css';
import { useCallback, useMemo, useState } from 'react';
import { debounce } from 'lodash';

export const MarketOverview = () => {
   const dummy = useMemo(
      () => [
         {
            id: 0,
            name: 'MEME/USDT',
            avg_price: '11,452.92',
            price_change: '+7.58%',
            highLow: '11,652.92 / 11,352.92',
            volume: '$2,183.52',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/28301.png',
         },
         {
            id: 1,
            name: 'SOL/USDT',
            avg_price: '65,594.89',
            price_change: '-3.06%',
            highLow: '65,137.09 / 65,862.44',
            volume: '$183.52',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png',
         },
         {
            id: 2,
            name: 'BOME/USDT',
            avg_price: '65,594.89',
            price_change: '+8.24%',
            highLow: '65,137.09 / 65,862.44',
            volume: '$183.52',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/29870.png',
         },
         {
            id: 3,
            name: 'WIF/USDT',
            avg_price: '11,452.92',
            price_change: '+7.58%',
            highLow: '11,652.92 / 11,352.92',
            volume: '$2,183.52',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/28752.png',
         },
         {
            id: 4,
            name: 'JUP/USDT',
            avg_price: '11,452.92',
            price_change: '-3.06%',
            highLow: '11,652.92 / 11,352.92',
            volume: '$2,183.52',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/29210.png',
         },
         {
            id: 5,
            name: 'RAY/USDT',
            avg_price: '11,452.92',
            price_change: '-3.06%',
            highLow: '11,652.92 / 11,352.92',
            volume: '$2,183.52',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/8526.png',
         },
      ],
      [],
   );

   const [showFavorites, setShowFavorites] = useState(false);
   const [favorites, setFavorites] = useState<typeof dummy>([]);
   const [searchQuery, setSearchQuery] = useState('');
   const [debouncedQuery, setDebouncedQuery] = useState('');

   const handleSearchChange = debounce((query: string) => {
      setDebouncedQuery(query);
   }, 300);

   const filteredItems = useMemo(() => {
      return dummy.filter(item => item.name.toLowerCase().includes(debouncedQuery.toLowerCase()));
   }, [debouncedQuery, dummy]);

   // const market = usePublicMarket(state => state.market);
   // const marketTicker = usePublicMarketTicker(state => state.market_ticker);
   // // const updateMarketTicker = usePublicMarketTicker(state => state.updateMarketTickerState);

   // const combinedData: { [key: string]: any } = { ...marketTicker };

   // market.forEach(item => {
   //     combinedData[item.id] = {
   //         ...combinedData[item.id],
   //         ...item
   //     };
   // });

   // const combinedArray = Object.values(combinedData);

   // console.log('combined', combinedArray);

   // console.log('market', market)
   // console.log('marketTicker', marketTicker)

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
   ];

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
   ];

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
   ];

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

   // const data_dummy = [...combinedArray, ...dummy]

   const handleAddFavorites = useCallback(
      (id: number) => {
         setFavorites([...favorites, dummy[id]]);
         console.log('favorites', favorites);
      },
      [dummy, favorites],
   );

   const handleRemoveFavorites = useCallback((id: number) => {
      setFavorites(prevFavorites => {
         const index = prevFavorites.findIndex(item => item.id === id);
         if (index !== -1) {
            const newFavorites = [...prevFavorites];
            newFavorites.splice(index, 1);
            return newFavorites;
         }
         return prevFavorites;
      });
   }, []);

   return (
      <>
         <main className="mx-auto w-4/5 max-w-7xl">
            <Text className="mt-10 text-center text-lg font-semibold lg:text-3xl">
               Rectoverso <span className="text-[#F23F5D]">Markets Overview</span>
            </Text>

            <div className="overflow-x-scroll">
               <div className="mt-10 grid w-[200vw] grid-cols-3 gap-6 lg:w-full">
                  <TopMarkets
                     data={new_listings}
                     icon={<IcNewListing />}
                     title="New Listing"
                  />
                  <TopMarkets
                     data={top_gainers}
                     icon={<IcTopGainers />}
                     title="Top Gainers"
                  />
                  <TopMarkets
                     data={top_moving}
                     icon={<IcTopMoving />}
                     title="Top Moving"
                  />
               </div>
            </div>
            <div className="my-10 rounded-lg bg-[#181924] px-4 py-6">
               <div className="flex flex-col justify-between space-y-4 lg:flex-row">
                  {showFavorites ? (
                     <div className="flex justify-start lg:items-center lg:space-x-2">
                        <ButtonGlow
                           onClick={() => setShowFavorites(true)}
                           classNameButton="rounded-lg w-20"
                           classNameContent="rounded-lg w-20 bg-[#F23F5D]">
                           Favorite
                        </ButtonGlow>
                        <Button
                           onClick={() => setShowFavorites(false)}
                           className="bg-transparent font-semibold text-gray-300">
                           All
                        </Button>
                     </div>
                  ) : (
                     <div className="flex justify-start lg:items-center lg:space-x-2">
                        <Button
                           onClick={() => setShowFavorites(true)}
                           className="bg-transparent font-semibold text-gray-300">
                           Favorite
                        </Button>
                        <ButtonGlow
                           onClick={() => setShowFavorites(false)}
                           classNameButton="rounded-lg w-16"
                           classNameContent="rounded-lg w-16 bg-[#F23F5D]">
                           All
                        </ButtonGlow>
                     </div>
                  )}
                  <div className="flex w-full items-center justify-between rounded-lg border border-[#9F9F9F] px-4 py-2 lg:w-auto lg:min-w-48">
                     <Input
                        className="h-6 bg-transparent py-0 placeholder:text-[#9F9F9F]"
                        value={searchQuery}
                        onChange={e => {
                           setSearchQuery(e.target.value);
                           handleSearchChange(e.target.value);
                        }}
                        placeholder="Search Markets"></Input>
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none">
                        <path
                           d="M6.66732 12.0007C7.85064 12.0004 8.99985 11.6043 9.93198 10.8753L12.8626 13.806L13.8053 12.8633L10.8747 9.93265C11.604 9.00043 12.0004 7.85094 12.0007 6.66732C12.0007 3.72665 9.60798 1.33398 6.66732 1.33398C3.72665 1.33398 1.33398 3.72665 1.33398 6.66732C1.33398 9.60798 3.72665 12.0007 6.66732 12.0007ZM6.66732 2.66732C8.87332 2.66732 10.6673 4.46132 10.6673 6.66732C10.6673 8.87332 8.87332 10.6673 6.66732 10.6673C4.46132 10.6673 2.66732 8.87332 2.66732 6.66732C2.66732 4.46132 4.46132 2.66732 6.66732 2.66732Z"
                           fill="#9F9F9F"
                        />
                     </svg>
                  </div>
               </div>

               <div className="mb-2 mt-4 hidden grid-cols-5 text-left lg:grid">
                  <Text className="p-2">Pair</Text>
                  <Text className="p-2">Price</Text>
                  <Text className="p-2">24h Change (%)</Text>
                  <Text className="p-2">24h High/Low</Text>
                  <Text className="p-2">Volume</Text>
               </div>
               <div className="my-8 space-y-2">
                  {showFavorites
                     ? favorites.map(item => (
                          <>
                             {item.name.includes('SOL') || item.name.includes('MEME') ? (
                                <div className="flex grid-cols-5 items-center space-x-2 rounded-lg bg-[#0E0F19] p-2 lg:grid">
                                   <div className="flex items-center space-x-1">
                                      <svg
                                         onClick={() => handleRemoveFavorites(item.id)}
                                         className={`${favorites.find(favorite => favorite.name === item.name) ? `` : `hidden`} ml-2`}
                                         xmlns="http://www.w3.org/2000/svg"
                                         width="16"
                                         height="16"
                                         viewBox="0 0 16 16"
                                         fill="none">
                                         <path
                                            d="M5.38954 4.82396L7.12154 1.33596C7.17196 1.23502 7.2495 1.15012 7.34547 1.09077C7.44144 1.03143 7.55204 1 7.66487 1C7.77771 1 7.88831 1.03143 7.98428 1.09077C8.08025 1.15012 8.15779 1.23502 8.20821 1.33596L9.94021 4.82396L13.8122 5.38663C13.9239 5.40211 14.029 5.44869 14.1155 5.52104C14.2019 5.59338 14.2663 5.68859 14.3013 5.79578C14.3363 5.90297 14.3404 6.01784 14.3132 6.12726C14.286 6.23669 14.2286 6.33627 14.1475 6.41463L11.3462 9.12796L12.0075 12.9613C12.0922 13.4533 11.5722 13.828 11.1275 13.596L7.66487 11.7853L4.20154 13.596C3.75754 13.8286 3.23754 13.4533 3.32221 12.9606L3.98354 9.1273L1.18221 6.41396C1.10153 6.33555 1.04447 6.23607 1.01751 6.12684C0.990559 6.01761 0.994787 5.90301 1.02972 5.79606C1.06465 5.68911 1.12888 5.59411 1.21512 5.52185C1.30135 5.44959 1.40613 5.40297 1.51754 5.3873L5.38954 4.82396Z"
                                            fill="#E68D07"
                                            stroke="#E68D07"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                         />
                                      </svg>
                                      <svg
                                         className={`${favorites.find(favorite => favorite.id === item.id) ? `hidden` : ``}`}
                                         onClick={() => handleAddFavorites(item.id)}
                                         xmlns="http://www.w3.org/2000/svg"
                                         width="16"
                                         height="16"
                                         viewBox="0 0 16 16"
                                         fill="none">
                                         <path
                                            d="M5.38954 5.48998L7.12154 2.00198C7.17196 1.90103 7.2495 1.81613 7.34547 1.75679C7.44144 1.69745 7.55204 1.66602 7.66487 1.66602C7.77771 1.66602 7.88831 1.69745 7.98428 1.75679C8.08025 1.81613 8.15779 1.90103 8.20821 2.00198L9.94021 5.48998L13.8122 6.05264C13.9239 6.06813 14.029 6.1147 14.1155 6.18705C14.2019 6.2594 14.2663 6.3546 14.3013 6.46179C14.3363 6.56899 14.3404 6.68385 14.3132 6.79328C14.286 6.9027 14.2286 7.00228 14.1475 7.08064L11.3462 9.79398L12.0075 13.6273C12.0922 14.1193 11.5722 14.494 11.1275 14.262L7.66487 12.4513L4.20154 14.262C3.75754 14.4946 3.23754 14.1193 3.32221 13.6266L3.98354 9.79331L1.18221 7.07998C1.10153 7.00156 1.04447 6.90208 1.01751 6.79285C0.990559 6.68362 0.994787 6.56902 1.02972 6.46207C1.06465 6.35513 1.12888 6.26012 1.21512 6.18787C1.30135 6.11561 1.40613 6.06899 1.51754 6.05331L5.38954 5.48998Z"
                                            stroke="#9F9F9F"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                         />
                                      </svg>
                                      <Link
                                         to={`/trade/${item.name.replace('/', '-')}`}
                                         className="flex w-full items-center justify-between text-left">
                                         <div className="flex items-center justify-start space-x-2">
                                            <div className="relative m-1 size-6 overflow-hidden rounded-full object-cover">
                                               <img
                                                  src={item.icon}
                                                  alt=""
                                               />
                                            </div>
                                            <Text>{item.name}</Text>
                                         </div>
                                      </Link>
                                   </div>
                                   <Link to={`/trade/${item.name.replace('/', '-')}`}>
                                      <Text>{item.avg_price}</Text>
                                   </Link>
                                   <Link to={`/trade/${item.name.replace('/', '-')}`}>
                                      <Text
                                         className={`${item.price_change.includes('+') ? 'text-[#33D49D]' : 'text-[#EF454A]'} `}>
                                         {item.price_change}
                                      </Text>
                                   </Link>
                                   <Link to={`/trade/${item.name.replace('/', '-')}`}>
                                      <Text className="hidden lg:block">{item.highLow}</Text>
                                   </Link>
                                   <Link to={`/trade/${item.name.replace('/', '-')}`}>
                                      <Text className="hidden lg:block">{item.volume}</Text>
                                   </Link>
                                </div>
                             ) : (
                                <div className="flex items-center justify-between rounded-lg bg-[#0E0F19] bg-opacity-60 text-left lg:grid lg:grid-cols-5">
                                   <div className="flex items-center justify-start space-x-2 p-2">
                                      <svg
                                         onClick={() => handleRemoveFavorites(item.id)}
                                         className={`${favorites.find(favorite => favorite.name === item.name) ? `` : `hidden`} ml-2`}
                                         xmlns="http://www.w3.org/2000/svg"
                                         width="16"
                                         height="16"
                                         viewBox="0 0 16 16"
                                         fill="none">
                                         <path
                                            d="M5.38954 4.82396L7.12154 1.33596C7.17196 1.23502 7.2495 1.15012 7.34547 1.09077C7.44144 1.03143 7.55204 1 7.66487 1C7.77771 1 7.88831 1.03143 7.98428 1.09077C8.08025 1.15012 8.15779 1.23502 8.20821 1.33596L9.94021 4.82396L13.8122 5.38663C13.9239 5.40211 14.029 5.44869 14.1155 5.52104C14.2019 5.59338 14.2663 5.68859 14.3013 5.79578C14.3363 5.90297 14.3404 6.01784 14.3132 6.12726C14.286 6.23669 14.2286 6.33627 14.1475 6.41463L11.3462 9.12796L12.0075 12.9613C12.0922 13.4533 11.5722 13.828 11.1275 13.596L7.66487 11.7853L4.20154 13.596C3.75754 13.8286 3.23754 13.4533 3.32221 12.9606L3.98354 9.1273L1.18221 6.41396C1.10153 6.33555 1.04447 6.23607 1.01751 6.12684C0.990559 6.01761 0.994787 5.90301 1.02972 5.79606C1.06465 5.68911 1.12888 5.59411 1.21512 5.52185C1.30135 5.44959 1.40613 5.40297 1.51754 5.3873L5.38954 4.82396Z"
                                            fill="#E68D07"
                                            stroke="#E68D07"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                         />
                                      </svg>
                                      <svg
                                         className={`${favorites.find(favorite => favorite.id === item.id) ? `hidden` : ``}`}
                                         onClick={() => handleAddFavorites(item.id)}
                                         xmlns="http://www.w3.org/2000/svg"
                                         width="16"
                                         height="16"
                                         viewBox="0 0 16 16"
                                         fill="">
                                         <g
                                            fill="#f8931a"
                                            clip-path="url(#clip0_3792_2584)">
                                            <path
                                               d="M4 10.2111L3.05573 16L8 13.2669L12.9442 16L12 10.2111L16 6.11145L10.4721 5.26688L8 0L5.52786 5.26688L0 6.11145L4 10.2111ZM2.58234 6.99369L5.70066 6.51726C6.09206 6.45745 6.43041 6.19898 6.60545 5.82606L8 2.85497L9.39455 5.82606C9.56959 6.19898 9.90794 6.45745 10.2993 6.51726L13.4176 6.99369L11.1612 9.30637C10.878 9.59664 10.7488 10.0149 10.8156 10.4247L11.3483 13.6903L8.55919 12.1485C8.20911 11.955 7.79089 11.955 7.44081 12.1485L4.6517 13.6903L5.18438 10.4247C5.25124 10.0149 5.122 9.59664 4.83878 9.30637L2.58234 6.99369Z"
                                               fill="#9F9F9F"
                                            />
                                         </g>
                                         <defs>
                                            <clipPath id="clip0_3792_2584">
                                               <rect
                                                  width="16"
                                                  height="16"
                                                  fill="#f8931a"
                                               />
                                            </clipPath>
                                         </defs>
                                      </svg>
                                      <div className="relative m-1 size-6 overflow-hidden rounded-full object-cover">
                                         <img
                                            src={item.icon}
                                            alt=""
                                         />
                                      </div>
                                      <Text>{item.name}</Text>
                                   </div>
                                   <Text className="p-2">{item.avg_price}</Text>
                                   <Text
                                      className={`${item.price_change.includes('+') ? 'text-[#33D49D]' : 'text-[#EF454A]'} p-2`}>
                                      {item.price_change}
                                   </Text>
                                   <Text className="hidden p-2 lg:block">{item.highLow}</Text>
                                   <Text className="hidden p-2 lg:block">{item.volume}</Text>
                                </div>
                             )}
                          </>
                       ))
                     : filteredItems.map(item => (
                          <>
                             {item.name.includes('SOL') || item.name.includes('MEME') ? (
                                <div className="flex grid-cols-5 items-center space-x-2 rounded-lg bg-[#0E0F19] p-2 lg:grid">
                                   <div className="flex items-center space-x-1">
                                      <svg
                                         onClick={() => handleRemoveFavorites(item.id)}
                                         className={`${favorites.find(favorite => favorite.name === item.name) ? `` : `hidden`} ml-2`}
                                         xmlns="http://www.w3.org/2000/svg"
                                         width="16"
                                         height="16"
                                         viewBox="0 0 16 16"
                                         fill="none">
                                         <path
                                            d="M5.38954 4.82396L7.12154 1.33596C7.17196 1.23502 7.2495 1.15012 7.34547 1.09077C7.44144 1.03143 7.55204 1 7.66487 1C7.77771 1 7.88831 1.03143 7.98428 1.09077C8.08025 1.15012 8.15779 1.23502 8.20821 1.33596L9.94021 4.82396L13.8122 5.38663C13.9239 5.40211 14.029 5.44869 14.1155 5.52104C14.2019 5.59338 14.2663 5.68859 14.3013 5.79578C14.3363 5.90297 14.3404 6.01784 14.3132 6.12726C14.286 6.23669 14.2286 6.33627 14.1475 6.41463L11.3462 9.12796L12.0075 12.9613C12.0922 13.4533 11.5722 13.828 11.1275 13.596L7.66487 11.7853L4.20154 13.596C3.75754 13.8286 3.23754 13.4533 3.32221 12.9606L3.98354 9.1273L1.18221 6.41396C1.10153 6.33555 1.04447 6.23607 1.01751 6.12684C0.990559 6.01761 0.994787 5.90301 1.02972 5.79606C1.06465 5.68911 1.12888 5.59411 1.21512 5.52185C1.30135 5.44959 1.40613 5.40297 1.51754 5.3873L5.38954 4.82396Z"
                                            fill="#E68D07"
                                            stroke="#E68D07"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                         />
                                      </svg>
                                      <svg
                                         className={`${favorites.find(favorite => favorite.id === item.id) ? `hidden` : ``}`}
                                         onClick={() => handleAddFavorites(item.id)}
                                         xmlns="http://www.w3.org/2000/svg"
                                         width="16"
                                         height="16"
                                         viewBox="0 0 16 16"
                                         fill="none">
                                         <path
                                            d="M5.38954 5.48998L7.12154 2.00198C7.17196 1.90103 7.2495 1.81613 7.34547 1.75679C7.44144 1.69745 7.55204 1.66602 7.66487 1.66602C7.77771 1.66602 7.88831 1.69745 7.98428 1.75679C8.08025 1.81613 8.15779 1.90103 8.20821 2.00198L9.94021 5.48998L13.8122 6.05264C13.9239 6.06813 14.029 6.1147 14.1155 6.18705C14.2019 6.2594 14.2663 6.3546 14.3013 6.46179C14.3363 6.56899 14.3404 6.68385 14.3132 6.79328C14.286 6.9027 14.2286 7.00228 14.1475 7.08064L11.3462 9.79398L12.0075 13.6273C12.0922 14.1193 11.5722 14.494 11.1275 14.262L7.66487 12.4513L4.20154 14.262C3.75754 14.4946 3.23754 14.1193 3.32221 13.6266L3.98354 9.79331L1.18221 7.07998C1.10153 7.00156 1.04447 6.90208 1.01751 6.79285C0.990559 6.68362 0.994787 6.56902 1.02972 6.46207C1.06465 6.35513 1.12888 6.26012 1.21512 6.18787C1.30135 6.11561 1.40613 6.06899 1.51754 6.05331L5.38954 5.48998Z"
                                            stroke="#9F9F9F"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                         />
                                      </svg>
                                      <Link
                                         to={`/trade/${item.name.replace('/', '-')}`}
                                         className="flex w-full items-center justify-between text-left">
                                         <div className="flex items-center justify-start space-x-2">
                                            <div className="relative m-1 size-6 overflow-hidden rounded-full object-cover">
                                               <img
                                                  src={item.icon}
                                                  alt=""
                                               />
                                            </div>
                                            <Text>{item.name}</Text>
                                         </div>
                                      </Link>
                                   </div>
                                   <Link to={`/trade/${item.name.replace('/', '-')}`}>
                                      <Text>{item.avg_price}</Text>
                                   </Link>
                                   <Link to={`/trade/${item.name.replace('/', '-')}`}>
                                      <Text
                                         className={`${item.price_change.includes('+') ? 'text-[#33D49D]' : 'text-[#EF454A]'} `}>
                                         {item.price_change}
                                      </Text>
                                   </Link>
                                   <Link to={`/trade/${item.name.replace('/', '-')}`}>
                                      <Text className="hidden lg:block">{item.highLow}</Text>
                                   </Link>
                                   <Link to={`/trade/${item.name.replace('/', '-')}`}>
                                      <Text className="hidden lg:block">{item.volume}</Text>
                                   </Link>
                                </div>
                             ) : (
                                <div className="flex items-center justify-between rounded-lg bg-[#0E0F19] bg-opacity-60 text-left lg:grid lg:grid-cols-5">
                                   <div className="flex items-center justify-start space-x-2 p-2">
                                      <svg
                                         onClick={() => handleRemoveFavorites(item.id)}
                                         className={`${favorites.find(favorite => favorite.name === item.name) ? `` : `hidden`} ml-2`}
                                         xmlns="http://www.w3.org/2000/svg"
                                         width="16"
                                         height="16"
                                         viewBox="0 0 16 16"
                                         fill="none">
                                         <path
                                            d="M5.38954 4.82396L7.12154 1.33596C7.17196 1.23502 7.2495 1.15012 7.34547 1.09077C7.44144 1.03143 7.55204 1 7.66487 1C7.77771 1 7.88831 1.03143 7.98428 1.09077C8.08025 1.15012 8.15779 1.23502 8.20821 1.33596L9.94021 4.82396L13.8122 5.38663C13.9239 5.40211 14.029 5.44869 14.1155 5.52104C14.2019 5.59338 14.2663 5.68859 14.3013 5.79578C14.3363 5.90297 14.3404 6.01784 14.3132 6.12726C14.286 6.23669 14.2286 6.33627 14.1475 6.41463L11.3462 9.12796L12.0075 12.9613C12.0922 13.4533 11.5722 13.828 11.1275 13.596L7.66487 11.7853L4.20154 13.596C3.75754 13.8286 3.23754 13.4533 3.32221 12.9606L3.98354 9.1273L1.18221 6.41396C1.10153 6.33555 1.04447 6.23607 1.01751 6.12684C0.990559 6.01761 0.994787 5.90301 1.02972 5.79606C1.06465 5.68911 1.12888 5.59411 1.21512 5.52185C1.30135 5.44959 1.40613 5.40297 1.51754 5.3873L5.38954 4.82396Z"
                                            fill="#E68D07"
                                            stroke="#E68D07"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                         />
                                      </svg>
                                      <svg
                                         className={`${favorites.find(favorite => favorite.id === item.id) ? `hidden` : ``}`}
                                         onClick={() => handleAddFavorites(item.id)}
                                         xmlns="http://www.w3.org/2000/svg"
                                         width="16"
                                         height="16"
                                         viewBox="0 0 16 16"
                                         fill="none">
                                         <path
                                            d="M5.38954 5.48998L7.12154 2.00198C7.17196 1.90103 7.2495 1.81613 7.34547 1.75679C7.44144 1.69745 7.55204 1.66602 7.66487 1.66602C7.77771 1.66602 7.88831 1.69745 7.98428 1.75679C8.08025 1.81613 8.15779 1.90103 8.20821 2.00198L9.94021 5.48998L13.8122 6.05264C13.9239 6.06813 14.029 6.1147 14.1155 6.18705C14.2019 6.2594 14.2663 6.3546 14.3013 6.46179C14.3363 6.56899 14.3404 6.68385 14.3132 6.79328C14.286 6.9027 14.2286 7.00228 14.1475 7.08064L11.3462 9.79398L12.0075 13.6273C12.0922 14.1193 11.5722 14.494 11.1275 14.262L7.66487 12.4513L4.20154 14.262C3.75754 14.4946 3.23754 14.1193 3.32221 13.6266L3.98354 9.79331L1.18221 7.07998C1.10153 7.00156 1.04447 6.90208 1.01751 6.79285C0.990559 6.68362 0.994787 6.56902 1.02972 6.46207C1.06465 6.35513 1.12888 6.26012 1.21512 6.18787C1.30135 6.11561 1.40613 6.06899 1.51754 6.05331L5.38954 5.48998Z"
                                            stroke="#9F9F9F"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                         />
                                      </svg>
                                      <div className="relative m-1 size-6 overflow-hidden rounded-full object-cover">
                                         <img
                                            src={item.icon}
                                            alt=""
                                         />
                                      </div>
                                      <Text className="">{item.name}</Text>
                                   </div>
                                   <Text className="p-2">{item.avg_price}</Text>
                                   <Text
                                      className={`${item.price_change.includes('+') ? 'text-[#33D49D]' : 'text-[#EF454A]'} p-2`}>
                                      {item.price_change}
                                   </Text>
                                   <Text className="hidden p-2 lg:block">{item.highLow}</Text>
                                   <Text className="hidden p-2 lg:block">{item.volume}</Text>
                                </div>
                             )}
                          </>
                       ))}
               </div>
               {!favorites.length && showFavorites && (
                  <Text className="text-center text-xl font-semibold">No Data</Text>
               )}
               {!filteredItems.length && !showFavorites && (
                  <Text className="text-center text-xl font-semibold">No Data</Text>
               )}
            </div>
         </main>
         <Footer />
      </>
   );
};
