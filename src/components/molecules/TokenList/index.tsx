import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react/jsx-runtime"
import { IcSearch } from "@/assets/icons";
import { Input, Text } from "@/components";

interface TokenListProps {
    isOpen: boolean;
    closeModal: () => void;
}


export const TokenList = ({ isOpen, closeModal }: TokenListProps) => {

    const tokenStyles = {
        borderRadius: `4px`,
        border: `0.5px solid rgba(159, 159, 159, 0.30)`,
        background: `var(--COLOR - COLOR, linear - gradient(236deg, rgba(93, 99, 111, 0.10) 1.26 %, rgba(25, 30, 40, 0.35) 100 %))`
    }

    const tokens = [
        {
            name: "Ethereum",
            symbol: "ETH",
            image: "/images/placeholder.svg",
        },
        {
            name: "Wrapped Ethereum",
            symbol: "WETH",
            image: "/images/placeholder.svg",
        }, {
            name: "Bitcoin",
            symbol: "BTC",
            image: "/images/placeholder.svg",
        }, {
            name: "Wrapped SOL",
            symbol: "SOL",
            image: "/images/placeholder.svg",
        }, {
            name: "Arbitrarum",
            symbol: "ARB",
            image: "/images/placeholder.svg",
        },
    ]


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
                    <div className="fixed inset-0   bg-black/50 " />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden  relative bg-[#2a2627ef] border-soft/15 rounded-lg border  p-6  shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-semibold leading-6 text-center text-white"
                                >
                                    Token List
                                </Dialog.Title>
                                <div>
                                    <div className="flex items-center space-x-2 border rounded-lg px-2 mt-2">
                                        <IcSearch className="text-white dark:text-white" />
                                        <Input className="bg-transparent text-white placeholder:text-white" placeholder="Search" type="text" />
                                    </div>
                                    <div className="space-y-2 my-4">
                                        {
                                            tokens.map(token =>
                                                <div style={tokenStyles} className="flex justify-between items-center p-2">
                                                    <div className="flex space-x-1 items-center">
                                                        <img src={token.image} />
                                                        <Text className="font-semibold">{token.symbol}</Text>
                                                    </div>
                                                    <Text className="font-semibold text-[#9F9F9F]">{token.name}</Text>
                                                </div>)
                                        }
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}