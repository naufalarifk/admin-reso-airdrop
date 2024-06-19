/* eslint-disable @typescript-eslint/no-explicit-any */
import create from "zustand";
import { devtools } from "zustand/middleware";
import toast from "react-hot-toast";

import type {
  Balance,
  BtcWalletNetwork,
  BtcConnectorId,
  WalletNetwork,
  RealBalance} from "@/types";
import {
  type BtcWalletConnectOptions
} from "@/types";

import type { Connector } from "@/config/connectors/connect";
import BtcWalletConnect from "@/config/connectors/connect";
import {
  clearTokenServices,
  getMe,
  getTokenServices,
} from "@/api/services/auth";
import axios from "axios";

declare global {
  interface Window {
    btcWallet: any;
  }
}

export type WalletState = {
  btcWallet?: BtcWalletConnect;
  balance: Balance;
  realBalance: RealBalance;
  publicKey: string;
  address: string;
  connected: boolean;
  isConnecting: boolean;
  initStatus: boolean;
  modalVisible: boolean;
  network: BtcWalletNetwork;
  connectorId?: BtcConnectorId;
  localConnectorId?: BtcConnectorId;
  connector?: Connector;
  signature?: string;
  token: string | undefined;
  connectors?: {
    id: BtcConnectorId;
    name: string;
    logo: string;
    connector: any;
    installed: boolean;
  }[];
};

export type WalletActions = {
  init: (config: BtcWalletConnectOptions) => void;
  check: () => void;
  connect: () => void;
  disconnect: () => void;
  switchConnector: (id: BtcConnectorId) => void;
  switchNetwork: (e: WalletNetwork) => void;
  setModalVisible: (visible: boolean) => void;
};

export type WalletStore = WalletState & WalletActions;

const defaultInitState: WalletState = {
  initStatus: false,
  modalVisible: false,
  signature: "",
  token: "",
  realBalance: {
    confirm_amount: "",
    pending_amount: "",
    amount: "",
    confirm_btc_amount: "",
    pending_btc_amount: "",
    btc_amount: "",
    confirm_inscription_amount: "",
    pending_inscription_amount: "",
    inscription_amount: "",
    usd_value: "",
  },
  balance: { confirmed: 0, unconfirmed: 0, total: 0 },
  connectors: [],
  publicKey: "",
  isConnecting: false,
  address: "",
  connected: false,
  network: "livenet",
};

