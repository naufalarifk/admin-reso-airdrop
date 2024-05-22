import { IcDiscord, IcDropdown, IcMedium, IcPending, IcQuestionMark, IcRoundAdd, IcTelegram, IcWeb, IcX } from "@/assets/icons";
import { Button, Input, PoolSteps, Text } from "@/components"
import { Dispatch, useState } from "react"
import { useTranslation } from "react-i18next";

interface ChildrenProps {
    step: number;
    setStep: Dispatch<React.SetStateAction<number>>
}

const FirstStep = ({ setStep, step }: ChildrenProps) => {

    const { t } = useTranslation();
    const [showToken, setShowToken] = useState(false);
    const [currentType, setCurrentType] = useState('cmc')

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
            setStep(3)
        }
    }

    return (
        <section className="bg-[#181924] mx-auto p-6 border-[0.5px] border-[#FFFFFF1A] w-full lg:w-3/4 min-w-sm rounded-xl space-y-4">
            <Text className="font-semibold text-lg">{t('pool.firstStep.title')}</Text>
            <Text className="text-[#90A3BF]">{t('pool.firstStep.subtitle')}</Text>
            <div className="flex justify-between">
                <div className="flex space-x-2 w-2/3">
                    <Button onClick={() => setCurrentType('cmc')} className={`${currentType === 'cmc' ? 'bg-[#F23F5D]' : 'bg-[#0E0F19]'}  lg:px-4 lg:py-[6px] rounded-[4px] h-8 text-xs`}>CMC Based</Button>
                    <Button onClick={() => setCurrentType('custom')} className={`${currentType === 'custom' ? 'bg-[#F23F5D]' : 'bg-[#0E0F19]'}  lg:px-4 lg:py-[6px] rounded-[4px] h-8 text-xs`}>Custom</Button>
                </div>
                <Button className="bg-[#0E0F19] text-[#90A3BF] px-4 py-[6px] rounded-[4px] h-8 w-1/3">My Listing</Button>
            </div>
            {
                currentType === 'cmc' &&
                <>
                    <div className="mt-6 space-y-2">
                        <div className="flex space-x-1">
                            <Text className="text-white">{t('pool.firstStep.unifiedAsset')}</Text>
                            <IcQuestionMark />
                        </div>
                        <div className="bg-[#0E0F19] rounded-lg p-2 flex items-center space-x-2">
                            <Input placeholder="Input your token UCID from CMC" className="bg-transparent" />
                            <Button onClick={() => setShowToken(!showToken)} className="border border-[#F23F5D] bg-[#20131e] text-[#F23F5D] py-2 px-4 h-auto">{t('pool.firstStep.search')}</Button>
                        </div>
                    </div>
                    {
                        showToken &&

                        <>
                            <div className="mt-6 space-y-2">
                                <Text className="text-[#9F9F9F]">{t('pool.firstStep.tokenInformation')}</Text>
                                <div className="bg-[#0E0F19] rounded-lg p-4">
                                    <div className="flex items-center space-x-2">
                                        <img src="/images/sol.png" height={32} width={32} />
                                        <Text>SOL <span className="text-[#90A3BF]">Solana</span></Text>
                                    </div>
                                    <Text className="text-[#90A3BF] my-1">Bitcoin is a digital asset and a payment system invented by Satoshi Nakamoto who published a related paper in 2008 and released it as open-source software in 2009. The system featured as peer-to-peer; users can transact directly without an intermediary.</Text>
                                    <div className="p-4 flex flex-col lg:grid lg:grid-cols-3 bg-[#181924] rounded-lg mt-2 gap-4">
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
                        </>
                    }
                </>
            }
            {
                currentType === 'custom' &&
                <div className="space-y-3">
                    <Text className="text-[#90A3BF] text-sm font-semibold">Ticker Name</Text>
                    <div className="bg-[#0E0F19] rounded-lg p-2 flex items-center space-x-2">
                        <Input placeholder="HSC" className="bg-transparent placeholder:text-white" />
                        <Button onClick={() => setShowToken(!showToken)} className="border border-[#33D49D] bg-[#111f25] text-[#33D49D] py-2 px-4 h-auto">Available</Button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="w-[45%]">
                            <Text className="text-[#90A3BF] text-sm font-semibold">Token Name</Text>
                            <div className="bg-[#0E0F19] rounded-lg p-2 flex items-center space-x-2">
                                <Input placeholder="Input token name" className="bg-transparent placeholder:text-white" />
                            </div>
                        </div>
                        <div className="w-[45%]">
                            <Text className="text-[#90A3BF] text-sm font-semibold">Token Icon</Text>
                            <div className="bg-[#0E0F19] rounded-lg p-2 flex items-center space-x-2">
                                <Input placeholder="Input picture" className="bg-transparent placeholder:text-white" />
                                <Button onClick={() => setShowToken(!showToken)} className="border border-[#F23F5D] bg-[#20131e] text-[#F23F5D] py-2 px-4 h-auto">Upload</Button>
                            </div>
                        </div>
                    </div>
                    <Text className="text-[#90A3BF] text-sm font-semibold">Block Explorer</Text>
                    <div className="bg-[#0E0F19] rounded-lg p-2 flex items-center space-x-2">
                        <Input placeholder="Input block explorer" className="bg-transparent placeholder:text-white" />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="w-[45%]">
                            <Text className="text-[#90A3BF] text-sm font-semibold">Max Supply</Text>
                            <div className="bg-[#0E0F19] rounded-lg p-2 flex items-center space-x-2">
                                <Input placeholder="Input max supply" className="bg-transparent placeholder:text-white" />
                            </div>
                        </div>
                        <div className="w-[45%]">
                            <Text className="text-[#90A3BF] text-sm font-semibold">Circulation Supply</Text>
                            <div className="bg-[#0E0F19] rounded-lg p-2 flex items-center space-x-2">
                                <Input placeholder="Input circulation supply" className="bg-transparent placeholder:text-white" />
                            </div>
                        </div>
                    </div>
                    <Text className="text-[#90A3BF] text-sm font-semibold">Precision</Text>
                    <div className="bg-[#0E0F19] rounded-lg p-2 flex items-center space-x-2">
                        <Input placeholder="Input precision" className="bg-transparent placeholder:text-white" />
                    </div>
                    <Text className="text-[#90A3BF] text-sm font-semibold">Contract Address</Text>
                    <div className="bg-[#0E0F19] rounded-lg p-2 flex items-center space-x-2">
                        <Input placeholder="Input contact address" className="bg-transparent placeholder:text-white" />
                    </div>
                    <Text className="text-[#90A3BF] text-sm font-semibold">Description</Text>
                    <div className="bg-[#0E0F19] rounded-lg p-2 flex items-center space-x-2">
                        <Input placeholder="Input description" className="bg-transparent placeholder:text-white" />
                    </div>
                    <Button onClick={handleNextStep} className="w-full bg-[#F23F5D]">{t('pool.firstStep.continue')}</Button>
                </div>

            }
        </section>
    )
}

