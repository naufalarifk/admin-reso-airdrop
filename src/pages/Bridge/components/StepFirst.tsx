import { IcSwapHorizontal } from '@/assets/icons';
import { Button, SelectToken, Text } from '@/components';
import { cn } from '@/utils';
import { memo, startTransition, useState } from 'react';
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
   receive,
   setReceive,
   to,
   setTo,
   from,
   setFrom,
   currency,
   setCurrency,
   setStep,
}: StepFirstProps) {
   const { t } = useTranslation();
   const [isViaConnectAddress, setIsViaConnectAddress] = useState(true);

   return (
      <div className="space-y-6.5">
         <div>
            <SelectToken
               value={from}
               setValue={setFrom}
               label="From"
            />
            <button
               type="button"
               onClick={() => {
                  startTransition(() => {
                     setFrom(to);
                     setTo(from);
                  });
               }}
               className="mx-auto mt-11 grid size-12.5 place-items-center rounded-full border-4 border-dark bg-dark2 transition-all duration-300 hover:rotate-180 hover:bg-primary/5">
               <IcSwapHorizontal
                  height="24"
                  width="24"
               />
            </button>
            <SelectToken
               value={to}
               setValue={setTo}
               label="To"
            />
         </div>
         <div className="space-y-3">
            <Text
               weight="medium"
               variant="heading2"
               textColor="lighGray">
               Amount Sent
            </Text>
            <div className="flex gap-3">
               <div className="relative grow">
                  <input
                     type="number"
                     placeholder="0.00"
                     value={amount}
                     onChange={e => setAmount(e.target.value)}
                     className="w-full rounded-l-2xl bg-dark p-4 pr-24 text-2xl font-medium outline-none placeholder:text-gray3"
                  />
                  <button
                     type="button"
                     className="absolute right-4 top-4 grid h-[34px] place-items-center rounded bg-[linear-gradient(236deg,_rgba(93,_99,_111,_0.10)_1.26%,_rgba(25,_30,_40,_0.35)_100%)] px-3 text-primary">
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
         <div className="space-y-3">
            <Text
               weight="medium"
               variant="heading2"
               textColor="lighGray">
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
                     variant="heading">
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
         <div className="grid grid-cols-2">
            <button
               type="button"
               className={cn(
                  'flex h-14 items-center justify-center gap-2 border-b-[3px] bg-[linear-gradient(236deg,_rgba(93,_99,_111,_0.10)_1.26%,_rgba(25,_30,_40,_0.35)_100%)] transition-all duration-300',
                  isViaConnectAddress ? 'border-primary' : 'border-[#21232E]',
               )}
               onClick={() => setIsViaConnectAddress(true)}>
               <img
                  src="/images/icon-metamask.svg"
                  alt="metamask"
               />
               <Text
                  weight="medium"
                  variant="heading3">
                  0x430Fe34EED7d
               </Text>
            </button>
            <button
               type="button"
               className={cn(
                  'grid h-14 place-items-center border-b-[3px] bg-dark transition-all duration-300',
                  !isViaConnectAddress ? 'border-primary' : 'border-[#21232E]',
               )}
               onClick={() => setIsViaConnectAddress(false)}>
               <Text
                  weight="medium"
                  textColor="lighGray"
                  variant="heading3">
                  Select Other Address
               </Text>
            </button>
         </div>
         {!isViaConnectAddress && (
            <div className="relative">
               <input
                  type="text"
                  placeholder={t('bridge.firstStep.placeholder')}
                  value={receive}
                  onChange={e => setReceive(e.target.value)}
                  className="w-full rounded-2xl bg-dark p-4 pr-24 text-base font-medium outline-none placeholder:text-gray3"
               />
               <button
                  type="button"
                  className="absolute right-4 top-4">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="24"
                     height="24"
                     viewBox="0 0 24 24"
                     fill="none">
                     <path
                        d="M3 11H11V3H3V11ZM5 5H9V9H5V5ZM3 21H11V13H3V21ZM5 15H9V19H5V15ZM13 3V11H21V3H13ZM19 9H15V5H19V9ZM13.01 13H15.01V15H13.01V13ZM15.01 15H17.01V17H15.01V15ZM13.01 17H15.01V19H13.01V17ZM17.01 17H19.01V19H17.01V17ZM19.01 19H21.01V21H19.01V19ZM15.01 19H17.01V21H15.01V19ZM17.01 13H19.01V15H17.01V13ZM19.01 15H21.01V17H19.01V15Z"
                        fill="#90A3BF"
                     />
                  </svg>
               </button>
            </div>
         )}
         <Button
            className="w-full rounded-full"
            onClick={() => setStep(1)}
            disabled={!from || !to}>
            {t('bridge.firstStep.continue')}
         </Button>
      </div>
   );
}

export const StepFirst = memo(StepFirstMemo);
