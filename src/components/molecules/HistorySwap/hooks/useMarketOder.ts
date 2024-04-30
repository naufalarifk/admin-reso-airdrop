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
  cancelOrderById: (value: string) => void;
  setCurrentMarket: (value: MarketOrder) => void;
};

type OrderQuery = {
  state: "success" | "wait" | "";
};

export type MarketOrderState = ListMarketOrderStore & MarketOrderAction;

export interface ListMarketOrderStore {
  orders: MarketOrder[];
  currentMarket: MarketOrder | null;
  pair: string;
}

const token = localStorage.getItem("auth");

const getOrder = async ({ state = "" }: OrderQuery) => {
  try {
    const response: AxiosResponse = await baseApi.get(
      `finex/market/orders?market_type=%7B%7D&limit=100&page=1&order_by=desc&state=${state}`,
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
    const response = await baseApi.post(
      `finex/market/orders/${id}/cancel`,
      {},
      {
        headers: {
          "X-CSRF-TOKEN": token,
        },
      }
    );
    return response;
  } catch (error: any) {
    toast.error(error.message);
  }
};

const initialState: ListMarketOrderStore = {
  orders: [],
  currentMarket: null,
  pair: "BTCUSD",
};

export const useListMarketOrder = create<MarketOrderState>()(
  devtools((set) => ({
    ...initialState,
    getListMarketOrder: async () => {
      const response = await getOrder({ state: "wait" });
      const orders = response?.data;
      set(() => ({
        orders,
      }));
    },
    cancelOrderById: async (id: string) => {
      const response = await cancelOrderById({ id });
      if (response?.status === 200) {
        setTimeout(async () => {
          const responseOrder = await getOrder({ state: "wait" });
          const orders: MarketOrder[] = responseOrder?.data;

          set(() => ({
            orders,
          }));
        }, 500);
      }
    },
    setCurrentMarket: (market: MarketOrder) => {
      set(() => ({ currentMarket: market }));
    },
  }))
);
