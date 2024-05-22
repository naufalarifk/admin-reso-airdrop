import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { COIN } from '@/constants';

import { BridgeSteps, ModalPending, Text } from '@/components';

import { StepFirst } from './components/StepFirst';
import { StepSecond } from './components/StepSecond';
import { StepLast } from './components/StepLast';

export const Bridge = () => {
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

   const selected = useCallback((value: string) => COIN.find(e => e.symbol === value), []);

   useEffect(() => {
      if (modalPaymentLoading) {
         setTimeout(() => {
            setModalPaymentLoading(false);
            setStep(2);
         }, 1000);
      }
   }, [modalPaymentLoading]);

   const renderStep = useMemo<Record<number, ReactNode>>(() => {
      const commonProps = {
         amount,
         receive,
         addressFrom,
         addressTo,
         selectedFrom: selected(from)!,
         selectedTo: selected(to)!,
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
   }, [addressFrom, addressTo, amount, currency, from, receive, selected, to]);

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
            <BridgeSteps active={step}>{renderStep[step]}</BridgeSteps>
         </div>

         <ModalPending show={modalPaymentLoading} />
      </section>
   );
};
