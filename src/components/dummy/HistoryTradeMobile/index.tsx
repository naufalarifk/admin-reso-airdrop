import { cn, shortenString } from '@/utils';
import { ReactNode, FC, useState, useRef, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Skeleton, useWalletStore } from '@/components';
import { HOLDERS, RECENT_TRADES } from '@/constants/data';
import { useParams } from 'react-router-dom';
import {
   getMyTradeAction,
   Trade,
   useListTrade,
} from '@/components/molecules/HistoryTrade/hooks/useHistoryTrade';

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

interface Transaction {
   receive: {
      name: string;
      amount: number;
   };
   pay: {
      name: string;
      amount: number;
   };
}

interface RecentTrades {
   id: number;
   address: string;
   protocol: string;
   type: string;
   createdAt: string; // ISO 8601 format string
   transaction: Transaction;
   txId: string;
}

interface Holders {
   id: number;
   rank: number;
   address: string;
   quantity: number;
}

export const HistoryTradeMobile = () => {
   const { connected, token } = useWalletStore();
   const { setListMyTrade, trades } = useListTrade();

   const params = useParams();

   const currId = params?.market?.split('-');

   const [currentIndex, setCurrentIndex] = useState(0);

   const { data: listTrade, isLoading: listTradeLoading } = useQuery({
      queryKey: ['myTrade'],
      queryFn: async () => await getMyTradeAction({ token }),
      enabled: currentIndex === 2 && connected,
   });

   useEffect(() => {
      if (listTrade && connected) {
         setListMyTrade(listTrade);
      }
   }, [listTrade, setListMyTrade, connected]);

   const tabs = useMemo(
      () => [
         {
            label: 'Recent Trades',
            content: (
               <>
                  <div className="no-scrollbar relative max-h-96 overflow-x-hidden">
                     <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                        <thead className="sticky top-0 border-b border-soft/20 bg-dark2 text-xxs uppercase text-soft">
                           <tr>
                              <th
                                 scope="col"
                                 className="px-6 py-4">
                                 #
                              </th>
                              {/* <th
                                 scope="col"
                                 className="px-6 py-4">
                                 Address
                              </th> */}
                              {/* <th
                                 scope="col"
                                 className="px-6 py-4">
                                 Protocol
                              </th> */}
                              <th
                                 scope="col"
                                 className="text-nowrap px-6 py-4">
                                 Type
                              </th>
                              <th
                                 scope="col"
                                 className="px-6 py-4">
                                 Pay
                              </th>
                              <th
                                 scope="col"
                                 className="px-6 py-4">
                                 Receive
                              </th>
                              <th
                                 scope="col"
                                 className="px-6 py-4">
                                 Time
                              </th>
                              <th
                                 scope="col"
                                 className="px-6 py-4">
                                 TxID
                              </th>
                           </tr>
                        </thead>
                        <tbody className="no-scrollbar divide-y divide-darkSoft/30 overflow-y-scroll">
                           {listTradeLoading ? (
                              <tr>
                                 <td
                                    className="gap-3 space-y-2 pt-4 text-center"
                                    colSpan={7}>
                                    {Array.from({ length: 4 }).map(() => (
                                       <Skeleton>
                                          <div className="h-10 w-full  bg-dark3" />
                                       </Skeleton>
                                    ))}
                                 </td>
                              </tr>
                           ) : RECENT_TRADES?.length <= 0 ||
                             RECENT_TRADES === undefined ||
                             RECENT_TRADES === null ? (
                              <tr className="h-96">
                                 <td
                                    className="py-4   text-center text-gray-200"
                                    colSpan={12}>
                                    No Data Available
                                 </td>
                              </tr>
                           ) : (
                              RECENT_TRADES?.map((item: RecentTrades, i) => (
                                 <tr key={i}>
                                    <td className="text-center text-xxs text-soft">{item.id}</td>
                                    {/* <td className="whitespace-nowrap text-nowrap px-6  py-4 text-soft">
                                       {shortenString(item.address, 5, 5)}
                                    </td> */}
                                    {/* <td className="text-nowrap px-6 py-4 uppercase text-soft">
                                       {item.protocol}
                                    </td> */}
                                    <td
                                       className={cn(
                                          `text-nowrap px-6 py-2 text-center text-xxs capitalize`,
                                          item.type === 'buy'
                                             ? 'text-xxs text-success'
                                             : 'text-xxs text-primary',
                                       )}>
                                       {item.type}
                                    </td>
                                    <td className=" px-6 py-2 text-center text-xxs uppercase text-soft">
                                       {currId && currId[0].toUpperCase()}{' '}
                                       {item.transaction.pay.amount}
                                    </td>
                                    <td className="px-6 py-2 text-center text-xxs uppercase text-soft">
                                       {currId && currId[1].toUpperCase()}{' '}
                                       {item.transaction.receive.amount}
                                    </td>
                                    <td className="px-6 py-2 text-center text-xxs uppercase text-soft">
                                       {item.createdAt}
                                    </td>
                                    <td className="text-nowrap px-6 py-2 text-center text-xxs text-primary">
                                       <div
                                          // target="_blank"
                                          className="flex items-center gap-1"
                                          // href={`https://solscan.io/tx/${item.txId}`}
                                       >
                                          {shortenString(item.txId, 5, 5)}
                                          <svg
                                             width={12}
                                             height={12}
                                             viewBox="0 0 12 12"
                                             fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                             <path
                                                d="M8.25 1.125h2.625V3.75m-.563-2.063L7.5 4.5M6.375 1.875H3A1.125 1.125 0 001.875 3v6A1.125 1.125 0 003 10.125h6A1.125 1.125 0 0010.125 9V5.625"
                                                stroke="#F23F5D"
                                                strokeWidth={1.5}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                             />
                                          </svg>
                                       </div>
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
         {
            label: 'Holders',
            content: (
               <>
                  <div className="no-scrollbar relative max-h-80 overflow-x-scroll">
                     <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                        <thead className="sticky top-0 border-b border-soft/20 bg-dark2 text-xxs uppercase text-soft">
                           <tr>
                              <th
                                 scope="col"
                                 className="px-6 py-3">
                                 Rank
                              </th>
                              <th
                                 scope="col"
                                 className="px-6 py-3">
                                 Address
                              </th>
                              <th
                                 scope="col"
                                 className="px-6 py-3">
                                 Quantity
                              </th>
                           </tr>
                        </thead>
                        <tbody className="no-scrollbar divide-y divide-darkSoft/30 overflow-y-scroll">
                           {listTradeLoading ? (
                              <tr>
                                 <td
                                    className="gap-3 space-y-2 pt-4 text-center"
                                    colSpan={7}>
                                    {Array.from({ length: 4 }).map(() => (
                                       <Skeleton>
                                          <div className="h-10 w-full  bg-dark3" />
                                       </Skeleton>
                                    ))}
                                 </td>
                              </tr>
                           ) : HOLDERS?.length <= 0 || HOLDERS === undefined || HOLDERS === null ? (
                              <tr className="h-96">
                                 <td
                                    className="py-4 text-center text-gray-200"
                                    colSpan={12}>
                                    No Data Available
                                 </td>
                              </tr>
                           ) : (
                              HOLDERS?.map((item: Holders) => (
                                 <tr key={item.id}>
                                    <td className="whitespace-nowrap px-6 py-3 text-xxs text-soft">
                                       {item.rank}
                                    </td>
                                    <td className="px-6 py-3 text-xxs text-soft">
                                       {shortenString(item.address, 10, 10)}
                                    </td>
                                    <td className="px-6 py-3 text-xxs text-soft">
                                       {item.quantity}
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
         {
            label: 'History Trades',
            content: (
               <>
                  <div className="no-scrollbar relative max-h-80 overflow-x-scroll">
                     <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                        <thead className="sticky top-0 border-b border-soft/20 bg-dark2 text-xxs uppercase text-soft">
                           <tr>
                              <th
                                 scope="col"
                                 className="px-6 py-3">
                                 Date
                              </th>
                              <th
                                 scope="col"
                                 className="px-6 py-3">
                                 Assets
                              </th>
                              <th
                                 scope="col"
                                 className="text-nowrap px-6 py-3">
                                 Order ID
                              </th>
                              <th
                                 scope="col"
                                 className="px-6 py-3">
                                 Price
                              </th>
                              <th
                                 scope="col"
                                 className="px-6 py-3">
                                 Amount
                              </th>
                              <th
                                 scope="col"
                                 className="px-6 py-3">
                                 Type
                              </th>
                              <th
                                 scope="col"
                                 className="px-6 py-3">
                                 Total
                              </th>
                           </tr>
                        </thead>
                        <tbody className="no-scrollbar divide-y divide-darkSoft/30">
                           {listTradeLoading ? (
                              <tr>
                                 <td
                                    className="gap-3 space-y-2 pt-4 text-center"
                                    colSpan={7}>
                                    {Array.from({ length: 4 }).map(() => (
                                       <Skeleton>
                                          <div className="h-10 w-full bg-dark3" />
                                       </Skeleton>
                                    ))}
                                 </td>
                              </tr>
                           ) : trades?.length <= 0 || trades === undefined || trades === null ? (
                              <tr>
                                 <td
                                    className="py-4 pt-28 text-center text-gray-200"
                                    colSpan={12}>
                                    No Data Available
                                 </td>
                              </tr>
                           ) : (
                              trades?.map((item: Trade) => (
                                 <tr key={item.id}>
                                    <td className="whitespace-nowrap px-6 py-4 text-xxs">
                                       {item.created_at}
                                    </td>
                                    <td className="px-6 py-4 text-xxs uppercase">{item.market}</td>
                                    <td className="px-6 py-4 text-center text-xxs">
                                       {item.order_id}
                                    </td>
                                    <td className="px-6 py-4 text-center text-xxs">{item.price}</td>
                                    <td className="px-6 py-4 text-center text-xxs">
                                       {item.amount}
                                    </td>
                                    <td className="px-6 py-4 text-center text-xxs">
                                       {item.market_type ?? '-'}
                                    </td>
                                    <td className="px-6 py-4 text-right text-xxs">{item.total}</td>
                                 </tr>
                              ))
                           )}
                        </tbody>
                     </table>
                  </div>
               </>
            ),
         },
         {
            label: 'Open Order',
            content: (
               <>
                  <div className="no-scrollbar relative max-h-80 overflow-x-scroll">
                     <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                        <thead className="sticky top-0 border-b border-soft/20 bg-dark2 text-xxs uppercase text-soft">
                           <tr>
                              <th
                                 scope="col"
                                 className="px-6 py-3">
                                 Date
                              </th>
                              <th
                                 scope="col"
                                 className="px-6 py-3">
                                 Assets
                              </th>
                              <th
                                 scope="col"
                                 className="text-nowrap px-6 py-3">
                                 Order ID
                              </th>
                              <th
                                 scope="col"
                                 className="px-6 py-3">
                                 Price
                              </th>
                              <th
                                 scope="col"
                                 className="px-6 py-3">
                                 Amount
                              </th>
                              <th
                                 scope="col"
                                 className="px-6 py-3">
                                 Type
                              </th>
                              <th
                                 scope="col"
                                 className="px-6 py-3">
                                 Total
                              </th>
                           </tr>
                        </thead>
                        <tbody className="no-scrollbar divide-y divide-darkSoft/30">
                           {listTradeLoading ? (
                              <tr>
                                 <td
                                    className="gap-3 space-y-2 pt-4 text-center"
                                    colSpan={7}>
                                    {Array.from({ length: 4 }).map(() => (
                                       <Skeleton>
                                          <div className="h-10 w-full bg-dark3" />
                                       </Skeleton>
                                    ))}
                                 </td>
                              </tr>
                           ) : trades?.length <= 0 || trades === undefined || trades === null ? (
                              <tr>
                                 <td
                                    className="py-4 pt-28 text-center text-gray-200"
                                    colSpan={12}>
                                    No Data Available
                                 </td>
                              </tr>
                           ) : (
                              trades?.map((item: Trade) => (
                                 <tr key={item.id}>
                                    <td className="whitespace-nowrap px-6  py-4">
                                       {item.created_at}
                                    </td>
                                    <td className="px-6 py-4 uppercase">{item.market}</td>
                                    <td className="px-6 py-4 text-center">{item.order_id}</td>
                                    <td className="px-6 py-4 text-center">{item.price}</td>
                                    <td className="px-6 py-4 text-center">{item.amount}</td>
                                    <td className="px-6 py-4 text-center">
                                       {item.market_type ?? '-'}
                                    </td>
                                    <td className="px-6 py-4 text-right">{item.total}</td>
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
      [currId, listTradeLoading, trades],
   );

   return (
      <div>
         <Tabs
            items={tabs}
            getCurrentIndex={currIdx => setCurrentIndex(currIdx)}
         />
      </div>
   );
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
         <div className="relative grid place-items-start gap-5 border-b  border-b-primary/45 bg-dark2  md:flex  md:justify-between  md:gap-0">
            <div
               className={
                  (cn(
                     `flex ${
                        isBetween ? 'items-center justify-between' : 'gap-4'
                     } rounded-lg  p-1 px-1`,
                  ),
                  classNameWrapper)
               }>
               {items.map((tab, idx) => (
                  <button
                     key={idx}
                     type="button"
                     ref={(el: HTMLButtonElement | null) =>
                        (tabsRef.current[idx] = el as HTMLButtonElement)
                     }
                     className={`border-b-2 px-3 py-3 text-center text-xxs font-semibold ${
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
         </div>
         {typeof contents === 'string' ? <div className="mt-4">{contents}</div> : contents}
      </>
   );
};
