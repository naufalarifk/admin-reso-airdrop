
import base58 from "bs58";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useState } from "react";
import {
    Connection, LAMPORTS_PER_SOL,
    // clusterApiUrl
} from "@solana/web3.js";
import { Avatar } from "@/components/atoms";
import { cn, formatAddress } from "@/utils";
import type { WalletName } from "@solana/wallet-adapter-base";


export const ButtonConnectSolana = ({ className }: { className?: string }) => {
    const [signature, setSignature] = useState("");
    const [balance, setBalance] = useState(0)

    const {
        select,
        publicKey,
        disconnect,
        connecting,
        connected,
        signMessage,
    } = useWallet();


    async function sign() {
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
    }

    console.log('signature', signature)
    console.log('balance', balance)
    const connectWallet = async () => {
        try {
            await new Promise<void>((resolve) => {
                select('Phantom' as WalletName);
                resolve();
            });
            await sign();
        } catch (error) {
            console.error('Failed to connect wallet:', error);
        }
    };


    const addressSubmittedHandler = useCallback(async () => {
        // const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const connection = new Connection('https://mainnet.helius-rpc.com/?api-key=a08ac874-474c-481c-86ab-31b79dac1a15')
        try {
            const balance = await connection.getBalance(publicKey!);
            setBalance(balance / LAMPORTS_PER_SOL);
        } catch (error) {
            setBalance(100);
            alert(error);
        }
    }, [publicKey]);

    useEffect(() => {
        if (publicKey) {
            addressSubmittedHandler();
        }
    }, [addressSubmittedHandler, publicKey]);

    return (
        <>
            {
                !connected ?
                    <>
                        <button
                            onClick={() => connectWallet()}
                            className={cn(
                                `inline-flex items-center gap-x-2 rounded-full border border-transparent bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-black/80 disabled:pointer-events-none disabled:opacity-50`,
                                className,
                            )}>
                            {connecting ? 'Connecting ...' : 'Connect Wallet'}
                        </button>
                    </>
                    :
                    <>
                        <button
                            onClick={disconnect}
                            className={cn(
                                'inline-flex items-center gap-x-3 rounded-full border-2 border-dark/10 bg-dark p-1 px-2 text-sm font-semibold shadow-sm hover:bg-black/10 active:bg-black/10 disabled:pointer-events-none disabled:opacity-50',
                                className,
                            )}>
                            <Avatar
                                className="h-8 w-8"
                                address={publicKey?.toBase58() ?? ''}
                            />
                            <span>{formatAddress(publicKey?.toBase58() ?? '')}</span>
                        </button>
                    </>
            }
        </>
    )
}