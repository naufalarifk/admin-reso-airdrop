import { baseApi } from "@/api/config";
import type { AxiosResponse } from "axios";
import { buildQueryString } from "@/utils";


interface CurrencyPayload {
    limit?: number;
    page?: number;
    type?: string;
    search?: {
        code?: string;
        name?: string;
    }
}


export async function getCurrencyList(payload: CurrencyPayload) {
    const { limit = '', page = '', search = '', type = '' } = payload
    
    const params = {
        limit,
        page,
        search,
        type,
    }
    try {
        const response: AxiosResponse = await baseApi.get(`trade/public/currencies${buildQueryString(params)}`) 
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function getSingleCurrency(id: string) {
    try {
        const response: AxiosResponse = await baseApi.get(`trade/public/currencies/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}