
import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useState } from "react";
import {
    Connection, LAMPORTS_PER_SOL,
    // clusterApiUrl
} from "@solana/web3.js";
import { Avatar } from "@/components/atoms";
import { cn, formatAddress } from "@/utils";
import { useAppDispatch } from "@/store";
import { deleteAuthUser } from "@/store/features/private";



interface ButtonConnectSolanaProps {
    className?: string;
    handleButton: () => void;
}

export const ButtonConnectSolana = ({
    handleButton,
    className
}: ButtonConnectSolanaProps) => {
    const dispatch = useAppDispatch()
    const [balance, setBalance] = useState(0)
    const {
        publicKey,
        disconnect,
        connecting,
        connected,
    } = useWallet();



    console.log('balance', balance)
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

    const logout = useCallback(() => {
        disconnect();
        dispatch(deleteAuthUser())
    }, [disconnect, dispatch])

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
                            onClick={handleButton}
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
                            onClick={() => logout()}
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