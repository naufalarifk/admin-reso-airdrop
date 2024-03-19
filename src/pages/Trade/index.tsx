import { IcBitcoin, IcDropdown, IcInfo, IcSetting, IcTrade } from "@/assets/icons"
import { Text } from "@/components"
import { TradeComponent } from "@/components/organisms"
import TradingView from "@/components/organisms/TradingView"
import { useState } from "react"
export const Trade = () => {

    type Trades = 'Long' | 'Short' | 'Swap'
    const [selectedMenu, setSelectedMenu] = useState('Position')
    const [activeTrade, setActiveTrade] = useState<Trades>('Long')

    const styles = {
        borderRadius: `4px`,
        border: `0.5px solid rgba(255, 255, 255, 0.10)`,
        background: `var(--COLOR - COLOR, linear - gradient(236deg, rgba(93, 99, 111, 0.10) 1.26 %, rgba(25, 30, 40, 0.35) 100 %))`,
        backdropFilter: `blur(12px)`
    }

    const menu = ['Position', 'Orders', 'Trades', 'Claims']


    const dividerStyles = {
        borderLeft: `1px solid white`,
        height: `5em`
    }


    return (
        <>
            <div className="p-6 items-center space-x-6 lg:flex hidden" style={styles}>
                <div className="flex items-center space-x-4">
                    <IcBitcoin />
                    <div>
                        <Text className="text-white">BTC/USD</Text>
                        <Text className="text-[#ADB1B8]">Bitcoin</Text>
                    </div>
                    <div className="p-1 rounded-full bg-[#231f20]">
                        <IcDropdown />
                    </div>
                </div>
                <div className="flex space-x-1 text-lg font-semibold">
                    <Text className="text-green font-semibold">$108.42 =</Text>
                    <Text className="font-semibold">$108.42</Text>
                </div>
                <div className="text-lg font-semibold">
                    <Text className="font-semibold">24h Change</Text>
                    <Text className="text-green font-semibold">+1.93%</Text>
                </div>
                <div className="text-lg font-semibold">
                    <Text className="font-semibold">24h High</Text>
                    <Text className="text-white font-semibold">29.479.24</Text>
                </div>
                <div className="text-lg font-semibold">
                    <Text className="font-semibold">24h Low</Text>
                    <Text className="text-white font-semibold">25.479.24</Text>
                </div>
                <div className="text-lg font-semibold">
                    <Text className="font-semibold">24h Volume (BTC)</Text>
                    <Text className="text-white font-semibold">30.479.24</Text>
                </div>
            </div>
            <div className="p-2 items-center space-x-2 lg:hidden flex" style={styles}>
                <div className="flex items-center space-x-2 w-full">
                    <IcSetting />
                    <IcBitcoin />
                    <Text className="text-white">BTC/USD</Text>
                    <Text className="text-[#33D49D] p-1 bg-[#25402f] rounded-full">+2.00%</Text>
                </div>
                <div className="flex justify-end w-max">
                    <IcTrade />
                    <IcInfo />
                </div>
            </div>
            <div className="p-4 items-center space-x-2 lg:hidden flex mt-4" style={styles}>
                <IcBitcoin />
                <div>
                    <Text className="font-bold text-lg">2.2552</Text>
                    <Text className="text-[#9F9F9F]">~ $294.3</Text>
                </div>
                <div style={dividerStyles}></div>
                <div className="flex-grow">
                    <div className="flex justify-between items-center text-lg font-semibold">
                        <Text className="font-semibold">24h High</Text>
                        <Text className="text-white font-semibold">29.479.24</Text>
                    </div>
                    <div className="flex justify-between items-center text-lg font-semibold">
                        <Text className="font-semibold">24h Vol (BTC)</Text>
                        <Text className="text-white font-semibold">30.479.24</Text>
                    </div>
                    <div className="flex justify-between items-center text-lg font-semibold">
                        <Text className="font-semibold">24h Low</Text>
                        <Text className="text-white font-semibold">25.479.24</Text>
                    </div>
                </div>
            </div>
            <section className="flex lg:flex-row flex-col">
                <section className="lg:w-2/3 w-full">
                    <div style={styles} className="h-[40vh] lg:h-[60vh] mt-4">
                        <TradingView />
                    </div>
                    <div style={styles} className="lg:block hidden h-1/5 mt-4 p-6">
                        <div className="flex justify-between">
                            <div className="flex space-x-4">
                                {
                                    menu.map(menu =>
                                        <Text className={`${selectedMenu === menu ? 'text-white border-b-2 border-amber-400' : ''} cursor-pointer`} onClick={() => setSelectedMenu(menu)}>{menu}</Text>)
                                }
                            </div>
                            <div className="flex space-x-1 items-center">
                                <input type="checkbox" name="hide market" placeholder="Hide other market" id="" />
                                <Text>Hide other market</Text>
                            </div>
                        </div>
                        <Text className="text-center mt-5">No Options</Text>
                    </div>
                </section>
                <TradeComponent setIsActive={setActiveTrade} isActive={activeTrade} />
                <div style={styles} className="block lg:hidden h-1/5 mt-4 p-6">
                    <div className="flex justify-between w-full">
                        <div className="flex space-x-6">
                            {
                                menu.map(menu =>
                                    <Text className={`${selectedMenu === menu ? 'text-white border-b-2 border-amber-400' : ''} cursor-pointer`} onClick={() => setSelectedMenu(menu)}>{menu}</Text>)
                            }
                        </div>
                    </div>
                    <div className="flex space-x-1 items-center justify-end mt-2">
                        <input type="checkbox" name="hide market" placeholder="Hide other market" id="" />
                        <Text>Hide other market</Text>
                    </div>
                    <Text className="text-center mt-5">No Options</Text>
                </div>
            </section>
        </>
    )
}