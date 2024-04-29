import { baseApi } from "@/api/config";
import type { AxiosResponse } from "axios";
import { buildQueryString } from "@/utils";

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
    }
}

export async function getMarketList(payload: MarketPayload) {
    const { base_unit = '', limit = '', order_by = '', ordering = '', page = '', quote_unit = '', search = '', type = '' } = payload;
    const params = {
        base_unit,
        limit,
        order_by,
        ordering,
        page,
        quote_unit,
        search,
        type
    }
    try {
        const response: AxiosResponse = await baseApi.get(
            `/trade/public/markets${buildQueryString(params)}`
        )
        console.log('response', response)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function getMarketTrades(market: string) {
    try {
        const response: AxiosResponse = await baseApi.get(`trade/public/markets/${market}/trades`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function getMarketTicker(market: string) {
    try {
        const response: AxiosResponse = await baseApi.get(`trade/public/markets/${market}/tickers`)
        return  response.data
    } catch (error) {
        console.log(error)
    }
}