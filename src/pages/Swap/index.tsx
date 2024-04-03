import { OrderBookSwap } from "@/components"
import TradingView from "@/components/organisms/TradingView"
import { useState } from "react"
import { Text } from "@/components"


export const Swap = () => {
    const styles = {
        borderRadius: `4px`,
        border: `0.5px solid rgba(255, 255, 255, 0.10)`,
        background: `var(--COLOR - COLOR, linear - gradient(236deg, rgba(93, 99, 111, 0.10) 1.26 %, rgba(25, 30, 40, 0.35) 100 %))`,
        backdropFilter: `blur(12px)`
    }

    const menu = ['Pool Swaps', 'Owners Chart', 'My Trade']

    const [selectedMenu, setSelectedMenu] = useState('Pool Swaps')

    return (
        <>
            <main className="flex space-x-4">
                <OrderBookSwap />
                <div style={styles} className="h-[40vh] lg:h-[60vh] w-4/5">
                    <TradingView />
                </div>
            </main>
            <main className="mt-4">
                <div style={{
                    borderRadius: `8px`,
                    background: `var(--Dark-Dark-2, #181924)`,
                    backdropFilter: `blur(12px)`
                }} className="p-6 w-1/2">
                    <div className="flex justify-between">
                        <div className="flex space-x-4 border-b-[0.5px] border-b-[#F23F5D] w-full">
                            {
                                menu.map(menu =>
                                    <Text className={`${selectedMenu === menu ? 'text-white border-b-2 border-[#F23F5D]' : ''} cursor-pointer`} onClick={() => setSelectedMenu(menu)}>{menu}</Text>)
                            }
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}