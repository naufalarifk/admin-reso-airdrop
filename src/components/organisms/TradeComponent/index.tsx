import { IcArrowBottom, IcArrowTop, IcDropdown, IcSwapHorizontal, IcWarning } from "@/assets/icons";
import { Button, Input, Text, Toggle } from "@/components"
import { Slider } from "@/components/atoms/Slider";
import { SwapComponent } from "@/components/molecules/SwapComponent";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"

type Trades = 'Long' | 'Short' | 'Swap'
interface TradeComponentProps {
    isActive: 'Long' | 'Short' | 'Swap',
    setIsActive: Dispatch<SetStateAction<Trades>>;
}


export const TradeComponent = ({ isActive, setIsActive }: TradeComponentProps) => {
    const styles = {
        borderRadius: `4px`,
        border: `0.5px solid rgba(255, 255, 255, 0.10)`,
        background: `var(--COLOR-COLOR, linear-gradient(236deg, rgba(93, 99, 111, 0.10) 1.26%, rgba(25, 30, 40, 0.35) 100%))`,
        backdropFilter: `blur(12px)`
    }

    const buttonStyles = {
        borderRadius: `4px`,
        background: `var(--COLOR-COLOR, linear-gradient(236deg, rgba(93, 99, 111, 0.10) 1.26%, rgba(25, 30, 40, 0.35) 100%))`,
        backdropFilter: `blur(12px)`
    }

    const [leverage, setLeverage] = useState(0)
    const [selectedMenu, setSelectedMenu] = useState('Market')
    const [toggleLeverage, setToggleLeverage] = useState(false)
    const menu = ['Market', 'Limit', 'TP/SL']


    const handleChangeInputSlider = (event: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value)
        if (!isNaN(value)) {
            setLeverage(value)
        }

    }

    const leverageCount = [0.1, 1, 2, 5, 10, 50, 100]

    return (
        <section style={styles} className="mt-4 ml-4 w-1/3 p-4 space-y-4">
            <div style={styles} className="flex w-full rounded-lg border border-">
                <Button className={`${isActive === 'Long' ? 'bg-[#FE9F001A]' : 'bg-transparent'} w-1/3 rounded-l-[4px] rounded-r-none`} onClick={() => setIsActive('Long')}>
                    <IcArrowTop color={isActive === 'Long' ? '#FE9F00' : '#9F9F9F'} />
                    <Text className={`${isActive === 'Long' ? 'text-[#FE9F00]' : 'text-[#9F9F9F]'} font-semibold`}>Long</Text>
                </Button>
                <Button className={`${isActive === 'Short' ? 'bg-[#FE9F001A]' : 'bg-transparent'} w-1/3 rounded-none`} onClick={() => setIsActive('Short')}>
                    <IcArrowBottom color={isActive === 'Short' ? '#FE9F00' : '#9F9F9F'} />
                    <Text className={`${isActive === 'Short' ? 'text-[#FE9F00]' : 'text-[#9F9F9F]'} font-semibold`}>Short</Text>
                </Button>
                <Button className={`${isActive === 'Swap' ? 'bg-[#FE9F001A]' : 'bg-transparent'} w-1/3 rounded-l-none rounded-r-[4px]`} onClick={() => setIsActive('Swap')}>
                    <IcSwapHorizontal color={isActive === 'Swap' ? '#FE9F00' : '#9F9F9F'} />
                    <Text className={`${isActive === 'Swap' ? 'text-[#FE9F00]' : 'text-[#9F9F9F]'} font-semibold`}>Swap</Text>
                </Button>
            </div>
            <div className="bg-[#FE9F001A] p-4 rounded-lg">
                <IcWarning className="mx-auto" />
                <Text className="text-[#FE9F00] text-center w-4/5 mx-auto">Connect your wallet to deposit fund and start trading.</Text>
            </div>
            <div className="flex justify-between">
                <div className="flex space-x-4">
                    {
                        menu.map(menu =>
                            <Text className={`${selectedMenu === menu ? 'text-white border-b-2 border-amber-400' : ''} cursor-pointer`} onClick={() => setSelectedMenu(menu)}>{menu}</Text>)
                    }
                </div>
            </div>
            <SwapComponent />
            <div className="flex space-x-1 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M7.33325 11.3334H8.66659V7.3334H7.33325V11.3334ZM7.99992 6.00006C8.18881 6.00006 8.34725 5.93606 8.47525 5.80806C8.60325 5.68006 8.66703 5.52184 8.66659 5.3334C8.66659 5.14451 8.60259 4.98629 8.47459 4.85873C8.34659 4.73117 8.18836 4.66717 7.99992 4.66673C7.81103 4.66673 7.65281 4.73073 7.52525 4.85873C7.3977 4.98673 7.3337 5.14495 7.33325 5.3334C7.33325 5.52229 7.39725 5.68073 7.52525 5.80873C7.65325 5.93673 7.81147 6.00051 7.99992 6.00006ZM7.99992 14.6667C7.0777 14.6667 6.21103 14.4916 5.39992 14.1414C4.58881 13.7912 3.88325 13.3163 3.28325 12.7167C2.68325 12.1167 2.20836 11.4112 1.85859 10.6001C1.50881 9.78895 1.3337 8.92229 1.33325 8.00006C1.33325 7.07784 1.50836 6.21117 1.85859 5.40006C2.20881 4.58895 2.6837 3.8834 3.28325 3.2834C3.88325 2.6834 4.58881 2.20851 5.39992 1.85873C6.21103 1.50895 7.0777 1.33384 7.99992 1.3334C8.92214 1.3334 9.78881 1.50851 10.5999 1.85873C11.411 2.20895 12.1166 2.68384 12.7166 3.2834C13.3166 3.8834 13.7917 4.58895 14.1419 5.40006C14.4921 6.21117 14.667 7.07784 14.6666 8.00006C14.6666 8.92229 14.4915 9.78895 14.1413 10.6001C13.791 11.4112 13.3161 12.1167 12.7166 12.7167C12.1166 13.3167 11.411 13.7918 10.5999 14.1421C9.78881 14.4923 8.92214 14.6672 7.99992 14.6667Z" fill="#9F9F9F" />
                </svg>
                <Text className="text-[#9F9F9F]">1 BTC = 0.001293 USDT ($000.321)</Text>
            </div>
            <div className="space-y-2">
                <div className="flex justify-between">
                    <Text className="text-[#9F9F9F]">Leverage Slider</Text>
                    <Toggle label="" checked={toggleLeverage} onChange={setToggleLeverage} />
                </div>
                <div className="flex items-center space-x-2">
                    <Slider step={0.1} value={leverage} onChange={e => setLeverage(e)} min={0} max={100} />
                    <Input style={{
                        background: `var(--COLOR-COLOR, linear-gradient(236deg, rgba(93, 99, 111, 0.10) 1.26%, rgba(25, 30, 40, 0.35) 100%))`
                    }} className="p-2 w-2/5" value={leverage} placeholder={leverage.toString()} onChange={handleChangeInputSlider} />
                </div>
                <div className="flex space-x-2 justify-around">
                    {
                        leverageCount.map((value) =>
                            <Button style={buttonStyles} className="h-8 text-xs" onClick={() => setLeverage(value)}>
                                {value}
                            </Button>)
                    }
                </div>
                <div style={styles} className="px-4 py-6 space-y-2">
                    <div className="flex justify-between items-center">
                        <Text className="text-[#9F9F9F]">Pool</Text>
                        <Text className="text-white">BTC-USD</Text>
                    </div>
                    <div className="flex justify-between items-center">
                        <Text className="text-[#9F9F9F]">Collateral In</Text>
                        <Text className="text-white">USDC</Text>
                    </div>
                    <hr className="opacity-10" />
                    <div className="flex justify-between items-center">
                        <Text className="text-[#9F9F9F]">Leverage</Text>
                        <Text className="text-white">1.05x</Text>
                    </div>
                    <hr className="opacity-10" />
                    <div className="flex justify-between items-center">
                        <Text className="text-[#9F9F9F]">Entry Price</Text>
                        <Text className="text-white">$208.32</Text>
                    </div>
                    <div className="flex justify-between items-center">
                        <Text className="text-[#9F9F9F]">Liq Price</Text>
                        <Text className="text-white">-</Text>
                    </div>
                    <hr className="opacity-10" />
                    <div className="flex justify-between items-center">
                        <Text className="text-[#9F9F9F]">Fees (rebated) and Price impact</Text>
                        <Text className="text-white">-$3.20</Text>
                    </div>
                </div>
                <Button className="w-full">Insufficient BTC Balance</Button>
                <div style={styles} className="p-4 space-y-2 flex justify-between items-center">
                    <Text className="text-white">Long BTC</Text>
                    <IcDropdown />
                </div>
            </div>
        </section>
    )
}