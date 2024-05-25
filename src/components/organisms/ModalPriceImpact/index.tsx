import { Button } from '@/components/atoms';
import { cn } from '@/utils';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const variants = {
   hidden: {
      y: '-100vh',
      opacity: 0,
   },
   visible: {
      y: '0',
      opacity: 1,
      transition: {
         duration: 0.1,
         type: 'spring',
         damping: 25,
         stiffness: 500,
      },
   },
   exit: {
      y: '100vh',
      opacity: 0,
   },
};

export function ModalPriceImpact({
   priceImpact,
   setPriceImpact,
   isOpen,
   setIsOpen,
}: {
   priceImpact: string;
   setPriceImpact: (value: string) => void;
   isOpen: boolean;
   setIsOpen: (value: boolean) => void;
}) {
   const [type, setType] = useState<'auto' | 'custom'>('auto');
   const [_priceImpact, _setPriceImpact] = useState(priceImpact);

   return (
      <AnimatePresence>
         {isOpen && (
            <Transition
               appear
               show={isOpen}>
               <Dialog
                  open={isOpen}
                  onClose={() => setIsOpen(false)}
                  className="relative z-50">
                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="fixed inset-0 bg-black/30 backdrop-blur-sm"
                  />
                  <div className="fixed inset-0 z-full w-screen overflow-y-auto">
                     <div className="flex min-h-full items-center justify-center p-4">
                        <TransitionChild
                           enter="ease-out duration-300"
                           enterFrom="opacity-0 transform-[scale(95%)]"
                           enterTo="opacity-100 transform-[scale(100%)]"
                           leave="ease-in duration-200"
                           leaveFrom="opacity-100 transform-[scale(100%)]"
                           leaveTo="opacity-0 transform-[scale(95%)]">
                           <DialogPanel
                              as={motion.div}
                              variants={variants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              className="w-full max-w-xl space-y-4 rounded-2xl border-white/10 bg-dark px-4 py-6 lg:space-y-6">
                              <DialogTitle
                                 as="h3"
                                 className="text-center text-base font-semibold text-white lg:text-2xl">
                                 Slippage Tolerance
                              </DialogTitle>
                              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                 <div className="grid grid-cols-2 rounded-lg border border-primary">
                                    <button
                                       className={cn(
                                          'grid h-11 place-items-center rounded-lg px-2 transition-all duration-300',
                                          type === 'auto' && 'bg-primary/10 text-primary',
                                       )}
                                       onClick={() => setType('auto')}>
                                       Auto
                                    </button>
                                    <button
                                       className={cn(
                                          'grid h-11 place-items-center rounded-lg px-2 transition-all duration-300',
                                          type === 'custom' && 'bg-primary/10 text-primary',
                                       )}
                                       onClick={() => setType('custom')}>
                                       Custom
                                    </button>
                                 </div>
                                 <div className="relative">
                                    <input
                                       type="text"
                                       autoFocus
                                       {...(type === 'auto' && {
                                          disabled: true,
                                       })}
                                       value={_priceImpact}
                                       onChange={e => _setPriceImpact(e.target.value)}
                                       className="flex h-11 w-full items-center rounded-r-2xl bg-dark2 pl-2 pr-7 text-right outline-none transition-all duration-300 focus:ring-1 focus:ring-primary max-lg:rounded-l-2xl"
                                    />
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                       %
                                    </div>
                                 </div>
                              </div>
                              <Button
                                 className="w-full rounded-full"
                                 onClick={() => {
                                    setIsOpen(false);
                                    setPriceImpact(_priceImpact);
                                 }}>
                                 Confirm
                              </Button>
                           </DialogPanel>
                        </TransitionChild>
                     </div>
                  </div>
               </Dialog>
            </Transition>
         )}
      </AnimatePresence>
   );
}
