import { Fragment, useCallback, useMemo, useState } from "react";
import { Text, Button } from "@/components";
import { Dialog, Transition } from "@headlessui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import type { WalletName } from "@solana/wallet-adapter-base";
import base58 from "bs58";
import { useAppDispatch } from "@/store";
import { postAuthUser } from "@/store/features/private";


interface ModalWalletListProps {
    isOpen: boolean;
    closeModal: () => void;
}

export const ModalWalletList = ({ isOpen, closeModal }: ModalWalletListProps) => {


    const dispatch = useAppDispatch()
    const { wallets, select, signMessage, publicKey, connected } = useWallet()

    const [signature, setSignature] = useState("");

    const sign = useCallback(async () => {
        try {
            const message = new TextEncoder().encode(publicKey?.toBase58());
            if (signMessage) {
                const uint8arraySignature = await signMessage(message);
                setSignature(base58.encode(uint8arraySignature));
                console.log('uint8arraySignature', uint8arraySignature)
            }
        } catch (e) {
            console.log("could not sign message");
        }
    }, [publicKey, signMessage])

    console.log('signature', signature)
    const connectWallet = useCallback(async (name: WalletName) => {
        try {
            await new Promise<void>((resolve) => {
                select(name);
                resolve();
            });
            await sign();
            dispatch(postAuthUser({
                message: publicKey?.toBase58() ?? '',
                public_key: publicKey?.toBase58() ?? '',
                signature: publicKey?.toBase58() ?? ''
            }))
            closeModal()
        } catch (error) {
            console.error('Failed to connect wallet:', error);
        }
    }, [closeModal, dispatch, publicKey, select, sign])


    useMemo(() => {
        if (connected && publicKey) {
            dispatch(postAuthUser({
                message: publicKey?.toBase58() ?? '',
                public_key: publicKey?.toBase58() ?? '',
                signature: publicKey?.toBase58() ?? ''
            }))
        }
    }, [connected, dispatch, publicKey])

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="" onClose={closeModal}>
                <div className="fixed z-[999] backdrop-blur-sm inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden  relative bg-dark border-soft/15 rounded-lg border p-6 shadow-xl transition-all">
                                <Dialog.Title className='text-primary font-semibold text-lg mb-4'>Choose Wallet</Dialog.Title>
                                <div className="">
                                    {
                                        wallets.map(wallet =>
                                            <div onClick={() => connectWallet(wallet.adapter.name)} className="flex space-x-4 items-center hover:bg-primary w-full rounded-lg bg-opacity-10 p-4 transition-all cursor-pointer ">
                                                <img className="w-12 h-12" src={wallet.adapter.icon} alt={`icon ${wallet.adapter.name}`} srcSet="" />
                                                <Text className="font-semibold text-lg">{wallet.adapter.name}{' '}{wallet.readyState}</Text>
                                            </div>)
                                    }
                                    <Button onClick={closeModal} className="w-full mt-4 bg-transparent border-2 border-primary hover:bg-primary transition-all duration-200">Close</Button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};
