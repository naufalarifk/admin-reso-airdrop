import { Outlet, useSearchParams } from 'react-router-dom';

import { Balance, ButtonGlow, Header, Text } from '@/components';
import { IcPattern } from '@/assets/icons/IcPattern';
import { useTranslation } from 'react-i18next';
import { cn } from '@/utils';

export const StakeLayout = () => {
   const { t } = useTranslation();

   const [searchParams, setSearchParams] = useSearchParams();

   return (
      <div className="relative">
         <Header />
         <div className="fixed h-full w-full">
            <IcPattern className="absolute w-full" />
         </div>
         <div className="layout h-full min-h-screen max-w-5xl">
            <div className="relative py-28">
               <div className="flex items-center justify-center">
                  <div className="max-w-">
                     <div className="flex flex-col items-center justify-center p-0 lg:p-8">
                        <div className="mb-4 text-center text-2xl font-semibold text-white lg:text-5xl">
                           {t('staking.layout.title.one')}{' '}
                           <span className="text-primary">{t('staking.layout.title.two')}</span>{' '}
                        </div>
                        <Text className="mb-4 text-center  text-sm text-soft md:text-base">
                           {t('staking.layout.desc')}
                        </Text>
                        <ButtonGlow
                           classNameButton={cn('w-56 max-lg:mb-6')}
                           onClick={() => {
                              searchParams.set('newStake', 'true');
                              setSearchParams(searchParams);
                           }}>
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
                           <div className="text-sm font-semibold text-white md:text-xl">~236%</div>
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
   );
};
