import { IcBitcoin, IcCheck, IcCopy, IcSwapHorizontal } from "@/assets/icons"
import { BridgeInput, BridgeSteps, Button, Input, Text } from "@/components"
import { Dispatch, useState } from "react"
import { useTranslation } from "react-i18next";


interface ChildrenProps {
    step: number;
    setStep: Dispatch<React.SetStateAction<number>>
}


const FirstStep = ({ setStep, step }: ChildrenProps) => {
    const { t } = useTranslation();
    const handleNextStep = () => {
        if (step === 4) {
            setStep(1)
        } else {
            setStep(step + 1)
        }
    }

    return (
        <section className="bg-[#181924] mx-auto p-6 border-[0.5px] border-[#FFFFFF1A] w-full lg:w-3/4 min-w-sm rounded-xl space-y-4">
            <Text className="font-semibold text-lg">{t('bridge.firstStep.title')}</Text>
            <Text className="text-[#9F9F9F]">{t('bridge.firstStep.subtitle')}</Text>
            <div className="mt-6 space-y-2">
                <Text className="text-[#9F9F9F]">{t('bridge.firstStep.label')}</Text>
                <BridgeInput />
                <div className="p-1 rounded-full z-10">
                    <div className="bg-[#181924] rounded-full mx-auto border-4 border-[#0E0F19] w-10 h-10 grid place-items-center">
                        <IcSwapHorizontal height="24" width="24" color="#F23F5D" />
                    </div>
                </div>
                <Text className="text-[#9F9F9F]">{t('bridge.firstStep.label')}</Text>
                <BridgeInput />
            </div>
            <div className="bg-[#0E0F19] p-4 border-[0.5px] border-[#FFFFFF1A] w-full min-w-sm rounded-xl bg-card-background">
                <div className="flex justify-between items-center">
                    <Text className="text-[#9F9F9F]">{t('bridge.firstStep.minimumReceived')} : </Text>
                    <Text>0.00</Text>
                </div>
                <div className="flex justify-between items-center">
                    <Text className="text-[#9F9F9F]">{t('bridge.firstStep.networkFees')} : </Text>
                    <Text>0.00</Text>
                </div>
            </div>
            <Input placeholder={t('bridge.firstStep.placeholder')} className="p-2 bg-[#0E0F19]" />
            <Button onClick={handleNextStep} className="w-full bg-[#F23F5D]">{t('bridge.firstStep.continue')}</Button>
        </section>
    )
}


const SecondStep = ({ setStep, step }: ChildrenProps) => {
    const { t } = useTranslation();

    const handleNextStep = () => {
        if (step === 4) {
            setStep(1)
        } else {
            setStep(step + 1)
        }
    }

    return (
        <section className="bg-[#181924] mx-auto p-6 border-[0.5px] border-[#FFFFFF1A] w-full lg:w-3/4 min-w-sm rounded-xl space-y-4">
            <Text className="font-semibold text-lg">{t("bridge.secondStep.title")}</Text>
            <Text className="text-[#9F9F9F]">{t("bridge.secondStep.subtitle")}</Text>
            <div className="mt-6 space-y-2">
                <Text className="text-[#9F9F9F]">{t('bridge.secondStep.label')}</Text>
                <BridgeInput val="0.000823" />
                <div className="p-1 rounded-full z-10">
                    <div className="bg-[#181924] rounded-full mx-auto border-4 border-[#0E0F19] w-10 h-10 grid place-items-center">
                        <IcSwapHorizontal height="24" width="24" color="#F23F5D" />
                    </div>
                </div>
                <Text className="text-[#9F9F9F]">{t('bridge.secondStep.label')}</Text>
                <BridgeInput val="0.000823" />
            </div>
            <div className="bg-[#0E0F19] p-4 border-[0.5px] border-[#FFFFFF1A] w-full min-w-sm rounded-xl">
                <div className="flex justify-between items-center">
                    <Text className="text-[#9F9F9F]">{t('bridge.secondStep.minimumReceived')} : </Text>
                    <Text>0.000823</Text>
                </div>
                <div className="flex justify-between items-center">
                    <Text className="text-[#9F9F9F]">{t('bridge.secondStep.networkFees')} : </Text>
                    <Text>0.000823</Text>
                </div>
            </div>
            <Input value='bc1q3j69cnwn79nh009rwkywknmncfde98v54uwu49' disabled placeholder="Enter your wallet address" className="p-2 bg-[#0E0F19]" />
            <Button onClick={handleNextStep} className="w-full bg-[#F23F5D]">{t('bridge.secondStep.bridge')}</Button>
        </section>
    )
}


