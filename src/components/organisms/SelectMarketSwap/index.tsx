import type { ChangeEvent } from 'react';
import { Fragment, useState, useEffect } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import type { Market } from '@/types/components';
import type { MarketTicker } from '@/pages/Swap/hooks/usePublicMarkets';
import { Decimal } from '@/components/molecules/Decimal';
import { validateNumber } from '@/utils';
import { IcClose, IcSearch } from '@/assets/icons';
import { useTranslation } from 'react-i18next';

interface SelectMarketSwap {
   searchTerm: string;
   handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
   filteredData: Market[];
   setSearchTerm: (value: string) => void;
   setShowModalMarket: (value: boolean) => void;
   ticker: MarketTicker;
}

export const SelectMarketSwap = ({
   filteredData,
   handleSearch,
   searchTerm,
   setSearchTerm,
   setShowModalMarket,
   ticker,
}: SelectMarketSwap) => {
   const navigate = useNavigate();
   const [selected, setSelected] = useState<Market | null>(null);

   const { t } = useTranslation();

   useEffect(() => {
      if (selected === null && filteredData?.length > 0) {
         setSelected(filteredData[0]);
      }
   }, [filteredData, selected]);

   return (
      <div>
         <Popover className="relative inline-block text-left">
            {({ close }) => (
               <>
                  <Popover.Button className="flex items-center gap-2 rounded-md bg-dark3 px-3 py-1">
                     {selected?.name}{' '}
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-3">
                        <path
                           fillRule="evenodd"
                           d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                           clipRule="evenodd"
                        />
                     </svg>
                  </Popover.Button>
                  <Transition
                     as={Fragment}
                     enter="transition ease-out duration-100"
                     enterFrom="transform opacity-0 scale-95"
                     enterTo="transform opacity-100 scale-100"
                     leave="transition ease-in duration-75"
                     leaveFrom="transform opacity-100 scale-100"
                     leaveTo="transform opacity-0 scale-95">
                     <Popover.Panel className="absolute z-20 mt-2 w-full max-w-4xl origin-top-right rounded-md bg-dark shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="relative w-[450px] transform  overflow-hidden rounded-lg border border-soft/15 bg-dark  p-6  shadow-xl transition-all">
                           <div className="mb-5">
                              <div className="relative flex rounded-lg border border-soft/20 bg-dark p-2 placeholder:text-soft focus:outline-none">
                                 <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    placeholder="Search for pairs, example: KLV-USDT"
                                    className="block w-full max-w-[410px] bg-transparent text-xs font-medium text-soft placeholder:text-xs placeholder:font-medium placeholder:text-soft focus:border-0 focus:outline-none "
                                 />
                                 {searchTerm ? (
                                    <div
                                       onClick={() => setSearchTerm('')}
                                       className="absolute inset-y-0 end-0 flex items-center pe-3">
                                       <IcClose className="size-3" />
                                    </div>
                                 ) : (
                                    <div className="absolute inset-y-0 end-0 flex items-center pe-3">
                                       <IcSearch className="size-3" />
                                    </div>
                                 )}
                              </div>
                           </div>
                           <div className="flex items-center justify-between border-b border-primary/50 pb-2 text-[10px] text-soft">
                              <div>{t('newTrade.pairs')}</div>
                              <div>{t('newTrade.lastPrice')}</div>
                              <div>{t('newTrade.volume24h')}</div>
                           </div>
                           <div className="mt-3 space-y-2">
                              {filteredData?.length > 0 ? (
                                 filteredData?.map(item => (
                                    <Popover.Button
                                       key={item.id}
                                       onClick={() => {
                                          setShowModalMarket(false);
                                          navigate(`/trade/${item.name?.replace('/', '-')}`);
                                          close;
                                          setSelected(item);
                                          setSearchTerm('');
                                       }}
                                       className="flex w-full cursor-pointer justify-between">
                                       <div className="w-full text-left text-xs font-medium text-soft lg:text-sm">
                                          {item?.name}
                                       </div>
                                       <div className="w-full text-left text-xs font-light text-green">
                                          {Decimal.format(
                                             validateNumber(ticker?.ticker?.last),
                                             item?.price_precision!,
                                             ',',
                                          )}
                                       </div>
                                       <div className="w-full text-right text-xs font-light text-green">
                                          {Decimal.format(
                                             validateNumber(ticker?.ticker?.volume),
                                             item?.amount_precision!,
                                             ',',
                                          )}
                                       </div>
                                    </Popover.Button>
                                 ))
                              ) : (
                                 <div className="py-5 text-center text-sm font-bold text-soft">
                                    {t('global.noData')}
                                 </div>
                              )}
                           </div>
                        </div>
                     </Popover.Panel>
                  </Transition>
               </>
            )}
         </Popover>
      </div>
   );
};
