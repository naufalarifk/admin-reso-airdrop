/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode, FC } from "react";

import { cn } from "@/utils";
import {
  ButtonWalletConnectV2,
  useWalletStore,
} from "../ButtonConnectWalletV2";
import {
  getOrder,
  MarketOrder,
  useListMarketOrder,
} from "./hooks/useMarketOder";
import { ModalConfirmInstantSwap } from "../ModalConfirmInstantSwap";
import { baseApi } from "@/api/config";
import toast from "react-hot-toast";
import { ModalGasFee } from "../ModalGasFee";
import { Gas, useGasServiceState } from "../ModalGasFee/hooks/useGasStore";
import { BalanceButtons } from "../ButtonBalancePercentage";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/atoms";
import { Currencies, Market } from "@/pages/Dummy/types";

export interface TabsData {
  label: string;
  content: ReactNode;
}

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
  price: number;
  balance?: string;
  currentPrice?: string;
  connected: boolean;
  pair?: Pair;
  unitLoading: boolean;
}

interface SwapSelectTokenProps {
  maxButton: () => void;
  handleInput: (value: string) => void;
  value: string;
  unit: string;
  name: string;
  disable?: boolean;
}

type Pair = {
  id: string;
  name: string;
};

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
  disable,
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
            disabled={disable}
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
            className="text-primary border-primary/30 border absolute end-5 bottom-6  md:end-6 md:bottom-6 bg-primary/10 focus:outline-none font-medium rounded-lg text-xs md:text-xs p-2"
          >
            MAX
          </button>
        </div>
      </div>
    </>
  );
};

const LAST = 38;

