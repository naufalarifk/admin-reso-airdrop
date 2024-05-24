import { IcClose, IcDropdown } from '@/assets/icons';
import { Text } from '@/components';
import { useMemo, useState } from 'react';
import {
   CloseButton,
   Dialog,
   DialogPanel,
   DialogTitle,
   Transition,
   TransitionChild,
} from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/utils';
import { COIN } from '@/constants';
import { chains } from '@/constants/chains';

type SelectTokenProps = {
   type?: 'network' | 'token';
   label?: string;
   value: string;
   setValue: (value: string) => void;
   wrapperInputClassName?: string;
   isDisabled?: boolean;
};

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

export function SelectToken({
   type = 'network',
   label,
   value,
   setValue,
   wrapperInputClassName,
   isDisabled,
}: SelectTokenProps) {
   const [show, setShow] = useState(false);

   const selectedToken = useMemo(() => COIN.find(e => e.symbol === value), [value]);
   const selectedChain = useMemo(
      () => chains.find(e => e.nativeCurrency.symbol === value),
      [value],
   );

   return (
      <>
         <div className="space-y-3">
            {label && (
               <Text
                  weight="medium"
                  variant="heading2"
                  textColor="lighGray"
                  className="max-lg:text-sm">
                  {label}
               </Text>
            )}
            <div
               className={cn(
                  'flex h-12 cursor-pointer items-center justify-between gap-4 rounded-2xl px-4 lg:h-16',
                  isDisabled
                     ? 'cursor-not-allowed bg-primary/10'
                     : 'border-[0.5px] border-[rgba(93,_99,_111,_0.10)] bg-dark',
                  wrapperInputClassName,
               )}
               onClick={() => !isDisabled && setShow(true)}>
               <div className="flex items-center gap-2">
                  {(selectedToken || selectedChain) && (
                     <div className="size-6 overflow-hidden rounded-full">
                        <img
                           src={
                              (type === 'token'
                                 ? selectedToken?.iconUrl
                                 : selectedChain?.custom.icon) || ''
                           }
                           alt={
                              (type === 'token' ? selectedToken?.name : selectedChain?.name) || ''
                           }
                           className="size-full object-cover"
                        />
                     </div>
                  )}
                  <Text
                     weight="medium"
                     variant="heading3"
                     className="max-lg:text-xs"
                     textColor={selectedToken || selectedChain ? 'default' : 'lighGray'}>
                     {selectedToken || selectedChain
                        ? `${type === 'token' ? selectedToken?.name : selectedChain?.name} (${type === 'token' ? selectedToken?.symbol : selectedChain?.nativeCurrency.symbol})`
                        : `Select ${type}`}
                  </Text>
               </div>
               <button className={cn(show && 'rotate-180', 'transition-all duration-500')}>
                  <IcDropdown />
               </button>
            </div>
         </div>

         {/* Mpdal list */}
         <AnimatePresence>
            {show && (
               <Transition
                  appear
                  show={show}>
                  <Dialog
                     as="div"
                     className="relative z-full focus:outline-none"
                     onClose={() => setShow(false)}>
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
                                 className="w-full max-w-lg rounded-2xl border border-white/10 bg-dark2 p-6">
                                 <div className="flex items-center justify-between gap-2">
                                    <DialogTitle
                                       as="h3"
                                       className="text-base font-semibold text-white lg:text-2xl">
                                       Select {type}
                                    </DialogTitle>
                                    <CloseButton className="grid size-6 place-items-center rounded-full transition-all duration-300 data-[hover]:scale-110">
                                       <IcClose />
                                    </CloseButton>
                                 </div>
                                 <Text
                                    variant="heading2"
                                    weight="medium"
                                    textColor="lighGray"
                                    className="mt-2 max-lg:text-sm">
                                    Select Token to process your bridge
                                 </Text>
                                 <div className="mt-6.5">
                                    <div className="space-y-3">
                                       {type === 'token'
                                          ? COIN.map(e => (
                                               <div
                                                  key={e.symbol}
                                                  onClick={() => {
                                                     setValue(e.symbol);
                                                     setShow(false);
                                                  }}
                                                  className={cn(
                                                     'flex h-14 cursor-pointer items-center gap-2 rounded-2xl',
                                                     'bg-dark',
                                                     value === e.symbol && 'bg-primary/35',
                                                     'px-4 transition-all duration-300 hover:bg-opacity-30',
                                                  )}>
                                                  <div className="size-6 overflow-hidden rounded-full">
                                                     <img
                                                        src={e.iconUrl || ''}
                                                        alt={e.name}
                                                        className="size-full object-cover"
                                                     />
                                                  </div>
                                                  <span className="font-medium max-lg:text-sm">
                                                     {e.name} ({e.symbol})
                                                  </span>
                                               </div>
                                            ))
                                          : chains.map(e => (
                                               <div
                                                  key={e.nativeCurrency.symbol}
                                                  onClick={() => {
                                                     setValue(e.nativeCurrency.symbol);
                                                     setShow(false);
                                                  }}
                                                  className={cn(
                                                     'flex h-14 cursor-pointer items-center gap-2 rounded-2xl',
                                                     'bg-dark',
                                                     value === e.nativeCurrency.symbol &&
                                                        'bg-primary/35',
                                                     'px-4 transition-all duration-300 hover:bg-opacity-30',
                                                  )}>
                                                  <div className="size-6 overflow-hidden rounded-full">
                                                     <img
                                                        src={e.custom.icon || ''}
                                                        alt={e.name}
                                                        className="size-full object-cover"
                                                     />
                                                  </div>
                                                  <span className="font-medium max-lg:text-sm">
                                                     {e.name} ({e.nativeCurrency.symbol})
                                                  </span>
                                               </div>
                                            ))}
                                    </div>
                                 </div>
                              </DialogPanel>
                           </TransitionChild>
                        </div>
                     </div>
                  </Dialog>
               </Transition>
            )}
         </AnimatePresence>
         {/* End Mpdal list */}
      </>
   );
}
