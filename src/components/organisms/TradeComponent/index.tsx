import { IcBitcoin, IcDropdown, IcArrowUp, IcSwapHorizontal, IcThreeDotsVertical, } from "@/assets/icons";
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
    const [expand, setExpand] = useState(false)
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
                }} className={`w-1/3 rounded-none ${isActive === 'Long' ? `bg-[#F23F5D]` : `bg-[#0E0F19]`}`}>{t('trade.tradeComponent.long')}<IcArrowUp /></Button>
                <Button onClick={() => setIsActive("Short")} className={`w-1/3 rounded-none ${isActive === 'Short' ? `bg-[#F23F5D]` : `bg-[#0E0F19]`}`}>{t('trade.tradeComponent.short')}<IcArrowUp className="rotate-180" /></Button>
                <Button onClick={() => setIsActive("Swap")} style={{
                    clipPath: `polygon(0 0, 80% 0%, 100% 0, 100% 83%, 91% 100%, 20% 100%, 0 100%, 0 21%)`
                }} className={`w-1/3 rounded-none ${isActive === 'Swap' ? `bg-[#F23F5D]` : `bg-[#0E0F19]`}`}>{t('trade.tradeComponent.swap')}<IcSwapHorizontal color="white" /></Button>
            </div>

            <div className="flex lg:flex-row flex-col space-y-4 lg:space-y-0 lg:space-x-4">
                <div className="w-full lg:w-1/2">
                    <div className="flex justify-between">
                        <div className="flex w-full">
                            {
                                menu.map(item =>
                                    <Button onClick={() => setSelectedMenu(item)} className={` ${isActive === 'Swap' ? 'w-1/2' : 'w-1/3'} rounded-none border-b-2 ${isActive === 'Swap' && item === 'tp' && 'hidden'} ${selectedMenu === item ? 'border-b-[#e83d59] bg-[#273242]' : 'border-b-[#273242] bg-[#0E0F19]'}`}>{t(`trade.tradeComponent.${item}`)}</Button>
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
                                        <Slider
                                            defaultValue={[0]}
                                            max={100}
                                            value={[leverage]}
                                            className={"w-[80%]"}
                                            onValueChange={(e) => setLeverage(e as unknown as number)}
                                        />
                                        <div style={{
                                            background: `#171923`
                                        }} className="flex items-center w-1/5 p-2 h-10 rounded-lg">
                                            <Input className="w-1/2 text-[#F23F5D] bg-transparent text-right" max={100} value={leverage} placeholder={leverage.toString()} onChange={handleChangeInputSlider} />
                                            <Text className="text-[#F23F5D]">x</Text>
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden lg:flex justify-between space-x-1">
                                    {
                                        leverageCount.map((value) =>
                                            <Button className="h-auto text-xs rounded-full bg-[#21222e] py-1 px-4" onClick={() => setLeverage(value)}>
                                                {value}x
                                            </Button>)
                                    }
                                </div>
                                <div className="lg:hidden flex justify-between space-x-1">
                                    {
                                        leverageCountMobile.map((value) =>
                                            <Button className="h-auto text-xs rounded-full bg-[#21222e] py-1 px-4" onClick={() => setLeverage(value)}>
                                                {value}x
                                            </Button>)
                                    }
                                </div>
                            </>
                        }
                    </div>
                </div>
                <div className="w-full lg:w-1/2 px-4 py-6 space-y-2">
                    <div className="p-4 space-y-2 bg-[#0E0F19] rounded-lg">
                        <div className="flex justify-between items-center">
                            <Text className="text-white">{isActive} BTC</Text>
                            <IcDropdown className={`${expand && 'rotate-180'}`} onClick={() => setExpand(!expand)} />
                        </div>
                        {
                            expand && <div className="mt-2">
                                <div className="justify-between flex items-center">
                                    <Text>Market</Text>
                                    <Text>BTC/USD [BTC-USDC]</Text>
                                </div>
                                <div className="justify-between flex items-center">
                                    <Text>Entry Price</Text>
                                    <Text>$61.164.37</Text>
                                </div>
                                <div className="justify-between flex items-center">
                                    <Text>Exit Price</Text>
                                    <Text>$61.164.37</Text>
                                </div>
                                <div className="justify-between flex items-center">
                                    <Text>Net Fee</Text>
                                    <Text>-0.0087% / 1h</Text>
                                </div>
                                <div className="justify-between flex items-center">
                                    <Text>Available Liquidity</Text>
                                    <Text>$17.396.256.50</Text>
                                </div>
                                <div className="justify-between flex items-center">
                                    <Text>Open Interest Balance</Text>
                                    <div className="h-1 w-1/3 bg-[#F23F5D] rounded-full overflow-hidden">
                                        <div className="h-full bg-green" style={{ width: '53%' }}></div>
                                    </div>
                                </div>
                            </div>
                        }

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