const getBalance = async ({ address }: { address: string }) => {
  try {
    const responseData = await axios.get(
      `${
        import.meta.env.VITE_UNISAT_API_URL
      }/v5/address/balance?address=${address}`,
      {
        headers: {
          Authorization: `Bearer 539a15a6705b98a6a5295acceb15d336b218e897362591805bf632276fbaaa49`,
        },
      }
    );
    return responseData.data?.data;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const useWalletStore = create<WalletStore>()(
  devtools((set, get) => ({
    ...defaultInitState,
    setModalVisible: (visible: boolean) => {
      set(() => ({ modalVisible: visible }));
    },
    init: (config: BtcWalletConnectOptions = {}) => {
      try {
        const { network = "livenet", defaultConnectorId = "unisat" } = config;
        const btcWallet = new BtcWalletConnect(config);
        window.btcWallet = btcWallet;
        set(() => ({
          btcWallet,
          network,
          connectorId: defaultConnectorId,
          connector: btcWallet.connector,
          localConnectorId: btcWallet.localConnectorId,
          connectors: btcWallet.connectors.map((con) => ({
            id: con.id as any,
            name: con.instance.name,
            logo: con.instance.logo,
            connector: con.instance,
            installed: con.installed,
          })),
          initStatus: true,
        }));
      } catch (error) {
        set(() => ({ initStatus: false }));
        throw error;
      }
    },
    switchConnector(id: BtcConnectorId) {
      const btcWallet = get().btcWallet;
      if (!btcWallet) {
        throw new Error("Wallet not initialized");
      }
      btcWallet.switchConnector(id);
      set(() => ({
        connectorId: id,
        connector: btcWallet.connector,
        localConnectorId: btcWallet.localConnectorId,
      }));
    },
    check: async () => {
      try {
        const btcWallet = get().btcWallet;
        if (!btcWallet) {
          throw new Error("Wallet not initialized");
        }
        let realBalance: any;

        await btcWallet.check();
        const address = btcWallet.address;
        const publicKey = btcWallet.publicKey;
        const balance = btcWallet.balance;
        const connected = btcWallet.connected;
        const network = btcWallet.network;
        const localConnectorId = btcWallet.localConnectorId;
        if (connected) {
          realBalance = await getBalance({ address: btcWallet.address! });
        }
        set(() => ({
          publicKey,
          address,
          balance,
          realBalance,
          connected,
          network,
          localConnectorId,
        }));
      } catch (error) {
        console.error("Error checking Wallet", error);
        throw error;
      }
    },
    connect: async () => {
      set(() => ({
        isConnecting: true,
      }));
      try {
        const btcWallet = get().btcWallet;

        if (!btcWallet) {
          throw new Error("Wallet not initialized");
        }

        await btcWallet.connect();

        const signature = await btcWallet.signMessage(btcWallet.address!);

        const response = await getTokenServices({
          message: btcWallet.address!,
          public_key: btcWallet.publicKey!,
          signature: signature,
        });

        // const response = await getTokenServices({
        //   message: "tb1qhfm5sftyzsxun52338uvwy0wn5g2fld4jxukm2",
        //   public_key:
        //     "032f684382623cd20d4a16d1d958cdec4884883501338f4ada06ca329bb94dadc1",
        //   signature:
        //     "HwO9coi45E+8kMGkvfEjp1LdAiEbWnEjF2q1WRfAJce9Ywri5ZAYt4kO4n2Bu3dFqtloAkWK7y9jyc1Ft6+GUsM=",
        // });

        const tokenAuth = response?.data?.csrf_token;
        localStorage.setItem("auth", response?.data.csrf_token);

        if (response?.status === 200) {
          await getMe();
          const address = btcWallet.address;
          const publicKey = btcWallet.publicKey;
          const balance = btcWallet.balance;
          const connected = btcWallet.connected;
          const localConnectorId = btcWallet.localConnectorId;
          const network = btcWallet.network;
          const token = tokenAuth;

          const realBalance = await getBalance({ address: address! });

          set(() => ({
            publicKey,
            address,
            balance,
            connected,
            realBalance,
            signature,
            network,
            isConnecting: false,
            localConnectorId,
            token,
          }));
        }
      } catch (error: any) {
        set(() => ({
          isConnecting: false,
        }));
        toast.error(error.message);
        throw error;
      }
    },
    disconnect: async () => {
      const { btcWallet } = get();
      if (!btcWallet) {
        throw new Error("Wallet not initialized");
      }
      await btcWallet.disconnect();

      const response = await clearTokenServices();
      localStorage.removeItem("auth");

      if (response?.status === 200) {
        set(() => ({
          balance: { confirmed: 0, unconfirmed: 0, total: 0 },
          connectorId: undefined,
          publicKey: "",
          address: "",
          initStatus: false,
          connected: false,
          network: "livenet",
          token: "",
        }));
      }
    },

    switchNetwork: async (e) => {
      try {
        const btcWallet = get().btcWallet;
        if (!btcWallet) {
          throw new Error("Wallet not initialized");
        }
        await btcWallet.switchNetwork(e);
        const newNetwork = await btcWallet.getNetwork();
        const address = btcWallet.address;
        const publicKey = btcWallet.publicKey;
        const balance = btcWallet.balance;
        const connected = btcWallet.connected;
        const localConnectorId = btcWallet.localConnectorId;
        set(() => ({
          publicKey,
          address,
          balance,
          connected,
          localConnectorId,
          network: newNetwork,
        }));
      } catch (error: any) {
        toast.error(error.message);
      }
    },
  }))
);
