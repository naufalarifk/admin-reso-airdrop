/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/api/config";
import { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface MarketOrder {
  id: number;
  uuid: string;
  txid: string;
  errors: string;
  refund_hash: string;
  side: string;
  ord_type: string;
  price: number;
  avg_price: number;
  state: string;
  market: string;
  market_type: string;
  created_at: string;
  updated_at: string;
  origin_volume: number;
  remaining_volume: number;
  executed_volume: number;
  maker_fee: number;
  taker_fee: number;
  trades_count: number;
  trades: Trade[];
}

export interface Trade {
  id: string;
  price: number;
  amount: number;
  state: string;
  txid: string;
  total: number;
  fee_currency: number;
  fee: number;
  fee_amount: number;
  market: string;
  market_type: string;
  created_at: string;
  taker_type: string;
  side: string;
  order_id: number;
}

export type MarketOrderAction = {
  getListMarketOrder: () => void;
};

export type MarketOrderState = ListMarketOrderStore & MarketOrderAction;

export interface ListMarketOrderStore {
  orders: MarketOrder[];
}

const token = localStorage.getItem("auth");

const getOrder = async () => {
  try {
    const response: AxiosResponse = await baseApi.get(
      `finex/market/orders?market_type=%7B%7D&limit=100&page=1&order_by=desc`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error: any) {
    toast.error(error.message);
    console.log("error", error);
  }
};

export const cancelOrderById = async ({ id }: { id: string }) => {
  try {
    const response = await baseApi.post(`finex/market/orders/${id}/cancel`);
    return response;
  } catch (error: any) {
    toast.error(error.message);
  }
};

const initialState: ListMarketOrderStore = {
  orders: [],
};

export const useListMarketOrder = create<MarketOrderState>()(
  devtools((set) => ({
    ...initialState,
    getListMarketOrder: async () => {
      const response = await getOrder();
      const orders = response?.data;

      set(() => ({
        orders,
      }));
    },
  }))
);
