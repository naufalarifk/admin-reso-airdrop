import { IcArrowUp, IcCheck, IcDivider, IcWallet, IcWarning } from "@/assets/icons"
import { IcBellRinging } from "@/assets/icons/IcBellRinging"
import { IcSparkle } from "@/assets/icons/IcSparkle"
import { Text, Button } from "@/components"
import { useState } from "react"
import type { Dispatch, SetStateAction } from "react"


interface AirdropState {
    connected: boolean
    setConnected: Dispatch<SetStateAction<boolean>>
}


const Connected = ({ connected, setConnected }: AirdropState) => {
    const [eligible, setEligible] = useState(false);
    const [claimingReady, setClaimingReady] = useState(false);
    return (
        <>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 shadow-lg space-y-2 hidden lg:block">
                <IcSparkle className=" p-2 bg-primary rounded-full h-8 w-8" />
                <IcDivider className="mx-auto" />
                <IcSparkle className=" p-2 bg-primary rounded-full h-8 w-8" />
                <IcDivider className="mx-auto" />
                <IcSparkle className=" p-2 bg-primary rounded-full h-8 w-8" />
                {/* <IcDivider className="mx-auto" />
                <IcGift className=" p-2 bg-black rounded-full h-8 w-8" /> */}
            </div>

            <div className="flex flex-col items-start space-y-4 w-full lg:w-3/5">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 shadow-lg flex justify-center space-x-1 items-center w-full">
                    <IcBellRinging />
                    <Text className="font-semibold text-soft">Season 1 rewards ended on March 1th, 2024</Text>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 shadow-lg h-full space-y-8 w-full">
                    <div className="space-y-4">
                        <Text className="text-2xl font-semibold">Connect Your Wallets</Text>
                        <Text className="text-soft">Connect one or more wallets to check their eligibility and $G3 tokens you will receive</Text>
                        <div className="bg-[#0E0F19] p-4 rounded-lg flex items-center space-x-2">
                            <img className="h-6 w-6 rounded-full" src="/images/user-photo.webp" alt="user-photo" srcSet="/images/user-photo.webp" />
                            <Text className="w-4/5 truncate">0x430Fe34EED7dAAf5785d528F287DACe4eCA4A5DB</Text>
                            <Button onClick={() => setConnected(!connected)} size={'sm'} className=" lg:block hidden py-0 px-6 text-soft bg-[#181a24] bg-gradient-to-r from-[rgba(93,99,111,0.10)] via-transparent to-[rgba(25,30,40,0.35)]">Disconnect</Button>
                        </div>
                        <Button onClick={() => setConnected(!connected)} size={'sm'} className=" lg:hidden block w-full py-0 px-6 text-soft bg-[#2f323c] bg-gradient-to-r from-[rgba(93,99,111,0.10)] via-transparent to-[rgba(25,30,40,0.35)]">Disconnect</Button>
                    </div>
                    {
                        eligible ? <>
                            <Button onClick={() => setEligible(!eligible)} size={"sm"} className="py-0 px-6 bg-opacity-40 text-[#33D49D] bg-[#33D49D] w-full gap-1"><IcCheck color="#33D49D" />{' '}Your are eligible for the airdrop</Button>
                            <div className="bg-[#0E0F19] p-4 rounded-lg">
                                {
                                    claimingReady ? <>
                                        <Button onClick={() => setClaimingReady(!claimingReady)} className="py-0 w-full">Claim Airdrop</Button>
                                        <Text className="text-center mt-4 text-[#33D49D]">You will be able to claim your tokens</Text>
                                    </> : <>
                                        <Button onClick={() => setClaimingReady(!claimingReady)} className="py-0 w-full bg-[#181a24] text-soft">Claim Airdrop</Button>
                                        <div className="items-center relative">
                                            <svg className="absolute -top-1 left-16" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M18.75 7.09125V3.75C18.75 3.35218 18.592 2.97064 18.3107 2.68934C18.0294 2.40804 17.6478 2.25 17.25 2.25H6.75C6.35218 2.25 5.97064 2.40804 5.68934 2.68934C5.40804 2.97064 5.25 3.35218 5.25 3.75V7.125C5.25051 7.35778 5.30495 7.58727 5.40905 7.79548C5.51315 8.00368 5.66408 8.18493 5.85 8.325L10.7503 12L5.85 15.675C5.66408 15.8151 5.51315 15.9963 5.40905 16.2045C5.30495 16.4127 5.25051 16.6422 5.25 16.875V20.25C5.25 20.6478 5.40804 21.0294 5.68934 21.3107C5.97064 21.592 6.35218 21.75 6.75 21.75H17.25C17.6478 21.75 18.0294 21.592 18.3107 21.3107C18.592 21.0294 18.75 20.6478 18.75 20.25V16.9088C18.7495 16.6769 18.6955 16.4482 18.5922 16.2406C18.489 16.033 18.3393 15.8519 18.1547 15.7116L13.2441 12L18.1547 8.2875C18.3393 8.14742 18.4891 7.96658 18.5924 7.75908C18.6957 7.55158 18.7496 7.32303 18.75 7.09125ZM6.75 3.75H17.25V7.09125L16.7091 7.5H7.24969L6.75 7.125V3.75ZM12 11.0625L9.25031 9H14.7253L12 11.0625ZM17.25 20.25H6.75V16.875L11.25 13.5V15.75C11.25 15.9489 11.329 16.1397 11.4697 16.2803C11.6103 16.421 11.8011 16.5 12 16.5C12.1989 16.5 12.3897 16.421 12.5303 16.2803C12.671 16.1397 12.75 15.9489 12.75 15.75V13.5075L17.25 16.9088V20.25Z" fill="#90A3BF" />
                                            </svg>
                                            <Text className="text-center mt-4 text-soft">CLAIMING STARTED IN : <span className="text-[#F23F5D]">129 Days - 16Hours 28Min 39Sec</span></Text>
                                        </div>
                                    </>
                                }
                            </div>
                        </> : <>
                            <div className="space-y-4">
                                <Text className="text-2xl font-semibold">First Transactions</Text>
                                <Text className="text-soft ">Connect one or more wallets to check their eligibility and $G3 tokens you will receive</Text>
                                <div className="bg-[#0E0F19] p-2 rounded-lg flex items-center space-x-2">
                                    <Text className="w-4/5">The existing account is not old enough, First transaction <span className="text-[#F23F5D]">03-03-2024</span></Text>
                                    <Button size={"sm"} className="py-0 px-6 bg-opacity-40 text-[#F23F5D]">Not Eligible</Button>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <Text className="text-2xl font-semibold">Volume DEX</Text>
                                <Text className="text-soft ">Connect one or more wallets to check their eligibility and $G3 tokens you will receive</Text>
                                <div className="bg-[#0E0F19] p-2 rounded-lg flex items-center space-x-2">
                                    <Text className="w-4/5">your dex account volume is less than the required limit, <br /> Volume <span className="text-[#F23F5D]">25SOL Solana</span></Text>
                                    <Button size={"sm"} className="py-0 px-6 bg-opacity-40 text-[#F23F5D]">Not Eligible</Button>
                                </div>
                            </div>
                            <Button onClick={() => setEligible(!eligible)} size={"sm"} className="py-0 px-6 bg-opacity-40 text-[#F23F5D] w-full"><IcWarning color="#F23F5D" />{' '}Your are not eligible for the airdrop</Button>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

const Disconnected = ({ connected, setConnected }: AirdropState) => {
    return (
        <>
            <div className="flex flex-col items-start space-y-4">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 shadow-lg h-full w-full space-y-3">
                    <Text className="text-2xl font-semibold">Check eligible your account</Text>
                    <Text className="text-soft">Connect your wallet so we can calculate your points based on your onchain activity with DeFi protocols and NFTs on other networks. Use your most active wallet for more points.</Text>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 shadow-lg flex justify-center space-x-1 items-center w-full">
                    <IcBellRinging />
                    <Text className="font-semibold text-soft">Season 1 rewards ended on March 1th, 2024</Text>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 shadow-lg h-full space-y-12 w-full">
                    <div className="space-y-4">
                        <Text className="text-2xl font-semibold">Connect Your Wallets</Text>
                        <Text className="text-soft">Connect one or more wallets to check their eligibility and $G3 tokens you will receive</Text>
                        <div className="bg-[#0E0F19] p-4 rounded-lg flex items-center space-x-2">
                            <IcWallet />
                            <Text className="w-4/5 text-soft">Connect Wallet</Text>
                        </div>
                        <Button onClick={() => setConnected(!connected)} className="py-0 w-full">Connect Wallet</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export const Airdrop = () => {

    const [connected, setConnected] = useState(false);


    return (
        <main className="layout lg:px-24 mx-auto max-w-7xl py-6">
            <Text className="text-center text-3xl font-semibold"><span className="text-primary">RECTOVERSO</span> New Airdrop has been released, <br />
                <span className="text-primary">Up to $35</span> Join Now</Text>
            {/* <Text className="text-soft text-lg text-center w-3/4 mx-auto my-5">The time has come to get rewarded for your effort and dedication in helping us build RESO DEX together. If you fit in the criteria of our $12.000 airdrop, check your eligibility to see how many $12.000 tokens you will receive. Good luck!</Text> */}
            <section className="flex lg:flex-row flex-col space-y-4 lg:space-y-0 lg:space-x-4 w-full mt-4">
                {
                    connected ? <Connected connected={connected} setConnected={setConnected} /> : <Disconnected connected={connected} setConnected={setConnected} />
                }
                <div className="flex flex-col items-start space-y-4 h-full w-full lg:w-2/5">
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 shadow-lg relative overflow-hidden h-60">
                        <Text className="font-semibold text-xl">Claim Your Airdrop Right now!</Text>
                        <Text className="text-soft">Login or create an account on GAM3S.GG, connect your wallet and check if you are eligible to the $G3 Airdrop!</Text>
                        <button className="bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 w-full shadow-lg flex items-center justify-center my-2"><Text className="text-soft font-semibold">Try Our Platform</Text><IcArrowUp color="#90A3BF" className="rotate-90" /></button>
                        <img className="absolute -z-20 left-0 right-0 mx-auto -bottom-28 h-60 w-60" src="/images/sol-airdrop.webp" alt="" srcSet="" />
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 shadow-lg relative overflow-hidden h-60">
                        <Text className="font-semibold text-xl">Claim Your Airdrop Right now!</Text>
                        <Text className="text-soft">Login or create an account on GAM3S.GG, connect your wallet and check if you are eligible to the $G3 Airdrop!</Text>
                        <img className="absolute -z-20 left-0 right-0 mx-auto -bottom-28 h-60 w-60" src="/images/eth-airdrop.webp" alt="" srcSet="" />
                    </div>
                </div>
            </section>
        </main>
    )
}