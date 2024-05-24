import { Market } from '@/types/components';
import { Dialog, Transition } from '@headlessui/react';
import { ChangeEvent, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

interface ModalMobileChangeMarketProps {
   searchTerm: string;
   handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
   filteredData: Market[];
   showModalMarket: boolean;
   setSearchTerm: (value: string) => void;
   setShowModalMarket: (value: boolean) => void;
}

export const ModalMobileChangeMarket = ({
   filteredData,
   handleSearch,
   searchTerm,
   showModalMarket,
   setSearchTerm,
   setShowModalMarket,
}: ModalMobileChangeMarketProps) => {
   const navigate = useNavigate();

   return (
      <>
         <Transition
            appear
            show={showModalMarket}
            as={Fragment}>
            <Dialog
               as="div"
               className="relative block lg:hidden"
               onClose={() => setShowModalMarket(!showModalMarket)}>
               <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0">
                  <div className="fixed inset-0 z-[99]  bg-black/20 " />
               </Transition.Child>

               <div className="fixed inset-0 z-[999] overflow-y-auto backdrop-blur-sm">
                  <div className="flex min-h-full   items-center justify-center p-4">
                     <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95">
                        <Dialog.Panel className="relative  w-full max-w-lg transform  overflow-hidden rounded-lg border border-soft/15 bg-dark  p-6  shadow-xl transition-all">
                           <div className="mb-5">
                              <div className="relative flex rounded-lg border border-soft/20 bg-dark p-2 placeholder:text-soft focus:outline-none">
                                 <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    placeholder="Search for pairs, example: KLV-USDT"
                                    className="block w-full max-w-[410px] bg-transparent placeholder:text-xs placeholder:font-medium placeholder:text-soft focus:border-0 focus:outline-none "
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
                           <div className="flex items-center justify-between border-b border-primary/50 pb-2 text-xs text-soft">
                              <div>Pairs</div>
                              <div>Last Price</div>
                              <div>Volume 24h</div>
                           </div>
                           <div className="mt-3 space-y-2">
                              {filteredData?.length > 0 ? (
                                 filteredData?.map(item => (
                                    <div
                                       key={item.id}
                                       onClick={() => {
                                          navigate(`/trade/${item.name?.replace('/', '-')}`);
                                          setShowModalMarket(false);
                                          setSearchTerm('');
                                       }}
                                       className="flex cursor-pointer justify-between">
                                       <div className="w-full text-xs font-medium text-soft lg:text-base">
                                          {item.name}
                                       </div>
                                       <div className="w-full text-center text-xs font-light text-green">
                                          800
                                       </div>
                                       <div className="w-full text-right text-xs font-light text-green">
                                          500
                                       </div>
                                    </div>
                                 ))
                              ) : (
                                 <div className="py-5 text-center text-sm font-bold text-soft">
                                    No Data
                                 </div>
                              )}
                           </div>
                        </Dialog.Panel>
                     </Transition.Child>
                  </div>
               </div>
            </Dialog>
         </Transition>
      </>
   );
};