const ThirdStep = ({ setStep, step }: ChildrenProps) => {
    const { t } = useTranslation();

    const styles = {
        borderBottom: `0.5px solid rgba(255, 255, 255, 0.20)`,
        background: `var(--COLOR-COLOR, linear-gradient(236deg, rgba(93, 99, 111, 0.10) 1.26%, rgba(25, 30, 40, 0.35) 100%))`,
        backdropFilter: `blur(12px)`,
    };
    const handleNextStep = () => {
        if (step === 4) {
            setStep(1)
        } else {
            setStep(step + 1)
        }
    }
    return (
        <section className="bg-[#181924] mx-auto p-6 border-[0.5px] border-[#FFFFFF1A] w-full lg:w-3/4 min-w-sm rounded-xl space-y-4">
            <Text className="font-semibold text-lg">{t('bridge.thirdStep.title')}</Text>
            <Text className="text-[#9F9F9F]">{t('bridge.thirdStep.subtitle')}</Text>
            <div className="flex lg:flex-row flex-col w-full space-y-3 lg:space-x-3">
                <div style={styles} className="py-6 px-4 bg-[#1f1d20] rounded-xl">
                    <img src="/images/qr-code.png" className="mx-auto" />
                </div>
                <div style={styles} className="py-6 px-4 rounded-xl w-full">
                    <div className="flex justify-between items-center"><Text className="text-[#9F9F9F]">{t('bridge.thirdStep.bridge')}</Text>
                        <div className="flex space-x-1">
                            <IcBitcoin width="24" height="23" />
                            <Text>BTC - BTC</Text>
                            <IcBitcoin width="24" height="23" />
                        </div>
                    </div>

                    <div className="flex justify-between items-center my-2"><Text className="text-[#9F9F9F]">{t('bridge.thirdStep.sendToken')}</Text><Text>0.000823</Text></div>
                    <div className="flex justify-between items-center my-2"><Text className="text-[#9F9F9F]">{t('bridge.thirdStep.receiveToken')}</Text><Text>0.000823</Text></div>
                    <div className="flex justify-between items-center my-2 border-t-[0.5px] border-b-[0.5px] py-2"><Text className="text-[#9F9F9F]">{t('bridge.thirdStep.destinationAddress')} :</Text><div className="flex items-center space-x-1"><Text className="truncate">bc1q3j69cnwn...</Text><IcCopy /></div></div>
                    <div className="flex justify-between items-center my-2"><Text className="text-[#9F9F9F]">{t('bridge.thirdStep.minimumReceived')} :</Text><Text>0.000823</Text></div>
                    <div className="flex justify-between items-center my-2"><Text className="text-[#9F9F9F]">{t('bridge.thirdStep.networkFees')} :</Text><Text>-$3.20</Text></div>
                    <div className="flex justify-between items-center my-2"><Text className="text-[#9F9F9F]">{t('bridge.thirdStep.receivingAddress')} :</Text><Text className="truncate">bc1q3j69cnwn...</Text></div>
                </div>

            </div>
            <Button onClick={handleNextStep} className="w-full bg-[#F23F5D]">{t('bridge.thirdStep.continue')}</Button>
        </section>
    )
}


