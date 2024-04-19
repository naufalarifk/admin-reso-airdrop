import { IcBitcoin, IcDiscord, IcDropdown, IcMedium, IcRoundAdd, IcTelegram, IcWeb, IcX } from "@/assets/icons";
import { Button, Input, PoolSteps, Text } from "@/components"
import { Dispatch, useState } from "react"
import { useTranslation } from "react-i18next";

interface ChildrenProps {
    step: number;
    setStep: Dispatch<React.SetStateAction<number>>
}

const FirstStep = ({ setStep, step }: ChildrenProps) => {

    const { t } = useTranslation()

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
            <Text className="font-semibold text-lg">{t('pool.firstStep.title')}</Text>
            <Text className="text-[#9F9F9F]">{t('pool.firstStep.subtitle')}</Text>
            <div className="mt-6 space-y-2">
                <Text className="text-[#9F9F9F]">{t('pool.firstStep.unifiedAsset')}</Text>
                <div className="bg-[#0E0F19] rounded-lg p-2 flex items-center space-x-2">
                    <Input placeholder="1" className="bg-transparent" />
                    <Button className="border border-[#F23F5D] bg-[#20131e] text-[#F23F5D] py-2 px-4 h-auto">{t('pool.firstStep.search')}</Button>
                </div>
            </div>
            <div className="mt-6 space-y-2">
                <Text className="text-[#9F9F9F]">{t('pool.firstStep.tokenInformation')}</Text>
                <div className="bg-[#0E0F19] rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                        <IcBitcoin />
                        <Text>BTC <span className="text-[#90A3BF]">Bitcoin</span></Text>
                    </div>
                    <Text className="text-[#90A3BF] my-1">Bitcoin is a digital asset and a payment system invented by Satoshi Nakamoto who published a related paper in 2008 and released it as open-source software in 2009. The system featured as peer-to-peer; users can transact directly without an intermediary.</Text>
                    <div className="p-4 grid grid-cols-3 bg-[#181924] rounded-lg mt-2 gap-4">
                        <div>
                            <Text>{t('pool.firstStep.ranking')}</Text>
                            <Text>#1</Text>
                        </div>
                        <div>
                            <Text>{t('pool.firstStep.blockExplorer')}</Text>
                            <Text>https://blockchair.com/bit</Text>
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
                </div>
            </div>
            <div className="mt-6 space-y-2">
                <div className="flex justify-between items-center">
                    <Text>{t('pool.firstStep.officialLinks')}</Text>
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
            <Button onClick={handleNextStep} className="w-full bg-[#F23F5D]">{t('pool.firstStep.continue')}</Button>
        </section>
    )
}


const SecondStep = ({ setStep, step }: ChildrenProps) => {
    const { t } = useTranslation()
    const handleNextStep = () => {
        if (step === 4) {
            setStep(1)
        } else {
            setStep(step + 1)
        }
    }
    return (
        <section className="bg-[#181924] mx-auto p-6 border-[0.5px] border-[#FFFFFF1A] w-full lg:w-3/4 min-w-sm rounded-xl space-y-4">
            <Text className="font-semibold text-lg">{t('pool.secondStep.title')}</Text>
            <Text className="text-[#9F9F9F]">{t('pool.secondStep.subtitle')}</Text>
            <div className="bg-[#0E0F19] rounded-lg px-4 py-6 space-y-4">
                <div className="flex items-center justify-between w-full">
                    <Text>{t('pool.secondStep.listingAmount')}</Text>
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
                        <Text>BTC {t('pool.secondStep.priceRate')} ({t('pool.secondStep.minimumListing')} ≈ 1 BTC)</Text>
                        <Text>1 BTC = 1 BTC</Text>
                    </div>
                    <hr className="h-[1px] border-t-[1px] border-[#FFFFFF1A]" />
                    <div className="flex items-center justify-between w-full">
                        <Text>Reso {t('pool.secondStep.priceRate')} ({t('pool.secondStep.minimumListing')} ≈ 1,000 RESO)</Text>
                        <Text>1,000 RESO = 1 BTC</Text>
                    </div>
                    <hr className="h-[1px] border-t-[1px] border-[#FFFFFF1A]" />
                    <div className="flex items-center justify-between w-full">
                        <Text>{t('pool.secondStep.listingFees')} :</Text>
                        <Text>1,000 RESO</Text>
                    </div>
                </div>
            </div>
            <Button onClick={handleNextStep} className="w-full bg-[#F23F5D]">{t('pool.secondStep.continue')}</Button>
        </section>
    )
}


