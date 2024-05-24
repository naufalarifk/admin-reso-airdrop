import { IcMinus, IcPlus } from '@/assets/icons';
import { Skeleton } from '@/components';
import { Decimal } from '@/components/molecules/Decimal';
import { MarketTicker } from '@/pages/Swap/hooks/usePublicMarkets';
import { Market } from '@/types/components';
import { FC, ReactNode, useEffect, useMemo, useRef, useState } from 'react';

interface TabsData {
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

interface NewFormTradeProps {
   unitLoading: boolean;
   getCurrentMarket: Market;
   marketTradePrice: MarketTicker;
   market: Market;
}

export const NewFormTradeMobile = ({
   getCurrentMarket,
   unitLoading,
   marketTradePrice,
   market,
}: NewFormTradeProps) => {
   const [, setCurrentIndex] = useState(0);

   const tick = marketTradePrice?.ticker;

   const [typeAction, setTypeAction] = useState<'buy' | 'sell'>('buy');

   const tabs = useMemo(
      () => [
         {
            label: 'Limit',
            content: (
               <>
                  <div className="mt-4 space-y-1">
                     {unitLoading ? (
                        <Skeleton>
                           <div className="h-14 w-full  bg-dark3" />
                        </Skeleton>
                     ) : (
                        <>
                           <div className="flex items-center  justify-between">
                              <div className="text-xxs text-darkSoft">
                                 <span className="mr-1 uppercase">
                                    {getCurrentMarket?.base_unit}
                                 </span>
                                 Balance
                              </div>
                              <div className="text-xxs">
                                 0
                                 <span className="ml-1 uppercase">
                                    {getCurrentMarket?.base_unit}
                                 </span>
                              </div>
                           </div>
                           <div className="flex items-center  justify-between">
                              <div className="text-xxs text-darkSoft">
                                 <span className="mr-1 uppercase">
                                    {getCurrentMarket?.quote_unit}
                                 </span>
                                 Balance
                              </div>
                              <div className="text-xxs text-white">
                                 0
                                 <span className="ml-1 uppercase">
                                    {getCurrentMarket?.quote_unit}
                                 </span>
                              </div>
                           </div>
                        </>
                     )}
                  </div>
                  <div className="mt-4 space-y-2">
                     {unitLoading ? (
                        <Skeleton>
                           <div className="h-14 w-full  bg-dark3" />
                        </Skeleton>
                     ) : (
                        <div className="relative flex items-center justify-between rounded-lg bg-dark px-3 py-2 lg:px-3 lg:py-4">
                           <button
                              type="button"
                              className="relative flex size-3 cursor-pointer items-center justify-center text-soft hover:text-primary  lg:size-4">
                              <IcMinus />
                           </button>
                           <input
                              type="text"
                              className="w-7/12 bg-transparent text-center text-xxs placeholder:text-xxs focus:outline-none lg:w-full"
                              placeholder="0"
                              onChange={() => ''}
                              value={Decimal.format(
                                 +tick?.last ?? 0,
                                 market?.price_precision!,
                                 ',',
                              )}
                           />

                           <button
                              type="button"
                              className="relative flex size-3 cursor-pointer items-center justify-center text-soft  hover:text-primary">
                              <IcPlus />
                           </button>
                        </div>
                     )}
                     {unitLoading ? (
                        <Skeleton>
                           <div className="h-14 w-full  bg-dark3" />
                        </Skeleton>
                     ) : (
                        <div className="relative flex items-center justify-between rounded-lg bg-dark px-3 py-2 lg:px-3 lg:py-4">
                           <button
                              type="button"
                              className="relative flex size-3 cursor-pointer items-center justify-center text-soft hover:text-primary  lg:size-4">
                              <IcMinus />
                           </button>
                           <input
                              type="text"
                              disabled
                              className="w-11/12 bg-transparent text-center text-xxs placeholder:font-semibold focus:outline-none lg:w-full"
                              placeholder={`${getCurrentMarket?.base_unit.toUpperCase()} Amount`}
                           />

                           <button
                              type="button"
                              className="relative flex size-3 cursor-pointer items-center justify-center text-soft hover:text-primary  lg:size-4">
                              <IcPlus />
                           </button>
                        </div>
                     )}

                     {/* <div className="relative my-4 flex items-center justify-center">
                        <div className="w-11/12">
                           <SliderPercent
                              range={{ min: 0, max: 100 }}
                              start={''}
                           />
                        </div>
                     </div> */}

                     {unitLoading ? (
                        <Skeleton>
                           <div className="h-24 w-full  bg-dark3" />
                        </Skeleton>
                     ) : (
                        <>
                           <div className="mt-4 flex items-center justify-between text-xxs">
                              <div className="text-darkSoft">Min Amount</div>
                              <div>
                                 0
                                 <span className="ml-1 uppercase">
                                    {getCurrentMarket?.base_unit}
                                 </span>
                              </div>
                           </div>
                           <div className="relative flex items-center justify-between rounded-lg bg-dark px-3 py-2 lg:px-3 lg:py-4">
                              <button
                                 type="button"
                                 className="relative flex size-3 cursor-pointer items-center justify-center text-soft hover:text-primary  lg:size-4">
                                 <IcMinus />
                              </button>
                              <input
                                 type="text"
                                 disabled
                                 className="lg:text-xss w-11/12 bg-transparent text-center text-xxs placeholder:font-semibold focus:outline-none"
                                 placeholder={`${getCurrentMarket?.quote_unit.toUpperCase()} Amount`}
                              />

                              <button
                                 type="button"
                                 className="relative flex size-3 cursor-pointer items-center justify-center text-soft hover:text-primary  lg:size-4">
                                 <IcPlus />
                              </button>
                           </div>
                           <div className="mt-4 flex items-center justify-between text-xxs">
                              <div className="text-darkSoft">Fee transaction</div>
                              <div>
                                 0
                                 <span className="ml-1 uppercase">
                                    {getCurrentMarket?.base_unit}
                                 </span>
                              </div>
                           </div>
                        </>
                     )}
                  </div>
                  <div className="mt-4">
                     {typeAction === 'buy' ? (
                        <button
                           disabled
                           className=" w-full rounded-full bg-success py-2 disabled:bg-success/45    lg:py-3">
                           Buy
                        </button>
                     ) : (
                        <button
                           disabled
                           className=" w-full rounded-full bg-primary py-2 disabled:bg-primary/30 lg:py-3">
                           Sell
                        </button>
                     )}
                  </div>
               </>
            ),
         },
         {
            label: 'Market',
            content: (
               <>
                  <>
                     <div className="mt-4 space-y-1">
                        {unitLoading ? (
                           <Skeleton>
                              <div className="h-14 w-full  bg-dark3" />
                           </Skeleton>
                        ) : (
                           <>
                              <div className="flex items-center  justify-between">
                                 <div className="text-xxs text-darkSoft">
                                    <span className="mr-1 uppercase">
                                       {getCurrentMarket?.base_unit}
                                    </span>
                                    Balance
                                 </div>
                                 <div className="text-xxs">
                                    0
                                    <span className="ml-1 uppercase">
                                       {getCurrentMarket?.base_unit}
                                    </span>
                                 </div>
                              </div>
                              <div className="flex items-center  justify-between">
                                 <div className="text-xxs text-darkSoft">
                                    <span className="mr-1 uppercase">
                                       {getCurrentMarket?.quote_unit}
                                    </span>
                                    Balance
                                 </div>
                                 <div className="text-xxs text-white">
                                    0
                                    <span className="ml-1 uppercase">
                                       {getCurrentMarket?.quote_unit}
                                    </span>
                                 </div>
                              </div>
                           </>
                        )}
                     </div>
                     <div className="mt-4 space-y-2">
                        {unitLoading ? (
                           <Skeleton>
                              <div className="h-14 w-full  bg-dark3" />
                           </Skeleton>
                        ) : (
                           <div className="relative flex items-center justify-between rounded-lg bg-dark px-3 py-4 text-xs">
                              <div className=" text-xxs text-darkSoft lg:text-base">
                                 Market Price
                              </div>
                              <div className="text-xxs font-normal text-darkSoft lg:text-base">
                                 {Decimal.format(+tick?.last ?? 0, market?.price_precision!, ',')}
                              </div>
                           </div>
                        )}
                        {unitLoading ? (
                           <Skeleton>
                              <div className="h-14 w-full  bg-dark3" />
                           </Skeleton>
                        ) : (
                           <div className="relative flex items-center justify-between rounded-lg bg-dark px-3 py-2 lg:px-3 lg:py-4">
                              <button
                                 type="button"
                                 className="relative flex size-3 cursor-pointer items-center justify-center text-soft hover:text-primary  lg:size-4">
                                 <IcMinus />
                              </button>
                              <input
                                 type="text"
                                 disabled
                                 className="w-11/12 bg-transparent text-center text-xxs placeholder:font-semibold focus:outline-none lg:w-full lg:text-base"
                                 placeholder={`${getCurrentMarket?.base_unit.toUpperCase()} Amount`}
                              />

                              <button
                                 type="button"
                                 className="relative flex size-3 cursor-pointer items-center justify-center text-soft hover:text-primary  lg:size-4">
                                 <IcPlus />
                              </button>
                           </div>
                        )}

                        {unitLoading ? (
                           <Skeleton>
                              <div className="h-24 w-full  bg-dark3" />
                           </Skeleton>
                        ) : (
                           <>
                              <div className="mt-4 flex items-center justify-between text-xxs">
                                 <div className="text-darkSoft">Min Amount</div>
                                 <div>
                                    0
                                    <span className="ml-1 uppercase">
                                       {getCurrentMarket?.base_unit}
                                    </span>
                                 </div>
                              </div>
                              <div className="relative flex items-center justify-between rounded-lg bg-dark px-3 py-2 lg:py-4">
                                 <button
                                    type="button"
                                    className="relative flex size-3 cursor-pointer items-center justify-center text-soft hover:text-primary  lg:size-4">
                                    <IcMinus />
                                 </button>
                                 <input
                                    type="text"
                                    disabled
                                    className="w-11/12 bg-transparent text-center text-xxs placeholder:font-semibold focus:outline-none lg:w-full"
                                    placeholder={`${getCurrentMarket?.quote_unit.toUpperCase()} Amount`}
                                 />

                                 <button
                                    type="button"
                                    className="relative flex size-3 cursor-pointer items-center justify-center text-soft hover:text-primary  lg:size-4">
                                    <IcPlus />
                                 </button>
                              </div>
                              <div className="mt-4 flex items-center justify-between text-xxs">
                                 <div className="text-darkSoft">Fee transaction</div>
                                 <div>
                                    0
                                    <span className="ml-1 uppercase">
                                       {getCurrentMarket?.base_unit}
                                    </span>
                                 </div>
                              </div>
                           </>
                        )}
                     </div>
                     <div className="mt-4">
                        {typeAction === 'buy' ? (
                           <button
                              disabled
                              className=" w-full rounded-full bg-success py-2 disabled:bg-success/45   lg:py-3">
                              Buy
                           </button>
                        ) : (
                           <button
                              disabled
                              className=" w-full rounded-full bg-primary py-2 disabled:bg-primary/30 lg:py-3">
                              Sell
                           </button>
                        )}
                     </div>
                  </>
               </>
            ),
         },
      ],
      [
         getCurrentMarket?.base_unit,
         getCurrentMarket?.quote_unit,
         market?.price_precision,
         tick?.last,
         typeAction,
         unitLoading,
      ],
   );

   return (
      <div className="h-full min-h-[552px] rounded bg-dark2 p-4 lg:rounded-2xl">
         <div className="mb-4 flex items-center justify-between gap-2 lg:gap-4">
            <button
               onClick={() => setTypeAction('buy')}
               style={{
                  clipPath: `polygon(10% 0, 100% 0, 100% 77%, 100% 100%, 0 99%, 0 22%)`,
               }}
               className={`h-8 w-full cursor-pointer rounded-none text-sm uppercase lg:h-10 lg:text-base ${typeAction === 'buy' ? `bg-success` : `bg-dark`}`}>
               Buy
            </button>
            <button
               onClick={() => setTypeAction('sell')}
               style={{
                  clipPath: `polygon(25% 0%, 100% 0, 100% 77%, 92% 100%, 0 99%, 0 0)`,
               }}
               className={`h-8 w-full cursor-pointer  rounded-none text-sm uppercase lg:h-10 lg:text-base ${typeAction === 'sell' ? `bg-primary` : `bg-dark`}`}>
               Sell
            </button>
         </div>
         <Tabs
            items={tabs}
            getCurrentIndex={currIdx => setCurrentIndex(currIdx)}
         />
      </div>
   );
};

const Tabs: FC<TabsProps> = ({ items, getCurrentIndex, rightContent }) => {
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
      window.addEventListener('resize', setTabPosition);

      return () => window.removeEventListener('resize', setTabPosition);
   }, [activeTabIndex]);

   const contents = useMemo(() => items[activeTabIndex].content, [activeTabIndex, items]);

   const handleTabClick = (index: number) => {
      setActiveTabIndex(index);
      getCurrentIndex && getCurrentIndex(index);
   };

   return (
      <>
         <div className="relative z-20 flex justify-between border-b border-b-primary/45 bg-dark2  lg:justify-start">
            {items.map((tab, idx) => (
               <button
                  key={idx}
                  type="button"
                  ref={(el: HTMLButtonElement | null) =>
                     (tabsRef.current[idx] = el as HTMLButtonElement)
                  }
                  className={`w-full border-b-2 px-3 py-3 text-center  text-xs font-semibold ${
                     activeTabIndex === idx
                        ? 'border-primary text-white'
                        : 'border-transparent text-soft'
                  }`}
                  onClick={() => handleTabClick(idx)}>
                  {tab.label}
               </button>
            ))}
         </div>
         <span
            className="bg-primary-1 absolute bottom-3 block h-1 rounded-lg transition-all duration-300"
            style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
         />
         {rightContent}

         {typeof contents === 'string' ? <div className="mt-4">{contents}</div> : contents}
      </>
   );
};

