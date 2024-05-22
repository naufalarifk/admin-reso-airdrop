import { ChangeEvent, Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { IcCoinPairs } from '@/assets/icons';
import { Market } from '@/types/components';

interface SelectMarketSwap {
   searchTerm: string;
   handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
   filteredData: Market[];
   setSearchTerm: (value: string) => void;
   setShowModalMarket: (value: boolean) => void;
}

export const SelectMarketSwap = ({
   filteredData,
   handleSearch,
   searchTerm,
   setSearchTerm,
   setShowModalMarket,
}: SelectMarketSwap) => {
   const navigate = useNavigate();

   return (
      <div>
         <Popover className="relative inline-block text-left">
            {({ close }) => (
               <>
                  <div>
                     <Popover.Button>
                        <IcCoinPairs className="h-8 w-8 rounded-lg bg-dark3 p-1 text-white" />
                     </Popover.Button>
                  </div>
                  <Transition
                     as={Fragment}
                     enter="transition ease-out duration-100"
                     enterFrom="transform opacity-0 scale-95"
                     enterTo="transform opacity-100 scale-100"
                     leave="transition ease-in duration-75"
                     leaveFrom="transform opacity-100 scale-100"
                     leaveTo="transform opacity-0 scale-95">
                     <Popover.Panel className="absolute mt-2 w-full max-w-4xl origin-top-right rounded-md bg-dark shadow-lg ring-1 ring-black/5 focus:outline-none">
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
                                 <div className="absolute inset-y-0 end-0 flex items-center pe-3">
                                    <svg
                                       xmlns="http://www.w3.org/2000/svg"
                                       fill="none"
                                       viewBox="0 0 24 24"
                                       strokeWidth={1.5}
                                       stroke="currentColor"
                                       className="size-4 text-soft">
                                       <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                       />
                                    </svg>
                                 </div>
                              </div>
                           </div>
                           <div className="flex items-center justify-between border-b border-primary/50 pb-2 text-[10px] text-soft">
                              <div>Pairs</div>
                              <div>Last Price</div>
                              <div>Volume 24h</div>
                           </div>
                           <div className="mt-3 space-y-2">
                              {filteredData?.length > 0 ? (
                                 filteredData?.map(item => (
                                    <Popover.Button
                                       key={item.id}
                                       onClick={() => {
                                          setShowModalMarket(false);
                                          navigate(`/swap/${item.name?.replace('/', '-')}`);
                                          close;
                                          setSearchTerm('');
                                       }}
                                       className="flex w-full cursor-pointer justify-between">
                                       <div className="w-full text-left text-xs font-medium text-soft lg:text-sm">
                                          {item.name}
                                       </div>
                                       <div className="w-full text-center  text-xs font-light text-green">
                                          800
                                       </div>
                                       <div className="w-full text-right text-xs font-light text-green">
                                          500
                                       </div>
                                    </Popover.Button>
                                 ))
                              ) : (
                                 <div className="py-5 text-center text-sm font-bold text-soft">
                                    No Data
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
