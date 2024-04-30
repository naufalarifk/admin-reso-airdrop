/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode, FC } from "react";

import { cn } from "@/utils";
import {
  ButtonWalletConnectV2,
  useWalletStore,
} from "../ButtonConnectWalletV2";
import { useListMarketOrder } from "./hooks/useMarketOder";
import axios, { AxiosResponse } from "axios";
import { ModalConfirmInstantSwap } from "../ModalConfirmInstantSwap";
import { useParams } from "react-router-dom";
import { baseApi } from "@/api/config";

export interface TabsData {
  label: string;
  content: ReactNode;
}

type Market = {
  id: string;
  symbol: string;
  name: string;
  type: string;
  base_unit?: string;
  quote_unit?: string;
  min_price: string;
  max_price: string;
  min_amount: string;
  amount_precision: number;
  price_precision: number;
  total_precision: number;
  state: string;
};

type Currencies = {
  id: string;
  name: string;
  description: null;
  homepage: null;
  parent_id: null;
  inscription_id: null;
  details: null;
  supplies: null;
  price: string;
  explorer_transaction: string;
  explorer_address: string;
  type: string;
  deposit_enabled: boolean;
  withdrawal_enabled: boolean;
  deposit_fee: string;
  min_deposit_amount: string;
  withdraw_fee: string;
  min_withdraw_amount: string;
  base_factor: number;
  precision: number;
  position: number;
  min_confirmations: number;
};

type TabsProps = {
  items: TabsData[];
  getCurrentIndex?: (index: number) => void;
  isBetween?: boolean;
  classNameWrapper?: string;
  rightContent?: ReactNode;
  classNameButtons?: string;
};

interface SwapComponentProps {
  currentType: "market" | "limit";
  setCurrentIndex?: (index: number) => void;
  baseUnit: string;
  quoteUnit: string;
  balance?: string;
  currentPrice?: string;
  connected: boolean;
}

interface SwapSelectTokenProps {
  maxButton: () => void;
  handleInput: (value: string) => void;
  value: string;
  unit: string;
  name: string;
}

