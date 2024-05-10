import { baseApi } from "@/api/config";
import type { AxiosResponse } from "axios";
import { buildQueryString } from "@/utils";



interface PaymentPayload {
    uid: string;
    kinds: string;
    hash: string;
    amount: number;
}


interface AddNewMarketPayload {
    amount_precision: number;
    price_precision: number;
    total_precision: number;
    max_price: number;
    base_currency: string;
    quote_currency: string;
    min_price: number;
    min_amount: number;
    type?: string;
    engine_name?: string;
    engine_id?: string;
    state?: string;
}

interface PoolMarketPayload {
    state?: string;
    currency?: string;
    pair_currency?: string;
    market?: string;
}

interface AddNewCurrencyPayload {
    name: string;
    precision: number;
    price: number;
    status: string;
    icon_url: string;
    description: string;
    homepage: string;
    code: string;
    type: string;
    position: string;
    details: {
        website: string;
        twitter: string;
        telegram: string;
        discord: string;
        medium: string;
    },
    supplies: {
        circulating_supply: string;
        market_cap: string;
    },
    inscription_id: string;
    base_factor: string;
    subunits: string;
}

export async function postPoolPayment(payload: PaymentPayload) {
    const { amount, hash, kinds, uid } = payload
    const params = {
        amount,
        hash,
        kinds,
    }
    try {
        const response: AxiosResponse = await baseApi.post(`/pool/market/${uid}/payment${buildQueryString(params)}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function postAddNewPoolMarket(payload: AddNewMarketPayload) {
    const formData = new FormData()
    formData.append('amount_precision', payload.amount_precision.toString())
    formData.append('base_currency', payload.base_currency)
    formData.append('engine_id', payload.engine_id || '')
    formData.append('engine_name', payload.engine_name || '')
    formData.append('max_price', payload.max_price.toString())
    formData.append('min_price', payload.min_price.toString())
    formData.append('min_amount', payload.min_amount.toString())
    formData.append('min_price', payload.min_price.toString())
    formData.append('price_precision', payload.price_precision.toString())
    formData.append('quote_currency', payload.quote_currency)
    formData.append('state', payload.state || '')
    formData.append('total_precision', payload.total_precision.toString())
    formData.append('type', payload.type || '')

    try {
        const response: AxiosResponse = await baseApi.post(`pool/market/new`, formData)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function getPoolMarket(payload: PoolMarketPayload) {
    const { currency = '', market = '', pair_currency = '', state = '' } = payload
    const params = {
        currency,
        market,
        pair_currency,
        state
    }
    try {
        const response: AxiosResponse = await baseApi.get(`pool/market${buildQueryString(params)}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
    

export async function postAddNewCurrency(payload: AddNewCurrencyPayload) {


    const formData = new FormData();
    formData.append('base_factor', payload.base_factor)
    formData.append('code', payload.code)
    formData.append('description', payload.description)
    for (const key of Object.keys(payload.details)) {
        formData.append(key, payload.details[key as keyof typeof payload.details])
    }
    formData.append('homepage', payload.homepage)
    formData.append('icon_url', payload.icon_url)
    formData.append('inscription_id', payload.inscription_id)
    formData.append('name', payload.name)
    formData.append('position', payload.position)
    formData.append('precision', payload.precision.toString())
}