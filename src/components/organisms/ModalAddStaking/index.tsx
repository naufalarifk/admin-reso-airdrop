import { ChangeEvent, Fragment, memo } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { InfoRewardStake, SelectCoin } from '@/components/molecules';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger, Calendar, NumberInput } from '@/components/atoms';
import { cn } from '@/utils';

import type { Coin } from '@/types/components';
import { useTranslation } from 'react-i18next';

interface ModalAddStakeProps {
   token0: Coin | null;
   setToken0: (coin: Coin) => void;
   token1: Coin | null;
   setToken1: (coin: Coin) => void;

   isOpen: boolean;
   closeModal: () => void;
   selectedOptions: Coin[];
   startDate: Date | string | undefined;
   setStartDate: (date: Date | undefined) => void;
   endDate: Date | string | undefined;
   setEndDate: (date: Date | undefined) => void;
   totalValueLocked?: string;
   estimatedAPY?: string | number;
   totalReward?: string | number;
   handleChangeCoinOne: (value: number) => void;
   valueCoinOne: number;
   handleChangeCoinTwo: (value: number) => void;
   valueCoinTwo: number;
   valueMinUserJoin: string;
   handleMinUserJoin: (value: ChangeEvent<HTMLInputElement>) => void;
   valueMaxUserJoin: string;
   handleMaxUserJoin: (value: ChangeEvent<HTMLInputElement>) => void;
   valueRewardPerBlock: string;
   handleRewardPerBlock: (value: ChangeEvent<HTMLInputElement>) => void;
   handleSubmit: () => void;
}

