import axios, { AxiosResponse } from "axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type Gas = {
  title: string;
  desc: string;
  feeRate: string;
};

interface GasServiceStore {
  gas: Gas[];
}

interface GasServiceAction {
  getPublicGas: () => void;
}

type GasServiceState = GasServiceAction & GasServiceStore;

const initialState: GasServiceStore = {
  gas: [],
};

const BASE_URL = import.meta.env.VITE_API_URL;

const getGasPrice = async () => {
  try {
    const response: AxiosResponse = await axios.get(
      `${BASE_URL}/api/v2/trade/public/fee-summary`
    );
    return response;
  } catch (error) {
    console.log("error", error);
  }
};

export const useGasServiceState = create<GasServiceState>()(
  devtools((set) => ({
    ...initialState,
    getPublicGas: async () => {
      const response = await getGasPrice();
      set(() => ({
        gas: response?.data,
      }));
    },
  }))
);
