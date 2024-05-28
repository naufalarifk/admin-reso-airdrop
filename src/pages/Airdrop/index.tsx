import { IcArrowUp, IcCheck, IcDivider, IcGift, IcWallet } from "@/assets/icons"
import { IcBellRinging } from "@/assets/icons/IcBellRinging"
import { IcSparkle } from "@/assets/icons/IcSparkle"
import { Text, Button } from "@/components"


export const Airdrop = () => {
    return (
        <main className="layout px-24 mx-auto max-w-7xl py-6">
            <Text className="text-center text-3xl font-semibold">RESO DEX Cross-Chain <span className="text-primary">Airdrop</span></Text>
            <Text className="text-soft text-lg text-center w-3/4 mx-auto my-5">The time has come to get rewarded for your effort and dedication in helping us build RESO DEX together. If you fit in the criteria of our $12.000 airdrop, check your eligibility to see how many $12.000 tokens you will receive. Good luck!</Text>

            <section className="flex space-x-4 w-full">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 shadow-lg space-y-2">
                    <IcSparkle className=" p-2 bg-primary rounded-full h-8 w-8" />
                    <IcDivider className="mx-auto" />
                    <IcSparkle className=" p-2 bg-primary rounded-full h-8 w-8" />
                    <IcDivider className="mx-auto" />
                    <IcSparkle className=" p-2 bg-primary rounded-full h-8 w-8" />
                    <IcDivider className="mx-auto" />
                    <IcGift className=" p-2 bg-black rounded-full h-8 w-8" />
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 shadow-lg h-full space-y-12 w-3/5">
                    <div className="space-y-4">
                        <Text className="text-2xl font-semibold">Connect Your Wallets</Text>
                        <Text className="text-soft ">Connect one or more wallets to check their eligibility and $G3 tokens you will receive</Text>
                        <div className="bg-[#0E0F19] p-2 rounded-lg flex items-center space-x-2">
                            <IcWallet />
                            <Text className="w-4/5 text-soft">Connect Wallet</Text>
                            <Button size={"sm"} className="py-0">Connect Wallet</Button>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <Text className="text-2xl font-semibold">First Transactions</Text>
                        <Text className="text-soft ">Connect one or more wallets to check their eligibility and $G3 tokens you will receive</Text>
                        <div className="bg-[#0E0F19] p-2 rounded-lg flex items-center space-x-2">

                            <Text className="w-4/5 text-soft">Age DEX account</Text>
                            <Button size={"sm"} className="py-0 px-10">Status</Button>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <Text className="text-2xl font-semibold">Volume DEX</Text>
                        <Text className="text-soft ">Connect one or more wallets to check their eligibility and $G3 tokens you will receive</Text>
                        <div className="bg-[#0E0F19] p-2 rounded-lg flex items-center space-x-2">
                            <Text className="w-4/5 text-soft">Volume DEX transaction</Text>
                            <Button size={"sm"} className="py-0 px-10">Status</Button>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <Text className="text-2xl font-semibold">Claim Airdrop</Text>
                        <Text className="text-soft ">Connect one or more wallets to check their eligibility and $G3 tokens you will receive</Text>
                        <div className="bg-[#0E0F19] p-2 rounded-lg flex items-center space-x-2">
                            <Text className="w-4/5 text-soft">Claim your airdrop right now!</Text>
                            <Button size={"sm"} className="py-0 px-4"><IcCheck color="white" className="h-[16px] w-[16px]" /> Claim Airdrop</Button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start space-y-4">
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 shadow-lg flex justify-center space-x-1 items-center w-full">
                        <IcBellRinging />
                        <Text className="font-semibold text-soft">Season 1 rewards ended on March 1th, 2024</Text>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 shadow-lg relative h-60 overflow-hidden">
                        <Text className="font-semibold text-xl">Claim Your Airdrop Right now!</Text>
                        <Text className="text-soft">Login or create an account on GAM3S.GG, connect your wallet and check if you are eligible to the $G3 Airdrop!</Text>
                        <button className="bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 w-full shadow-lg flex items-center justify-center my-2"><Text className="text-soft font-semibold">Try Our Platform</Text><IcArrowUp color="#90A3BF" className="rotate-90" /></button>
                        <img className="absolute -z-20 left-0 right-0 mx-auto -bottom-28 h-60 w-60" src="/images/sol-airdrop.webp" alt="" srcSet="" />
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 shadow-lg relative h-48 overflow-hidden">
                        <Text className="font-semibold text-xl">Claim Your Airdrop Right now!</Text>
                        <Text className="text-soft">Login or create an account on GAM3S.GG, connect your wallet and check if you are eligible to the $G3 Airdrop!</Text>
                        <img className="absolute -z-20 left-0 right-0 mx-auto -bottom-28 h-60 w-60" src="/images/eth-airdrop.webp" alt="" srcSet="" />
                    </div>
                </div>
            </section>
        </main>
    )
}