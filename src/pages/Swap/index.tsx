import {
    Button,
    Input,
    ModalConfirmInstantSwap,
    OrderBookSwap,
    Pagination,
} from "@/components";
import TradingView from "@/components/organisms/TradingView";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Text } from "@/components";
import {
    IcBitcoin,
    IcCancel,
    IcDoubleCurrency,
    IcExternalLink,
    IcGas,
    IcInfo,
    IcQuestionMark,
    IcScrollV,
    IcThreeDotsVertical,
    IcTrade,
    IcUnstableConnection,
} from "@/assets/icons";
import { Slider } from "@/components";
import { SwapTable } from "@/components";
import { useTranslation } from "react-i18next";
import { ModalInsufficientBalance } from "@/components/molecules/ModalInsufficientBalance";
import { ModalCoinInfo } from "@/components/molecules/ModalCoinInfo";
import { usePublicMarket } from "./hooks/usePublicMarkets";
import { getMarketList } from "@/api/services/public/markets";
import { usePublicCurrency } from "./hooks/usePublicCurrencies";
import { getCurrencyList } from "@/api/services/public/currencies";

export const Swap = () => {
    const { t } = useTranslation();
    const market = usePublicMarket((state) => state.market);
    const currency = usePublicCurrency((state) => state.currency);
    const updateCurrency = usePublicCurrency(
        (state) => state.updateCurrencyState
    );
    const updateMarket = usePublicMarket((state) => state.updateMarketState);
    console.log("currency", currency);
    console.log("market", market);
    const styles = {
        borderRadius: `4px`,
        border: `0.5px solid rgba(255, 255, 255, 0.10)`,
        background: `var(--COLOR - COLOR, linear - gradient(236deg, rgba(93, 99, 111, 0.10) 1.26 %, rgba(25, 30, 40, 0.35) 100 %))`,
        backdropFilter: `blur(12px)`,
    };

    const pool_menu = ["poolSwaps", "ownersChart", "myTrade"];
    const swap_menu = ["instantSwap", "limitSwap", "myOpenOrder"];

    const [selectedPoolMenu, setSelectedPoolMenu] = useState("poolSwaps");
    const [selectedSwapMenu, setSelectedSwapMenu] = useState("instantSwap");
    const [openInsufficientBalance, setOpenInsufficientBalance] = useState(false);
    const [openConfirmInstantSwap, setOpenConfirmInstantSwap] = useState(false);
    const [openCoinInfo, setOpenCoinInfo] = useState(false);
    const [leverage, setLeverage] = useState(0);

    const getData = useCallback(async () => {
        const market = await getMarketList({});
        const currency = await getCurrencyList({});
        updateCurrency(currency);
        updateMarket(market);
    }, [updateCurrency, updateMarket]);

    useEffect(() => {
        getData();
    }, [getData]);

    const handleChangeInputSlider = (event: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value)) {
            setLeverage(value);
        }
    };

    const leverageCount = [0, 25, 50, 75];

    const pool_swaps = [
        {
            number: 1,
            address: "bc1q...njgk",
            protocol: " BRC20",
            type: "Swap",
            pay: "0.1 BTC",
            receive: "60 USDT",
            date: "Nov 22,2023",
            time: "18:13:01",
            txid: "2dw2...3gwr",
            status: "Success",
        },
        {
            number: 2,
            address: "bc1q...njgk",
            protocol: " BRC20",
            type: "Swap",
            pay: "0.1 BTC",
            receive: "60 USDT",
            date: "Nov 22,2023",
            time: "18:13:01",
            txid: "2dw2...3gwr",
            status: "Success",
        },
        {
            number: 3,
            address: "bc1q...njgk",
            protocol: " BRC20",
            type: "Swap",
            pay: "0.1 BTC",
            receive: "60 USDT",
            date: "Nov 22,2023",
            time: "18:13:01",
            txid: "2dw2...3gwr",
            status: "Success",
        },
    ];

    const owners_charts = [
        {
            rank: "1",
            address: "bc1q...njgk",
            quantity: "2,561,667",
        },
    ];

    const my_trades = [
        {
            date: "Nov 22,2023",
            time: "18:13:01",
            assets: "BTC/USDT",
            order_id: "TID103129412",
            price: " $ 123,322,412",
            amount: "1.32515123",
            type: "Instant",
            total: "$123,322,412",
        },
        {
            date: "Nov 22,2023",
            time: "18:13:01",
            assets: "BTC/USDT",
            order_id: "TID103129412",
            price: " $ 123,322,412",
            amount: "1.32515123",
            type: "Instant",
            total: "$123,322,412",
        },
        {
            date: "Nov 22,2023",
            time: "18:13:01",
            assets: "BTC/USDT",
            order_id: "TID103129412",
            price: " $ 123,322,412",
            amount: "1.32515123",
            type: "Instant",
            total: "$123,322,412",
        },
    ];

    const token_rate = [
        {
            name: "BTC/USDT",
            rate: "+0.25%",
        },
        {
            name: "ETH/USDT",
            rate: "+0.25%",
        },
        {
            name: "XRP/USDT",
            rate: "+0.25%",
        },
        {
            name: "XRP/ETH",
            rate: "+0.25%",
        },
        {
            name: "ETH/BTC",
            rate: "+0.25%",
        },
        {
            name: "DOGE/USDT",
            rate: "+0.25%",
        },
        {
            name: "XRP/DOGE",
            rate: "+0.25%",
        },
        {
            name: "ARB/ETH",
            rate: "+0.25%",
        },
        {
            name: "ARB/ETH",
            rate: "+0.25%",
        },
        {
            name: "ARB/ETH",
            rate: "+0.25%",
        },
    ];

    const my_orders = [
        {
            date: "Nov 22,2023",
            time: "18:13:01",
            market: "BTC/USDT",
            price: "$123,322,412",
            volume: "1.32515123",
            executed: "100%",
            txid: <IcExternalLink />,
            action: <IcCancel />,
        },
        {
            date: "Nov 22,2023",
            time: "18:13:01",
            market: "BTC/USDT",
            price: "$123,322,412",
            volume: "1.32515123",
            executed: "100%",
            txid: <IcExternalLink />,
            action: <IcCancel />,
        },
        {
            date: "Nov 22,2023",
            time: "18:13:01",
            market: "BTC/USDT",
            price: "$123,322,412",
            volume: "1.32515123",
            executed: "100%",
            txid: <IcExternalLink />,
            action: <IcCancel />,
        },
        {
            date: "Nov 22,2023",
            time: "18:13:01",
            market: "BTC/USDT",
            price: "$123,322,412",
            volume: "1.32515123",
            executed: "100%",
            txid: <IcExternalLink />,
            action: <IcCancel />,
        },
        {
            date: "Nov 22,2023",
            time: "18:13:01",
            market: "BTC/USDT",
            price: "$123,322,412",
            volume: "1.32515123",
            executed: "100%",
            txid: <IcExternalLink />,
            action: <IcCancel />,
        },
    ];

    const OrdertableMenu = () => {
        return (
            <>
                <div className="grid grid-cols-7 my-4 border-b text-center">
                    <Text>{t("swap.orderTable.date")}</Text>
                    <Text>{t("swap.orderTable.market")}</Text>
                    <Text>{t("swap.orderTable.price")}</Text>
                    <Text>{t("swap.orderTable.volume")}</Text>
                    <Text>{t("swap.orderTable.executed")}</Text>
                    <Text>{t("swap.orderTable.txId")}</Text>
                    <Text>{t("swap.orderTable.action")}</Text>
                </div>
                {my_orders.map((order) => (
                    <div className="grid grid-cols-7 my-4 border-b text-center items-center">
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
                ))}
                <Pagination />
            </>
        );
    };

    const SwapMenu = () => {
        return (
            <>
                <section className="mt-4 flex items-center justify-center lg:flex-row flex-col space-y-4 space-x-0 lg:space-y-0 lg:space-x-4">
                    <div className="space-y-2 w-full h-full">
                        <Text>{t("swap.swapMenu.tokenToSwap")}</Text>
                        <div className="bg-[#0E0F19] rounded-lg p-4 flex items-center space-x-2">
                            <div className="flex items-center space-x-2 bg-[#171923] p-2 rounded-lg">
                                <IcBitcoin height="24" width="24" />
                                <Text>BTC</Text>
                                <IcThreeDotsVertical />
                            </div>
                            <Input placeholder="0.00" className="bg-transparent" />
                            <Button className="border border-[#F23F5D] bg-[#20131e] text-[#F23F5D] py-2 px-4 h-auto">
                                Max
                            </Button>
                        </div>
                        <div className="flex justify-between items-center">
                            <Text>{t("swap.swapMenu.availableBalance")}</Text>
                            <Text>0.01452618 BTC</Text>
                        </div>
                        {selectedSwapMenu !== "Limit Swap" && (
                            <div className="flex items-center space-x-2 bg-[#21222d] p-4 rounded-xl">
                                <Slider
                                    defaultValue={[0]}
                                    max={100}
                                    value={[leverage]}
                                    className={"w-[80%]"}
                                    onValueChange={(e) => setLeverage(e as unknown as number)}
                                />
                                <div
                                    style={{
                                        background: `#272a35`,
                                        border: `1px solid rgba(255, 255, 255, 0.10)`,
                                    }}
                                    className="w-1/5 h-10 rounded-lg flex items-center p-2"
                                >
                                    <Input
                                        className="w-2/3 bg-transparent text-right"
                                        value={leverage}
                                        placeholder={leverage.toString()}
                                        onChange={handleChangeInputSlider}
                                    />
                                    <Text>%</Text>
                                </div>
                            </div>
                        )}
                        <div className="grid grid-cols-5 space-x-1">
                            {leverageCount.map((value) => (
                                <Button
                                    className="h-auto text-xs rounded-full bg-[#21222e] py-1 px-6"
                                    onClick={() => setLeverage(value)}
                                >
                                    {value}%
                                </Button>
                            ))}
                            <Button
                                className="h-auto text-xs rounded-full bg-[#21222e] py-1 px-6"
                                onClick={() => setLeverage(100)}
                            >
                                {t("swap.swapMenu.max")}
                            </Button>
                        </div>
                        {selectedSwapMenu === "Limit Swap" && (
                            <div className="flex justify-between items-center my-2 p-4 bg-[#21222e] rounded-lg ">
                                <div className="space-y-4">
                                    <Text className="text-[#90A3BF]">
                                        {t("swap.swapMenu.swapUsdtAtARate")}
                                    </Text>
                                    <Text>0.000015</Text>
                                </div>
                                <div className="space-y-4 text-right">
                                    <Text className="text-[#F23F5D]">
                                        {t("swap.swapMenu.useMarket")}
                                    </Text>
                                    <Text className="text-[#90A3BF]">BTC</Text>
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <IcScrollV className="rotate-90" />
                    </div>
                    <div className="space-y-2 w-full h-full">
                        <div className="flex justify-between items-center">
                            <Text>{t("swap.swapMenu.tokenToReceive")}</Text>
                            <IcGas onClick={() => setOpenCoinInfo(true)} />
                        </div>
                        <div className="bg-[#0E0F19] rounded-lg p-4 flex items-center space-x-2">
                            <div className="flex items-center space-x-2 bg-[#171923] p-2 rounded-lg">
                                <IcBitcoin height="24" width="24" />
                                <Text>BTC</Text>
                                <IcThreeDotsVertical />
                            </div>
                            <Input placeholder="0.00" className="bg-transparent" />
                            <Button className="border border-[#F23F5D] bg-[#20131e] text-[#F23F5D] py-2 px-4 h-auto">
                                {t("swap.swapMenu.max")}
                            </Button>
                        </div>
                        <div className="flex justify-between items-center">
                            <Text>{t("swap.swapMenu.availableBalance")}</Text>
                            <Text>0.01452618 BTC</Text>
                        </div>
                        <div className="flex justify-between items-center">
                            <Text>{t("swap.swapMenu.slippageTolerance")}</Text>
                            <div className="bg-[#0E0F19] py-2 px-4 rounded-lg">
                                <Text>5%</Text>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <div className="bg-[#0E0F19] rounded-lg p-2">
                                <Text className="">{t("swap.swapMenu.minReceived")}:</Text>
                                <Text className="text-xs">0.00 USDT</Text>
                            </div>
                            <div className="bg-[#0E0F19] rounded-lg p-2">
                                <Text className="">{t("swap.swapMenu.serviceFee")}:</Text>
                                <Text className="text-xs">0.00 USDT</Text>
                            </div>
                            <div className="bg-[#0E0F19] rounded-lg p-2">
                                <Text className="">{t("swap.swapMenu.networkFee")}:</Text>
                                <Text className="text-xs">0.00 USDT</Text>
                            </div>
                        </div>
                    </div>
                </section>
                <Button
                    onClick={() => setOpenInsufficientBalance(true)}
                    className="rounded-full w-full mt-2 bg-[#F23F5D]"
                >
                    {t("swap.swapMenu.swap")}
                </Button>
            </>
        );
    };
    return (
        <>
            <main className="flex space-x-0 lg:flex-row flex-col lg:space-y-0 lg:space-x-4 space-y-4">
                <div className="p-4 items-center space-x-2 lg:hidden flex bg-[#181924] rounded-lg">
                    <div className="flex items-center space-x-2 w-full">
                        <IcDoubleCurrency />
                        <IcBitcoin />
                        <Text className="text-white">BTC/USD</Text>
                        <Text className="text-[#33D49D] p-1 bg-[#25402f] rounded-full">
                            +2.00%
                        </Text>
                    </div>
                    <div className="flex justify-end w-max">
                        <IcTrade />
                        <IcInfo />
                    </div>
                </div>
                <OrderBookSwap />
                <div style={styles} className="h-[40vh] lg:h-[60vh] lg:w-4/5 w-full">
                    <TradingView />
                </div>
            </main>
            <main className="mt-4 flex lg:space-x-4 lg:space-y-0 space-y-4 space-x-0 flex-col-reverse lg:flex-row">
                <div
                    style={{
                        borderRadius: `8px`,
                        background: `var(--Dark-Dark-2, #181924)`,
                        backdropFilter: `blur(12px)`,
                    }}
                    className="p-6 lg:w-1/2 w-full"
                >
                    <div className="flex justify-between">
                        <div className="flex space-x-4 border-b-[0.5px] border-b-[#F23F5D] w-full">
                            {pool_menu.map((menu) => (
                                <Text
                                    className={`${selectedPoolMenu === menu
                                            ? "text-white border-b-2 border-[#F23F5D]"
                                            : ""
                                        } cursor-pointer`}
                                    onClick={() => setSelectedPoolMenu(menu)}
                                >
                                    {t(`swap.${menu}`)}
                                </Text>
                            ))}
                        </div>
                    </div>

                    {selectedPoolMenu === "Pool Swaps" ? (
                        <>
                            <SwapTable
                                row={[
                                    "#",
                                    "Address",
                                    "Protocol",
                                    "Type",
                                    "Pay",
                                    "Receive",
                                    "Time",
                                    "TxID",
                                    "Status",
                                ]}
                                col={pool_swaps.map((pool) => (
                                    <div className="grid grid-cols-9 my-4 border-b text-center items-center">
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
                                ))}
                            />
                            <Pagination />
                        </>
                    ) : selectedPoolMenu === "Owners Chart" ? (
                        <>
                            <SwapTable
                                className="text-left"
                                row={["Rank", "Address", "Quantity"]}
                                col={owners_charts.map((pool) => (
                                    <div className="grid grid-cols-3 my-4 border-b text-left items-center">
                                        <Text>{pool.rank}</Text>
                                        <Text>{pool.address}</Text>

                                        <div className="flex space-x-1 items-center justify-start">
                                            <Text>{pool.quantity}</Text>
                                            <IcQuestionMark />
                                        </div>
                                    </div>
                                ))}
                            />
                            <Pagination />
                        </>
                    ) : (
                        <>
                            <SwapTable
                                row={["Date", "Assets", "Order ID", "Price", "Amount"]}
                                col={my_trades.map((pool) => (
                                    <div className="grid grid-cols-5 my-4 border-b text-center items-center">
                                        <div>
                                            <Text>{pool.date}</Text>
                                            <Text>{pool.time}</Text>
                                        </div>
                                        <Text>{pool.assets}</Text>
                                        <Text>{pool.order_id}</Text>
                                        <Text>{pool.price}</Text>
                                        <Text>{pool.amount}</Text>
                                    </div>
                                ))}
                            />
                            <Pagination />
                        </>
                    )}
                </div>
                <div
                    style={{
                        borderRadius: `8px`,
                        background: `var(--Dark-Dark-2, #181924)`,
                        backdropFilter: `blur(12px)`,
                    }}
                    className="p-6 lg:w-1/2 w-full"
                >
                    <div className="flex justify-between">
                        <div className="flex space-x-4 border-b-[0.5px] border-b-[#F23F5D] w-full">
                            {swap_menu.map((menu) => (
                                <Text
                                    className={`${selectedSwapMenu === menu
                                            ? "text-white border-b-2 border-[#F23F5D]"
                                            : ""
                                        } cursor-pointer`}
                                    onClick={() => setSelectedSwapMenu(menu)}
                                >
                                    {t(`swap.${menu}`)}
                                </Text>
                            ))}
                        </div>
                    </div>
                    {selectedSwapMenu === "My Open Order" ? (
                        <OrdertableMenu />
                    ) : (
                        <SwapMenu />
                    )}
                </div>
                <button onClick={() => setOpenConfirmInstantSwap(true)}>swap</button>
            </main>
            <div className="hidden mt-4 border-t border-[#ADB1B8] p-2 justify-between lg:flex">
                <div className="flex space-x-1">
                    <IcUnstableConnection />
                    <Text>{t("swap.unstableConnection")}</Text>
                </div>
                {token_rate.map((token) => (
                    <div className="border-l border-[#ADB1B8] px-2 flex space-x-1">
                        <Text>{token.name}</Text>
                        <Text className="text-green">{token.rate}</Text>
                    </div>
                ))}
            </div>
            <ModalInsufficientBalance
                isOpen={openInsufficientBalance}
                closeModal={() => setOpenInsufficientBalance(false)}
            />
            <ModalCoinInfo
                isOpen={openCoinInfo}
                closeModal={() => setOpenCoinInfo(false)}
            />
            <ModalConfirmInstantSwap
                isOpen={openConfirmInstantSwap}
                closeModal={() => setOpenConfirmInstantSwap(false)}
            />
        </>
    );
};
