import { IcBitcoin, IcDropdown, IcInfo, IcSearch, IcSetting, IcTrade } from "@/assets/icons"
import { Button, Input, Text } from "@/components"
import { TradeComponent } from "@/components/organisms"
import TradingView from "@/components/organisms/TradingView"
import { useState } from "react"
import { useTranslation } from "react-i18next"
export const Trade = () => {

    const { t } = useTranslation();

    type Trades = 'Long' | 'Short' | 'Swap'
    const [selectedMenu, setSelectedMenu] = useState('Trade')
    const [activeTrade, setActiveTrade] = useState<Trades>('Long')

    const styles = {
        borderRadius: `4px`,
        border: `0.5px solid rgba(255, 255, 255, 0.10)`,
        background: `var(--COLOR - COLOR, linear - gradient(236deg, rgba(93, 99, 111, 0.10) 1.26 %, rgba(25, 30, 40, 0.35) 100 %))`,
        backdropFilter: `blur(12px)`
    }

    const menu = ['Trade', 'History']


    const dividerStyles = {
        borderLeft: `1px solid white`,
        height: `5em`
    }

    const tokens = [
        {
            name: "Ethereum",
            symbol: "ETH",
            image: "/images/placeholder.svg",
        },
        {
            name: "Wrapped Ethereum",
            symbol: "WETH",
            image: "/images/placeholder.svg",
        }, {
            name: "Bitcoin",
            symbol: "BTC",
            image: "/images/placeholder.svg",
        }, {
            name: "Wrapped SOL",
            symbol: "SOL",
            image: "/images/placeholder.svg",
        }, {
            name: "Arbitrarum",
            symbol: "ARB",
            image: "/images/placeholder.svg",
        },
    ]


    return (
        <>
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
                        <Text className="font-semibold">{t("trade.tokenList.twentyFourChange")}</Text>
                        <Text className="text-white font-semibold">29.479.24</Text>
                    </div>
                    <div className="flex justify-between items-center text-lg font-semibold">
                        <Text className="font-semibold">{t("trade.tokenList.twentyFourHigh")}</Text>
                        <Text className="text-white font-semibold">30.479.24</Text>
                    </div>
                    <div className="flex justify-between items-center text-lg font-semibold">
                        <Text className="font-semibold">{t("trade.tokenList.twentyFourLow")}</Text>
                        <Text className="text-white font-semibold">25.479.24</Text>
                    </div>
                </div>
            </div>
            <section className="flex lg:flex-row flex-col">
                <section style={styles} className="mt-4 lg:mr-4 p-4 space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-[#0e0f19]">
                        <div className="flex items-center space-x-4">
                            <IcBitcoin />
                            <div>
                                <Text className="text-white">BTC/USD</Text>
                                <Text className="text-[#ADB1B8]">Bitcoin</Text>
                            </div>
                        </div>
                        <div className="flex space-x-1 items-center">
                            <Text>{t("trade.tokenList.allMarkets")}</Text>
                            <div className="p-1 rounded-full bg-[#231f20]">
                                <IcDropdown />
                            </div>
                        </div>
                    </div>

                    <div className="p-4 rounded-lg bg-[#0e0f19] space-y-4">
                        <div className="grid grid-cols-3 justify-center items-center gap-2">
                            <div className="text-sm font-semibold flex flex-col items-center justify-center">
                                <Text className="font-semibold">{t("trade.tokenList.twentyFourChange")}</Text>
                                <Text className="text-green font-semibold">+1.93%</Text>
                            </div>
                            <div className="text-sm font-semibold flex flex-col items-center justify-center">
                                <Text className="font-semibold">{t("trade.tokenList.twentyFourHigh")}</Text>
                                <Text className="text-white font-semibold">29.479.24</Text>
                            </div>
                            <div className="text-sm font-semibold flex flex-col items-center justify-center">
                                <Text className="font-semibold">{t("trade.tokenList.twentyFourLow")}</Text>
                                <Text className="text-white font-semibold">25.479.24</Text>
                            </div>
                            <div className="text-sm font-semibold flex flex-col items-center justify-center">
                                <Text className="font-semibold">{t("trade.tokenList.twentyFourVol")}</Text>
                                <Text className="text-white font-semibold">30.479.24</Text>
                            </div>
                            <div className="text-sm font-semibold flex flex-col items-center justify-center">
                                <Text className="font-semibold">{t("trade.tokenList.marketCap")}</Text>
                                <Text className="text-white font-semibold">30.479.24</Text>
                            </div>
                            <div className="text-sm font-semibold flex flex-col items-center justify-center">
                                <Text className="font-semibold">{t("trade.tokenList.marketCap")}</Text>
                                <Text className="text-white font-semibold">30.479.24</Text>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Text className="font-semibold">{t("trade.tokenList.tradingActivity")}</Text>
                            <div className="h-1 w-full bg-[#181a24] rounded-full overflow-hidden">
                                <div className="h-full bg-[#F23F5D]" style={{ width: '53%' }}></div>
                            </div>
                            <div className="items-center justify-between flex">
                                <Text>{t("trade.tokenList.buy")} 53%</Text>
                                <Text>{t("trade.tokenList.sell")} 47%</Text>
                            </div>
                        </div>
                    </div>


                    <div className="flex w-full">
                        <Button className="w-1/2 rounded-none border-b-2 border-b-[#e83d59] bg-[#273242]">{t("trade.tokenList.popular")}</Button>
                        <Button className="w-1/2 rounded-none border-b-2 border-b-[#273242] bg-[#0E0F19]">{t("trade.tokenList.all")}</Button>
                    </div>
                    <div className="bg-[#0E0F19] flex items-center space-x-2 border rounded-lg px-2 mt-2 border-[#273242]">
                        <IcSearch className="text-[#273242] dark:text-[#]" />
                        <Input className="bg-transparent text-[#273242] placeholder:text-[#273242]" placeholder="Search" type="text" />
                    </div>


                    <div className="space-y-2">
                        {
                            tokens.map(token => <div className="p-4 bg-[#0E0F19] rounded-lg"><div className="flex justify-between items-center">
                                <div className="flex space-x-1 items-center">
                                    <img src={token.image} />
                                    <Text>{token.symbol}</Text>
                                </div>
                                <div>
                                    <Text>$3,634.68</Text>
                                    <Text className="text-green">+1.93%</Text>
                                </div>
                            </div>
                                <Text>{t("trade.tokenList.marketSentiment")}</Text>
                                <div className="h-1 w-full bg-[#F23F5D] rounded-full overflow-hidden">
                                    <div className="h-full bg-green" style={{ width: '53%' }}></div>
                                </div>
                                <div className="items-center justify-between flex mt-2">
                                    <Text>{t("trade.tokenList.buy")} 53%</Text>
                                    <Text>{t("trade.tokenList.sell")} 47%</Text>
                                </div>
                            </div>)
                        }
                    </div>
                </section>
                <section className="lg:w-2/3 w-full">
                    <div style={styles} className="h-[40vh] lg:h-[60vh] mt-4">
                        <TradingView />
                    </div>
                    <div style={{
                        borderRadius: `16px`,
                        background: `var(--Dark-Dark-2, #181924)`,
                        backdropFilter: `blur(12px)`
                    }} className="mt-4 p-6">
                        <div className="flex justify-between">
                            <div className="flex space-x-4 border-b-[0.5px] border-b-[#F23F5D] w-full">
                                {
                                    menu.map(menu =>
                                        <Text className={`${selectedMenu === menu ? 'text-white border-b-2 border-[#F23F5D]' : ''} cursor-pointer`} onClick={() => setSelectedMenu(menu)}>{menu}</Text>)
                                }
                            </div>
                        </div>
                        <TradeComponent setIsActive={setActiveTrade} isActive={activeTrade} />
                    </div>
                </section>
            </section>
        </>
    )
}