// const FormTrade = ({
//    currentType,
//    baseUnit,
//    quoteUnit,
//    connected,
//    balance,
//    unitLoading,
//    price,
//    type = 'buy',
// }: SwapComponentProps) => {
//    // const location = useLocation();
//    // const { token } = useWalletStore();
//    const token = localStorage?.getItem('auth');

//    // const [reverse, setReverse] = useState(false);
//    const [loading, setLoading] = useState(false);
//    const [modalGas, setModalGas] = useState(false);
//    const [activeIndex, setActiveIndex] = useState<number | null>(null);
//    const [, setBalance] = useState('');
//    const [buttons] = useState(['0%', '25%', '50%', '75%', 'MAX']);

//    const [gasValue, setGasValue] = useState<Gas | null>(null);

//    // const [, setSide] = useState(quoteUnit);

//    const [openModalConfirm, setOpenModalConfirm] = useState(false);

//    const [quantity, setQuantity] = useState('');
//    const [total, setTotal] = useState('');

//    // const pairName = location.state?.name.split("/");

//    const handleClickButtonPercentage = (index: number) => {
//       setActiveIndex(index);
//       const value = buttons[index];
//       let percent = parseInt(value);
//       if (value === 'Max') {
//          percent = 100;
//       }

//       const newBalance = (percent / 100) * 1;
//       setBalance(newBalance.toString());
//    };

