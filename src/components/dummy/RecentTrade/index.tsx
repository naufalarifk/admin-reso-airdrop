import { Skeleton } from '@/components/atoms';
import { cn } from '@/utils';
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

interface RecentTradesProps {
   loading?: boolean;
}

export const RecentTrades = ({ loading }: RecentTradesProps) => {
   const [, setCurrentIndex] = useState(0);

   const tabs = useMemo(
      () => [
         {
            label: 'Recent Trades',
            content: (
               <>
                  <div className="no-scrollbar relative h-96 max-h-96 overflow-x-hidden">
                     <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                        <thead className="sticky top-0 border-b border-soft/20 bg-dark2 text-xs uppercase text-soft">
                           <tr>
                              <th
                                 scope="col"
                                 className="px-6 py-4">
                                 Time
                              </th>
                              <th
                                 scope="col"
                                 className="text-nowrap px-6 py-4">
                                 Amount
                              </th>
                              <th
                                 scope="col"
                                 className="px-6 py-4">
                                 Price
                              </th>
                              <th
                                 scope="col"
                                 className="px-6 py-4">
                                 TxID
                              </th>
                           </tr>
                        </thead>
                        <tbody className="no-scrollbar divide-y divide-darkSoft/30 overflow-y-scroll">
                           {loading ? (
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
      [loading],
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
         <div className="relative grid place-items-center gap-5 border-b  border-b-primary/45 bg-dark2  md:flex  md:justify-between  md:gap-0">
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
                     className={`border-b-2 px-4 py-3 text-center text-xs font-semibold ${
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
