/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/api/config";
import { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import create from "zustand";
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

type Pair = {
  name: string;
  id: string;
};

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
  resetState: () => void;
  cancelOrderById: (value: string) => void;
  setCurrentMarket: (value: MarketOrder) => void;
  setOrder: (item: MarketOrder[]) => void;
};

type OrderQuery = {
  state: "success" | "wait" | "";
  token?: string | null;
};

export type MarketOrderState = ListMarketOrderStore & MarketOrderAction;

export interface ListMarketOrderStore {
  orders: MarketOrder[];
  currentMarket: MarketOrder | null;
  pair: Pair;
}

// const token = localStorage.getItem("auth");

export const getOrder = async ({ state = "", token }: OrderQuery) => {
  try {
    const response: AxiosResponse = await baseApi.get(
      `finex/market/orders?market_type=%7B%7D&limit=100&page=1&order_by=asc&state=${state}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
    console.log("error", error);
  }
};

export const cancelOrderById = async ({
  id,
  token,
}: {
  id: string;
  token: string | null;
}) => {
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
  pair: {
    id: "btcusd",
    name: "BTC/USD",
  },
};

export const useListMarketOrder = create<MarketOrderState>()(
  devtools((set) => ({
    ...initialState,
    resetState: () => {
      set(() => ({
        orders: [],
      }));
    },
    cancelOrderById: async (id: string) => {
      const token = localStorage.getItem("auth");
      const response = await cancelOrderById({ id, token });
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
    setOrder: (orders: MarketOrder[]) => set(() => ({ orders })),
  }))
);
