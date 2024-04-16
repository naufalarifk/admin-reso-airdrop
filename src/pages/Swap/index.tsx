import { Button, Input, OrderBookSwap, Pagination } from "@/components"
import TradingView from "@/components/organisms/TradingView"
import { ChangeEvent, useState } from "react"
import { Text } from "@/components"
import { IcBitcoin, IcCancel, IcExternalLink, IcScrollV, IcThreeDotsVertical, IcUnstableConnection } from "@/assets/icons"
import { Slider } from "@/components/atoms/Slider"


export const Swap = () => {
    const styles = {
        borderRadius: `4px`,
        border: `0.5px solid rgba(255, 255, 255, 0.10)`,
        background: `var(--COLOR - COLOR, linear - gradient(236deg, rgba(93, 99, 111, 0.10) 1.26 %, rgba(25, 30, 40, 0.35) 100 %))`,
        backdropFilter: `blur(12px)`
    }

    const pool_menu = ['Pool Swaps', 'Owners Chart', 'My Trade']
    const swap_menu = ['Instant Swap', 'Limit Swap', 'My Open Order']

    const [selectedPoolMenu, setSelectedPoolMenu] = useState('Pool Swaps')
    const [selectedSwapMenu, setSelectedSwapMenu] = useState('Instant Swap')
    const [leverage, setLeverage] = useState(0)

    const handleChangeInputSlider = (event: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value)
        if (!isNaN(value)) {
            setLeverage(value)
        }

    }

    const leverageCount = [0, 25, 50, 75]

    const pool_swaps = [
        {
            number: 1,
            address: 'bc1q...njgk',
            protocol: ' BRC20',
            type: 'Swap',
            pay: '0.1 BTC',
            receive: '60 USDT',
            date: 'Nov 22,2023',
            time: '18:13:01',
            txid: '2dw2...3gwr',
            status: 'Success'
        },
        {
            number: 2,
            address: 'bc1q...njgk',
            protocol: ' BRC20',
            type: 'Swap',
            pay: '0.1 BTC',
            receive: '60 USDT',
            date: 'Nov 22,2023',
            time: '18:13:01',
            txid: '2dw2...3gwr',
            status: 'Success'
        }, {
            number: 3,
            address: 'bc1q...njgk',
            protocol: ' BRC20',
            type: 'Swap',
            pay: '0.1 BTC',
            receive: '60 USDT',
            date: 'Nov 22,2023',
            time: '18:13:01',
            txid: '2dw2...3gwr',
            status: 'Success'
        },
    ]

    const token_rate = [
        {
            name: 'BTC/USDT',
            rate: '+0.25%'
        },
        {
            name: 'ETH/USDT',
            rate: '+0.25%'
        },
        {
            name: 'XRP/USDT',
            rate: '+0.25%'
        },
        {
            name: 'XRP/ETH',
            rate: '+0.25%'
        },
        {
            name: 'ETH/BTC',
            rate: '+0.25%'
        },
        {
            name: 'DOGE/USDT',
            rate: '+0.25%'
        },
        {
            name: 'XRP/DOGE',
            rate: '+0.25%'
        },
        {
            name: 'ARB/ETH',
            rate: '+0.25%'
        },
        {
            name: 'ARB/ETH',
            rate: '+0.25%'
        }, {
            name: 'ARB/ETH',
            rate: '+0.25%'
        },
    ]


    const my_orders = [
        {
            date: 'Nov 22,2023',
            time: '18:13:01',
            market: 'BTC/USDT',
            price: '$123,322,412',
            volume: '1.32515123',
            executed: '100%',
            txid: <IcExternalLink />,
            action: <IcCancel />,
        },
        {
            date: 'Nov 22,2023',
            time: '18:13:01',
            market: 'BTC/USDT',
            price: '$123,322,412',
            volume: '1.32515123',
            executed: '100%',
            txid: <IcExternalLink />,
            action: <IcCancel />,
        },
        {
            date: 'Nov 22,2023',
            time: '18:13:01',
            market: 'BTC/USDT',
            price: '$123,322,412',
            volume: '1.32515123',
            executed: '100%',
            txid: <IcExternalLink />,
            action: <IcCancel />,
        },
        {
            date: 'Nov 22,2023',
            time: '18:13:01',
            market: 'BTC/USDT',
            price: '$123,322,412',
            volume: '1.32515123',
            executed: '100%',
            txid: <IcExternalLink />,
            action: <IcCancel />,
        },
        {
            date: 'Nov 22,2023',
            time: '18:13:01',
            market: 'BTC/USDT',
            price: '$123,322,412',
            volume: '1.32515123',
            executed: '100%',
            txid: <IcExternalLink />,
            action: <IcCancel />,
        },
    ]


    const OrdertableMenu = () => {
        return (
            <>
                <div className="grid grid-cols-7 my-4 border-b text-center">
                    <Text>Date</Text>
                    <Text>Market</Text>
                    <Text>Price</Text>
                    <Text>Volume</Text>
                    <Text>Executed</Text>
                    <Text>TxID</Text>
                    <Text>Action</Text>
                </div>
                {
                    my_orders.map(order => <div className="grid grid-cols-7 my-4 border-b text-center items-center">
                        <div>
                            <Text>{order.date}</Text>
                            <Text>{order.time}</Text>
                        </div>
                        <Text>{order.market}</Text>
                        <Text>{order.price}</Text>
                        <Text>{order.volume}</Text>
                        <Text>{order.executed}</Text>
                        <div className="mx-auto">{order.txid}</div>
                        <div className="mx-auto">{order.action}</div>
                    </div>
                    )
                }
                <Pagination />
            </>
        )
    }

    const SwapMenu = () => {
        return (
            <>
                <section className="mt-4 flex items-center justify-center space-x-4">
                    <div className="space-y-2 w-full h-full">
                        <Text>Token to Swap</Text>
                        <div className="bg-[#0E0F19] rounded-lg p-4 flex items-center space-x-2">
                            <div className="flex items-center space-x-2 bg-[#171923] p-2 rounded-lg">
                                <IcBitcoin height="24" width="24" />
                                <Text>BTC</Text>
                                <IcThreeDotsVertical />
                            </div>
                            <Input placeholder="0.00" className="bg-transparent" />
                            <Button className="border border-[#F23F5D] bg-[#20131e] text-[#F23F5D] py-2 px-4 h-auto">Max</Button>
                        </div>
                        <div className="flex justify-between items-center">
                            <Text>Available Balance</Text>
                            <Text>0.01452618 BTC</Text>
                        </div>
                        {selectedSwapMenu !== 'Limit Swap' && <div className="flex items-center space-x-2 bg-[#21222d] p-4 rounded-xl">
                            <Slider
                                defaultValue={[0]}
                                max={100}
                                value={[leverage]}
                                className={"w-[80%]"}
                                onValueChange={(e) => setLeverage(e as unknown as number)}
                            />
                            <div style={{
                                background: `#272a35`,
                                border: `1px solid rgba(255, 255, 255, 0.10)`
                            }} className="w-1/5 h-10 rounded-lg flex items-center p-2">
                                <Input className="w-2/3 bg-transparent text-right" value={leverage} placeholder={leverage.toString()} onChange={handleChangeInputSlider} />
                                <Text>%</Text>
                            </div>
                        </div>}
                        <div className="grid grid-cols-5 space-x-1">
                            {
                                leverageCount.map((value) =>
                                    <Button className="h-auto text-xs rounded-full bg-[#21222e] py-1 px-6" onClick={() => setLeverage(value)}>
                                        {value}
                                    </Button>

                                )
                            }
                            <Button className="h-auto text-xs rounded-full bg-[#21222e] py-1 px-6" onClick={() => setLeverage(100)}>
                                Max
                            </Button>
                        </div>
                        {
                            selectedSwapMenu === 'Limit Swap' &&
                            <div className="flex justify-between items-center my-2 p-4 bg-[#21222e] rounded-lg ">
                                <div className="space-y-4">
                                    <Text className="text-[#90A3BF]">Swap USDT at rate</Text>
                                    <Text>0.000015</Text>
                                </div>
                                <div className="space-y-4 text-right">
                                    <Text className="text-[#F23F5D]">Use market</Text>
                                    <Text className="text-[#90A3BF]">BTC</Text>
                                </div>
                            </div>
                        }
                    </div>

                    <div>
                        <IcScrollV className='rotate-90' />
                    </div>
                    <div className="space-y-2 w-full h-full">
                        <Text>Token to Receive</Text>
                        <div className="bg-[#0E0F19] rounded-lg p-4 flex items-center space-x-2">
                            <div className="flex items-center space-x-2 bg-[#171923] p-2 rounded-lg">
                                <IcBitcoin height="24" width="24" />
                                <Text>BTC</Text>
                                <IcThreeDotsVertical />
                            </div>
                            <Input placeholder="0.00" className="bg-transparent" />
                            <Button className="border border-[#F23F5D] bg-[#20131e] text-[#F23F5D] py-2 px-4 h-auto">Max</Button>
                        </div>
                        <div className="flex justify-between items-center">
                            <Text>Available Balance</Text>
                            <Text>0.01452618 BTC</Text>
                        </div>
                        <div className="flex justify-between items-center">
                            <Text>Slippage Tolerance</Text>
                            <div className="bg-[#0E0F19] py-2 px-4 rounded-lg">
                                <Text>5%</Text>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <div className="bg-[#0E0F19] rounded-lg p-2">
                                <Text className="">Min received:</Text>
                                <Text className="text-xs">0.00 USDT</Text>
                            </div>
                            <div className="bg-[#0E0F19] rounded-lg p-2">
                                <Text className="">Service fee:</Text>
                                <Text className="text-xs">0.00 USDT</Text>
                            </div>
                            <div className="bg-[#0E0F19] rounded-lg p-2">
                                <Text className="">Network fee:</Text>
                                <Text className="text-xs">0.00 USDT</Text>
                            </div>
                        </div>
                    </div>
                </section>
                <Button className="rounded-full w-full mt-2 bg-[#F23F5D]">Swap</Button>
            </>
        )
    }
    return (
        <>
            <main className="flex space-x-4">
                <OrderBookSwap />
                <div style={styles} className="h-[40vh] lg:h-[60vh] w-4/5">
                    <TradingView />
                </div>
            </main>
            <main className="mt-4 flex space-x-4">
                <div style={{
                    borderRadius: `8px`,
                    background: `var(--Dark-Dark-2, #181924)`,
                    backdropFilter: `blur(12px)`
                }} className="p-6 w-1/2">
                    <div className="flex justify-between">
                        <div className="flex space-x-4 border-b-[0.5px] border-b-[#F23F5D] w-full">
                            {
                                pool_menu.map(menu =>
                                    <Text className={`${selectedPoolMenu === menu ? 'text-white border-b-2 border-[#F23F5D]' : ''} cursor-pointer`} onClick={() => setSelectedPoolMenu(menu)}>{menu}</Text>)
                            }
                        </div>
                    </div>

                    <div className="grid grid-cols-9 my-4 border-b text-center">
                        <Text>#</Text>
                        <Text>Address</Text>
                        <Text>Protocol</Text>
                        <Text>Type</Text>
                        <Text>Pay</Text>
                        <Text>Receive</Text>
                        <Text>Time</Text>
                        <Text>TxID</Text>
                        <Text>Status</Text>
                    </div>

                    {
                        pool_swaps.map(pool => <div className="grid grid-cols-9 my-4 border-b text-center items-center">
                            <Text>{pool.number}</Text>
                            <Text>{pool.address}</Text>
                            <Text>{pool.protocol}</Text>
                            <Text>{pool.type}</Text>
                            <Text>{pool.pay}</Text>
                            <Text>{pool.receive}</Text>
                            <div>
                                <Text>{pool.date}</Text>
                                <Text>{pool.time}</Text>
                            </div>
                            <Text>{pool.txid}</Text>
                            <Text>{pool.status}</Text>
                        </div>
                        )
                    }
                    <Pagination />
                </div>
                <div style={{
                    borderRadius: `8px`,
                    background: `var(--Dark-Dark-2, #181924)`,
                    backdropFilter: `blur(12px)`
                }} className="p-6 w-1/2">
                    <div className="flex justify-between">
                        <div className="flex space-x-4 border-b-[0.5px] border-b-[#F23F5D] w-full">
                            {
                                swap_menu.map(menu =>
                                    <Text className={`${selectedSwapMenu === menu ? 'text-white border-b-2 border-[#F23F5D]' : ''} cursor-pointer`} onClick={() => setSelectedSwapMenu(menu)}>{menu}</Text>)
                            }
                        </div>
                    </div>
                    {
                        selectedSwapMenu === 'My Open Order' ? <OrdertableMenu /> :
                            <SwapMenu />
                    }
                </div>
            </main>
            <div className="flex mt-4 border-t border-[#ADB1B8] p-2 justify-between">
                <div className="flex space-x-1">
                    <IcUnstableConnection />
                    <Text>Unstable Connection</Text>
                </div>
                {
                    token_rate.map(token =>
                        <div className="border-l border-[#ADB1B8] px-2 flex space-x-1">
                            <Text>{token.name}</Text>
                            <Text className="text-green">{token.rate}</Text>
                        </div>)
                }
            </div>
        </>
    )
}