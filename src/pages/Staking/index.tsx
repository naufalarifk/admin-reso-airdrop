import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { CardStaking, Tabs, useWalletStore } from '@/components';
import { STAKE_MEME_TOKEN } from '@/constants';
import { AirdropPopUp } from '@/components/atoms/AirdropPopUp';

export const Staking = () => {
   const navigate = useNavigate();
   const { t } = useTranslation();

   const { setModalVisible } = useWalletStore(state => state);

   // const { isConnected } = useAccount();
   // const { open } = useWeb3Modal();

   const connected = true;

   const handleConnect = useCallback(() => {
      setModalVisible(true);
   }, [setModalVisible]);

   // const handleSelectedOptionsChange = (selected: Coin[]) => {
   //    setSelectedOptions(selected);
   //    setNewStakingData({
   //       ...newStakingData,
   //       coinOne: selected[0],
   //       coinTwo: selected[1],
   //    });
   // };

   const tabs = useMemo(
      () => [
         {
            label: t('global.activate'),
            content: (
               <div className="mt-4">
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                     {STAKE_MEME_TOKEN.map((item, i) => (
                        <CardStaking
                           key={i}
                           handleConnected={handleConnect}
                           isConnected={connected}
                           whileConnected={() =>
                              navigate(
                                 `create?type=one&ticker=${
                                    item.token0.name ?? 'RESO'
                                 }&symbol=${item.token1?.symbol}&totalStaked=${
                                    item.totalStaked
                                 }&apy=${item.apy}&token0=${item.token0?.imgUrl}&token1=${
                                    item.token1?.imgUrl
                                 }&price=${item.quoteTokenPriceBusd ?? '5000'}&reward=${
                                    item.reward
                                 }&stakingbalance=${item.feeAmount ?? 5}&rate=${
                                    item.token1?.price
                                 }&decimal=${item.token1.decimals}`,
                              )
                           }
                           item={item}
                        />
                     ))}
                  </div>
               </div>
            ),
         },
         {
            label: t('global.ended'),
            content: (
               <div className="mt-32 flex items-center justify-center text-2xl font-bold">
                  {t('global.noData')}
               </div>
            ),
         },
         {
            label: t('global.myStaking'),
            content: (
               <div className="mt-32 flex items-center justify-center text-2xl font-bold">
                  {t('global.noData')}
               </div>
            ),
         },
      ],
      [connected, handleConnect, navigate, t],
   );

   return (
      <>
         <AirdropPopUp />
         <div>
            <Tabs
               classNameWrapper="justify-between flex gap-4 md:justify-start"
               items={tabs}
            />
         </div>
      </>
   );
};
