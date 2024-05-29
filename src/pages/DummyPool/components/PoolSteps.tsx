import { Card } from '@/components';
import { cn } from '@/utils';
import { t } from 'i18next';
import { useState } from 'react';

const width: Record<number, string> = {
   0: '0%',
   1: 'calc(50% - 32px)',
   2: 'calc(100% - 64px)',
};

const renderName: Record<number, string> = {
   0: 'Token Information',
   1: 'Confirmation',
};

export const PoolSteps = () => {
   const [step, setStep] = useState(0);
   const [from, setFrom] = useState('');
   const [to, setTo] = useState('');
   return (
      <div className="space-y-8">
         <Card className="flex h-[102px] items-center px-4 py-0 lg:h-32 lg:px-8">
            <div className="relative flex w-full items-center justify-between">
               <div
                  className={cn(
                     'absolute inset-x-8 top-6 z-1 h-0.5 rounded-lg bg-primary transition-[width] duration-1000',
                  )}
                  style={{ width: width[step] }}
               />
               <div className="absolute inset-x-10 top-6 h-0.5 rounded-lg bg-dark" />
               {Array.from({ length: 2 }).map((_, i) => (
                  <div
                     key={i}
                     className="z-2 flex flex-col items-center space-y-1.5">
                     <div
                        className={cn(
                           'grid size-10 place-items-center rounded-full border transition-all duration-1000 lg:size-12.5',
                           i <= step ? 'border-primary bg-primary' : 'border-dark2 bg-dark',
                        )}>
                        <div className={i <= step ? 'default' : 'lighGray'}>{i + 1}</div>
                     </div>
                     <div className="max-lg:text-xs">{t(`${renderName[i]}`)}</div>
                  </div>
               ))}
            </div>
         </Card>
      </div>
   );
};
