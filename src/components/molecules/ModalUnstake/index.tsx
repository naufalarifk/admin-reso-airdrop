import { Fragment } from "react";
import { Button } from "@/components";
import { Dialog, Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";

interface ModalUnstakedProps {
  isOpen: boolean;
  closeModal: () => void;
}

export const ModalUnstake = ({ isOpen, closeModal }: ModalUnstakedProps) => {
  const { t } = useTranslation();
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-[99]  bg-black/20 " />
        </Transition.Child>

        <div className="fixed z-[999] backdrop-blur-sm inset-0 overflow-y-auto">
          <div className="flex min-h-full   items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full   max-w-md transform overflow-hidden  relative bg-dark border-soft/15 rounded-lg border  p-6  shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-semibold leading-6 text-center text-white"
                >
                  {t("staking.modal.unstake.title")}
                </Dialog.Title>
                <div className="mt-6">
                  <form autoComplete="off">
                    <div className="relative bg-dark2 p-4 rounded-lg">
                      <div className="absolute inset-y-0 start-5 flex items-center  pointer-events-none">
                        <svg
                          width={30}
                          height={30}
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_726_3281)">
                            <path
                              d="M14.71 29.92c8.124 0 14.71-6.586 14.71-14.71S22.833.5 14.71.5 0 7.086 0 15.21s6.586 14.71 14.71 14.71z"
                              fill="#F7931A"
                            />
                            <path
                              d="M21.174 13.39c.29-1.927-1.18-2.963-3.185-3.655l.65-2.61-1.588-.396-.634 2.542c-.418-.105-.846-.202-1.274-.3l.64-2.558-1.59-.396-.65 2.61c-.346-.08-.686-.157-1.015-.24l.002-.008-2.192-.547-.423 1.697s1.18.27 1.155.287c.643.161.76.587.74.925l-.741 2.974c.044.011.101.028.165.053l-.168-.042-1.039 4.167c-.079.195-.278.488-.729.377.017.023-1.154-.288-1.154-.288l-.79 1.819 2.07.515c.384.097.76.198 1.131.293l-.657 2.64 1.587.395.651-2.61c.434.116.855.225 1.267.328l-.649 2.6 1.589.395.657-2.635c2.71.513 4.748.306 5.605-2.145.692-1.973-.034-3.112-1.46-3.854 1.04-.239 1.82-.922 2.03-2.333zm-3.631 5.091c-.49 1.974-3.813.907-4.89.64l.872-3.499c1.078.27 4.532.802 4.018 2.86zm.492-5.12c-.448 1.796-3.213.883-4.11.66l.791-3.172c.896.223 3.786.64 3.319 2.512z"
                              fill="#fff"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_726_3281">
                              <path
                                fill="#fff"
                                transform="translate(0 .5)"
                                d="M0 0H29.4194V29.4194H0z"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <input
                        type="number"
                        id="default-search"
                        className="block bg-transparent w-full p-4 ps-14 text-sm  placeholder:text-soft text-white font-semibold outline-none  rounded-lg"
                        placeholder="0.00"
                      />
                      <button
                        type="button"
                        className="text-primary absolute end-5 bottom-5 bg-primary/10 focus:outline-none font-medium rounded-lg text-base p-2"
                      >
                        {t("global.max")}
                      </button>
                    </div>
                    <div className="text-base mt-2 text-left font-semibold text-soft">
                      {t("staking.create.yourStaked")}: 0.00 BTC
                    </div>
                    <div className="mt-6">
                      <Button
                        onClick={closeModal}
                        type="button"
                        className="w-full bg-primary"
                      >
                        {t("button.submit")}
                      </Button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