const ThirdStep = ({ setStep, step }: ChildrenProps) => {

    const { t } = useTranslation()

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
            <Text className="font-semibold text-lg"></Text>
            <Text className="text-[#9F9F9F]"></Text>
            <div className="mt-6 space-y-2">
                <div className="bg-[#0E0F19] rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                        <IcBitcoin />
                        <Text>BTC <span className="text-[#90A3BF]">Bitcoin</span></Text>
                    </div>
                    <Text className="text-[#90A3BF] my-1">Bitcoin is a digital asset and a payment system invented by Satoshi Nakamoto who published a related paper in 2008 and released it as open-source software in 2009. The system featured as peer-to-peer; users can transact directly without an intermediary.</Text>
                    <div className="p-4 grid grid-cols-3 bg-[#181924] rounded-lg mt-2 gap-4">
                        <div>
                            <Text>{t('pool.thirdStep.ranking')}</Text>
                            <Text>#1</Text>
                        </div>
                        <div>
                            <Text>{t('pool.thirdStep.blockExplorer')}</Text>
                            <Text>https://blockchair.com/bit</Text>
                        </div>
                        <div>
                            <Text>{t('pool.thirdStep.marketCap')}</Text>
                            <Text>329.479.24 USD</Text>
                        </div>
                        <div>
                            <Text>{t('pool.thirdStep.liquidity')}</Text>
                            <Text>1,324</Text>
                        </div>
                        <div>
                            <Text>{t('pool.thirdStep.maxSupply')}</Text>
                            <Text>21,000,000</Text>
                        </div>
                        <div>
                            <Text>{t('pool.thirdStep.circulationSupply')}</Text>
                            <Text>19,670,743</Text>
                        </div>
                        <div>
                            <Text>{t('pool.thirdStep.historicalHigh')}</Text>
                            <Text>73,750.074 USD</Text>
                        </div>
                        <div>
                            <Text>{t('pool.thirdStep.historicalLow')}</Text>
                            <Text>0.049 USD</Text>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 space-y-2 bg-[#0E0F19] px-4 py-6 rounded-xl">
                <div className="flex items-center justify-between">
                    <Text>{t('pool.thirdStep.addLiquidity')}</Text>
                    <span className="flex items-center space-x-1"><IcBitcoin /><Text>BTC</Text></span>
                </div>
                <div className="flex items-center justify-between">
                    <Text>{t('pool.thirdStep.liquidityAmount')}</Text>
                    <Text>1</Text>
                </div>
                <hr className="my-2" />
                <div className="flex items-center justify-between">
                    <Text>{t('pool.thirdStep.listingFees')}</Text>
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
                <Button onClick={handleNextStep} className="w-full bg-[#F23F5D]">{t('pool.thirdStep.continue')}</Button>
                <Button onClick={handleNextStep} className="w-full bg-[#20232e]">{t('pool.thirdStep.cancel')}</Button>
            </div>
        </section>
    )
}



export const Pool = () => {
    const { t } = useTranslation()
    const [step, setStep] = useState(1)
    return (
        <main className="mx-auto w-[86vw] lg:w-[60vw] space-y-4">
            <Text className="font-semibold text-center text-xl lg:text-4xl">
                {t('pool.title.title')} <span className="text-[#F23F5D]">{t('pool.title.subtitle')}</span>
            </Text>
            <Text className="text-center text-sm lg:text-lg text-[#90A3BF]">{t('pool.subtitle.title')} <br /> {t('pool.subtitle.subtitle')}</Text>
            <PoolSteps active={step} />
            {
                step === 1 ? <FirstStep step={step} setStep={setStep} /> : step === 2 ? <SecondStep step={step} setStep={setStep} /> : <ThirdStep step={step} setStep={setStep} />
            }
        </main>
    )
}