const FinalStep = ({ setStep, step }: ChildrenProps) => {

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
            <Text className="font-semibold text-lg"></Text>
            <Text className="text-[#9F9F9F]"></Text>
            <div className="mt-6 space-y-2">
                <div className="bg-[#0E0F19] rounded-lg p-4">
                    <div className="block lg:flex lg:justify-between items-center">
                        <div className="flex items-center space-x-2">
                            {/* <IcBitcoin /> */}
                            <img src="/images/sol.png" height={32} width={32} />
                            <Text>SOL <span className="text-[#90A3BF]">Solana</span></Text>
                        </div>
                        <div className="flex space-x-2 mt-2 lg:mt-0">{
                            official_links.map(link => <div className="rounded-full p-2 bg-[#181924]">{link.icon}</div>)
                        }</div>
                    </div>
                    <Text className="text-[#90A3BF] my-1">Solana is a blockchain platform which uses a proof-of-stake mechanism to provide smart contract functionality. Its native cryptocurrency is SOL.</Text>
                    <div className="p-4 lg:grid lg:grid-cols-3 flex flex-col bg-[#181924] rounded-lg mt-2 gap-4">
                        <div>
                            <Text>{t('pool.thirdStep.ranking')}</Text>
                            <Text>#1</Text>
                        </div>
                        <div>
                            <Text>{t('pool.thirdStep.blockExplorer')}</Text>
                            <Text>https://blockchair.com/sol</Text>
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
            <div>
                <div className="flex space-x-1 items-center">
                    <Text className="text-[#90A3BF] text-sm font-semibold">Token Price</Text>
                    <IcQuestionMark />
                </div>
                <div className="bg-[#0E0F19] p-3 rounded-2xl mt-2 flex space-x-2 items-center">
                    <div className="flex items-center space-x-2 w-3/5">
                        <img
                            src="/images/reso.png"
                            className="cursor-pointer w-7 relative h-7 z-[999]"
                            alt=""
                        />
                        <Text>RESO (Rectoverso)</Text>
                        <IcDropdown />
                    </div>
                    <Input className="bg-transparent" placeholder="Input token price" />
                    <Text className="text-[#90A3BF]">RESO</Text>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <Text className="text-[#9F9F9F]">Available Balance</Text>
                    <Text>1,000 RESO</Text>
                </div>
            </div>
            <div>
                <div className="flex justify-between items-center">
                    <div className="flex space-x-1 items-center">
                        <Text className="text-[#90A3BF] text-sm font-semibold">Listing Fee</Text>
                        <IcQuestionMark />
                    </div>
                    <div className="flex space-x-1 items-center">
                        <IcPending />
                        <Text>Waiting</Text>
                    </div>
                </div>
                <div className="bg-[#0E0F19] p-3 rounded-2xl mt-2 flex space-x-2 items-center justify-between">
                    <Text>1000</Text>
                    <div className="flex space-x-3 items-center">
                        <Text className="text-[#90A3BF] font-semibold">RESO</Text>
                        <Button className="border border-[#F23F5D] bg-[#20131e] text-[#F23F5D] py-2 px-4 h-auto">Pay</Button>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex justify-between items-center">
                    <div className="flex space-x-1 items-center">
                        <Text className="text-[#90A3BF] text-sm font-semibold">Buy order</Text>
                        <IcQuestionMark />
                    </div>
                    <div className="flex space-x-1 items-center">
                        <IcPending />
                        <Text>Waiting</Text>
                    </div>
                </div>
                <div className="bg-[#0E0F19] p-3 rounded-2xl mt-2 flex space-x-2 items-center justify-between">
                    <Input className="bg-transparent" placeholder="Input buy order" />
                    <div className="flex space-x-3 items-center">
                        <Text className="text-[#90A3BF] font-semibold">RESO</Text>
                        <Button className="border border-[#F23F5D] bg-[#20131e] text-[#F23F5D] py-2 px-4 h-auto">Add</Button>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <Text className="text-[#9F9F9F]">Available Balance</Text>
                    <Text>1,000 RESO</Text>
                </div>
            </div>
            <div>
                <div className="flex justify-between items-center">
                    <div className="flex space-x-1 items-center">
                        <Text className="text-[#90A3BF] text-sm font-semibold">Sell Order</Text>
                        <IcQuestionMark />
                    </div>
                    <div className="flex space-x-1 items-center">
                        <IcPending />
                        <Text>Waiting</Text>
                    </div>
                </div>
                <div className="bg-[#0E0F19] p-3 rounded-2xl mt-2 flex space-x-2 items-center justify-between">
                    <Input className="bg-transparent" placeholder="Input sell order" />
                    <div className="flex space-x-3 items-center">
                        <Text className="text-[#90A3BF] font-semibold">BTC</Text>
                        <Button className="border border-[#F23F5D] bg-[#20131e] text-[#F23F5D] py-2 px-4 h-auto">Add</Button>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <Text className="text-[#9F9F9F]">Available Balance</Text>
                    <Text>50 BTC</Text>
                </div>
            </div>
            <div className="flex space-x-1">
                <Button onClick={handleNextStep} className="w-full bg-[#F23F5D]">List your coin</Button>
                <Button onClick={handleNextStep} className="w-full bg-[#20232e]">{t('pool.thirdStep.cancel')}</Button>
            </div>
        </section>
    )
}