const SwapComponent = ({
  currentType,
  baseUnit,
  quoteUnit,
  connected,
  balance,
  unitLoading,
  price,
}: SwapComponentProps) => {
  // const location = useLocation();
  // const { token } = useWalletStore();
  const token = localStorage?.getItem("auth");
  const { gas, getPublicGas } = useGasServiceState();

  const [reverse, setReverse] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalGas, setModalGas] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [, setBalance] = useState("");
  const [buttons] = useState(["0%", "25%", "50%", "75%", "MAX"]);

  const [gasValue, setGasValue] = useState<Gas | null>(null);

  const [, setSide] = useState(quoteUnit);

  const [openModalConfirm, setOpenModalConfirm] = useState(false);

  const [quantity, setQuantity] = useState("");
  const [total, setTotal] = useState("");

  // const pairName = location.state?.name.split("/");

  const handleClickButtonPercentage = (index: number) => {
    setActiveIndex(index);
    const value = buttons[index];
    let percent = parseInt(value);
    if (value === "Max") {
      percent = 100;
    }

    const newBalance = (percent / 100) * 1;
    setBalance(newBalance.toString());
  };

  const handleQuantityChange = (event: string) => {
    setQuantity(event);
    setTotal((+event * price).toString());
  };

  const handleTotalChange = (event: string) => {
    setTotal(event);
    setQuantity((+event / price).toString());
  };

  const postData = async () => {
    setLoading(true);

    // {
    //   market: 'memeusdt',
    //   txid: "e35d9d1636ec0375b4f524b9825d400c20ca77bd1fd9b49252874dde8983a301",
    //   side: pairName?.[0] === side.toLocaleUpperCase() ? "buy" : "sell",
    //   quantity: Number(quantity),
    //   price: currentType === "limit" ? LAST : null,
    //   ord_type: currentType,
    // },

    try {
      console.log("enak");
      await baseApi.post(
        `/finex/market/orders`,
        {
          market: "memeusdt",
          txid: "e35d9d1636ec0375b4f524b9825d400c20ca77bd1fd9b49252874dde8983a301",
          side: "buy",
          quantity: Number(quantity),
          price: "0.02",
          ord_type: currentType,
        },
        {
          headers: {
            "x-csrf-token": token,
          },
        }
      );
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log("error", error);

      toast.error(error);
    }
  };

  const calculateUnit = useCallback(() => {
    return reverse ? quoteUnit : baseUnit;
  }, [baseUnit, quoteUnit, reverse]);

  const displayUnit = useCallback(() => {
    return reverse ? baseUnit : quoteUnit;
  }, [baseUnit, quoteUnit, reverse]);

  useEffect(() => {
    if (reverse) {
      setTotal((+quantity / LAST).toString());
      setSide(displayUnit());
    } else {
      setSide(displayUnit());
      setTotal((+quantity * LAST).toString());
    }
  }, [quoteUnit, quantity, reverse, displayUnit]);

  useEffect(() => {
    getPublicGas();
  }, []);

  return (
    <div className="max-w-5xl relative">
      <div className="grid relative grid-cols-1 md:grid-cols-2 gap-16">
        <div className="mt-5 z-10">
          <div className="text-sm mb-4">Token to Swap</div>
          <div>
            {unitLoading ? (
              <Skeleton>
                <div className="h-16 w-full  bg-dark3" />
              </Skeleton>
            ) : (
              <SwapSelectToken
                name={reverse ? quoteUnit : baseUnit}
                unit={calculateUnit()}
                maxButton={() => ""}
                disable={!connected}
                handleInput={handleQuantityChange}
                value={quantity.toString()}
              />
            )}
            {unitLoading ? (
              <Skeleton className="mt-2">
                <div className="h-4 w-full  bg-dark3" />
              </Skeleton>
            ) : (
              <div className="text-xs text-soft mt-2">
                Available balance: {balance}
              </div>
            )}
            <div className="flex gap-3 mt-2 items-center justify-between">
              {buttons.map((button, index) => (
                <BalanceButtons
                  key={index}
                  value={button}
                  onClick={() => handleClickButtonPercentage(index)}
                  isActive={index <= activeIndex!}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-between gap-4 mt-5">
            {unitLoading ? (
              <Skeleton>
                <div className="h-[5.6rem] w-full  bg-dark3" />
              </Skeleton>
            ) : (
              <div className="bg-[#5D636F1A] w-full p-4 space-y-4 rounded-xl ">
                <div className="flex justify-between items-center">
                  <div className="text-soft text-xs">
                    {currentType === "market" ? "Estimated Price" : "Price"}
                  </div>
                  {currentType === "limit" && (
                    <div className="text-primary text-xs">Use Market</div>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm">{price}</div>
                  <div className="text-xs text-soft uppercase">{quoteUnit}</div>
                </div>
              </div>
            )}
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
            {unitLoading ? (
              <Skeleton>
                <div className="h-16 w-full  bg-dark3" />
              </Skeleton>
            ) : (
              <SwapSelectToken
                name={reverse ? baseUnit : quoteUnit}
                unit={displayUnit()}
                maxButton={() => ""}
                disable={!connected}
                handleInput={handleTotalChange}
                value={total.toString()}
              />
            )}
            {unitLoading ? (
              <Skeleton className="mt-2">
                <div className="h-4 w-full  bg-dark3" />
              </Skeleton>
            ) : (
              <div className="text-xs text-soft mt-2">
                Available balance: {balance}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center mt-5">
            <div className="text-xs w-full text-soft">Gas fee (Network)</div>
            {unitLoading ? (
              <Skeleton className="mt-2 items-end">
                <div className="h-4 w-full  bg-dark3" />
              </Skeleton>
            ) : (
              <div
                onClick={() => setModalGas(!modalGas)}
                className="text-xs cursor-pointer text-white flex items-center gap-2"
              >
                <span>Medium</span>
                <button className="bg-dark p-1 rounded">
                  <svg
                    width={16}
                    height={17}
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.167 4.195a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3.666a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5H5.167zm.5 3v-2h2.666v2H5.667zm-1.167-5A1.833 1.833 0 002.667 4.03v9.833H2.5a.5.5 0 000 1h9a.5.5 0 000-1h-.167V12.66A1.83 1.83 0 0014 11.032V7.14c0-.397-.129-.783-.367-1.1l-.733-.978a.5.5 0 00-.8.6l.733.978c.108.144.167.32.167.5v3.892a.83.83 0 01-1.66 0v-1.17a.507.507 0 00-.007-.08V4.028A1.834 1.834 0 009.5 2.195h-5zm5.833 11.667H3.667V4.029c0-.46.373-.834.833-.834h5c.46 0 .833.374.833.834v9.833z"
                      fill="#90A3BF"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center mt-4 gap-2">
            {unitLoading ? (
              Array.from({ length: 3 }).map(() => (
                <Skeleton>
                  <div className="h-16 w-full  bg-dark3" />
                </Skeleton>
              ))
            ) : (
              <>
                <div className="bg-dark space-y-2 rounded-lg text-center p-1">
                  <div className="text-xxs whitespace-nowrap text-soft">
                    Service Fee (0.6%):
                  </div>
                  <div className="text-xxs whitespace-nowrap text-white">
                    0.00000000
                  </div>
                </div>
                <div className="bg-dark space-y-2 rounded-lg text-center p-1">
                  <div className="text-xxs whitespace-nowrap text-soft">
                    Network Fee:
                  </div>
                  <div className="text-xxs whitespace-nowrap text-white">
                    0.00000000
                  </div>
                </div>
                <div className="bg-dark space-y-2 rounded-lg text-center p-1">
                  <div className="text-xxs whitespace-nowrap text-soft">
                    Total received:
                  </div>
                  <div className="text-xxs whitespace-nowrap text-white">
                    0.00000000
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div>
        {connected ? (
          <button
            disabled={+quantity <= 0 || loading}
            onClick={() => setOpenModalConfirm(!openModalConfirm)}
            className="rounded-full w-full py-3 mt-10  bg-primary disabled:bg-primary/30"
          >
            {loading ? "Loading..." : "Swap"}
          </button>
        ) : (
          <ButtonWalletConnectV2 className="bg-primary w-full flex items-center justify-center mt-10 hover:bg-primary/75" />
        )}

        <ModalConfirmInstantSwap
          isOpen={openModalConfirm}
          valueReceived={total}
          closeModal={() => setOpenModalConfirm(false)}
          valueSwap={quantity}
          totalPair={reverse ? baseUnit : quoteUnit}
          amountPair={reverse ? quoteUnit : baseUnit}
          tokenPrice={LAST.toString()}
          type={currentType === "market" ? "Instant" : "Limit"}
          handleSubmit={() => {
            postData();
            setOpenModalConfirm(false);
            setQuantity("");
            setTotal("");
          }}
        />

        <ModalGasFee
          isOpen={modalGas}
          gasList={gas}
          selected={gasValue}
          handleSelectedGas={setGasValue}
          closeModal={() => setModalGas(!modalGas)}
        />
      </div>
    </div>
  );
};

interface HistorySwapProps {
  unitLoading: boolean;
  getCurrentPair: Currencies;
  getCurrentMarket: Market;
}

export const HistorySwap = ({
  unitLoading,
  getCurrentPair,
  getCurrentMarket,
}: HistorySwapProps) => {
  const { connected, token } = useWalletStore();

  const { orders, cancelOrderById, setOrder } = useListMarketOrder(
    (state) => state
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentType, setCurrentType] = useState<"market" | "limit">("market");

  const { data: ListOrder, isLoading: listLoading } = useQuery({
    queryKey: ["myMarketOrder"],
    queryFn: async () => await getOrder({ state: "wait", token }),
    enabled: currentIndex === 2 && connected,
  });

  useEffect(() => {
    if (ListOrder && connected) {
      setOrder(ListOrder);
    }
  }, [ListOrder, setOrder, connected]);

  useEffect(() => {
    if (currentIndex === 0) {
      setCurrentType("market");
    } else {
      setCurrentType("limit");
    }
  }, [currentIndex]);

  console.log("current price", getCurrentPair);

  const tabs = useMemo(
    () => [
      {
        label: "Instant Swap",
        content: (
          <SwapComponent
            unitLoading={unitLoading}
            balance="0"
            currentPrice={getCurrentPair?.price}
            baseUnit={getCurrentMarket?.base_unit!}
            quoteUnit={getCurrentMarket?.quote_unit!}
            currentType={currentType}
            connected={connected}
            price={Number(getCurrentPair?.price)}
          />
        ),
      },
      {
        label: "Limit Swap",
        content: (
          <SwapComponent
            unitLoading={unitLoading}
            balance="0"
            connected={connected}
            currentType={currentType}
            baseUnit={getCurrentMarket?.base_unit!}
            quoteUnit={getCurrentMarket?.quote_unit!}
            price={Number(getCurrentPair?.price)}
          />
        ),
      },
      {
        label: "My Open Order",
        content: (
          <>
            <div className="relative overflow-x-scroll  h-full lg:max-h-96">
              <table className="w-full text-sm text-left rtl:text-right  text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-soft uppercase sticky top-0 bg-dark2">
                  <tr>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
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
                  {listLoading ? (
                    <tr>
                      <td
                        className="text-center pt-4 gap-3 space-y-2"
                        colSpan={7}
                      >
                        {Array.from({ length: 4 }).map(() => (
                          <Skeleton>
                            <div className="h-10 w-full  bg-dark3" />
                          </Skeleton>
                        ))}
                      </td>
                    </tr>
                  ) : orders?.length > 0 ? (
                    orders?.map((item: MarketOrder) => (
                      <tr key={item.uuid}>
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
                    <tr className=" h-96">
                      <td className="text-gray-200  text-center" colSpan={7}>
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
      connected,
      currentType,
      getCurrentMarket?.base_unit,
      getCurrentMarket?.quote_unit,
      getCurrentPair?.price,
      listLoading,
      orders,
      unitLoading,
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
