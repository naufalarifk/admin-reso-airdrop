/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BtcConnectorId } from "../../../types";

export interface WalletSelectModalProps {
  visible: boolean;
  loading: boolean;
  wallets: any[];
  onClick?: (id: BtcConnectorId) => void;
  onClose: (value: boolean) => void;
}

export const WalletSelectModal = ({
  visible,
  wallets,
  onClick,
  onClose,
  loading,
}: WalletSelectModalProps) => {
  const clickHandler = async (id: BtcConnectorId, installed: boolean) => {
    if (loading || !installed) return;
    try {
      onClick?.(id);
    } catch (error) {
      throw error;
    }
  };

  return (
    <Transition appear show={visible} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={onClose}>
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
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-dark2 p-6 text-left align-middle shadow-xl transition-all">
                <div>
                  <div
                    className={`p-4  relative border-b border-b-soft
                      `}
                  >
                    <h2 className="text-xl font-bold">Connect Wallet</h2>
                    <button
                      type="button"
                      onClick={() => onClose(true)}
                      className="absolute top-1/2 -translate-y-1/2 right-4"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 text-gray-400"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4 flex flex-col gap-2">
                    {loading ? (
                      <div className="w-full h-full bg-opacity-80 bg-dark2 flex items-center justify-center">
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="w-12 h-12 text-dark animate-spin fill-primary"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      wallets.map((wallet: any) => (
                        <div
                          key={wallet.id}
                          onClick={() =>
                            clickHandler?.(wallet.id, wallet.installed)
                          }
                          className={`h-12 hover:bg-dark cursor-pointer flex items-center active:bg-dark visited:bg-dark justify-between p-2 gap-2 rounded-lg relative overflow-hidden  text-[#ecedee]"`}
                        >
                          <div className="flex items-center flex-1 ">
                            <img
                              src={wallet.logo}
                              alt={wallet.name}
                              className="w-8 h-8 mr-2"
                            />
                            <span className="flex-1 font-bold">
                              {wallet.name}
                            </span>
                          </div>
                          <div className="text-xs text-primary">
                            {!wallet.installed && "Not Installed"}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
