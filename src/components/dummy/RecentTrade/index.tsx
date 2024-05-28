import { Skeleton, TabSlider } from '@/components/atoms';
import { RECENT_TRADES } from '@/constants/data';
import { shortenString } from '@/utils';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

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

interface RecentTradesProps {
   loading?: boolean;
}

export const RecentTrades = ({ loading }: RecentTradesProps) => {
   const [, setCurrentIndex] = useState(0);

   const params = useParams();

   const currId = params?.market?.split('-');

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
                                 className="w-[30%] p-4 text-left">
                                 Time
                              </th>
                              <th
                                 scope="col"
                                 className="w-[25%] text-nowrap p-4">
                                 Amount
                              </th>
                              <th
                                 scope="col"
                                 className="w-[25%] p-4">
                                 Price
                              </th>
                              <th
                                 scope="col"
                                 className="w-[20%] p-4">
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
                           ) : RECENT_TRADES?.length <= 0 ||
                             RECENT_TRADES === undefined ||
                             RECENT_TRADES === null ? (
                              <tr className="h-96">
                                 <td
                                    className="py-4 text-center text-gray-200"
                                    colSpan={12}>
                                    No Data Available
                                 </td>
                              </tr>
                           ) : (
                              RECENT_TRADES?.map((item: RecentTrades, i) => (
                                 <tr key={i}>
                                    <td className="w-[30%] px-4 text-left text-xxs text-soft">
                                       {dayjs(item.createdAt).format('DD MMM YYYY, hh:mm:ss')}
                                    </td>
                                    {/* <td className="whitespace-nowrap text-nowrap px-6  py-4 text-soft">
                                      {shortenString(item.address, 5, 5)}
                                   </td> */}
                                    {/* <td className="text-nowrap px-6 py-4 uppercase text-soft">
                                      {item.protocol}
                                   </td> */}

                                    <td className=" w-[25%] px-4 py-2 text-left text-xxs uppercase text-soft">
                                       {currId && currId[0].toUpperCase()}{' '}
                                       {item.transaction.pay.amount}
                                    </td>
                                    <td className="w-[25%] px-4 py-2 text-left text-xxs uppercase text-soft">
                                       {currId && currId[1].toUpperCase()}{' '}
                                       {item.transaction.receive.amount}
                                    </td>

                                    <td className="w-[20%] text-nowrap px-4 py-2 text-left text-xxs text-primary">
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
      ],
      [currId, loading],
   );

   return (
      <div>
         <TabSlider
            isMaxWidth
            items={tabs}
            getCurrentIndex={currIdx => setCurrentIndex(currIdx)}
         />
      </div>
   );
};