export const ModalAddStaking = memo(
   ({
      token0,
      setToken0,
      token1,
      setToken1,
      closeModal,
      isOpen,
      // selectedOptions,
      startDate,
      setStartDate,
      endDate,
      setEndDate,
      totalValueLocked,
      estimatedAPY,
      totalReward,
      handleChangeCoinOne,
      valueCoinOne,
      handleChangeCoinTwo,
      valueCoinTwo,
      valueMinUserJoin,
      handleMinUserJoin,
      valueMaxUserJoin,
      handleMaxUserJoin,
      valueRewardPerBlock,
      handleRewardPerBlock,
      handleSubmit,
   }: ModalAddStakeProps) => {
      const { t } = useTranslation();

      return (
         <Transition
            appear
            show={isOpen}
            as={Fragment}>
            <Dialog
               as="div"
               className="relative"
               onClose={closeModal}>
               <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0">
                  <div className="fixed inset-0 z-[99]  bg-black/50 " />
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
                        <Dialog.Panel className="relative h-full  w-full max-w-3xl transform  overflow-hidden rounded-lg border border-soft/15 bg-dark  p-6  shadow-xl transition-all">
                           <div className="flex items-start justify-between">
                              <div>
                                 <div className="mb-1 text-lg font-semibold text-white md:text-2xl">
                                    {t('staking.add.card.title')}
                                 </div>
                                 <div className="md:tex-base text-sm text-soft">
                                    {t('staking.add.card.subtitle')}
                                 </div>
                              </div>
                              <div
                                 onClick={closeModal}
                                 className="cursor-pointer">
                                 <svg
                                    width={24}
                                    height={25}
                                    viewBox="0 0 24 25"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                       d="M12 2C6.15 2 1.5 6.65 1.5 12.5S6.15 23 12 23s10.5-4.65 10.5-10.5S17.85 2 12 2zm0 19.5c-4.95 0-9-4.05-9-9s4.05-9 9-9 9 4.05 9 9-4.05 9-9 9z"
                                       fill="#90A3BF"
                                    />
                                    <path
                                       d="M16.05 17.75L12 13.7l-4.05 4.05-1.2-1.2 4.05-4.05-4.05-4.05 1.2-1.2L12 11.3l4.05-4.05 1.2 1.2-4.05 4.05 4.05 4.05-1.2 1.2z"
                                       fill="#90A3BF"
                                    />
                                 </svg>
                              </div>
                           </div>
                           <div className="mt-6">
                              <div className="space-y-4">
                                 <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-3">
                                       <label className="text-sm md:text-base">
                                          {t('staking.add.card.form.one.label')}
                                       </label>
                                       <SelectCoin
                                          value={token0}
                                          setSelected={setToken0}
                                       />
                                    </div>
                                    <div className="space-y-3">
                                       <label className="text-sm md:text-base">
                                          {t('staking.add.card.form.one.label')}
                                       </label>
                                       <SelectCoin
                                          value={token1}
                                          setSelected={setToken1}
                                       />
                                    </div>
                                 </div>

                                 {token0 && token1 && (
                                    <>
                                       <div className="space-y-3">
                                          <label className="text-sm capitalize md:text-base">
                                             {token0?.name} ({token0?.symbol}){' '}
                                          </label>
                                          <div className="relative">
                                             <NumberInput
                                                value={valueCoinOne}
                                                placeholder={`${t(
                                                   'staking.add.card.form.two.placeholder',
                                                )}`}
                                                onChange={handleChangeCoinOne}
                                                className="block w-full rounded-lg border border-soft/20 bg-dark p-4 placeholder:text-sm placeholder:text-soft focus:outline-none placeholder:md:text-base"
                                             />
                                             <img
                                                src={token0?.iconUrl || '/images/reso.png'}
                                                className="absolute inset-y-4 right-4 size-7 overflow-hidden rounded-full"
                                                alt="icon-coin-one"
                                             />
                                          </div>
                                       </div>
                                       <div className="space-y-3">
                                          <label className="text-sm capitalize md:text-base">
                                             {token1?.name} ({token1?.symbol})
                                          </label>
                                          <div className="relative">
                                             <NumberInput
                                                placeholder={`${t(
                                                   'staking.add.card.form.two.placeholder',
                                                )}`}
                                                className="block w-full rounded-lg border border-soft/20 bg-dark p-4 placeholder:text-sm placeholder:text-soft focus:outline-none placeholder:md:text-base"
                                                value={valueCoinTwo}
                                                onChange={handleChangeCoinTwo}
                                             />
                                             <img
                                                src={token1?.iconUrl || '/images/reso.png'}
                                                className="absolute inset-y-4 right-4 size-7 overflow-hidden rounded-full"
                                                alt="icon-coin-one"
                                             />
                                          </div>
                                       </div>
                                    </>
                                 )}

                                 <div>
                                    <div className="mb-3 text-sm text-white md:text-base">
                                       {t('staking.add.card.form.three.label')}
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
                                       <div className="space-y-3">
                                          <input
                                             type="text"
                                             onChange={handleMinUserJoin}
                                             value={valueMinUserJoin}
                                             placeholder={t(
                                                'staking.add.card.form.three.placeholder.one',
                                             )}
                                             className="block w-full rounded-lg border border-soft/20 bg-dark p-4 placeholder:text-sm placeholder:text-soft focus:outline-none placeholder:md:text-base"
                                          />
                                       </div>
                                       <div className="space-y-3">
                                          <input
                                             type="text"
                                             value={valueMaxUserJoin}
                                             onChange={handleMaxUserJoin}
                                             placeholder={t(
                                                'staking.add.card.form.three.placeholder.two',
                                             )}
                                             className="block w-full rounded-lg border border-soft/20 bg-dark p-4 placeholder:text-sm placeholder:text-soft focus:outline-none placeholder:md:text-base"
                                          />
                                       </div>
                                    </div>
                                 </div>
                                 <div className="space-y-3">
                                    <label className="text-sm md:text-base">
                                       {t('staking.add.card.form.four.label')}
                                    </label>
                                    <input
                                       type="text"
                                       value={valueRewardPerBlock}
                                       onChange={handleRewardPerBlock}
                                       placeholder={`${t('staking.add.card.form.two.placeholder')}`}
                                       className="block w-full rounded-lg border border-soft/20 bg-dark p-4 placeholder:text-soft focus:outline-none"
                                    />
                                 </div>
                                 <div>
                                    <div className="mb-3 text-sm text-white md:text-base">
                                       {t('staking.add.card.form.five.label')}
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
                                       <div className="space-y-3">
                                          <Popover>
                                             <PopoverTrigger asChild>
                                                <button
                                                   className={cn(
                                                      ' flex w-full justify-between rounded-lg border border-soft/20 p-4 text-left font-normal text-white',
                                                      !startDate && 'text-muted-foreground',
                                                   )}>
                                                   {startDate ? (
                                                      format(startDate, 'dd/MM/yyyy')
                                                   ) : (
                                                      <span className="text-sm text-soft md:text-base">
                                                         {t(
                                                            'staking.add.card.form.five.placeholder.one',
                                                         )}
                                                      </span>
                                                   )}
                                                   <svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      viewBox="0 0 24 24"
                                                      fill="currentColor"
                                                      className="h-6 w-6 text-soft">
                                                      <path
                                                         fillRule="evenodd"
                                                         d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                                                         clipRule="evenodd"
                                                      />
                                                   </svg>
                                                </button>
                                             </PopoverTrigger>
                                             <PopoverContent className="relative z-[99999] w-auto border border-soft/50 bg-dark p-1">
                                                <Calendar
                                                   mode="single"
                                                   selected={startDate as Date}
                                                   onSelect={setStartDate}
                                                   initialFocus
                                                />
                                             </PopoverContent>
                                          </Popover>
                                       </div>
                                       <div className="space-y-3">
                                          <Popover>
                                             <PopoverTrigger asChild>
                                                <button
                                                   className={cn(
                                                      ' flex w-full justify-between rounded-lg border border-soft/20 p-4 text-left font-normal text-white',
                                                      !endDate && 'text-muted-foreground',
                                                   )}>
                                                   {endDate ? (
                                                      format(endDate, 'dd/MM/yyyy')
                                                   ) : (
                                                      <span className="text-sm text-soft md:text-base">
                                                         {t(
                                                            'staking.add.card.form.five.placeholder.two',
                                                         )}
                                                      </span>
                                                   )}
                                                   <svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      viewBox="0 0 24 24"
                                                      fill="currentColor"
                                                      className="h-6 w-6 text-soft">
                                                      <path
                                                         fillRule="evenodd"
                                                         d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                                                         clipRule="evenodd"
                                                      />
                                                   </svg>
                                                </button>
                                             </PopoverTrigger>
                                             <PopoverContent className="relative z-[99999] w-auto border border-soft/50 bg-dark p-1">
                                                <Calendar
                                                   mode="single"
                                                   selected={endDate as Date}
                                                   onSelect={setEndDate}
                                                   initialFocus
                                                />
                                             </PopoverContent>
                                          </Popover>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div className="mt-6 rounded-lg bg-secondary/10 p-3">
                                 <div className="text-sm font-medium text-secondary md:text-base">
                                    {t('global.requirement')}
                                 </div>
                                 <ul className="list-inside list-disc space-y-1 text-xs text-secondary">
                                    <li> {t('staking.add.card.info.list.one')} 100 RESO</li>
                                    <li>{t('staking.add.card.info.list.two')}</li>
                                 </ul>
                              </div>
                              <InfoRewardStake
                                 totalValueLocked={Number(totalValueLocked)}
                                 estimatedAPY={Number(estimatedAPY)}
                                 estimatedTotalReward={Number(totalReward)}
                              />
                           </div>
                           <div>
                              <button
                                 onClick={handleSubmit}
                                 disabled={
                                    // selectedOptions.length <= 0 ||
                                    !valueCoinOne ||
                                    !valueCoinTwo ||
                                    !valueMaxUserJoin ||
                                    !valueMinUserJoin ||
                                    !valueRewardPerBlock ||
                                    !startDate ||
                                    !endDate
                                 }
                                 className="w-full rounded-full bg-primary p-4 disabled:bg-opacity-50">
                                 {t('button.continue')}
                              </button>
                           </div>
                        </Dialog.Panel>
                     </Transition.Child>
                  </div>
               </div>
            </Dialog>
         </Transition>
      );
   },
);
