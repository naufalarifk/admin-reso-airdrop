import { CurrentMarket } from '@/components';
import { OrderBook } from '@/components/dummy/OrderBook';
// import TradingView from "@/components/organisms/TradingView";
import { useCallback, useEffect, useState } from 'react';
import { Text } from '@/components';
import { IcBitcoin, IcDoubleCurrency, IcInfo, IcTrade, IcUnstableConnection } from '@/assets/icons';
import { useTranslation } from 'react-i18next';
import { ModalInsufficientBalance } from '@/components/molecules/ModalInsufficientBalance';
import { ModalCoinInfo } from '@/components/molecules/ModalCoinInfo';
import {
   usePublicMarket,
   usePublicMarketTicker,
   usePublicMarketTrade,
} from './hooks/usePublicMarkets';
import {
   getMarketDepth,
   getMarketKLine,
   getMarketList,
   getMarketTicker,
   getMarketTrades,
} from '@/api/services/public/markets';
// import { usePublicCurrency } from './hooks/usePublicCurrencies';
import TradingViewV2 from '@/components/organisms/TradingView/tradingViewV2';
import { useParams } from 'react-router-dom';
import { Dummy } from '../Dummy';
import { Currencies } from '../Dummy/types';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

export const Swap = () => {
   const { t } = useTranslation();
   const params = useParams();
   const marketId = params?.market?.replace('-', '')?.toLowerCase();
   // const currId = params?.market?.split('-')[0]?.toLowerCase();

   const market = usePublicMarket(state => state.market);
   const marketTicker = usePublicMarketTicker(state => state.market_ticker);
   // const trades = usePublicMarketTrade(state => state.market_trade);
   // const currencies = usePublicCurrency(state => state.currency);
   // const marketKLine = usePublicMarket(state => state.k_line);
   // const marketTrade = usePublicMarketTrade(state => state.market_trade);
   const depth = usePublicMarket(state => state.depth);
   const updateMarketTicker = usePublicMarketTicker(state => state.updateMarketTickerState);
   const updateTradeMarket = usePublicMarketTrade(state => state.updateMarketTradeState);
   const updateKLine = usePublicMarket(state => state.updateKLine);
   const updateDepth = usePublicMarket(state => state.updateDepth);
   const updateMarket = usePublicMarket(state => state.updateMarketState);
   const styles = {
      borderRadius: `4px`,
      border: `0.5px solid rgba(255, 255, 255, 0.10)`,
      background: `var(--COLOR - COLOR, linear - gradient(236deg, rgba(93, 99, 111, 0.10) 1.26 %, rgba(25, 30, 40, 0.35) 100 %))`,
      backdropFilter: `blur(12px)`,
   };

   const [openInsufficientBalance, setOpenInsufficientBalance] = useState(false);
   const [openCoinInfo, setOpenCoinInfo] = useState(false);
   const [depthLoading, setDepthLoading] = useState(true);

   const getData = useCallback(async () => {
      const market = await getMarketList({});
      const k_line = await getMarketKLine(marketId!, {});
      const market_trade = await getMarketTrades(marketId!);
      updateMarket(market);
      updateTradeMarket(market_trade);
      updateKLine(k_line);
   }, [marketId, updateKLine, updateMarket, updateTradeMarket]);

   useEffect(() => {
      getData();
   }, [getData]);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const depth = await getMarketDepth(marketId!, 60, setDepthLoading);
            const marketTicker = await getMarketTicker(marketId!);

            updateDepth(depth);
            updateMarketTicker(marketTicker);
         } catch (error) {
            console.error('Error fetching data:', error);
         }
      };

      fetchData();

      const intervalId = setInterval(fetchData, 5000);
      return () => clearInterval(intervalId);
   }, [marketId, updateDepth, updateMarketTicker]);

   const baseUrl = import.meta.env.VITE_API_URL;

   const getCurrencies = async () => {
      try {
         const response: AxiosResponse = await axios.get(
            `${baseUrl}/api/v2/trade/public/currencies?limit=100&page=1&ordering=asc&order_by=position`,
         );
         return response.data;
      } catch (error) {
         console.log('error', error);
      }
   };

   const { data: listCurrencies } = useQuery<Currencies[], string>({
      queryKey: ['curencies'],
      queryFn: getCurrencies,
   });

   // const currency = listCurrencies?.find(item => item.id === currId);

   const usdt = listCurrencies?.find(item => item.id === 'usdt');
   const marketById = market?.find(item => item?.id === marketId);

   const token_rate = [
      {
         name: 'BTC/USDT',
         rate: '+0.25%',
      },
      {
         name: 'ETH/USDT',
         rate: '+0.25%',
      },
      {
         name: 'XRP/USDT',
         rate: '+0.25%',
      },
      {
         name: 'XRP/ETH',
         rate: '+0.25%',
      },
      {
         name: 'ETH/BTC',
         rate: '+0.25%',
      },
      {
         name: 'DOGE/USDT',
         rate: '+0.25%',
      },
      {
         name: 'XRP/DOGE',
         rate: '+0.25%',
      },
      {
         name: 'ARB/ETH',
         rate: '+0.25%',
      },
      {
         name: 'ARB/ETH',
         rate: '+0.25%',
      },
      {
         name: 'ARB/ETH',
         rate: '+0.25%',
      },
   ];

   return (
      <>
         <main className="flex flex-col space-x-0 space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
            <div className="flex items-center space-x-2 rounded-lg bg-[#181924] p-4 lg:hidden">
               <div className="flex w-full items-center space-x-2">
                  <IcDoubleCurrency />
                  <IcBitcoin />
                  <Text className="text-white">BTC/USD</Text>
                  <Text className="rounded-full bg-[#25402f] p-1 text-[#33D49D]">+2.00%</Text>
               </div>
               <div className="flex w-max justify-end">
                  <IcTrade />
                  <IcInfo />
               </div>
            </div>
            <OrderBook
               data={depth}
               ticker={marketTicker}
               usdt={usdt!}
               market={marketById!}
               loading={depthLoading}
            />
            <div
               style={styles}
               className="h-[40vh] w-full p-4 lg:h-[60vh] lg:w-4/5">
               <CurrentMarket
                  currentMarket={params?.market}
                  market={market}
                  depth={depth}
                  ticker={marketTicker}
               />
               <div className="h-full">
                  {/* <TradingViewV2 data={marketKLine} /> */}
                  <TradingViewV2 />
               </div>
               {/* <TradingView /> */}
            </div>
         </main>
         <main className="mt-20">
            <Dummy />
         </main>
         <div className="mt-4 hidden justify-between border-t border-[#ADB1B8] p-2 lg:flex">
            <div className="flex space-x-1">
               <IcUnstableConnection />
               <Text>{t('swap.unstableConnection')}</Text>
            </div>
            {token_rate.map(token => (
               <div className="flex space-x-1 border-l border-[#ADB1B8] px-2">
                  <Text>{token.name}</Text>
                  <Text className="text-green">{token.rate}</Text>
               </div>
            ))}
         </div>
         <ModalInsufficientBalance
            isOpen={openInsufficientBalance}
            closeModal={() => setOpenInsufficientBalance(false)}
         />
         <ModalCoinInfo
            isOpen={openCoinInfo}
            closeModal={() => setOpenCoinInfo(false)}
         />
         {/* <ModalConfirmInstantSwap
                  isOpen={openConfirmInstantSwap}
                  closeModal={() => setOpenConfirmInstantSwap(false)}
              /> */}
      </>
   );
};
