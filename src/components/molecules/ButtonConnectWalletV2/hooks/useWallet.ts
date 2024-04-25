/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import toast from "react-hot-toast";

import {
  type BtcWalletConnectOptions,
  Balance,
  BtcWalletNetwork,
  BtcConnectorId,
  WalletNetwork,
} from "@/types";

import BtcWalletConnect, { Connector } from "@/config/connectors/connect";
import { clearTokenServices, getTokenServices } from "@/api/services/auth";

declare global {
  interface Window {
    btcWallet: any;
  }
}

export type WalletState = {
  btcWallet?: BtcWalletConnect;
  balance: Balance;
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
  balance: { confirmed: 0, unconfirmed: 0, total: 0 },
  connectors: [],
  publicKey: "",
  isConnecting: false,
  address: "",
  connected: false,
  network: "livenet",
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
        await btcWallet.check();
        const address = btcWallet.address;
        const publicKey = btcWallet.publicKey;
        const balance = btcWallet.balance;
        const connected = btcWallet.connected;
        const network = btcWallet.network;
        const localConnectorId = btcWallet.localConnectorId;
        set(() => ({
          publicKey,
          address,
          balance,
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

        if (response?.status === 200) {
          const address = btcWallet.address;
          const publicKey = btcWallet.publicKey;
          const balance = btcWallet.balance;
          const connected = btcWallet.connected;
          const network = btcWallet.network;
          const localConnectorId = btcWallet.localConnectorId;

          set(() => ({
            publicKey,
            address,
            balance,
            connected,
            signature,
            network,
            isConnecting: false,
            localConnectorId,
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

      if (response?.status === 200) {
        set(() => ({
          balance: { confirmed: 0, unconfirmed: 0, total: 0 },
          connectorId: undefined,
          publicKey: "",
          address: "",
          initStatus: false,
          connected: false,
          network: "livenet",
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
