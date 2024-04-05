import { IcBitcoin, IcDropdown, IcThreeDotsVertical, } from "@/assets/icons";
import { Button, Input, Text, Toggle } from "@/components"
import { Slider } from "@/components/atoms/Slider";
import { SwapComponent } from "@/components/molecules/SwapComponent";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import { useTranslation } from "react-i18next";

type Trades = 'Long' | 'Short' | 'Swap'
interface TradeComponentProps {
    isActive: 'Long' | 'Short' | 'Swap',
    setIsActive: Dispatch<SetStateAction<Trades>>;
}


export const TradeComponent = ({ isActive, setIsActive }: TradeComponentProps) => {
    const { t } = useTranslation();


    const inputStyles = {
        background: `var(--COLOR-COLOR, linear-gradient(236deg, #5D636F1A 10%, #191E2859 35%))`,
        backdropFilter: `blur(12px)`
    }

    const [leverage, setLeverage] = useState(0)
    const [selectedMenu, setSelectedMenu] = useState('market')
    const [toggleLeverage, setToggleLeverage] = useState(false)
    const menu = ['market', 'limit', 'tp']


    const handleChangeInputSlider = (event: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value)
        if (!isNaN(value)) {
            setLeverage(value)
        }

    }

    const leverageCount = [0.1, 1, 2, 5, 10, 50, 100]
    const leverageCountMobile = [0.1, 1, 2, 5, 10]

    return (
        <section className="space-y-4 mt-4">
            <div className="flex space-x-2 w-full">
                <Button onClick={() => setIsActive("Long")} style={{
                    clipPath: `polygon(8% 0, 80% 0%, 100% 0, 100% 100%, 80% 100%, 20% 100%, 0 100%, 0 21%)`
                }} className={`w-1/3 rounded-none ${isActive === 'Long' ? `bg-[#F23F5D]` : `bg-[#0E0F19]`}`}>{t('trade.tradeComponent.long')}</Button>
                <Button onClick={() => setIsActive("Short")} className={`w-1/3 rounded-none ${isActive === 'Short' ? `bg-[#F23F5D]` : `bg-[#0E0F19]`}`}>{t('trade.tradeComponent.short')}</Button>
                <Button onClick={() => setIsActive("Swap")} style={{
                    clipPath: `polygon(0 0, 80% 0%, 100% 0, 100% 83%, 91% 100%, 20% 100%, 0 100%, 0 21%)`
                }} className={`w-1/3 rounded-none ${isActive === 'Swap' ? `bg-[#F23F5D]` : `bg-[#0E0F19]`}`}>{t('trade.tradeComponent.swap')}</Button>
            </div>

            <div className="flex lg:flex-row flex-col space-y-4 lg:space-y-0 lg:space-x-4">
                <div className="w-full lg:w-1/2">
                    <div className="flex justify-between">
                        <div className="flex w-full">
                            {
                                menu.map(item =>
                                    <Button onClick={() => setSelectedMenu(item)} className={`w-1/3 rounded-none border-b-2 ${selectedMenu === item ? 'border-b-[#e83d59] bg-[#273242]' : 'border-b-[#273242] bg-[#0E0F19]'}`}>{t(`trade.tradeComponent.${item}`)}</Button>
                                )
                            }
                        </div>
                    </div>
                    <SwapComponent />
                    {
                        isActive === 'Swap' && selectedMenu === 'limit' && <div style={inputStyles} className="rounded-lg flex p-4 justify-between">
                            <div>
                                <Text className="text-white">{t('trade.tradeComponent.price')}</Text>
                                <Input className="bg-transparent" placeholder="0.00" />
                            </div>
                            <div>
                                <Text className="text-white">{t('trade.tradeComponent.mark')}: 0.00</Text>
                                <div className="flex items-center space-x-1">
                                    <IcBitcoin height="16" width="16" />
                                    <Text className="text-white font-semibold text-lg">BTC</Text>
                                    <div className="p-[2px] rounded-full bg-gray-800">
                                        <IcDropdown height='16' width='16' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        selectedMenu === 'limit' && <div className="bg-[#0E0F19] rounded-lg p-4 flex items-center space-x-2 my-2">
                            <Text className="text-[#90A3BF]">{t('trade.tradeComponent.price')}:</Text>
                            <Input placeholder="0.00" className="bg-transparent text-white text-lg placeholder:text-white" />
                            <div className="flex items-center space-x-2 bg-[#171923] p-2 rounded-lg">
                                <Text>USD</Text>
                                <IcThreeDotsVertical />
                            </div>
                        </div>
                    }
                    <div className="space-y-2">
                        {
                            isActive !== 'Swap' &&
                            <>
                                <div className="p-4 bg-[#0E0F19] mt-2 rounded-lg space-y-2">
                                    <div className="flex justify-between">
                                        <Text className="text-[#9F9F9F]">{t('trade.tradeComponent.leverageSlider')}</Text>
                                        <Toggle label="" checked={toggleLeverage} onChange={setToggleLeverage} />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Slider step={0.1} value={leverage} onChange={e => setLeverage(e)} min={0} max={100} />
                                        <Input style={{
                                            background: `#171923`
                                        }} className="p-2 w-1/5 h-auto text-[#F23F5D]" value={leverage} placeholder={leverage.toString()} onChange={handleChangeInputSlider} />
                                    </div>
                                </div>
                                <div className="hidden lg:flex justify-between space-x-1">
                                    {
                                        leverageCount.map((value) =>
                                            <Button className="h-auto text-xs rounded-full bg-[#21222e] py-1 px-6" onClick={() => setLeverage(value)}>
                                                {value}
                                            </Button>)
                                    }
                                </div>
                                <div className="lg:hidden flex justify-between space-x-1">
                                    {
                                        leverageCountMobile.map((value) =>
                                            <Button className="h-auto text-xs rounded-full bg-[#21222e] py-1 px-6" onClick={() => setLeverage(value)}>
                                                {value}
                                            </Button>)
                                    }
                                </div>
                            </>
                        }
                    </div>
                </div>
                <div className="w-full lg:w-1/2 px-4 py-6 space-y-2">
                    <div className="p-4 space-y-2 flex justify-between items-center bg-[#0E0F19] rounded-lg">
                        <Text className="text-white">{isActive} BTC</Text>
                        <IcDropdown />
                    </div>
                    <div className="bg-[#0E0F19] p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                            <Text className="text-[#9F9F9F]">{t('trade.tradeComponent.pool')}</Text>
                            <Text className="text-white">BTC-USD</Text>
                        </div>
                        <div className="flex justify-between items-center">
                            <Text className="text-[#9F9F9F]">{t('trade.tradeComponent.collateralIn')}</Text>
                            <Text className="text-white">USDC</Text>
                        </div>
                        <hr className="opacity-10" />
                        <div className="flex justify-between items-center">
                            <Text className="text-[#9F9F9F]">{t('trade.tradeComponent.leverage')}</Text>
                            <Text className="text-white">1.05x</Text>
                        </div>
                        <hr className="opacity-10" />
                        <div className="flex justify-between items-center">
                            <Text className="text-[#9F9F9F]">{t('trade.tradeComponent.entryPrice')}</Text>
                            <Text className="text-white">$208.32</Text>
                        </div>
                        <div className="flex justify-between items-center">
                            <Text className="text-[#9F9F9F]">{t('trade.tradeComponent.liqPrice')}</Text>
                            <Text className="text-white">-</Text>
                        </div>
                        <hr className="opacity-10" />
                        <div className="flex justify-between items-center">
                            <Text className="text-[#9F9F9F]">{t('trade.tradeComponent.feesAndPriceImpact')}</Text>
                            <Text className="text-white">-$3.20</Text>
                        </div>
                    </div>
                </div>
            </div>
            <Button className="w-full rounded-full bg-[#F23F5D]">{t('trade.tradeComponent.insufficientBalance')}</Button>
        </section>
    )
}