const FourthStep = ({ setStep, step }: ChildrenProps) => {
    const { t } = useTranslation();

    const styles = {
        borderBottom: `0.5px solid rgba(255, 255, 255, 0.20)`,
        background: `var(--COLOR-COLOR, linear-gradient(236deg, rgba(93, 99, 111, 0.10) 1.26%, rgba(25, 30, 40, 0.35) 100%))`,
        backdropFilter: `blur(12px)`,
    };
    const handleNextStep = () => {
        if (step === 4) {
            setStep(1)
        } else {
            setStep(step + 1)
        }
    }
    return (
        <section className="bg-[#181924] mx-auto p-6 border-[0.5px] border-[#FFFFFF1A] w-full lg:w-3/4 min-w-sm rounded-xl space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <Text className="font-semibold text-lg text-center lg:text-left">{t('bridge.fourthStep.title')}</Text>
                    <Text className="text-[#9F9F9F] text-center lg:text-left">{t('bridge.fourthStep.subtitle')}</Text>
                </div>
                <IcCheck className="hidden lg:block" />
            </div>
            <div style={styles} className="py-6 px-4 rounded-xl w-full">
                <IcCheck className="lg:hidden block mx-auto mb-6 lg:mb-0" />
                <Text className="text-[#9F9F9F] lg:text-left text-center">{t('bridge.fourthStep.totalReceived')}</Text>
                <div className="flex space-x-2 items-center mt-2 lg:w-full w-1/2 mx-auto">
                    <IcBitcoin />
                    <Text className="font-semibold text-lg">0.000823</Text>
                </div>
                <Text className="text-[#9F9F9F] mt-6 lg:text-left text-center">{t('bridge.fourthStep.totalSent')}</Text>
                <div className="flex space-x-2 items-center mt-2 lg:w-full w-1/2 mx-auto">
                    <IcBitcoin />
                    <Text className="font-semibold text-lg">0.000823</Text>
                </div>
                <div className="mt-4">
                    <div className="flex items-center justify-between">
                        <Text>{t('bridge.fourthStep.networkRate')} :</Text>
                        <Text>0.00000298 BTC</Text>
                    </div>
                    <div className="flex items-center justify-between">
                        <Text>{t('bridge.fourthStep.networkFees')} :</Text>
                        <Text>-$3.20</Text>
                    </div>
                    <div className="flex items-center justify-between">
                        <Text>{t('bridge.fourthStep.receivingWalletAddress')} :</Text>
                        <Text>bc1q3...</Text>
                    </div>
                </div>
            </div>
            <div className="flex space-x-2">
                <Button onClick={handleNextStep} className="w-full bg-[#F23F5D]">{t('bridge.fourthStep.continue')}</Button>
                <Button onClick={handleNextStep} style={styles} className="w-full underline">{t('bridge.fourthStep.viewTransactions')}</Button>
            </div>
        </section>
    )
}


export const Bridge = () => {
    const { t } = useTranslation();


    const [step, setStep] = useState(1)

    return (
        <main className="mx-auto w-[86vw] lg:w-[60vw] space-y-4">
            <Text className="font-semibold text-center text-xl lg:text-4xl">
                {t('bridge.title.supertitle')}<span className="text-[#F23F5D]"> {t('bridge.title.subtitle')}</span>
            </Text>
            <Text className="text-center text-sm lg:text-lg text-[#90A3BF]">{t('bridge.subtitle.supertitle')} <br /> {t('bridge.subtitle.subtitle')}</Text>
            <BridgeSteps active={step} />

            {
                step === 1 ?
                    <FirstStep step={step} setStep={setStep} /> :
                    step === 2 ?
                        <SecondStep step={step} setStep={setStep} /> :
                        step === 3 ?
                            <ThirdStep step={step} setStep={setStep} />

                            : <FourthStep step={step} setStep={setStep} />

            }
        </main>
    )
}