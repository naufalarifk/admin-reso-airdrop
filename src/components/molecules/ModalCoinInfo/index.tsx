import { Fragment } from "react";
import { Button, Text } from "@/components";
import { Dialog, Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { IcWarningTriangle } from "@/assets/icons";

interface ModalCoinInfoProps {
    isOpen: boolean;
    closeModal: () => void;
}

export const ModalCoinInfo = ({ isOpen, closeModal }: ModalCoinInfoProps) => {
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
                                    {t("swap.modal.coinInfo.title")}
                                </Dialog.Title>
                                <div className="mt-6">
                                    <IcWarningTriangle className="mx-auto" />
                                    <div className="space-y-2 my-2">
                                        <Text className="text-center">
                                            {t("swap.modal.coinInfo.text")}
                                        </Text>
                                        <Text className="text-center w-3/4 mx-auto text-[#90A3BF]">
                                            {t("swap.modal.coinInfo.subtext")}
                                        </Text>
                                    </div>
                                    <Button onClick={closeModal} className="w-full bg-[#F23F5D] rounded-full">
                                        {t("swap.modal.coinInfo.close")}
                                    </Button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};