const Tabs: FC<TabsProps> = ({
  items,
  getCurrentIndex,
  isBetween = false,
  classNameWrapper,
  rightContent,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  const tabsRef = useRef<Array<HTMLButtonElement>>([]);

  useEffect(() => {
    const setTabPosition = () => {
      const currentTab = tabsRef.current[activeTabIndex];
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    };

    setTabPosition();
    window.addEventListener("resize", setTabPosition);

    return () => window.removeEventListener("resize", setTabPosition);
  }, [activeTabIndex]);

  const contents = useMemo(
    () => items[activeTabIndex].content,
    [activeTabIndex, items]
  );

  const handleTabClick = (index: number) => {
    setActiveTabIndex(index);
    getCurrentIndex && getCurrentIndex(index);
  };

  return (
    <>
      <div className="bg-dark2 relative grid place-items-center md:flex  gap-5 md:gap-0  md:justify-between  border-b  border-b-primary/45">
        <div
          className={
            (cn(
              `flex ${
                isBetween ? "items-center justify-between" : "gap-4"
              } rounded-lg  p-1 px-1`
            ),
            classNameWrapper)
          }
        >
          {items.map((tab, idx) => (
            <button
              key={idx}
              type="button"
              ref={(el: HTMLButtonElement | null) =>
                (tabsRef.current[idx] = el as HTMLButtonElement)
              }
              className={`text-center py-3 text-xs border-b-2 px-4 font-semibold ${
                activeTabIndex === idx
                  ? "border-primary text-white"
                  : "text-soft border-transparent"
              }`}
              onClick={() => handleTabClick(idx)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <span
          className="absolute bottom-3 block h-1 rounded-lg bg-primary-1 transition-all duration-300"
          style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
        />
        {rightContent}
      </div>
      {typeof contents === "string" ? (
        <div className="mt-4">{contents}</div>
      ) : (
        contents
      )}
    </>
  );
};

const SwapSelectToken = ({
  maxButton,
  handleInput,
  value,
  unit,
  name,
}: SwapSelectTokenProps) => {
  return (
    <>
      <div className="bg-dark2">
        <div className="relative w-full bg-dark p-4 rounded-lg">
          <div className="absolute bg-neutral-800 px-3 h-10 inset-y-0 pointer-events-none rounded-md top-5 uppercase flex items-center ">
            {unit}
          </div>
          <input
            type="string"
            onChange={(e) => handleInput(e.target.value)}
            // disabled={balance.total === 0}
            name={name}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            value={value}
            id="default-search"
            className="block bg-transparent w-10/12 md:w-9/12 p-4 ps-20 text-sm  placeholder:text-soft text-white font-semibold outline-none  rounded-lg"
            placeholder="0.00"
          />
          <button
            type="button"
            onClick={maxButton}
            className="text-primary absolute end-5 bottom-6  md:end-6 md:bottom-6 bg-primary/10 focus:outline-none font-medium rounded-lg text-xs md:text-xs p-2"
          >
            MAX
          </button>
        </div>
      </div>
    </>
  );
};

const LAST = 63_618.38;
const baseUrl = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("auth");

const SwapComponent = ({
  currentType,
  baseUnit,
  quoteUnit,
  balance,
  connected,
}: SwapComponentProps) => {
  const [reverse, setReverse] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [changeCalculate, setChangeCalculate] = useState(false);

  // const [openModalConfirm, setOpenModalConfirm] = useState(false);

  const [quantity, setQuantity] = useState("");
  const [total, setTotal] = useState("");

  const handleQuantityChange = (event: string) => {
    setQuantity(event);
    setTotal((+event * LAST).toString());
  };

  const handleTotalChange = (event: string) => {
    setTotal(event);
    setQuantity((+event / LAST).toString());
  };

  const postData = async () => {
    setLoading(true);
    try {
      const response = await baseApi.post(
        `finex/market/orders`,
        {
          market: "btcusd",
          txid: "e35d9d1636ec0375b4f524b9825d400c20ca77bd1fd9b49252874dde8983a301",
          side: "buy",
          quantity: Number(quantity),
          price: currentType === "limit" ? 0.1 : null,
          ord_type: currentType,
        },
        {
          headers: {
            "X-CSRF-TOKEN": token,
          },
        }
      );
      setLoading(false);
      console.log("response", response);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (reverse) {
      setTotal((+quantity / LAST).toString());
    } else {
      setTotal((+quantity * LAST).toString());
    }
  }, [quantity, reverse]);

  const calculateUnit = () => {
    return reverse ? quoteUnit : baseUnit;
  };

  const displayUnit = () => {
    return reverse ? baseUnit : quoteUnit;
  };

  return (
    <div className="max-w-5xl relative">
      <div className="grid relative grid-cols-2 gap-16">
        <div className="mt-5 z-10">
          <div className="text-sm mb-4">Token to Swap</div>
          <div>
            <SwapSelectToken
              name="receive"
              unit={calculateUnit()}
              maxButton={() => ""}
              handleInput={handleQuantityChange}
              value={quantity.toString()}
            />
            <div className="text-xs text-soft mt-2">
              Available balance: {balance}
            </div>
          </div>
          <div className="flex justify-between gap-4 mt-5">
            <div className="bg-[#5D636F1A] w-full p-4 space-y-4 rounded-xl ">
              <div className="text-soft text-xs">
                {" "}
                {currentType === "market" ? "Estimated Price" : "Price"}
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm">{LAST}</div>
                <div className="text-xs text-soft uppercase">{quoteUnit}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-20 inset-y-20 flex items-center justify-center">
          <div
            className="cursor-pointer   bg-primary/20 text-primary w-8 h-8 flex items-center justify-center border-primary/40 border-2 rounded-lg  mt-12"
            onClick={() => {
              setReverse((prev) => !prev);
              setQuantity("");
              setTotal("");
            }}
          >
            <svg
              viewBox="0 0 24 21"
              fill="currentColor"
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1783_10527)">
                <path
                  d="M7.707 14.02a1.11 1.11 0 01-.707.244 1.11 1.11 0 01-.707-.244l-4-3.333a.77.77 0 01-.293-.59.77.77 0 01.293-.589l4-3.333c.092-.08.202-.143.324-.187a1.173 1.173 0 01.774-.005c.123.042.234.103.328.182a.84.84 0 01.219.273.714.714 0 01-.007.645.848.848 0 01-.224.27l-3.293 2.745 3.293 2.744A.77.77 0 018 13.43a.77.77 0 01-.293.589zm10 0l4-3.333a.77.77 0 00.293-.59.77.77 0 00-.293-.589l-4-3.333a1.115 1.115 0 00-.704-.234c-.262.002-.513.09-.698.244a.771.771 0 00-.293.582.766.766 0 00.28.586l3.294 2.745-3.293 2.744a.847.847 0 00-.224.27.717.717 0 00-.007.645c.05.102.124.195.218.273.094.079.206.14.329.182a1.179 1.179 0 00.773-.005c.122-.044.232-.107.325-.187z"
                  fill="currentColor"
                />
              </g>
              <defs>
                <clipPath id="clip0_1783_10527">
                  <path
                    fill="currentColor"
                    transform="rotate(-90 10.049 10.049)"
                    d="M0 0H20V24H0z"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>

        <div className="mt-5">
          <div className="text-sm mb-4">Token to Receive</div>
          <div>
            <SwapSelectToken
              name="receive"
              unit={displayUnit()}
              maxButton={() => ""}
              handleInput={handleTotalChange}
              value={total.toString()}
            />
            <div className="text-xs text-soft mt-2">
              Available balance: {balance}
            </div>
          </div>

          <div className="flex justify-between items-center mt-5">
            <div className="text-xs text-soft">Gas fee (Network)</div>
            <div className="text-xs text-white">Medium </div>
          </div>
          <div className="flex justify-between items-center mt-4 gap-2">
            <div className="bg-dark space-y-2 rounded-lg text-center p-1">
              <div className="text-xxs whitespace-nowrap text-soft">
                Service Fee (0.6%):
              </div>
              <div className="text-xxs whitespace-nowrap text-white">
                0.00000000 BTC
              </div>
            </div>
            <div className="bg-dark space-y-2 rounded-lg text-center p-1">
              <div className="text-xxs whitespace-nowrap text-soft">
                Network Fee:
              </div>
              <div className="text-xxs whitespace-nowrap text-white">
                0.00000000 BTC
              </div>
            </div>
            <div className="bg-dark space-y-2 rounded-lg text-center p-1">
              <div className="text-xxs whitespace-nowrap text-soft">
                Total received:
              </div>
              <div className="text-xxs whitespace-nowrap text-white">
                0.00000000 BTC
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        {connected ? (
          <button
            disabled={+quantity <= 0}
            onClick={postData}
            className="rounded-full w-full py-3 mt-10  bg-primary disabled:bg-primary/30"
          >
            {loading ? "Loading..." : "Swap"}
          </button>
        ) : (
          <ButtonWalletConnectV2 className="bg-primary w-full flex items-center justify-center mt-10 hover:bg-primary/75" />
        )}

        {/* <ModalConfirmInstantSwap
          isOpen={openModalConfirm}
          valueReceived={total}
          valueSwap={quantity}
          closeModal={() => setOpenModalConfirm(!openModalConfirm)}
        /> */}
      </div>
    </div>
  );
};

export const HistorySwap = () => {
  const params = useParams();
  const { connected } = useWalletStore();
  const { getListMarketOrder, orders, cancelOrderById } = useListMarketOrder(
    (state) => state
  );

  const [market, setMarket] = useState<Market[]>([]);
  const [currencies, setCurrencies] = useState<Currencies[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentType, setCurrentType] = useState<"market" | "limit">("market");

  const getCurrentMarket = market.find(
    (item) => item.id.toLowerCase() === params.market?.toLowerCase()
  );

  const getCurrentPair = currencies.find(
    (item) => item.id === getCurrentMarket?.quote_unit
  );

  useEffect(() => {
    if (currentIndex === 2 && connected) {
      getListMarketOrder();
    }
  }, [connected, currentIndex, getListMarketOrder]);

  useEffect(() => {
    if (currentIndex === 0) {
      setCurrentType("market");
    } else {
      setCurrentType("limit");
    }
  }, [currentIndex]);

  const getMarkets = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        `${baseUrl}/api/v2/trade/public/markets?limit=100&page=1&ordering=asc&order_by=position`
      );
      setMarket(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getCurrencies = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        `${baseUrl}/api/v2/trade/public/currencies?limit=100&page=1&ordering=asc&order_by=position`
      );
      setCurrencies(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getCurrencies();
  }, []);

  useEffect(() => {
    getMarkets();
  }, []);

  const tabs = useMemo(
    () => [
      {
        label: "Instant Swap",
        content: (
          <SwapComponent
            balance="0"
            currentPrice={getCurrentPair?.price}
            baseUnit={getCurrentMarket?.base_unit!}
            quoteUnit={getCurrentMarket?.quote_unit!}
            currentType={currentType}
            connected={connected}
          />
        ),
      },
      {
        label: "Limit Swap",
        content: (
          <SwapComponent
            connected={connected}
            currentType={currentType}
            baseUnit={getCurrentMarket?.base_unit!}
            quoteUnit={getCurrentMarket?.quote_unit!}
          />
        ),
      },
      {
        label: "My Open Order",
        content: (
          <>
            <div className="relative overflow-x-scroll max-h-96">
              <table className="w-full text-sm text-left rtl:text-right  text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-soft uppercase sticky top-0 bg-dark2">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Order Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Market
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Volume
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Executed
                    </th>
                    <th scope="col" className="px-6 py-3">
                      TxID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-darkSoft/30 overflow-y-scroll">
                  {orders?.length > 0 ? (
                    orders?.map((item) => (
                      <tr key={item.id}>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium whitespace-nowrap"
                        >
                          {item.created_at}
                        </th>
                        <td className="px-6 py-4 uppercase">{item.market}</td>
                        <td className="px-6 py-4">{item.price}</td>
                        <td className="px-6 py-4">{item.origin_volume}</td>
                        <td className="px-6 py-4">{item.executed_volume}</td>
                        <td className="px-6 py-4">
                          {item.txid.length <= 0 ? "-" : item.txid}
                        </td>
                        <td className="text-center">
                          {item.state === "wait" ? (
                            <button
                              onClick={() =>
                                cancelOrderById(item?.uuid.toString())
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 text-primary"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                              </svg>
                            </button>
                          ) : (
                            <button>Check</button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        className="text-gray-200 pt-28 py-4 text-center"
                        colSpan={12}
                      >
                        No Data Available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        ),
      },
    ],
    [
      cancelOrderById,
      currentType,
      getCurrentMarket?.base_unit,
      getCurrentMarket?.quote_unit,
      getCurrentPair?.price,
      orders,
      connected,
    ]
  );

  return (
    <div>
      <Tabs
        items={tabs}
        getCurrentIndex={(currIdx) => setCurrentIndex(currIdx)}
      />
    </div>
  );
};
