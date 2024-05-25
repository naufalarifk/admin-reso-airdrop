import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Text } from '@/components';

export function ModalPending({ show }: { show: boolean }) {
   return (
      <Transition
         appear
         show={show}
         as={Fragment}>
         <Dialog
            onClose={() => ''}
            as="div"
            className="relative">
            <Transition
               as={Fragment}
               enter="ease-out duration-300"
               enterFrom="opacity-0"
               enterTo="opacity-100"
               leave="ease-in duration-200"
               leaveFrom="opacity-100"
               leaveTo="opacity-0">
               <div className="fixed inset-0 z-[99]  bg-black/20 " />
            </Transition>

            <div className="fixed inset-0 z-[999] overflow-y-auto backdrop-blur-sm">
               <div className="flex min-h-full   items-center justify-center p-4">
                  <TransitionChild
                     as={Fragment}
                     enter="ease-out duration-300"
                     enterFrom="opacity-0 scale-95"
                     enterTo="opacity-100 scale-100"
                     leave="ease-in duration-200"
                     leaveFrom="opacity-100 scale-100"
                     leaveTo="opacity-0 scale-95">
                     <DialogPanel className="relative  w-full max-w-lg transform  overflow-hidden rounded-lg border border-soft/15 bg-dark  p-6  shadow-xl transition-all">
                        <DialogTitle
                           as="h3"
                           className="text-center text-lg font-semibold leading-6 text-white">
                           Please Wait
                        </DialogTitle>
                        <div className="my-7 flex items-center justify-center">
                           <svg
                              className="size-20 animate-spin text-primary"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24">
                              <circle
                                 className="opacity-0"
                                 cx={50}
                                 cy={50}
                                 r={20}
                                 stroke="currentColor"
                                 strokeWidth={4}
                              />
                              <path
                                 className="opacity-75"
                                 fill="currentColor"
                                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                           </svg>
                        </div>
                        <div className="text-center">
                           Please wait a sec, transaction has been proccessed Trade 0.000823 BTC for
                           0.0001 USDT
                        </div>
                        <Text
                           className="mt-2 text-center"
                           weight="medium"
                           textColor="lighGray">
                           Confirm this transaction in your wallet
                        </Text>
                     </DialogPanel>
                  </TransitionChild>
               </div>
            </div>
         </Dialog>
      </Transition>
   );
}
