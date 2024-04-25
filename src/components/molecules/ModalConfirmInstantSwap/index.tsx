import { Fragment } from "react";
import { Button, SwapInput, Text } from "@/components";
import { Dialog, Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { IcSwapHorizontal } from "@/assets/icons";

interface ModalConfirmInstantSwapProps {
    isOpen: boolean;
    closeModal: () => void;
}

export const ModalConfirmInstantSwap = ({ isOpen, closeModal }: ModalConfirmInstantSwapProps) => {
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
                            <Dialog.Panel className="w-full  max-w-lg transform overflow-hidden  relative bg-dark border-soft/15 rounded-lg border  p-6  shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-semibold leading-6 text-center text-white"
                                >
                                    {t("swap.modal.confirmSwap.title")}
                                </Dialog.Title>
                                <div className="mt-6 space-y-4">
                                    <SwapInput />
                                    <div className="p-1 rounded-full z-10">
                                        <div className="bg-[#181924] rounded-full mx-auto border-4 border-[#0E0F19] w-10 h-10 grid place-items-center">
                                            <IcSwapHorizontal height="24" width="24" color="#F23F5D" />
                                        </div>
                                    </div>
                                    <SwapInput />
                                    <div>
                                        <Text className="text-right font-semibold text-[#90A3BF]">1 BTC = 69,398.54 USDT</Text>
                                        <div className="flex justify-between items-center">
                                            <Text>Expected Output</Text>
                                            <Text>0.0001 USDT</Text>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <Text>Price Impact</Text>
                                            <Text>0.00%</Text>
                                        </div>
                                        <hr className="my-4 h-[0.5px] border-t-[0.5px] border-[#FFFFFF1A]" />
                                        <div className="flex justify-between items-center">
                                            <Text>Minimum received after</Text>
                                            <Text>0.0001 USDT</Text>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <Text>Slippage (0.05%)</Text>
                                            <Text>BTC</Text>
                                        </div>
                                        <Text className="w-4/5 mt-4">Output is estimated. You will receive at least  0.0001 USDT or the transaction will revert</Text>
                                    </div>
                                    <Button onClick={closeModal} className="w-full rounded-full bg-[#F23F5D]">Confirm</Button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};
