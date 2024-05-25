import { IcSwapHorizontal } from '@/assets/icons';
import { Button, SelectToken, Text } from '@/components';
import { cn } from '@/utils';
import { memo, startTransition, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface StepFirstProps {
   amount: string;
   setAmount: (value: string) => void;
   receive: string;
   setReceive: (value: string) => void;
   from: string;
   setFrom: (value: string) => void;
   to: string;
   setTo: (value: string) => void;
   currency: string;
   setCurrency: (value: string) => void;
   setStep: (value: number) => void;
}

function StepFirstMemo({
   amount,
   setAmount,
   // receive,
   // setReceive,
   to,
   setTo,
   from,
   setFrom,
   currency,
   setCurrency,
   setStep,
}: StepFirstProps) {
   const { t } = useTranslation();

   useEffect(() => {
      if (!!from && !to && from !== 'SOL') {
         setTo('SOL');
      }
   }, [from, setTo, to]);

   const handleSwitch = useCallback(() => {
      if (!to || !from) return;

      startTransition(() => {
         setFrom(to);
         setTo(from);
      });
   }, [from, setFrom, setTo, to]);

   const handleSetTokenFrom = useCallback(
      (value: string) => {
         if (to === value) {
            handleSwitch();
         } else {
            setFrom(value);
         }
      },
      [handleSwitch, setFrom, to],
   );

   const handleSetTokenTo = useCallback(
      (value: string) => {
         if (from === value) {
            handleSwitch();
         } else {
            setTo(value);
         }
      },
      [from, handleSwitch, setTo],
   );

   return (
      <div className="space-y-4 lg:space-y-6.5">
         <div>
            <SelectToken
               value={from}
               setValue={handleSetTokenFrom}
               label="From"
            />
            <button
               type="button"
               onClick={handleSwitch}
               className="mx-auto mt-8 grid size-10 place-items-center rounded-full border-4 border-dark bg-dark2 transition-all duration-300 hover:rotate-180 hover:bg-primary/5 lg:mt-11 lg:size-12.5">
               <IcSwapHorizontal
                  height="24"
                  width="24"
               />
            </button>
            <SelectToken
               value={to}
               setValue={handleSetTokenTo}
               label="To"
            />
         </div>

         {/* Amount */}
         <div className="space-y-3">
            <div className="flex items-center justify-between">
               <Text
                  weight="medium"
                  variant="heading2"
                  textColor="lighGray"
                  className="max-lg:text-sm">
                  Amount Sent
               </Text>
               <Text
                  weight="medium"
                  textColor="lighGray"
                  variant="heading2"
                  className="max-lg:text-sm">
                  Balance : 10.000
               </Text>
            </div>
            <div className="flex gap-3">
               <div className="relative grow">
                  <input
                     type="number"
                     placeholder="0.00"
                     value={amount}
                     onChange={e => setAmount(e.target.value)}
                     className="flex h-12 w-full items-center rounded-l-2xl bg-dark px-4 pr-24 text-xl font-medium outline-none placeholder:text-gray3 lg:h-16 lg:text-2xl"
                  />
                  <button
                     type="button"
                     className="absolute right-4 top-3 grid h-6 place-items-center rounded bg-[linear-gradient(236deg,_rgba(93,_99,_111,_0.10)_1.26%,_rgba(25,_30,_40,_0.35)_100%)] px-3 text-xs text-primary lg:top-4 lg:h-[34px]">
                     MAX
                  </button>
               </div>
               <SelectToken
                  value={currency}
                  setValue={setCurrency}
                  wrapperInputClassName={cn('rounded-l-none')}
                  type="token"
               />
            </div>
         </div>
         {/* End Amount */}

         {/* Calculate */}
         <div className="space-y-3">
            <Text
               weight="medium"
               variant="heading2"
               textColor="lighGray"
               className="max-lg:text-sm">
               You Receive
            </Text>
            <div className="flex cursor-pointer flex-col gap-1 rounded-2xl border-[0.5px] border-[rgba(93,_99,_111,_0.10)] bg-dark p-4">
               <div className="flex items-start justify-between gap-4">
                  <Text
                     weight="medium"
                     variant="heading3"
                     textColor="lighGray">
                     {t('bridge.firstStep.minimumReceived')} :{' '}
                  </Text>
                  <Text
                     weight="medium"
                     variant="heading"
                     className="max-lg:text-xl">
                     8.247583 USDT
                  </Text>
               </div>
               <div className="flex items-center justify-between gap-4">
                  <Text
                     weight="medium"
                     variant="heading3"
                     textColor="lighGray">
                     {t('bridge.firstStep.networkFees')} :{' '}
                  </Text>
                  <Text
                     weight="medium"
                     variant="heading3"
                     textColor="lighGray">
                     In less than 1 munute Total fee : <span className="text-white">$1.75</span>
                  </Text>
               </div>
            </div>
         </div>
         {/* End Calculate */}

         {/* Address */}
         <div className="space-y-3">
            <Text
               weight="medium"
               variant="heading2"
               textColor="lighGray"
               className="max-lg:text-sm">
               Destination Address
            </Text>
            <div className="relative">
               <input
                  type="text"
                  placeholder={t('bridge.firstStep.placeholder')}
                  // value={receive}
                  // onChange={e => setReceive(e.target.value)}
                  className="flex h-12 w-full items-center rounded-2xl bg-dark px-4 pr-14 text-base font-medium outline-none placeholder:text-gray3 lg:h-16"
               />
               <svg
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none">
                  <path
                     d="M17 8V5C17 4.73478 16.8946 4.48043 16.7071 4.29289C16.5196 4.10536 16.2652 4 16 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6M4 6C4 6.53043 4.21071 7.03914 4.58579 7.41421C4.96086 7.78929 5.46957 8 6 8H18C18.2652 8 18.5196 8.10536 18.7071 8.29289C18.8946 8.48043 19 8.73478 19 9V12M4 6V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H18C18.2652 20 18.5196 19.8946 18.7071 19.7071C18.8946 19.5196 19 19.2652 19 19V16"
                     stroke="#90A3BF"
                     stroke-width="2"
                     stroke-linecap="round"
                     stroke-linejoin="round"
                  />
                  <path
                     d="M20 12V16H16C15.4696 16 14.9609 15.7893 14.5858 15.4142C14.2107 15.0391 14 14.5304 14 14C14 13.4696 14.2107 12.9609 14.5858 12.5858C14.9609 12.2107 15.4696 12 16 12H20Z"
                     stroke="#90A3BF"
                     stroke-width="2"
                     stroke-linecap="round"
                     stroke-linejoin="round"
                  />
               </svg>
            </div>
         </div>
         {/* End Address */}

         <Button
            className="w-full rounded-full"
            onClick={() => setStep(1)}
            disabled={!from || !to || !currency}>
            {t('bridge.firstStep.continue')}
         </Button>
      </div>
   );
}

const StepFirst = memo(StepFirstMemo);

export default StepFirst;