const Confirmation = ({ setStep, step }: ChildrenProps) => {
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
            <div className="flex items-center space-x-3">
                <div className="border border-[#F23F5D] bg-[#20131e] text-[#F23F5D] p-2 rounded-lg h-auto">
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="icon-park:left">
                            <path id="Vector" d="M15 18.5L9 12.5L15 6.5" stroke="#F23F5D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                    </svg>
                </div>
                <Text className="text-xl font-semibold">My Listing</Text>
            </div>
            <div className="mt-6 space-y-2">
                <div className="bg-[#0E0F19] rounded-lg p-4">
                    <div className="block lg:flex lg:justify-between items-center">
                        <div className="flex items-center space-x-2">
                            {/* <IcBitcoin /> */}
                            <img src="/images/sol.png" height={32} width={32} />
                            <Text>SOL <span className="text-[#90A3BF]">Solana</span></Text>
                        </div>
                        <div className="flex space-x-2 mt-2 lg:mt-0">{
                            official_links.map(link => <div className="rounded-full p-2 bg-[#181924]">{link.icon}</div>)
                        }</div>
                    </div>
                    <Text className="text-[#90A3BF] my-1">Solana is a blockchain platform which uses a proof-of-stake mechanism to provide smart contract functionality. Its native cryptocurrency is SOL.</Text>
                    <div className="p-4 lg:grid lg:grid-cols-3 flex flex-col bg-[#181924] rounded-lg mt-2 gap-4">
                        <div>
                            <Text>{t('pool.thirdStep.ranking')}</Text>
                            <Text>#1</Text>
                        </div>
                        <div>
                            <Text>{t('pool.thirdStep.blockExplorer')}</Text>
                            <Text>https://blockchair.com/sol</Text>
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
                            <Text>Margin Order</Text>
                            <Text>5%</Text>
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
            <Button onClick={handleNextStep} className="w-full bg-[#F23F5D]">Continue</Button>
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
                step === 1 ? <FirstStep step={step} setStep={setStep} /> : step === 2 ? <FinalStep step={step} setStep={setStep} /> : <Confirmation step={step} setStep={setStep} />
            }
        </main>
    )
}