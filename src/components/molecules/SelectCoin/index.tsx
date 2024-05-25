import React, { memo, useState } from 'react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { Coin } from '@/types/components';
import { useTranslation } from 'react-i18next';
import { COIN } from '@/constants';
import { AnimatePresence, motion } from 'framer-motion';

interface SelectCoinProps {
   value: Coin | null;
   setSelected(selected: Coin): void;
}

export const SelectCoin: React.FC<SelectCoinProps> = memo(({ value, setSelected }) => {
   const [isOpen, setIsOpen] = useState(false);
   const { t } = useTranslation();

   const handleButtonClick = () => {
      setIsOpen(!isOpen);
   };

   return (
      <Listbox
         value={value}
         onChange={setSelected}>
         {({ open }) => (
            <div className="relative">
               <ListboxButton
                  className="flex w-full gap-2 rounded-lg border border-soft/20 bg-transparent p-4 text-left text-white focus:outline-none"
                  onClick={handleButtonClick}>
                  {!value ? (
                     <span className="text-sm text-soft md:text-base">
                        {t('staking.add.card.form.one.placeholder')}
                     </span>
                  ) : (
                     <picture className="flex gap-2 capitalize">
                        <img
                           src={value?.iconUrl || '/images/reso.png'}
                           alt={value?.name}
                           className="h-6 w-6 overflow-hidden rounded-full"
                        />
                        {value?.name}
                     </picture>
                  )}

                  <span
                     className={`pointer-events-none absolute inset-y-7 right-4 flex items-center transition-transform duration-200 ease-in-out ${
                        open && 'rotate-180'
                     }`}>
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="h-3 w-3 text-soft"
                        viewBox="0 0 16 16">
                        <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z" />
                     </svg>
                  </span>
               </ListboxButton>
               <AnimatePresence>
                  {isOpen && (
                     <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ type: 'spring', damping: 12, duration: 0.3 }}
                        className="absolute z-10 mt-2 w-full rounded-lg border border-soft/20 bg-dark shadow-lg">
                        <ListboxOptions
                           static
                           className="h-80 overflow-y-scroll p-3 focus:outline-none">
                           {COIN.map((option, i) => (
                              <ListboxOption
                                 key={i}
                                 value={option}
                                 className={({ focus }) =>
                                    `${focus ? 'bg-soft/20 text-white' : 'text-gray-100'} relative cursor-pointer select-none rounded-lg px-2 py-3`
                                 }
                                 onClick={handleButtonClick}>
                                 {({ selected }) => (
                                    <div className="flex items-center gap-2">
                                       <img
                                          src={option?.iconUrl || '/images/reso.png'}
                                          className="h-6 w-6 overflow-hidden rounded-full"
                                          alt=""
                                       />
                                       <span
                                          className={`${
                                             selected ? 'font-semibold' : 'font-normal text-soft'
                                          } block truncate text-sm md:text-base`}>
                                          {option.name} - {option.symbol}
                                       </span>
                                    </div>
                                 )}
                              </ListboxOption>
                           ))}
                        </ListboxOptions>
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>
         )}
      </Listbox>
   );
});
