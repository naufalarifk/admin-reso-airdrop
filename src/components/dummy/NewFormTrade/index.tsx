import { IcMinus, IcPlus } from '@/assets/icons';
import { ModalPriceImpact, Skeleton } from '@/components';
import { Decimal } from '@/components/molecules/Decimal';
import { MarketTicker } from '@/pages/Swap/hooks/usePublicMarkets';
import { Market } from '@/types/components';
import { validateNumber } from '@/utils';
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

export const NewFormTrade = ({
   getCurrentMarket,
   unitLoading,
   marketTradePrice,
   market,
}: NewFormTradeProps) => {
   const [, setCurrentIndex] = useState(0);

   const tick = marketTradePrice?.ticker;

   const [typeAction, setTypeAction] = useState<'buy' | 'sell'>('buy');

   const [priceImpact, setPriceImpact] = useState('5');
   const [modalPriceImpact, setModalPriceImpact] = useState(false);

   const tabs = useMemo(
      () => [
         {
            label: 'Limit Trade',
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
                              <div className="text-xs text-darkSoft">
                                 <span className="mr-1 uppercase">
                                    {getCurrentMarket?.base_unit}
                                 </span>
                                 Balance
                              </div>
                              <div className="text-xs">
                                 0
                                 <span className="ml-1 uppercase">
                                    {getCurrentMarket?.base_unit}
                                 </span>
                              </div>
                           </div>
                           <div className="flex items-center  justify-between">
                              <div className="text-xs text-darkSoft">
                                 <span className="mr-1 uppercase">
                                    {getCurrentMarket?.quote_unit}
                                 </span>
                                 Balance
                              </div>
                              <div className="text-xs text-white">
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
                        // <div className="relative flex items-center justify-between rounded-lg bg-dark px-3 py-4">
                        //    <div className="text-base text-darkSoft">Market Price</div>
                        //    <div className="text-base font-normal text-darkSoft">
                        //       {Decimal.format(+tick?.last ?? 0, market?.price_precision!, ',')}
                        //    </div>
                        // </div>
                        <div className="relative flex items-center justify-between rounded-lg bg-dark px-3 py-4">
                           <button
                              type="button"
                              className="  flex size-3 cursor-pointer items-center justify-center text-soft  hover:text-primary">
                              <IcMinus />
                           </button>
                           <input
                              type="text"
                              disabled
                              className=" w-11/12 bg-transparent text-center placeholder:font-semibold focus:outline-none"
                              placeholder={`${Decimal.format(validateNumber(tick?.last), market?.price_precision!, ',')}`}
                           />

                           <button
                              type="button"
                              className="  flex size-3 cursor-pointer items-center justify-center text-soft  hover:text-primary">
                              <IcPlus />
                           </button>
                        </div>
                     )}
                     {unitLoading ? (
                        <Skeleton>
                           <div className="h-14 w-full  bg-dark3" />
                        </Skeleton>
                     ) : (
                        <div className="relative flex items-center justify-between rounded-lg bg-dark px-3 py-4">
                           <button
                              type="button"
                              className="  flex size-3 cursor-pointer items-center justify-center text-soft  hover:text-primary">
                              <IcMinus />
                           </button>
                           <input
                              type="text"
                              disabled
                              className=" w-11/12 bg-transparent text-center placeholder:font-semibold focus:outline-none"
                              placeholder={`${getCurrentMarket?.base_unit.toUpperCase()} Amount`}
                           />

                           <button
                              type="button"
                              className="  flex size-3 cursor-pointer items-center justify-center text-soft  hover:text-primary">
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
                           <div className="mt-4 flex items-center justify-between text-xs">
                              <div className="text-darkSoft">Min Amount</div>
                              <div>
                                 0
                                 <span className="ml-1 uppercase">
                                    {getCurrentMarket?.base_unit}
                                 </span>
                              </div>
                           </div>
                           <div className="relative flex items-center justify-between rounded-lg bg-dark px-3 py-4">
                              <button
                                 type="button"
                                 className="relative flex size-3 cursor-pointer items-center justify-center text-soft  hover:text-primary">
                                 <IcMinus />
                              </button>
                              <input
                                 type="text"
                                 disabled
                                 className="w-full bg-transparent text-center placeholder:font-semibold focus:outline-none"
                                 placeholder={`${getCurrentMarket?.quote_unit.toUpperCase()} Amount`}
                              />

                              <button
                                 type="button"
                                 className="relative flex size-3 cursor-pointer items-center justify-center text-soft  hover:text-primary">
                                 <IcPlus />
                              </button>
                           </div>
                           <div className="mt-4 space-y-2">
                              <div className="flex items-center justify-between gap-2 text-xs">
                                 <div className="text-darkSoft">Fee transaction</div>
                                 <div>0 {getCurrentMarket?.base_unit}</div>
                              </div>
                              <div className="flex items-center justify-between gap-2 text-xs">
                                 <div className="text-darkSoft">Price impact</div>
                                 <div>{priceImpact}%</div>
                              </div>
                              <div className="flex items-center justify-between gap-2 text-xs">
                                 <div className="text-darkSoft">Slippage tolerance</div>
                                 <div className="flex items-center gap-2">
                                    <div>{priceImpact}%</div>
                                    <svg
                                       className="cursor-pointer"
                                       onClick={() => setModalPriceImpact(true)}
                                       xmlns="http://www.w3.org/2000/svg"
                                       width="16"
                                       height="16"
                                       viewBox="0 0 16 16"
                                       fill="none">
                                       <path
                                          d="M9.38562 1C9.49148 1 9.5946 1.0336 9.68014 1.09596C9.76569 1.15832 9.82923 1.24622 9.86162 1.347L10.4116 3.056C10.6426 3.169 10.8636 3.296 11.0746 3.439L12.8306 3.061C12.9342 3.03889 13.042 3.05022 13.1387 3.09335C13.2354 3.13648 13.3159 3.20919 13.3686 3.301L14.7546 5.7C14.8075 5.79176 14.83 5.89795 14.8186 6.00327C14.8073 6.10859 14.7628 6.20759 14.6916 6.286L13.4866 7.616C13.5042 7.87103 13.5042 8.12697 13.4866 8.382L14.6916 9.714C14.7628 9.79241 14.8073 9.89141 14.8186 9.99673C14.83 10.102 14.8075 10.2082 14.7546 10.3L13.3686 12.7C13.3158 12.7916 13.2352 12.8641 13.1385 12.9071C13.0419 12.95 12.934 12.9612 12.8306 12.939L11.0746 12.561C10.8646 12.703 10.6426 12.831 10.4126 12.944L9.86162 14.653C9.82923 14.7538 9.76569 14.8417 9.68014 14.904C9.5946 14.9664 9.49148 15 9.38562 15H6.61362C6.50776 15 6.40464 14.9664 6.3191 14.904C6.23355 14.8417 6.17001 14.7538 6.13762 14.653L5.58862 12.945C5.35825 12.8323 5.13604 12.7037 4.92362 12.56L3.16862 12.939C3.06508 12.9611 2.95721 12.9498 2.86052 12.9066C2.76384 12.8635 2.68334 12.7908 2.63062 12.699L1.24462 10.3C1.19169 10.2082 1.16928 10.102 1.1806 9.99673C1.19192 9.89141 1.2364 9.79241 1.30762 9.714L2.51262 8.382C2.49516 8.12763 2.49516 7.87237 2.51262 7.618L1.30762 6.286C1.2364 6.20759 1.19192 6.10859 1.1806 6.00327C1.16928 5.89795 1.19169 5.79176 1.24462 5.7L2.63062 3.3C2.68348 3.20837 2.76405 3.13587 2.86072 3.09293C2.95739 3.04998 3.06519 3.0388 3.16862 3.061L4.92362 3.44C5.13562 3.297 5.35762 3.168 5.58862 3.055L6.13862 1.347C6.17091 1.24654 6.23415 1.15888 6.31929 1.09655C6.40443 1.03422 6.5071 1.00043 6.61262 1H9.38462H9.38562ZM9.01962 2H6.97962L6.41162 3.767L6.02862 3.954C5.84033 4.04613 5.65858 4.15104 5.48462 4.268L5.13062 4.508L3.31462 4.116L2.29462 5.884L3.53962 7.262L3.50962 7.686C3.49525 7.89509 3.49525 8.10491 3.50962 8.314L3.53962 8.738L2.29262 10.116L3.31362 11.884L5.12962 11.493L5.48362 11.732C5.65758 11.849 5.83933 11.9539 6.02762 12.046L6.41062 12.233L6.97962 14H9.02162L9.59162 12.232L9.97362 12.046C10.1617 11.9541 10.3431 11.8492 10.5166 11.732L10.8696 11.493L12.6866 11.884L13.7066 10.116L12.4606 8.738L12.4906 8.314C12.505 8.10458 12.505 7.89442 12.4906 7.685L12.4606 7.261L13.7076 5.884L12.6866 4.116L10.8696 4.506L10.5166 4.268C10.3431 4.15083 10.1617 4.04591 9.97362 3.954L9.59162 3.768L9.02062 2H9.01962ZM7.99962 5C8.79527 5 9.55833 5.31607 10.1209 5.87868C10.6835 6.44129 10.9996 7.20435 10.9996 8C10.9996 8.79565 10.6835 9.55871 10.1209 10.1213C9.55833 10.6839 8.79527 11 7.99962 11C7.20397 11 6.44091 10.6839 5.8783 10.1213C5.31569 9.55871 4.99962 8.79565 4.99962 8C4.99962 7.20435 5.31569 6.44129 5.8783 5.87868C6.44091 5.31607 7.20397 5 7.99962 5ZM7.99962 6C7.46919 6 6.96048 6.21071 6.58541 6.58579C6.21033 6.96086 5.99962 7.46957 5.99962 8C5.99962 8.53043 6.21033 9.03914 6.58541 9.41421C6.96048 9.78929 7.46919 10 7.99962 10C8.53005 10 9.03876 9.78929 9.41383 9.41421C9.78891 9.03914 9.99962 8.53043 9.99962 8C9.99962 7.46957 9.78891 6.96086 9.41383 6.58579C9.03876 6.21071 8.53005 6 7.99962 6Z"
                                          fill="#F23F5D"
                                       />
                                    </svg>
                                 </div>
                              </div>
                           </div>
                        </>
                     )}
                  </div>
                  <div className="mt-4">
                     {typeAction === 'buy' ? (
                        <button
                           disabled
                           className=" w-full rounded-full bg-success  py-3 disabled:bg-success/30">
                           Buy
                        </button>
                     ) : (
                        <button
                           disabled
                           className=" w-full rounded-full bg-primary  py-3 disabled:bg-primary/30">
                           Sell
                        </button>
                     )}
                  </div>
               </>
            ),
         },
         {
            label: 'Market Trade',
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
                                 <div className="text-xs text-darkSoft">
                                    <span className="mr-1 uppercase">
                                       {getCurrentMarket?.base_unit}
                                    </span>
                                    Balance
                                 </div>
                                 <div className="text-xs">
                                    0
                                    <span className="ml-1 uppercase">
                                       {getCurrentMarket?.base_unit}
                                    </span>
                                 </div>
                              </div>
                              <div className="flex items-center  justify-between">
                                 <div className="text-xs text-darkSoft">
                                    <span className="mr-1 uppercase">
                                       {getCurrentMarket?.quote_unit}
                                    </span>
                                    Balance
                                 </div>
                                 <div className="text-xs text-white">
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
                           <div className="relative flex items-center justify-between rounded-lg bg-dark px-3 py-4">
                              <div className="text-xs text-darkSoft">Market Price</div>
                              <div className="text-sm font-normal text-darkSoft">
                                 {Decimal.format(
                                    validateNumber(tick?.last),
                                    market?.price_precision!,
                                    ',',
                                 )}
                              </div>
                           </div>
                        )}
                        {unitLoading ? (
                           <Skeleton>
                              <div className="h-14 w-full  bg-dark3" />
                           </Skeleton>
                        ) : (
                           <div className="relative flex items-center justify-between rounded-lg bg-dark px-3 py-4">
                              <button
                                 type="button"
                                 className="  flex size-3 cursor-pointer items-center justify-center text-soft  hover:text-primary">
                                 <IcMinus />
                              </button>
                              <input
                                 type="text"
                                 disabled
                                 className=" w-11/12 bg-transparent text-center placeholder:font-semibold focus:outline-none"
                                 placeholder={`${getCurrentMarket?.base_unit.toUpperCase()} Amount`}
                              />

                              <button
                                 type="button"
                                 className="  flex size-3 cursor-pointer items-center justify-center text-soft  hover:text-primary">
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
                              <div className="mt-4 flex items-center justify-between text-xs">
                                 <div className="text-darkSoft">Min Amount</div>
                                 <div>
                                    0
                                    <span className="ml-1 uppercase">
                                       {getCurrentMarket?.base_unit}
                                    </span>
                                 </div>
                              </div>
                              <div className="relative flex items-center justify-between rounded-lg bg-dark px-3 py-4">
                                 <button
                                    type="button"
                                    className="relative flex size-3 cursor-pointer items-center justify-center text-soft  hover:text-primary">
                                    <IcMinus />
                                 </button>
                                 <input
                                    type="text"
                                    disabled
                                    className="w-full bg-transparent text-center placeholder:font-semibold focus:outline-none"
                                    placeholder={`${getCurrentMarket?.quote_unit.toUpperCase()} Amount`}
                                 />

                                 <button
                                    type="button"
                                    className="relative flex size-3 cursor-pointer items-center justify-center text-soft  hover:text-primary">
                                    <IcPlus />
                                 </button>
                              </div>
                              <div className="mt-4 flex items-center justify-between text-xs">
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
                              className=" w-full rounded-full  bg-success  py-3 disabled:bg-success/30">
                              Buy
                           </button>
                        ) : (
                           <button
                              disabled
                              className=" w-full rounded-full bg-primary  py-3 disabled:bg-primary/30">
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
         priceImpact,
         tick?.last,
         typeAction,
         unitLoading,
      ],
   );

   return (
      <>
         <div className="h-[530px] rounded bg-dark2 p-4 lg:rounded-2xl">
            <div className="mb-4 flex items-center justify-between gap-4">
               <button
                  onClick={() => setTypeAction('buy')}
                  style={{
                     clipPath: `polygon(10% 0, 100% 0, 100% 77%, 100% 100%, 0 99%, 0 22%)`,
                  }}
                  className={`h-10 w-full cursor-pointer rounded-none ${typeAction === 'buy' ? `bg-success` : `bg-dark`}`}>
                  Buy
               </button>
               <button
                  onClick={() => setTypeAction('sell')}
                  style={{
                     clipPath: `polygon(25% 0%, 100% 0, 100% 77%, 92% 100%, 0 99%, 0 0)`,
                  }}
                  className={`h-10 w-full cursor-pointer rounded-none ${typeAction === 'sell' ? `bg-primary` : `bg-dark`}`}>
                  Sell
               </button>
            </div>
            <Tabs
               items={tabs}
               getCurrentIndex={currIdx => setCurrentIndex(currIdx)}
            />
         </div>

         <ModalPriceImpact
            priceImpact={priceImpact}
            setPriceImpact={setPriceImpact}
            isOpen={modalPriceImpact}
            setIsOpen={setModalPriceImpact}
         />
      </>
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
