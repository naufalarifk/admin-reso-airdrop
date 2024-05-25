import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';

import { IcCheck } from '@/assets/icons';
import { chains } from '@/constants/chains';
import { Card, ModalPending, Text } from '@/components';
import { cn } from '@/utils';

import StepFirst from './StepFirst';
import StepSecond from './StepSecond';
import StepLast from './StepLast';
import { COIN } from '@/constants/coin';

const variants = {
   hidden: { opacity: 0, x: -24, y: 0 },
   enter: { opacity: 1, x: 0, y: 0 },
   exit: { opacity: 0, x: 24, y: 0 },
};

const width: Record<number, string> = {
   0: '0%',
   1: 'calc(50% - 32px)',
   2: 'calc(100% - 64px)',
};

const renderName: Record<number, string> = {
   0: 'first',
   1: 'third',
   2: 'fourth',
};

export default function BridgeSteps() {
   const { t } = useTranslation();

   const [step, setStep] = useState(0);
   const [from, setFrom] = useState('');
   const [to, setTo] = useState('');
   const [currency, setCurrency] = useState('');
   const [amount, setAmount] = useState('0.000823');
   const [receive, setReceive] = useState('0.000823');
   const [addressFrom] = useState('0x763c396673F9c...');
   const [addressTo] = useState('0x2C0ed74caBeF1EFd...');
   const [modalPaymentLoading, setModalPaymentLoading] = useState(false);

   useEffect(() => {
      if (modalPaymentLoading) {
         setTimeout(() => {
            setModalPaymentLoading(false);
            setStep(2);
         }, 1000);
      }
   }, [modalPaymentLoading]);

   const selectedChain = useCallback(
      (value: string) => chains.find(e => e.nativeCurrency.symbol === value),
      [],
   );

   const selectedToken = useMemo(() => COIN.find(e => e.symbol === currency), [currency]);

   const renderStep = useMemo<Record<number, ReactNode>>(() => {
      const commonProps = {
         amount,
         receive,
         addressFrom,
         addressTo,
         selectedFrom: selectedChain(from)!,
         selectedTo: selectedChain(to)!,
         selectedToken: selectedToken!,
         setStep,
      };

      return {
         0: (
            <StepFirst
               {...{
                  ...commonProps,
                  from,
                  setFrom,
                  to,
                  setTo,
                  currency,
                  setCurrency,
                  setAmount,
                  setReceive,
               }}
            />
         ),
         1: (
            <StepSecond
               {...{
                  ...commonProps,
                  setModalPaymentLoading,
               }}
            />
         ),
         2: <StepLast {...commonProps} />,
      };
   }, [addressFrom, addressTo, amount, currency, from, receive, selectedChain, selectedToken, to]);

   return (
      <>
         <div className="space-y-8">
            <Card className="flex h-[102px] items-center px-4 py-0 lg:h-32 lg:px-8">
               <div className="relative flex w-full items-center justify-between">
                  <div
                     className={cn(
                        'absolute inset-x-8 top-6 z-1 h-0.5 rounded-lg bg-primary transition-[width] duration-1000',
                     )}
                     style={{ width: width[step] }}
                  />
                  <div className="absolute inset-x-8 top-6 h-0.5 rounded-lg bg-dark" />
                  {Array.from({ length: 3 }).map((_, i) => (
                     <div
                        key={i}
                        className="z-2 flex flex-col items-center space-y-1.5">
                        <div
                           className={cn(
                              'grid size-10 place-items-center rounded-full border transition-all duration-1000 lg:size-12.5',
                              i <= step ? 'border-primary bg-primary' : 'border-dark2 bg-dark',
                           )}>
                           <Text
                              variant="heading2"
                              weight="semiBold"
                              textColor={i <= step ? 'default' : 'lighGray'}>
                              {i + 1}
                           </Text>
                        </div>
                        <Text
                           variant="heading2"
                           weight="medium"
                           textColor="lighGray"
                           className="max-lg:text-xs">
                           {t(`bridge.step.${renderName[i]}`)}
                        </Text>
                     </div>
                  ))}
               </div>
            </Card>
            <Card>
               <div className="mb-6.5 flex items-center justify-between gap-2">
                  <div className="space-y-1">
                     <Text
                        weight="semiBold"
                        className="text-base lg:text-2xl">
                        {t(`bridge.${renderName[step]}Step.title`)}
                     </Text>
                     <Text
                        weight="medium"
                        textColor="lighGray"
                        className="text-sm lg:text-base">
                        {t(`bridge.${renderName[step]}Step.subtitle`)}
                     </Text>
                  </div>
                  {step === 2 && <IcCheck />}
                  {/* {step === 2 && (
                     <span className="max-lg:hidden">
                        <IcCheck />
                     </span>
                  )} */}
               </div>
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
            </Card>
         </div>

         <ModalPending show={modalPaymentLoading} />
      </>
   );
}
