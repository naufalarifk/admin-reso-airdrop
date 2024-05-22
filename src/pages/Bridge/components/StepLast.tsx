import { Button, Text } from '@/components';
import { chains } from '@/constants/chains';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

interface StepLastProps {
   amount: string;
   receive: string;
   addressTo: string;
   selectedFrom: (typeof chains)[number];
   selectedTo: (typeof chains)[number];
   setStep: (value: number) => void;
}

function StepLastMemo({
   amount,
   receive,
   addressTo,
   selectedFrom,
   selectedTo,
   setStep,
}: StepLastProps) {
   const { t } = useTranslation();

   return (
      <>
         <div className="space-y-6.5 rounded-lg bg-dark px-4 py-6">
            <div className="grid grid-cols-3">
               <div className="flex items-center gap-2">
                  <div className="size-6 overflow-hidden rounded-full">
                     <img
                        src={selectedFrom?.custom.icon || ''}
                        alt={selectedFrom?.name}
                        className="size-full object-cover"
                     />
                  </div>
                  <Text
                     weight="medium"
                     variant="heading3"
                     textColor={selectedFrom ? 'default' : 'lighGray'}>
                     {selectedFrom?.name} ({selectedFrom?.nativeCurrency.symbol})
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
                        src={selectedTo?.custom.icon || ''}
                        alt={selectedTo?.name}
                        className="size-full object-cover"
                     />
                  </div>
                  <Text
                     weight="medium"
                     variant="heading3"
                     textColor={selectedTo ? 'default' : 'lighGray'}>
                     {selectedTo?.name} ({selectedTo?.nativeCurrency.symbol})
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
   );
}

export const StepLast = memo(StepLastMemo);
