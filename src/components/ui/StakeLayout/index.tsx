import { Outlet } from 'react-router-dom';

import { Balance, ButtonGlow, Header, ModalAddStaking, Text } from '@/components';
import { IcPattern } from '@/assets/icons/IcPattern';
import { useTranslation } from 'react-i18next';
import { cn } from '@/utils';
import type { ChangeEvent } from 'react';
import { Fragment, useCallback, useEffect, useState } from 'react';
import type { Coin } from '@/types/components';
import { Dialog, Transition } from '@headlessui/react';

interface NewStakingDataPayload {
   coinOne: Coin | null;
   coinTwo: Coin | null;
   amountCoinOne: string;
   amountCoinTwo: string;
   minUserJoin: string;
   maxUserJoin: string;
   rewardPerBlock: string;
   startStake: Date | string;
   endStake: Date | string;
}

export const StakeLayout = () => {
   const { t } = useTranslation();

   const [modalSucces, setModalSuccess] = useState(false);
   const [openAddStakeModal, setOpenAddStakeModal] = useState(false);
   const [selectedOptions, setSelectedOptions] = useState<Coin[]>([]);

   const handleCloseModal = useCallback(() => {
      setOpenAddStakeModal(false);
   }, []);

   const [newStakingData, setNewStakingData] = useState<NewStakingDataPayload>({
      coinOne: null,
      coinTwo: null,
      amountCoinOne: '',
      amountCoinTwo: '',
      endStake: '',
      maxUserJoin: '',
      minUserJoin: '',
      rewardPerBlock: '',
      startStake: '',
   });

   const setToken0 = (coin: Coin) => {
      setNewStakingData({
         ...newStakingData,
         coinOne: coin,
      });
   };
   const setToken1 = (coin: Coin) => {
      setNewStakingData({
         ...newStakingData,
         coinTwo: coin,
      });
   };

   const handlePriceCoinOne = (value: number) => {
      setNewStakingData({ ...newStakingData, amountCoinOne: String(value) });
   };

   const handlePricCoinTwo = (value: number) => {
      setNewStakingData({ ...newStakingData, amountCoinTwo: String(value) });
   };

   const handleMinUserJoin = (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      if (/^\d*\.?\d*$/.test(newValue))
         setNewStakingData({
            ...newStakingData,
            minUserJoin: String(newValue),
         });
   };

   const handleMaxUserJoin = (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      if (/^\d*\.?\d*$/.test(newValue)) {
         setNewStakingData({
            ...newStakingData,
            maxUserJoin: String(newValue),
         });
      }
   };

   const handleRewardPerBlock = (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      if (/^\d*\.?\d*$/.test(newValue)) {
         setNewStakingData({
            ...newStakingData,
            rewardPerBlock: String(newValue),
         });
      }
   };

   useEffect(() => {
      if (modalSucces) {
         setTimeout(() => {
            setModalSuccess(false);
            setNewStakingData({
               coinOne: null,
               coinTwo: null,
               amountCoinOne: '',
               amountCoinTwo: '',
               endStake: '',
               maxUserJoin: '',
               minUserJoin: '',
               rewardPerBlock: '',
               startStake: '',
            });
            setSelectedOptions([]);
         }, 1000);
      }
   }, [modalSucces]);

   return (
      <>
         <div className="relative">
            <Header />
            <div className="fixed h-full w-full">
               <IcPattern className="absolute w-full" />
            </div>
            <div className="layout h-full min-h-screen max-w-5xl">
               <div className="relative  py-20">
                  <div className="flex items-center justify-center">
                     <div className="max-w-">
                        <div className="flex flex-col items-center justify-center p-0 lg:p-8">
                           <div className="mb-4 text-center text-2xl font-semibold text-white lg:text-5xl">
                              {t('staking.layout.title.one')}{' '}
                              <span className="text-primary">{t('staking.layout.title.two')}</span>{' '}
                           </div>
                           <Text className="mb-4 text-center  text-sm text-soft md:text-2xl">
                              {t('staking.layout.desc')}
                           </Text>
                           <ButtonGlow
                              classNameButton={cn('w-56 max-lg:mb-6')}
                              onClick={() => setOpenAddStakeModal(true)}>
                              {t('global.addStaking')}
                           </ButtonGlow>
                        </div>
                        <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl border-[0.5px] border-soft/15 bg-dark2 p-4 md:gap-0 md:px-6 md:py-4">
                           <div className="space-y-1 text-center">
                              <div className="text-xxs font-normal  text-soft md:text-base">
                                 {t('staking.layout.info.one')}
                              </div>
                              <div className="text-sm font-semibold text-white md:text-xl">
                                 ~$ <Balance value={3478542} />
                              </div>
                           </div>
                           <div className="space-y-1 text-center">
                              <div className="text-xxs font-normal text-soft md:text-base">
                                 {t('staking.layout.info.two')}
                              </div>
                              <div className="text-sm font-semibold text-white md:text-xl">
                                 ~236%
                              </div>
                           </div>
                           <div className="space-y-1 text-center">
                              <div className="text-xxs font-normal  text-soft md:text-base">
                                 {t('staking.layout.info.three')}
                              </div>
                              <div className="text-sm font-semibold text-white md:text-xl">
                                 ~$ <Balance value={79323} />
                              </div>
                           </div>
                        </div>
                        <Outlet />
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <ModalAddStaking
            isOpen={openAddStakeModal}
            closeModal={() => {
               handleCloseModal();
               setNewStakingData({
                  coinOne: null,
                  coinTwo: null,
                  amountCoinOne: '',
                  amountCoinTwo: '',
                  endStake: '',
                  maxUserJoin: '',
                  minUserJoin: '',
                  rewardPerBlock: '',
                  startStake: '',
               });
               setSelectedOptions([]);
            }}
            //
            token0={newStakingData.coinOne}
            setToken0={setToken0}
            token1={newStakingData.coinTwo}
            setToken1={setToken1}
            //
            selectedOptions={selectedOptions}
            startDate={newStakingData.startStake}
            setStartDate={e => setNewStakingData({ ...newStakingData, startStake: e! })}
            endDate={newStakingData.endStake}
            setEndDate={e => setNewStakingData({ ...newStakingData, endStake: e! })}
            totalReward="400000"
            estimatedAPY="232"
            totalValueLocked="2128900"
            handleChangeCoinOne={handlePriceCoinOne}
            valueCoinOne={Number(newStakingData.amountCoinOne)}
            handleChangeCoinTwo={handlePricCoinTwo}
            valueCoinTwo={Number(newStakingData.amountCoinTwo)}
            valueMinUserJoin={newStakingData.minUserJoin}
            handleMinUserJoin={handleMinUserJoin}
            valueMaxUserJoin={newStakingData.maxUserJoin}
            handleMaxUserJoin={handleMaxUserJoin}
            valueRewardPerBlock={newStakingData.rewardPerBlock}
            handleRewardPerBlock={handleRewardPerBlock}
            handleSubmit={() => {
               handleCloseModal();
               setModalSuccess(true);
            }}
         />
         <Transition
            appear
            show={modalSucces}
            as={Fragment}>
            <Dialog
               onClose={() => ''}
               as="div"
               className="relative">
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
                           <Dialog.Title
                              as="h3"
                              className="text-center text-lg font-semibold leading-6 text-white">
                              Please Wait
                           </Dialog.Title>
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
                              <div>Please wait a sec, new staking demo has been processed</div>
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
