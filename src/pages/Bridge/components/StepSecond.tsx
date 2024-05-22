import { useTranslation } from 'react-i18next';
import { Button, Text } from '@/components';
import { IcCopy } from '@/assets/icons';
import { COIN } from '@/constants';
import { memo } from 'react';

interface StepSecondProps {
   amount: string;
   receive: string;
   addressFrom: string;
   addressTo: string;
   selectedFrom: (typeof COIN)[number];
   selectedTo: (typeof COIN)[number];
   setModalPaymentLoading: (value: boolean) => void;
}

function StepSecondMemo({
   amount,
   receive,
   addressFrom,
   addressTo,
   selectedFrom,
   selectedTo,
   setModalPaymentLoading,
}: StepSecondProps) {
   const { t } = useTranslation();

   return (
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
                                 src={selectedFrom?.iconUrl || ''}
                                 alt={selectedFrom?.name}
                                 className="size-full object-cover"
                              />
                           </div>
                           <Text
                              weight="medium"
                              variant="heading3"
                              textColor={selectedFrom ? 'default' : 'lighGray'}>
                              {selectedFrom
                                 ? `${selectedFrom?.name} (${selectedFrom?.symbol})`
                                 : 'Select token'}
                           </Text>
                        </div>
                        <span>-</span>
                        <div className="flex items-center gap-2">
                           <div className="size-6 overflow-hidden rounded-full">
                              <img
                                 src={selectedTo?.iconUrl || ''}
                                 alt={selectedTo?.name}
                                 className="size-full object-cover"
                              />
                           </div>
                           <Text
                              weight="medium"
                              variant="heading3"
                              textColor={selectedTo ? 'default' : 'lighGray'}>
                              {selectedTo
                                 ? `${selectedTo?.name} (${selectedTo?.symbol})`
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
   );
}

export const StepSecond = memo(StepSecondMemo);
