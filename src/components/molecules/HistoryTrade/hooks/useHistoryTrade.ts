/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/api/config";
import { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

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

export type MyTradeAction = {
  resetState: () => void;
  setListMyTrade: (item: Trade[]) => void;
};

export type MyTradeState = ListMyTrade & MyTradeAction;

export interface ListMyTrade {
  trades: Trade[];
}

export const getMyTradeAction = async ({
  token,
}: {
  token: string | undefined;
}) => {
  try {
    const response: AxiosResponse = await baseApi.get(`finex/market/trades`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
    console.log("error", error);
  }
};

const initialState: ListMyTrade = {
  trades: [],
};

export const useListTrade = create<MyTradeState>()(
  devtools((set) => ({
    ...initialState,
    resetState: () => {
      set(() => ({
        trades: [],
      }));
    },
    setListMyTrade: (trades: Trade[]) => set(() => ({ trades })),
  }))
);
