import { useState, useMemo } from 'react';
import { Skeleton, TabSlider } from '@/components';
import { useTranslation } from 'react-i18next';

// interface Transaction {
//    receive: {
//       name: string;
//       amount: number;
//    };
//    pay: {
//       name: string;
//       amount: number;
//    };
// }

// interface RecentTrades {
//    id: number;
//    address: string;
//    protocol: string;
//    type: string;
//    createdAt: string; // ISO 8601 format string
//    transaction: Transaction;
//    txId: string;
// }

// interface Holders {
//    id: number;
//    rank: number;
//    address: string;
//    quantity: number;
// }

interface NewHistoryTradeProps {
   isLoading?: boolean;
}

export const NewHistoryTrade = ({ isLoading }: NewHistoryTradeProps) => {
   // const params = useParams();

   const { t } = useTranslation();

   // const currId = params?.market?.split('-');

   const [, setCurrentIndex] = useState(0);

   const tabs = useMemo(
      () => [
         {
            label: t('newTrade.myOpenOrder'),
            content: (
               <>
                  <div className="no-scrollbar relative h-96 max-h-96 overflow-x-hidden">
                     <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                        <thead className="sticky top-0 border-b border-soft/20 bg-dark2 text-xs uppercase text-soft">
                           <tr>
                              <th
                                 scope="col"
                                 className="px-6 py-4">
                                 {t('global.date')}
                              </th>

                              <th
                                 scope="col"
                                 className="text-nowrap px-6 py-4">
                                 {t('global.market')}
                              </th>
                              <th
                                 scope="col"
                                 className="px-6 py-4">
                                 {t('global.price')}
                              </th>
                              <th
                                 scope="col"
                                 className="px-6 py-4">
                                 {t('global.volume')}
                              </th>
                              <th
                                 scope="col"
                                 className="px-6 py-4">
                                 {t('global.executed')}
                              </th>
                              <th
                                 scope="col"
                                 className="px-6 py-4">
                                 {t('global.txId')}
                              </th>
                              <th
                                 scope="col"
                                 className="px-6 py-4">
                                 {t('global.action')}
                              </th>
                           </tr>
                        </thead>
                        <tbody className="no-scrollbar divide-y divide-darkSoft/30 overflow-y-scroll">
                           {isLoading ? (
                              <tr>
                                 <td
                                    className="gap-3 space-y-2 pt-4 text-center"
                                    colSpan={7}>
                                    {Array.from({ length: 8 }).map(() => (
                                       <Skeleton>
                                          <div className="h-10 w-full  bg-dark3" />
                                       </Skeleton>
                                    ))}
                                 </td>
                              </tr>
                           ) : (
                              <tr className="h-96">
                                 <td
                                    className="py-4 text-center text-gray-200"
                                    colSpan={12}>
                                    {t('global.noData')}
                                 </td>
                              </tr>
                           )}
                        </tbody>
                     </table>
                  </div>
               </>
            ),
         },
         {
            label: t('global.holders'),
            content: (
               <>
                  <div className="no-scrollbar relative h-96 max-h-96 overflow-x-scroll">
                     <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                        <thead className="sticky-top-0 border-b border-soft/20 bg-dark2 text-xs uppercase text-soft">
                           <tr>
                              <th
                                 scope="col"
                                 className="px-6 py-3">
                                 {t('global.rank')}
                              </th>
                              <th
                                 scope="col"
                                 className="px-6 py-3">
                                 {t('global.address')}
                              </th>
                              <th
                                 scope="col"
                                 className="px-6 py-3">
                                 {t('global.quantity')}
                              </th>
                           </tr>
                        </thead>
                        <tbody className="no-scrollbar divide-y divide-darkSoft/30 overflow-y-scroll">
                           {isLoading ? (
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
                           ) : (
                              <tr className="h-96">
                                 <td
                                    className="py-4 text-center text-gray-200"
                                    colSpan={12}>
                                    {t('global.noData')}
                                 </td>
                              </tr>
                           )}
                        </tbody>
                     </table>
                  </div>
               </>
            ),
         },
         {
            label: t('global.historyTrade'),
            content: (
               <>
                  <div className="no-scrollbar relative h-96 max-h-96 overflow-x-scroll">
                     <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                        <thead className="sticky top-0 border-b border-soft/20 bg-dark2 text-xs uppercase text-soft">
                           <tr>
                              <th
                                 scope="col"
                                 className="px-6 py-3">
                                 {t('global.date')}
                              </th>
                              <th
                                 scope="col"
                                 className="px-6 py-3">
                                 {t('global.assets')}
                              </th>
                              <th
                                 scope="col"
                                 className="text-nowrap px-6 py-3">
                                 {t('global.orderId')}
                              </th>
                              <th
                                 scope="col"
                                 className="px-6 py-3">
                                 {t('global.price')}
                              </th>
                              <th
                                 scope="col"
                                 className="px-6 py-3">
                                 {t('global.amount')}
                              </th>
                              <th
                                 scope="col"
                                 className="px-6 py-3">
                                 {t('global.type')}
                              </th>
                              <th
                                 scope="col"
                                 className="px-6 py-3">
                                 {t('global.total')}
                              </th>
                           </tr>
                        </thead>
                        <tbody className="no-scrollbar divide-y divide-darkSoft/30">
                           {isLoading ? (
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
                           ) : (
                              <tr className="h-96">
                                 <td
                                    className="py-4 text-center text-gray-200"
                                    colSpan={12}>
                                    {t('global.noData')}
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
      [isLoading, t],
   );

   return (
      <>
         <TabSlider
            isMaxWidth
            items={tabs}
            getCurrentIndex={currIdx => setCurrentIndex(currIdx)}
         />
      </>
   );
};

// const Tabs: FC<TabsProps> = ({
//    items,
//    getCurrentIndex,
//    isBetween = false,
//    classNameWrapper,
//    rightContent,
// }) => {
//    const [activeTabIndex, setActiveTabIndex] = useState(0);
//    const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
//    const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

//    const tabsRef = useRef<Array<HTMLButtonElement>>([]);

//    useEffect(() => {
//       const setTabPosition = () => {
//          const currentTab = tabsRef.current[activeTabIndex];
//          setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
//          setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
//       };

//       setTabPosition();
//       window.addEventListener('resize', setTabPosition);

//       return () => window.removeEventListener('resize', setTabPosition);
//    }, [activeTabIndex]);

//    const contents = useMemo(() => items[activeTabIndex].content, [activeTabIndex, items]);

//    const handleTabClick = (index: number) => {
//       setActiveTabIndex(index);
//       getCurrentIndex && getCurrentIndex(index);
//    };

//    return (
//       <>
//          <div className="relative grid place-items-center gap-5 border-b  border-b-primary/45 bg-dark2  md:flex  md:justify-between  md:gap-0">
//             <div
//                className={
//                   (cn(
//                      `relative flex ${
//                         isBetween ? 'items-center justify-between' : 'gap-4'
//                      } rounded-lg  p-1 px-1`,
//                   ),
//                   classNameWrapper)
//                }>
//                {items.map((tab, idx) => (
//                   <>
//                      <button
//                         key={idx}
//                         type="button"
//                         ref={(el: HTMLButtonElement | null) =>
//                            (tabsRef.current[idx] = el as HTMLButtonElement)
//                         }
//                         className={`border-b-2 px-4 py-3 text-center text-xs font-semibold ${
//                            activeTabIndex === idx
//                               ? 'border-primary text-white'
//                               : 'border-transparent text-soft'
//                         }`}
//                         onClick={() => handleTabClick(idx)}>
//                         {tab.label}
//                      </button>
//                   </>
//                ))}
//             </div>
//             <span
//                className="bg-primary-1 absolute bottom-3 block h-1 rounded-lg transition-all duration-300"
//                style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
//             />
//             {rightContent}
//          </div>
//          {typeof contents === 'string' ? <div className="mt-4">{contents}</div> : contents}
//       </>
//    );
// };
