import { baseApi } from '@/api/config';
import type { AxiosResponse } from 'axios';
import { buildQueryString } from '@/utils';

interface MarketPayload {
   limit?: number;
   page?: number;
   ordering?: string;
   order_by?: string;
   base_unit?: string;
   quote_unit?: string;
   type?: string;
   search?: {
      base_code?: string;
      quote_code?: string;
      base_name?: string;
      quote_name?: string;
   };
}

interface MarketKLinePayload {
   period?: number;
   time_from?: number;
   time_to?: number;
   limit?: number;
}

interface MarketOrderBookPayload {
   asks_limit?: number;
   bids_limit?: number;
}

export async function getMarketList(payload: MarketPayload) {
   const {
      base_unit = '',
      limit = '',
      order_by = '',
      ordering = '',
      page = '',
      quote_unit = '',
      search = '',
      type = '',
   } = payload;
   const params = {
      base_unit,
      limit,
      order_by,
      ordering,
      page,
      quote_unit,
      search,
      type,
   };
   try {
      const response: AxiosResponse = await baseApi.get(
         `/trade/public/markets${buildQueryString(params)}`,
      );
      return response.data;
   } catch (error) {
      console.log(error);
   }
}

export async function getMarketTrades(market: string) {
   try {
      const response: AxiosResponse = await baseApi.get(`/trade/public/markets/${market}/trades`);
      return response.data;
   } catch (error) {
      console.log(error);
   }
}

export async function getMarketTicker(market: string) {
   try {
      const response: AxiosResponse = await baseApi.get(`/trade/public/markets/${market}/tickers`);
      return response.data;
   } catch (error) {
      console.log(error);
   }
}

export async function getAllMarketTicker() {
   try {
      const response: AxiosResponse = await baseApi.get(`/trade/public/markets/tickers`);
      return response.data;
   } catch (error) {
      console.log(error);
   }
}

export async function getMarketKLine(market: string, payload: MarketKLinePayload) {
   const { limit = '', period = '', time_from = '', time_to = '' } = payload;
   const params = {
      limit,
      period,
      time_from,
      time_to,
   };
   try {
      const response: AxiosResponse = await baseApi.get(
         `/trade/public/markets/${market}/k-line${buildQueryString(params)}`,
      );
      return response.data;
   } catch (error) {
      console.log(error);
   }
}

// export async function getMarketDepth(market: string, limit: number) {
//    try {
//       const response: AxiosResponse = await baseApi.get(
//          `/trade/public/markets/${market}/depth?limit=${limit}`,
//       );

//       return response.data;
//    } catch (error) {
//       console.log(error);
//    }
// }

export async function getMarketDepth(
   market: string,
   limit: number,
   setLoading: (isLoading: boolean) => void,
) {
   setLoading(true);
   try {
      const response: AxiosResponse = await baseApi.get(
         `/trade/public/markets/${market}/depth?limit=${limit}`,
      );
      return response.data;
   } catch (error) {
      console.log(error);
      return null;
   } finally {
      setLoading(false);
   }
}

export async function getMarketOrderBook(market: string, payload: MarketOrderBookPayload) {
   const { asks_limit = '', bids_limit = '' } = payload;
   const params = {
      asks_limit,
      bids_limit,
   };
   try {
      const response: AxiosResponse = await baseApi.get(
         `/trade/public/markets/${market}/order-book${buildQueryString(params)}`,
      );
      console.log('response.data', response.data);
      return response.data;
   } catch (error) {
      console.log(error);
   }
}
