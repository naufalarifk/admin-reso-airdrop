import { Fragment } from "react";
import { Button, Text } from "@/components";
import { Dialog, Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { IcBitcoin, IcDiscord, IcMedium, IcTelegram, IcWeb, IcX } from "@/assets/icons";

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
                            <Dialog.Panel className="w-full  max-w-lg transform overflow-hidden  relative bg-dark border-soft/15 rounded-lg border  p-6  shadow-xl transition-all">
                                {/* <Dialog.Title
                                    as="h3"
                                    className="text-lg font-semibold leading-6 text-center text-white"
                                >
                                    {t("swap.modal.coinInfo.title")}
                                </Dialog.Title> */}
                                <div className="bg-[#0E0F19] rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <IcBitcoin width="24" height="24" />
                                            <Text>BTC <span className="text-[#90A3BF]">Bitcoin</span></Text>
                                        </div>
                                        <div className="flex space-x-2">
                                            <div className="p-1 rounded-full bg-[#181924]">
                                                <IcWeb color="#F23F5D" />
                                            </div>
                                            <div className="p-1 rounded-full bg-[#181924]">
                                                <IcX />
                                            </div>
                                            <div className="p-1 rounded-full bg-[#181924]">
                                                <IcTelegram color="#F23F5D" />
                                            </div>
                                            <div className="p-1 rounded-full bg-[#181924]">
                                                <IcDiscord className="h-6 w-6" color="#F23F5D" />
                                            </div>
                                            <div className="p-1 rounded-full bg-[#181924]">
                                                <IcMedium />
                                            </div>
                                        </div>
                                    </div>

                                    <Text className="text-[#90A3BF] my-1">Bitcoin is a digital asset and a payment system invented by Satoshi Nakamoto who published a related paper in 2008 and released it as open-source software in 2009. The system featured as peer-to-peer; users can transact directly without an intermediary.</Text>
                                    <div className="p-4 grid grid-cols-3 bg-[#181924] rounded-lg mt-2 gap-4">
                                        <div>
                                            <Text>{t('pool.firstStep.ranking')}</Text>
                                            <Text>#1</Text>
                                        </div>
                                        <div>
                                            <Text>{t('pool.firstStep.blockExplorer')}</Text>
                                            <Text className="truncate">https://blockchair.com/bit</Text>
                                        </div>
                                        <div>
                                            <Text>{t('pool.firstStep.marketCap')}</Text>
                                            <Text>329.479.24 USD</Text>
                                        </div>
                                        <div>
                                            <Text>{t('pool.firstStep.liquidity')}</Text>
                                            <Text>1,324</Text>
                                        </div>
                                        <div>
                                            <Text>{t('pool.firstStep.maxSupply')}</Text>
                                            <Text>21,000,000</Text>
                                        </div>
                                        <div>
                                            <Text>{t('pool.firstStep.circulationSupply')}</Text>
                                            <Text>19,670,743</Text>
                                        </div>
                                        <div>
                                            <Text>{t('pool.firstStep.historicalHigh')}</Text>
                                            <Text>73,750.074 USD</Text>
                                        </div>
                                        <div>
                                            <Text>{t('pool.firstStep.historicalLow')}</Text>
                                            <Text>0.049 USD</Text>
                                        </div>
                                    </div>
                                    <Button className="w-full mt-2 rounded-full bg-[#F23F5D]">Close</Button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};
