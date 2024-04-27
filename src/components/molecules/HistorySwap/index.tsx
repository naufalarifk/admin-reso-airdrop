import { cn } from "@/utils";
import type { ReactNode, FC } from "react";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useWalletStore } from "../ButtonConnectWalletV2";
import { useListMarketOrder } from "./hooks/useMarketOder";
import { Dialog, Transition, RadioGroup } from "@headlessui/react";
import axios, { AxiosResponse } from "axios";
import type { UnisatWalletTypes } from "@/config/connectors/unisat";
import { baseApi } from "@/api/config";

export interface TabsData {
  label: string;
  content: ReactNode;
}

type Coin = {
  symbol: string;
  name: string;
  type: string;
  base_unit: string;
  quote_unit: string;
  min_price: number;
  max_price: number;
  min_amount: number;
  amount_precision: number;
  price_precision: number;
  total_precision: number;
  state: string;
};

type TabsProps = {
  items: TabsData[];
  getCurrentIndex?: (index: number) => void;
  isBetween?: boolean;
  classNameWrapper?: string;
  rightContent?: ReactNode;
  classNameButtons?: string;
};

interface SwapSelectTokenProps {
  open: boolean;
  handleOpen: () => void;
  selectedToken: Coin | null;
  setSelectedToken: (value: Coin) => void;
  listToken: Coin[];
  maxButton: () => void;
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
  handleOpen,
  listToken,
  open,
  selectedToken,
  setSelectedToken,
  maxButton,
}: SwapSelectTokenProps) => {
  return (
    <>
      <div className="bg-dark2 p-5">
        <div className="relative w-full bg-dark p-4 rounded-lg">
          <button
            type="button"
            onClick={handleOpen}
            className="absolute bg-neutral-800 px-3 h-10 inset-y-0 rounded-md top-5 flex items-center "
          >
            {selectedToken ? (
              <div className="flex gap-2 items-center">
                {/* <div className="w-5 h-5 rounded-full overflow-hidden">
                  <img src={selectedToken.iconUrl} alt="token" />
                </div> */}
                <span>{selectedToken.name}</span>
                <span>
                  <svg
                    width={3}
                    height={14}
                    viewBox="0 0 3 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx={1.5}
                      cy={12.0977}
                      r={1.5}
                      transform="rotate(-90 1.5 12.098)"
                      fill="#90A3BF"
                    />
                    <circle
                      cx={1.5}
                      cy={7.09766}
                      r={1.5}
                      transform="rotate(-90 1.5 7.098)"
                      fill="#90A3BF"
                    />
                    <circle
                      cx={1.5}
                      cy={2.09766}
                      r={1.5}
                      transform="rotate(-90 1.5 2.098)"
                      fill="#90A3BF"
                    />
                  </svg>
                </span>
              </div>
            ) : (
              <div>Select</div>
            )}
          </button>
          <input
            type="string"
            // onChange={(e) => setBalanceInput(e.target.value)}
            // disabled={balance.total === 0}
            name="balance"
            // value={balanceInput}
            id="default-search"
            className="block bg-transparent w-10/12 md:w-9/12 p-4 ps-32 text-sm  placeholder:text-soft text-white font-semibold outline-none  rounded-lg"
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

      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-[999999]" onClose={handleOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-dark p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="mb-5">
                    <div className="text-white font-medium text-lg">
                      Select a token
                    </div>
                  </Dialog.Title>

                  <RadioGroup
                    value={selectedToken}
                    className=" h-[30rem] overflow-y-scroll"
                    onChange={(coin) => {
                      setSelectedToken(coin!);
                      handleOpen();
                    }}
                  >
                    <div className="space-y-2">
                      {listToken &&
                        listToken?.map((plan) => (
                          <RadioGroup.Option
                            key={plan.name}
                            value={plan}
                            className={({ checked }) =>
                              ` 
                  ${checked ? "bg-primary/75 text-white" : "bg-dark2"}
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                            }
                          >
                            {({ checked }) => (
                              <>
                                <div className="flex w-full items-center justify-between">
                                  <div className="flex items-center gap-4">
                                    <div className="text-sm">
                                      <RadioGroup.Label
                                        as="p"
                                        className={`font-medium  ${
                                          checked ? "text-white" : "text-soft"
                                        }`}
                                      >
                                        {plan.name}
                                      </RadioGroup.Label>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                    </div>
                  </RadioGroup>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

const SwapComponent = () => {
  const { realBalance } = useWalletStore();

  const baseUrl = import.meta.env.VITE_API_URL;

  const [amount, setAmount] = useState(0);
  const [coin, setCoin] = useState<Coin[]>([]);
  const [open, setOpen] = useState(false);

  console.log("amount", amount);

  const [inscription, setInscription] = useState<
    UnisatWalletTypes.Inscription[]
  >([]);

  console.log("inscription", inscription);

  const [openPair, setOpenPair] = useState(false);

  const [tokenOne, setTokenOne] = useState<Coin | null>(null);
  const [tokenTwo, setTokenTwo] = useState<Coin | null>(null);

  const handleSelectCoinOne = (selected: Coin) => {
    setTokenOne(selected);
  };

  const handleMaxBalance = () => {
    setAmount(+realBalance?.confirm_btc_amount / 100000000);
  };

  const getCurrencies = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        `${baseUrl}/api/v2/trade/public/currencies?limit=100&page=1&ordering=asc&order_by=position`
      );

      setCoin(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getInscription = async () => {
    try {
      const response = await window.unisat.getInscriptions(0, 10);
      setInscription(response.list);
    } catch (error) {
      console.log("error", error);
    }
  };

  const token = localStorage.getItem("auth");

  const postData = async () => {
    try {
      const response = await baseApi.post(
        `finex/market/orders`,
        {
          market: "btcusd",
          txid: "e35d9d1636ec0375b4f524b9825d400c20ca77bd1fd9b49252874dde8983a301",
          side: "buy",
          quantity: 1,
          price: 0.1,
        },
        {
          headers: {
            "X-CSRF-TOKEN": token,
          },
        }
      );
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getCurrencies();
  }, []);

  useEffect(() => {
    getInscription();
  }, []);

  const handleSelectCoinTwo = (selected: Coin) => {
    setTokenTwo(selected);
  };

  const handleSwap = () => {
    setTokenTwo(tokenOne);
    setTokenOne(tokenTwo);
  };

  return (
    <div className="max-w-5xl ">
      <div className="p-5">
        <div className="mb-5">Token to Swap</div>
        <div className="flex justify-between gap-10 items-center">
          <div>
            <SwapSelectToken
              open={open}
              handleOpen={() => setOpen(!open)}
              listToken={coin}
              maxButton={handleMaxBalance}
              setSelectedToken={handleSelectCoinOne}
              selectedToken={tokenOne}
            />
          </div>
          <div className="cursor-pointer" onClick={handleSwap}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
              />
            </svg>
          </div>
          <div>
            <SwapSelectToken
              open={openPair}
              handleOpen={() => setOpenPair(!openPair)}
              listToken={coin}
              maxButton={handleMaxBalance}
              setSelectedToken={handleSelectCoinTwo}
              selectedToken={tokenTwo}
            />
          </div>
        </div>
        <div className="mt-5">
          Available balance: {realBalance?.confirm_btc_amount}
        </div>

        {/* <div className="max-w-md mx-auto p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">Swap Token</h2>
          <div className="mb-4">
            <label htmlFor="tokenA" className="block mb-1">
              Token A
            </label>
            <select
              id="tokenA"
              value={tokenA}
              onChange={handleTokenAChange}
              className="w-full bg-dark  rounded-md p-2 focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Token A</option>
              {COIN.map((coin) => (
                <option key={coin.uuid} value={coin.symbol}>
                  {coin.name} ({coin.symbol})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="amountA" className="block mb-1">
              Amount A
            </label>
            <input
              id="amountA"
              type="number"
              value={amountA}
              onChange={handleAmountAChange}
              className="w-full border-gray-300 bg-dark  rounded-md p-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tokenB" className="block mb-1">
              Token B
            </label>
            <select
              id="tokenB"
              value={tokenB}
              onChange={handleTokenBChange}
              className="w-full border-gray-300 bg-dark rounded-md p-2 focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Token B</option>
              {COIN.map((coin) => (
                <option key={coin.uuid} value={coin.symbol}>
                  {coin.name} ({coin.symbol})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="amountB" className="block mb-1">
              Amount B
            </label>
            <input
              id="amountB"
              type="number"
              value={amountB}
              onChange={handleAmountBChange}
              className="w-full border-gray-300 bg-dark rounded-md p-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            onClick={handleSwap}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Swap
          </button>
        </div> */}
      </div>
      <div>
        <button
          onClick={postData}
          className="rounded-full w-full py-3  bg-primary"
        >
          Swap
        </button>
      </div>
    </div>
  );
};

export const HistorySwap = () => {
  const { getListMarketOrder, orders } = useListMarketOrder((state) => state);
  const { connected } = useWalletStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex === 2 && connected) {
      getListMarketOrder();
    }
  }, [connected, currentIndex, getListMarketOrder]);

  const tabs = useMemo(
    () => [
      {
        label: "Instant Swap",
        content: <SwapComponent />,
      },
      {
        label: "Limit Swap",
        content: <>Limit Swap</>,
      },
      {
        label: "My Open Order",
        content: (
          <>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-soft uppercase ">
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
                <tbody>
                  {orders?.length <= 0 || orders === undefined ? (
                    <tr>
                      <td
                        className="text-gray-200 pt-28 py-4 text-center"
                        colSpan={12}
                      >
                        No Data Available
                      </td>
                    </tr>
                  ) : (
                    orders?.map((item) => (
                      <tr
                        key={item.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
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
                            <button>
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
                  )}
                </tbody>
              </table>
            </div>
          </>
        ),
      },
    ],
    [orders]
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
