/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/api/config";
import { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface Trade {
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

export type MyTradeAction = {
  getMyTradeOrder: () => void;
};

export type MyTradeState = ListMyTrade & MyTradeAction;

export interface ListMyTrade {
  trade: Trade[];
}

const token = localStorage.getItem("auth");

const getMyTrade = async () => {
  try {
    const response: AxiosResponse = await baseApi.get(`finex/market/trades`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error: any) {
    toast.error(error.message);
    console.log("error", error);
  }
};

const initialState: ListMyTrade = {
  trade: [],
};

export const useListTrade = create<MyTradeState>()(
  devtools((set) => ({
    ...initialState,
    getMyTradeOrder: async () => {
      const response = await getMyTrade();
      const trade = response?.data;

      set(() => ({
        trade,
      }));
    },
  }))
);
