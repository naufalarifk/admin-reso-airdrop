import { IcBitcoin, IcCheck, IcCopy, IcSwapHorizontal } from '@/assets/icons';
import { BridgeInput, BridgeSteps, Button, Input, SelectToken, Text } from '@/components';
import { COIN } from '@/constants';
import { cn } from '@/utils';
import { Dialog, Transition } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
   Dispatch,
   Fragment,
   ReactNode,
   SetStateAction,
   useCallback,
   useEffect,
   useMemo,
   useState,
} from 'react';
import { useTranslation } from 'react-i18next';

interface ChildrenProps {
   step: number;
   setStep: Dispatch<SetStateAction<number>>;
   from?: (typeof COIN)[number];
   setFrom?: Dispatch<SetStateAction<(typeof COIN)[number]>>;
}

const variants = {
   hidden: { opacity: 0, x: -24, y: 0 },
   enter: { opacity: 1, x: 0, y: 0 },
   exit: { opacity: 0, x: 24, y: 0 },
};

export const Bridge = () => {
   const { t } = useTranslation();
   const [step, setStep] = useState(0);
   const [from, setFrom] = useState('');
   const [to, setTo] = useState('');
   const [currency, setCurrency] = useState('');
   const [amount, setAmount] = useState('0.000823');
   const [receive, setReceive] = useState('0.000823');
   const [addressFrom, setAddressFrom] = useState('0x763c396673F9c...');
   const [addressTo, setAddressTo] = useState('0x2C0ed74caBeF1EFd...');
   const [modalPaymentLoading, setModalPaymentLoading] = useState(false);
   const [isViaConnectAddress, setIsViaConnectAddress] = useState(true);

   const selected = useCallback((value: string) => COIN.find(e => e.symbol === value), []);

   useEffect(() => {
      if (modalPaymentLoading) {
         setTimeout(() => {
            setModalPaymentLoading(false);
            setStep(2);
         }, 1000);
      }
   }, [modalPaymentLoading]);

   const renderStep = useMemo<Record<number, ReactNode>>(
      () => ({
         0: (
            <>
               <div className="space-y-6.5">
                  <div>
                     <SelectToken
                        value={from}
                        setValue={setFrom}
                        label="From"
                     />
                     <button
                        type="button"
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
                              In less than 1 munute Total fee :{' '}
                              <span className="text-white">$1.75</span>
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
            </>
         ),
         1: (
            <>
               <div className="flex gap-4 max-lg:flex-col">
                  <div className="size-64 shrink-0 rounded-lg bg-dark p-4">
                     <div className="rounded-[20px] bg-dark2 p-4">
                        <img src="/images/qr-code.png" />
                     </div>
                  </div>
                  <div className="grow rounded-lg bg-dark px-4 py-6">
                     <div className="space-y-1">
                        <div className="flex items-center justify-between gap-4">
                           <Text
                              weight="medium"
                              variant="heading3"
                              textColor="lighGray">
                              {t('bridge.thirdStep.bridge')}
                           </Text>
                           <div className="flex items-center gap-1">
                              <div className="flex items-center gap-2">
                                 <div className="size-6 overflow-hidden rounded-full">
                                    <img
                                       src={selected(from)?.iconUrl || ''}
                                       alt={selected(from)?.name}
                                       className="size-full object-cover"
                                    />
                                 </div>
                                 <Text
                                    weight="medium"
                                    variant="heading3"
                                    textColor={selected(from) ? 'default' : 'lighGray'}>
                                    {selected(from)
                                       ? `${selected(from)?.name} (${selected(from)?.symbol})`
                                       : 'Select token'}
                                 </Text>
                              </div>
                              <span>-</span>
                              <div className="flex items-center gap-2">
                                 <div className="size-6 overflow-hidden rounded-full">
                                    <img
                                       src={selected(to)?.iconUrl || ''}
                                       alt={selected(to)?.name}
                                       className="size-full object-cover"
                                    />
                                 </div>
                                 <Text
                                    weight="medium"
                                    variant="heading3"
                                    textColor={selected(to) ? 'default' : 'lighGray'}>
                                    {selected(to)
                                       ? `${selected(to)?.name} (${selected(to)?.symbol})`
                                       : 'Select token'}
                                 </Text>
                              </div>
                           </div>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                           <Text
                              weight="medium"
                              variant="heading3"
                              textColor="lighGray">
                              {t('bridge.thirdStep.sendToken')}
                           </Text>
                           <Text
                              weight="medium"
                              variant="heading3">
                              {amount}
                           </Text>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                           <Text
                              weight="medium"
                              variant="heading3"
                              textColor="lighGray">
                              {t('bridge.thirdStep.receiveToken')}
                           </Text>
                           <Text
                              weight="medium"
                              variant="heading3">
                              {receive}
                           </Text>
                        </div>
                     </div>
                     <div className="my-2.5 flex items-center justify-between gap-4 border-y-[0.5px] border-white/10 py-2.5">
                        <Text
                           weight="medium"
                           variant="heading3"
                           textColor="lighGray"
                           className="whitespace-nowrap">
                           {t('bridge.thirdStep.destinationAddress')}
                        </Text>
                        <div className="flex items-center gap-2">
                           <Text
                              weight="medium"
                              variant="heading3"
                              className="truncate">
                              {addressFrom}
                           </Text>
                           <button>
                              <IcCopy />
                           </button>
                        </div>
                     </div>
                     <div className="space-y-1">
                        <div className="flex items-center justify-between gap-4">
                           <Text
                              weight="medium"
                              variant="heading3"
                              textColor="lighGray">
                              {t('bridge.thirdStep.minimumReceived')}
                           </Text>
                           <Text
                              weight="medium"
                              variant="heading3">
                              0.000823
                           </Text>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                           <Text
                              weight="medium"
                              variant="heading3"
                              textColor="lighGray">
                              {t('bridge.thirdStep.networkFees')}
                           </Text>
                           <Text
                              weight="medium"
                              variant="heading3">
                              -$3.20
                           </Text>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                           <Text
                              weight="medium"
                              variant="heading3"
                              textColor="lighGray">
                              {t('bridge.thirdStep.receivingAddress')}
                           </Text>
                           <Text
                              weight="medium"
                              variant="heading3"
                              textColor="lighGray">
                              {addressTo}
                           </Text>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="mt-6 grid grid-cols-2 gap-2">
                  <Button
                     variant="outline-primary"
                     className="rounded-full">
                     Pay With Wallet
                  </Button>
                  <Button
                     className="rounded-full"
                     onClick={() => setModalPaymentLoading(true)}>
                     Continue
                  </Button>
               </div>
            </>
         ),
         2: (
            <>
               <div className="space-y-6.5 rounded-lg bg-dark px-4 py-6">
                  <div className="grid grid-cols-3">
                     <div className="flex items-center gap-2">
                        <div className="size-6 overflow-hidden rounded-full">
                           <img
                              src={selected(from)?.iconUrl || ''}
                              alt={selected(from)?.name}
                              className="size-full object-cover"
                           />
                        </div>
                        <Text
                           weight="medium"
                           variant="heading3"
                           textColor={selected(from) ? 'default' : 'lighGray'}>
                           {selected(from)?.name} ({selected(from)?.symbol})
                        </Text>
                     </div>
                     <svg
                        className="mx-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none">
                        <path
                           d="M8.03101 11.0306C7.96136 11.1003 7.87864 11.1556 7.78759 11.1933C7.69654 11.2311 7.59895 11.2505 7.50039 11.2505C7.40183 11.2505 7.30423 11.2311 7.21318 11.1933C7.12213 11.1556 7.03942 11.1003 6.96976 11.0306L3.96976 8.03055C3.90003 7.9609 3.84471 7.87818 3.80697 7.78713C3.76922 7.69608 3.7498 7.59849 3.7498 7.49993C3.7498 7.40137 3.76922 7.30377 3.80697 7.21272C3.84471 7.12167 3.90003 7.03896 3.96976 6.9693L6.96976 3.9693C7.03944 3.89962 7.12217 3.84435 7.21321 3.80663C7.30426 3.76892 7.40184 3.74951 7.50039 3.74951C7.59893 3.74951 7.69652 3.76892 7.78756 3.80663C7.8786 3.84435 7.96133 3.89962 8.03101 3.9693C8.17174 4.11003 8.2508 4.30091 8.2508 4.49993C8.2508 4.59847 8.23139 4.69606 8.19368 4.7871C8.15597 4.87815 8.1007 4.96087 8.03101 5.03055L6.3107 6.74993L19.5004 6.74993C19.6993 6.74993 19.8901 6.82895 20.0307 6.9696C20.1714 7.11025 20.2504 7.30102 20.2504 7.49993C20.2504 7.69884 20.1714 7.88961 20.0307 8.03026C19.8901 8.17091 19.6993 8.24993 19.5004 8.24993L6.3107 8.24993L8.03101 9.9693C8.10074 10.039 8.15606 10.1217 8.19381 10.2127C8.23155 10.3038 8.25098 10.4014 8.25098 10.4999C8.25098 10.5985 8.23155 10.6961 8.19381 10.7871C8.15606 10.8782 8.10074 10.9609 8.03101 11.0306ZM17.031 20.0306L20.031 17.0306C20.1007 16.9609 20.1561 16.8782 20.1938 16.7871C20.2315 16.6961 20.251 16.5985 20.251 16.4999C20.251 16.4014 20.2315 16.3038 20.1938 16.2127C20.1561 16.1217 20.1007 16.039 20.031 15.9693L17.031 12.9693C16.8903 12.8286 16.6994 12.7495 16.5004 12.7495C16.3014 12.7495 16.1105 12.8286 15.9698 12.9693C15.829 13.11 15.75 13.3009 15.75 13.4999C15.75 13.699 15.829 13.8898 15.9698 14.0306L17.6901 15.7499L4.50039 15.7499C4.30147 15.7499 4.11071 15.8289 3.97006 15.9696C3.8294 16.1103 3.75039 16.301 3.75039 16.4999C3.75039 16.6988 3.8294 16.8896 3.97006 17.0303C4.11071 17.1709 4.30147 17.2499 4.50039 17.2499L17.6901 17.2499L15.9698 18.9693C15.829 19.11 15.75 19.3009 15.75 19.4999C15.75 19.699 15.829 19.8898 15.9698 20.0306C16.1105 20.1713 16.3014 20.2503 16.5004 20.2503C16.6994 20.2503 16.8903 20.1713 17.031 20.0306Z"
                           fill="white"
                        />
                     </svg>
                     <div className="flex items-center justify-end gap-2">
                        <div className="size-6 overflow-hidden rounded-full">
                           <img
                              src={selected(to)?.iconUrl || ''}
                              alt={selected(to)?.name}
                              className="size-full object-cover"
                           />
                        </div>
                        <Text
                           weight="medium"
                           variant="heading3"
                           textColor={selected(to) ? 'default' : 'lighGray'}>
                           {selected(to)?.name} ({selected(to)?.symbol})
                        </Text>
                     </div>
                  </div>
                  <div className="space-y-2">
                     <Text
                        weight="medium"
                        variant="heading3"
                        textColor="lighGray">
                        {t('bridge.fourthStep.totalSent')}
                     </Text>
                     <Text
                        weight="medium"
                        variant="heading">
                        {amount}
                     </Text>
                  </div>
                  <hr className="border-white/10" />
                  <div className="space-y-2">
                     <Text
                        weight="medium"
                        variant="heading3"
                        textColor="lighGray">
                        {t('bridge.fourthStep.totalReceived')}
                     </Text>
                     <Text
                        weight="medium"
                        variant="heading">
                        {receive}
                     </Text>
                  </div>
                  <div className="space-y-1 border-y-[0.5px] border-white/10 py-2.5">
                     <div className="flex items-center justify-between gap-4">
                        <Text
                           weight="medium"
                           variant="heading3"
                           textColor="lighGray">
                           {t('bridge.fourthStep.networkFees')}:
                        </Text>
                        <Text
                           weight="medium"
                           variant="heading3">
                           -$1.20
                        </Text>
                     </div>
                     <div className="flex items-center justify-between gap-4">
                        <Text
                           weight="medium"
                           variant="heading3"
                           textColor="lighGray">
                           {t('swap.orderTable.date')}:
                        </Text>
                        <Text
                           weight="medium"
                           variant="heading3">
                           05-20-2024 - 09:39:33 PM
                        </Text>
                     </div>
                     <div className="flex items-center justify-between gap-4">
                        <Text
                           weight="medium"
                           variant="heading3"
                           textColor="lighGray">
                           {t('bridge.fourthStep.receivingWalletAddress')}:
                        </Text>
                        <Text
                           weight="medium"
                           variant="heading3"
                           textColor="lighGray">
                           {addressTo}
                        </Text>
                     </div>
                  </div>
               </div>
               <div className="mt-6 grid grid-cols-2 gap-2">
                  <Button
                     className="rounded-full"
                     onClick={() => setStep(0)}>
                     Close
                  </Button>
                  <Button
                     variant="outline-primary"
                     className="rounded-full">
                     <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline">
                        View transactions
                     </a>
                  </Button>
               </div>
            </>
         ),
      }),
      [
         addressFrom,
         addressTo,
         amount,
         currency,
         from,
         isViaConnectAddress,
         receive,
         selected,
         t,
         to,
      ],
   );

   return (
      <section className="mb-10 lg:mt-10">
         <div className="mx-auto w-full px-4 lg:max-w-4xl lg:px-12.5">
            <Text
               weight="semiBold"
               className="text-center text-2xl lg:text-5xl">
               {t('bridge.title.supertitle')}
               <span className="text-[#F23F5D]">{t('bridge.title.subtitle')}</span>
            </Text>
            <Text
               className="mb-12 mt-4 text-center text-sm lg:text-2xl"
               textColor="lighGray">
               {t('bridge.subtitle.supertitle')} <br /> {t('bridge.subtitle.subtitle')}
            </Text>
            <BridgeSteps active={step}>
               <AnimatePresence mode="wait">
                  <motion.div
                     key={step}
                     variants={variants}
                     initial="hidden"
                     animate="enter"
                     exit="exit"
                     transition={{ type: 'linear' }}>
                     {renderStep[step]}
                  </motion.div>
               </AnimatePresence>
            </BridgeSteps>
         </div>

         {/* Modal Pending */}
         <Transition
            appear
            show={modalPaymentLoading}
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
                              Please wait a sec, transaction has been proccessed Trade 0.000823 BTC
                              for 0.0001 USDT
                           </div>
                           <Text
                              className="mt-2 text-center"
                              weight="medium"
                              textColor="lighGray">
                              Confirm this transaction in your wallet
                           </Text>
                        </Dialog.Panel>
                     </Transition.Child>
                  </div>
               </div>
            </Dialog>
         </Transition>
         {/* End Modal Pending */}
      </section>
   );
};
