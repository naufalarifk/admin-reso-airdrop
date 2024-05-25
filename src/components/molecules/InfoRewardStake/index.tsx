import { Balance } from '@/components/atoms';
import { useTranslation } from 'react-i18next';

interface InfoRewardStakeProps {
   totalValueLocked: number | undefined;
   estimatedAPY: number | undefined;
   estimatedTotalReward: number | undefined;
}

export const InfoRewardStake = ({
   // estimatedAPY,
   estimatedTotalReward,
   // totalValueLocked,
}: InfoRewardStakeProps) => {
   const { t } = useTranslation();
   return (
      <>
         <div className="my-6 rounded-lg bg-dark2 p-4">
            <div className="text-sm font-semibold md:text-base">
               {t('staking.add.card.info.reward')}
            </div>
            <div className="mt-3 space-y-2 text-sm md:text-base">
               {/* <div className="flex items-center justify-between text-sm md:text-base">
                  <div className="text-soft">{t('staking.layout.info.one')}</div>
                  <div className="text-white">
                     ~$
                     <Balance value={totalValueLocked!} />{' '}
                  </div>
               </div>
               <div className="flex items-center justify-between">
                  <div className="text-soft">{t('staking.add.card.info.estimatedAPY')}</div>
                  <div className="text-white">~{estimatedAPY}%</div>
               </div> */}
               <div className="flex items-center justify-between">
                  <div className="text-soft">{t('staking.add.card.info.estimatedTotalReward')}</div>
                  <div className="text-white">
                     ~$ <Balance value={estimatedTotalReward!} />
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};
