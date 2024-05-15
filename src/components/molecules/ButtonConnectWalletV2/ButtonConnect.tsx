/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useEffect, useMemo, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import BtcWalletConnect from "@/config/connectors/connect";
import { BtcConnectorId, BtcWalletConnectOptions } from "@/types";
import { useWalletStore } from "./hooks/useWallet";
import { Avatar } from "@/components/atoms";
import { formatAddress, cn } from "@/utils";
import { WalletSelectModal } from "./SelectWallet";
import { useListMarketOrder } from "../HistorySwap/hooks/useMarketOder";
import { useListTrade } from "../HistoryTrade/hooks/useHistoryTrade";

export interface WalletConnectV2Props {
  config?: BtcWalletConnectOptions;
  onConnectSuccess?: (btcWallet: BtcWalletConnect) => void;
  onConnectError?: (error: any) => void;
  onDisconnectSuccess?: () => void;
  onDisconnectError?: (error: any) => void;
  children?: any;
  className?: string;
}

export const ButtonWalletConnectV2 = ({
  config: { defaultConnectorId = "unisat" } = {},
  onConnectError,
  className,
  onConnectSuccess,
  onDisconnectError,
  onDisconnectSuccess,
}: WalletConnectV2Props) => {
  const {
    modalVisible,
    setModalVisible,
    connectors,
    connected,
    address,
    connect,
    init,
    disconnect,
    btcWallet,
    check,
    balance,
    network,
    switchConnector,
    isConnecting,
  } = useWalletStore((state) => state);

  const [open, setOpen] = useState(false);

  const handleConnect = () => {
    setModalVisible(true);
  };

  const getExplorerLink = () => {
    return network === "livenet"
      ? `https://mempool.space/address/${address}`
      : `https://mempool.space/testnet/address/${address}`;
  };

  const walletSelect = async (id: BtcConnectorId) => {
    switchConnector(id);
    try {
      connect();
      if (btcWallet) {
        onConnectSuccess?.(btcWallet);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      onConnectError?.(error);
    }
  };

  const handlerDisconnect = async () => {
    try {
      onDisconnectSuccess?.();
      disconnect();
      useListMarketOrder.getState().resetState();
      useListTrade.getState().resetState();
      setOpen(false);
    } catch (error) {
      console.error(error);
      onDisconnectError?.(error);
    }
  };

  const wallets = useMemo(() => {
    return (
      connectors?.map((c) => ({
        id: c.id,
        name: c.name,
        logo: c.logo,
        installed: c.installed,
      })) || []
    );
  }, [connectors]);

  useEffect(() => {
    init({ network, defaultConnectorId });
  }, []);

  useEffect(() => {
    init({ network, defaultConnectorId });
  }, [network, defaultConnectorId]);

  useEffect(() => {
    check();
  }, []);

  return (
    <>
      {!connected ? (
        <>
          <button
            disabled
            onClick={handleConnect}
            className={cn(
              `py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent bg-black text-white hover:bg-black/80 disabled:opacity-50 disabled:pointer-events-none`,
              className
            )}
          >
            {isConnecting ? "Connecting ..." : "Connect Wallet"}
          </button>
          <WalletSelectModal
            loading={isConnecting}
            onClose={() => setModalVisible(false)}
            visible={modalVisible}
            wallets={wallets}
            onClick={walletSelect}
          />
        </>
      ) : (
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            "inline-flex items-center gap-x-3 text-sm font-semibold rounded-full border-2 shadow-sm bg-dark border-dark/10 p-1 px-2 hover:bg-black/10 active:bg-black/10 disabled:opacity-50 disabled:pointer-events-none",
            className
          )}
        >
          <Avatar className="w-8 h-8" address={address} />
          <span>{formatAddress(address)}</span>
        </button>
      )}

      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-30"
          onClose={() => setOpen(!open)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center relative">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md h-full transform overflow-hidden rounded-2xl bg-dark p-6  relative text-left align-middle shadow-xl transition-all">
                  <div>
                    <div className="p-4 flex flex-col gap-2">
                      <div className="flex flex-col text-center items-center justify-center">
                        <Avatar
                          className="w-14 h-14 border-4 mb-5 border-slate-800"
                          address={address}
                        />
                        <div className="font-bold text-xl flex items-center gap-3">
                          {formatAddress(address)}
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-4 h-4 text-neutral-400 cursor-pointer"
                            >
                              <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
                              <path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
                            </svg>
                          </span>
                        </div>
                        <div className="text-3xl font-bold my-5">
                          {(balance.total / 100000000).toFixed(8)} BTC
                        </div>
                        <a
                          rel="noopener noreferrer"
                          target="_blank"
                          href={getExplorerLink()}
                          className="flex items-center gap-4 mb-5 bg-primary text-white text-center rounded-full px-6 py-3"
                        >
                          Block Explorer
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                              />
                            </svg>
                          </span>
                        </a>

                        {/* <SelectNetworkModal /> */}

                        <button
                          onClick={handlerDisconnect}
                          type="button"
                          className="py-3 w-full  px-4 inline-flex justify-center mt-7 items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent bg-black text-white hover:bg-black/80 disabled:opacity-50 disabled:pointer-events-none"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6 rotate-90"
                          >
                            <path
                              fillRule="evenodd"
                              d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Disconnect
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
