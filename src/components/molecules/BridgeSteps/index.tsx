import { IcCheck } from '@/assets/icons';
import { Card, Text } from '@/components';
import { cn } from '@/utils';
import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

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

export const BridgeSteps = ({ active, children }: { active: number; children: ReactNode }) => {
   const { t } = useTranslation();

   return (
      <div className="space-y-8">
         <Card className="flex h-32 items-center px-8 py-0">
            <div className="relative flex w-full items-center justify-between">
               <div
                  className={cn(
                     'absolute inset-x-8 top-6 z-1 h-0.5 rounded-lg bg-primary transition-[width] duration-1000',
                  )}
                  style={{ width: width[active] }}
               />
               <div className="absolute inset-x-8 top-6 h-0.5 rounded-lg bg-dark" />
               {Array.from({ length: 3 }).map((_, i) => (
                  <div
                     key={i}
                     className="z-2 flex flex-col items-center space-y-1.5">
                     <div
                        className={cn(
                           'grid size-12.5 place-items-center rounded-full border transition-all duration-1000',
                           i <= active ? 'border-primary bg-primary' : 'border-dark2 bg-dark',
                        )}>
                        <Text
                           variant="heading2"
                           weight="semiBold"
                           textColor={i <= active ? 'default' : 'lighGray'}>
                           {i + 1}
                        </Text>
                     </div>
                     <Text
                        variant="heading2"
                        weight="medium"
                        textColor="lighGray">
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
                     {t(`bridge.${renderName[active]}Step.title`)}
                  </Text>
                  <Text
                     weight="medium"
                     textColor="lighGray"
                     className="text-sm lg:text-base">
                     {t(`bridge.${renderName[active]}Step.subtitle`)}
                  </Text>
               </div>
               {active === 2 && <IcCheck />}
            </div>
            <AnimatePresence mode="wait">
               <motion.div
                  key={active}
                  variants={variants}
                  initial="hidden"
                  animate="enter"
                  exit="exit"
                  transition={{ type: 'linear' }}>
                  {children}
               </motion.div>
            </AnimatePresence>
         </Card>
      </div>
   );
};
