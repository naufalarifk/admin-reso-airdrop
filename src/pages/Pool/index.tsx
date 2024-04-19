import { IcBitcoin, IcDiscord, IcDropdown, IcMedium, IcRoundAdd, IcTelegram, IcWeb, IcX } from "@/assets/icons";
import { Button, Input, PoolSteps, Text } from "@/components"
import { Dispatch, useState } from "react"

interface ChildrenProps {
    step: number;
    setStep: Dispatch<React.SetStateAction<number>>
}

const FirstStep = ({ setStep, step }: ChildrenProps) => {


    const official_links = [
        {
            name: "Official Website",
            link: "https://bitcoin.org/en/",
            icon: <IcWeb color="#F23F5D" />,
        },
        {
            name: "Official X",
            link: "https://bitcoin.org/en/",
            icon: <IcX />,
        },
        {
            name: "Official Telegram",
            link: "https://bitcoin.org/en/",
            icon: <IcTelegram color="#F23F5D" />,
        },
        {
            name: "Official Discord",
            link: "https://bitcoin.org/en/",
            icon: <IcDiscord className="h-6 w-6" color="#F23F5D" />,
        },
        {
            name: "Official Medium",
            link: "https://bitcoin.org/en/",
            icon: <IcMedium />,
        },
    ]

    const handleNextStep = () => {
        if (step === 4) {
            setStep(1)
        } else {
            setStep(step + 1)
        }
    }

    return (
        <section className="bg-[#181924] mx-auto p-6 border-[0.5px] border-[#FFFFFF1A] w-full lg:w-3/4 min-w-sm rounded-xl space-y-4">
            <Text className="font-semibold text-lg">Input Token Information</Text>
            <Text className="text-[#9F9F9F]">It`s important to fill information about your token</Text>
            <div className="mt-6 space-y-2">
                <Text className="text-[#9F9F9F]">The Unified Cryptoasset ID (UCID)</Text>
                <div className="bg-[#0E0F19] rounded-lg p-2 flex items-center space-x-2">
                    <Input placeholder="1" className="bg-transparent" />
                    <Button className="border border-[#F23F5D] bg-[#20131e] text-[#F23F5D] py-2 px-4 h-auto">Search</Button>
                </div>
            </div>
            <div className="mt-6 space-y-2">
                <Text className="text-[#9F9F9F]">Token Information</Text>
                <div className="bg-[#0E0F19] rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                        <IcBitcoin />
                        <Text>BTC <span className="text-[#90A3BF]">Bitcoin</span></Text>
                    </div>
                    <Text className="text-[#90A3BF] my-1">Bitcoin is a digital asset and a payment system invented by Satoshi Nakamoto who published a related paper in 2008 and released it as open-source software in 2009. The system featured as peer-to-peer; users can transact directly without an intermediary.</Text>
                    <div className="p-4 grid grid-cols-3 bg-[#181924] rounded-lg mt-2 gap-4">
                        <div>
                            <Text>Ranking</Text>
                            <Text>#1</Text>
                        </div>
                        <div>
                            <Text>Block Explorer</Text>
                            <Text>https://blockchair.com/bit</Text>
                        </div>
                        <div>
                            <Text>Market Cap</Text>
                            <Text>329.479.24 USD</Text>
                        </div>
                        <div>
                            <Text>Liquidity</Text>
                            <Text>1,324</Text>
                        </div>
                        <div>
                            <Text>Max Supply</Text>
                            <Text>21,000,000</Text>
                        </div>
                        <div>
                            <Text>Circulation Supply</Text>
                            <Text>19,670,743</Text>
                        </div>
                        <div>
                            <Text>Historical High</Text>
                            <Text>73,750.074 USD</Text>
                        </div>
                        <div>
                            <Text>Historical Low</Text>
                            <Text>0.049 USD</Text>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 space-y-2">
                <div className="flex justify-between items-center">
                    <Text>Official Links</Text>
                    <IcRoundAdd />
                </div>
                {
                    official_links.map(item =>
                        <div className="flex justify-between bg-[#0E0F19] p-2  items-center rounded-xl">
                            <div className="flex space-x-2 items-center">
                                <>{item.icon}</>
                                <Text>{item.name}</Text>
                                <IcDropdown />
                            </div>
                            <Text>{item.link}</Text>
                        </div>)
                }
            </div>
            <Button onClick={handleNextStep} className="w-full bg-[#F23F5D]">Continue</Button>
        </section>
    )
}


const SecondStep = ({ setStep, step }: ChildrenProps) => {
    const handleNextStep = () => {
        if (step === 4) {
            setStep(1)
        } else {
            setStep(step + 1)
        }
    }
    return (
        <section className="bg-[#181924] mx-auto p-6 border-[0.5px] border-[#FFFFFF1A] w-full lg:w-3/4 min-w-sm rounded-xl space-y-4">
            <Text className="font-semibold text-lg">Input Amount</Text>
            <Text className="text-[#9F9F9F]">Set amount of token for liquidity pool</Text>
            <div className="bg-[#0E0F19] rounded-lg px-4 py-6 space-y-4">
                <div className="flex items-center justify-between w-full">
                    <Text>Listing Amount</Text>
                    <Text>Balance : 121.42351331 BTC</Text>
                </div>
                <div className="flex items-center justify-between w-full">
                    <span className="flex space-x-2 items-center"><IcBitcoin /><Text>BTC (Bitcoin)</Text></span>
                    <Text>1</Text>
                </div>
                <hr className="my-4 h-[0.5px] border-t-[0.5px] border-[#FFFFFF1A]" />
                <div className="flex items-center justify-between w-full">
                    <span className="flex space-x-2 items-center"><IcBitcoin /><Text>Reso (Rectoverso)</Text><IcDropdown /></span>
                    <Text>1000</Text>
                </div>
                <hr className="h-[0.5px] border-t-[0.5px] border-[#FFFFFF1A]" />
                <div className="space-y-1">
                    <div className="flex items-center justify-between w-full">
                        <Text>BTC price rate (Minimum listing ≈ 1 BTC)</Text>
                        <Text>1 BTC = 1 BTC</Text>
                    </div>
                    <hr className="h-[1px] border-t-[1px] border-[#FFFFFF1A]" />
                    <div className="flex items-center justify-between w-full">
                        <Text>Reso price rate (Minimum listing ≈ 1,000 RESO)</Text>
                        <Text>1,000 RESO = 1 BTC</Text>
                    </div>
                    <hr className="h-[1px] border-t-[1px] border-[#FFFFFF1A]" />
                    <div className="flex items-center justify-between w-full">
                        <Text>Listing fees :</Text>
                        <Text>1,000 RESO</Text>
                    </div>
                </div>
            </div>
            <Button onClick={handleNextStep} className="w-full bg-[#F23F5D]">Continue</Button>
        </section>
    )
}


const ThirdStep = ({ setStep, step }: ChildrenProps) => {


    const official_links = [
        {
            name: "Official Website",
            link: "https://bitcoin.org/en/",
            icon: <IcWeb color="#F23F5D" />,
        },
        {
            name: "Official X",
            link: "https://bitcoin.org/en/",
            icon: <IcX />,
        },
        {
            name: "Official Telegram",
            link: "https://bitcoin.org/en/",
            icon: <IcTelegram color="#F23F5D" />,
        },
        {
            name: "Official Discord",
            link: "https://bitcoin.org/en/",
            icon: <IcDiscord className="h-6 w-6" color="#F23F5D" />,
        },
        {
            name: "Official Medium",
            link: "https://bitcoin.org/en/",
            icon: <IcMedium />,
        },
    ]

    const handleNextStep = () => {
        if (step === 3) {
            setStep(1)
        } else {
            setStep(step + 1)
        }
    }

    return (
        <section className="bg-[#181924] mx-auto p-6 border-[0.5px] border-[#FFFFFF1A] w-full lg:w-3/4 min-w-sm rounded-xl space-y-4">
            <Text className="font-semibold text-lg">Liquidity Confirmation</Text>
            <Text className="text-[#9F9F9F]">Confirm your liquidity pool</Text>
            <div className="mt-6 space-y-2">
                <div className="bg-[#0E0F19] rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                        <IcBitcoin />
                        <Text>BTC <span className="text-[#90A3BF]">Bitcoin</span></Text>
                    </div>
                    <Text className="text-[#90A3BF] my-1">Bitcoin is a digital asset and a payment system invented by Satoshi Nakamoto who published a related paper in 2008 and released it as open-source software in 2009. The system featured as peer-to-peer; users can transact directly without an intermediary.</Text>
                    <div className="p-4 grid grid-cols-3 bg-[#181924] rounded-lg mt-2 gap-4">
                        <div>
                            <Text>Ranking</Text>
                            <Text>#1</Text>
                        </div>
                        <div>
                            <Text>Block Explorer</Text>
                            <Text>https://blockchair.com/bit</Text>
                        </div>
                        <div>
                            <Text>Market Cap</Text>
                            <Text>329.479.24 USD</Text>
                        </div>
                        <div>
                            <Text>Liquidity</Text>
                            <Text>1,324</Text>
                        </div>
                        <div>
                            <Text>Max Supply</Text>
                            <Text>21,000,000</Text>
                        </div>
                        <div>
                            <Text>Circulation Supply</Text>
                            <Text>19,670,743</Text>
                        </div>
                        <div>
                            <Text>Historical High</Text>
                            <Text>73,750.074 USD</Text>
                        </div>
                        <div>
                            <Text>Historical Low</Text>
                            <Text>0.049 USD</Text>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 space-y-2 bg-[#0E0F19] px-4 py-6 rounded-xl">
                <div className="flex items-center justify-between">
                    <Text>Add Liquidity</Text>
                    <span className="flex items-center space-x-1"><IcBitcoin /><Text>BTC</Text></span>
                </div>
                <div className="flex items-center justify-between">
                    <Text>Liquidity Amount</Text>
                    <Text>1</Text>
                </div>
                <hr className="my-2" />
                <div className="flex items-center justify-between">
                    <Text>Listing Fees</Text>
                    <Text>1,000 RESO</Text>
                </div>
                {
                    official_links.map(item =>
                        <div className="flex justify-between bg-[#0E0F19] p-2  items-center rounded-xl">
                            <div className="flex space-x-2 items-center">
                                <>{item.icon}</>
                                <Text>{item.name}</Text>
                                <IcDropdown />
                            </div>
                            <Text>{item.link}</Text>
                        </div>)
                }
            </div>
            <div className="flex space-x-1">
                <Button onClick={handleNextStep} className="w-full bg-[#F23F5D]">Continue</Button>
                <Button onClick={handleNextStep} className="w-full bg-[#20232e]">Cancel</Button>
            </div>
        </section>
    )
}



export const Pool = () => {
    const [step, setStep] = useState(1)
    return (
        <main className="mx-auto w-[86vw] lg:w-[60vw] space-y-4">
            <Text className="font-semibold text-center text-xl lg:text-4xl">
                Introducing the Newest Crypto Listings on <span className="text-[#F23F5D]">Rectoverso`s Pool</span>
            </Text>
            <Text className="text-center text-sm lg:text-lg text-[#90A3BF]">Dive into the latest pool of cryptocurrencies now available on Rectoverso! <br /> Stay ahead of the curve with Rectoverso's dynamic crypto marketplace</Text>
            <PoolSteps active={step} />
            {
                step === 1 ? <FirstStep step={step} setStep={setStep} /> : step === 2 ? <SecondStep step={step} setStep={setStep} /> : <ThirdStep step={step} setStep={setStep} />
            }
        </main>
    )
}