//    const handleQuantityChange = (event: string) => {
//       setQuantity(event);
//       setTotal((+event * price).toString());
//    };

//    const handleTotalChange = (event: string) => {
//       setTotal(event);
//       setQuantity((+event / price).toString());
//    };

//    const postData = async () => {
//       setLoading(true);

//       try {
//          await baseApi.post(
//             `/finex/market/orders`,
//             {
//                market: 'memeusdt',
//                txid: 'e35d9d1636ec0375b4f524b9825d400c20ca77bd1fd9b49252874dde8983a301',
//                side: 'buy',
//                quantity: Number(quantity),
//                price: '0.02',
//                ord_type: currentType,
//             },
//             {
//                headers: {
//                   'x-csrf-token': token,
//                },
//             },
//          );
//          setLoading(false);
//       } catch (error: any) {
//          setLoading(false);
//          console.log('error', error);

//          toast.error(error);
//       }
//    };

//    // const calculateUnit = useCallback(() => {
//    //    return reverse ? quoteUnit : baseUnit;
//    // }, [baseUnit, quoteUnit, reverse]);

//    // const displayUnit = useCallback(() => {
//    //    return reverse ? baseUnit : quoteUnit;
//    // }, [baseUnit, quoteUnit, reverse]);

//    // useEffect(() => {
//    //    if (reverse) {
//    //       setTotal((+quantity / LAST).toString());
//    //       setSide(displayUnit());
//    //    } else {
//    //       setSide(displayUnit());
//    //       setTotal((+quantity * LAST).toString());
//    //    }
//    // }, [quoteUnit, quantity, reverse, displayUnit]);

//    useEffect(() => {
//       getPublicGas();
//    }, []);

//    return (
//       <div className="relative max-w-5xl">
//          <div className="relative grid grid-cols-1 gap-4 md:grid-cols-2"></div>
//       </div>
//    );
// };
