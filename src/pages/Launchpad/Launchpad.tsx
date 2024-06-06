import { IcTwitter, IcMedium, IcDocuments } from '@/assets/icons';
import { TabSlider, CountdownTime, NumberInput } from '@/components';
import { cn } from '@/utils';
import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const Launchpad = () => {
   const { t } = useTranslation();

   const [currentIndex, setCurrentIndex] = useState(0);

   const tabs = useMemo(
      () => [
         {
            label: (
               <div
                  className={cn(
                     `flex justify-center gap-1 text-base ${currentIndex === 0 ? 'text-white' : 'text-soft'}`,
                  )}>
                  {t('launchpad.content.tabs.title.one')}
               </div>
            ),
            content: (
               <>
                  <div className="relative h-max rounded-2xl bg-dark2 p-6">
                     <div className="mb-4 text-2xl font-semibold text-white">
                        {t('launchpad.content.tabs.content.title.one.heading')}{' '}
                        <span className="text-primary">
                           {t('launchpad.content.tabs.content.title.one.subHeading')}
                        </span>
                     </div>
                     <div className="text-base font-medium leading-relaxed text-soft">
                        Role of RESO Tokens - Utility Token: RESO tokens play a crucial role in the
                        ecosystem as a means of payment for trading fees, staking fees, listing
                        fees, and launchpad fees. Users are incentivized to hold and use RESO tokens
                        to access platform services and participate in revenue-generating
                        activities. Governance Decision-Making Power: RESO tokens may also confer
                        governance rights, allowing holders to participate in decision-making
                        processes related to protocol upgrades, fee adjustments, and other
                        governance matters. Governance participation incentivizes token holders to
                        actively engage with the platform and contribute to its success. Economic
                        Incentives Rewards and Benefits: By participating in revenue-generating
                        activities and holding RESO tokens, users may be eligible to receive rewards
                        or incentives distributed by the protocol. These incentives promote token
                        retention, encourage active participation, and contribute to the overall
                        growth of the ecosystem. Getting in on the ground floor of new and exciting
                        crypto projects has never been easier with Rectoverso
                     </div>
                  </div>
               </>
            ),
         },
         {
            label: (
               <div
                  className={cn(
                     `flex justify-center gap-1 text-base ${currentIndex === 1 ? 'text-white' : 'text-soft'}`,
                  )}>
                  {t('launchpad.content.tabs.title.two')}
               </div>
            ),
            content: (
               <>
                  <div className="relative h-max rounded-2xl bg-dark2 p-6">
                     <div className="mb-4 text-2xl font-semibold text-white">
                        {t('launchpad.content.tabs.content.title.two.heading')}{' '}
                        <span className="text-primary">
                           {t('launchpad.content.tabs.content.title.two.subHeading')}
                        </span>
                     </div>
                     <div className="flex justify-between gap-6">
                        <div className="space-y-6">
                           <div className="space-y-1">
                              <div className="text-base font-semibold text-white">
                                 {t('launchpad.content.tabs.content.title.two.list.tokenName')}
                              </div>
                              <div className="text-base text-soft">Rectoverso Token</div>
                           </div>
                           <div className="space-y-1">
                              <div className="text-base font-semibold text-white">
                                 {t('launchpad.content.tabs.content.title.two.list.tokenSymbol')}
                              </div>
                              <div className="text-base uppercase text-soft">Reso</div>
                           </div>
                           <div className="space-y-1">
                              <div className="text-base font-semibold text-white">
                                 {t('launchpad.content.tabs.content.title.two.list.tokenPrice')}
                              </div>
                              <div className="text-base uppercase text-soft">
                                 1 RESO ~ 0.001 SOL
                              </div>
                           </div>
                           <div className="space-y-1">
                              <div className="text-base font-semibold text-white">
                                 {t('launchpad.content.tabs.content.title.two.list.tokenSupply')}
                              </div>
                              <div className="text-base uppercase text-soft">4,000,000 RESO</div>
                           </div>
                           <div className="space-y-1">
                              <div className="text-base font-semibold text-white">
                                 {t('launchpad.content.tabs.content.title.two.list.tokenAddress')}
                              </div>
                              <div className="text-base text-primary">
                                 3979797df6672c6d19a2d56fc9d941e86da2b21e683407ce526079e5d3e0327b
                              </div>
                              <div className="text-sm font-normal text-soft">
                                 (Do not send BNB to the token address!)
                              </div>
                           </div>
                        </div>
                        <div className="space-y-6">
                           <div className="space-y-1">
                              <div className="text-base font-semibold text-white">
                                 {t('launchpad.content.tabs.content.title.two.list.vestingPeriod')}
                              </div>
                              <div className="text-base text-soft">
                                 4-year vesting with a 1-year cliff, followed by monthly releases.
                              </div>
                           </div>
                           <div className="space-y-1">
                              <div className="text-base font-semibold text-white">
                                 {t('launchpad.content.tabs.content.title.two.list.softcap')}
                              </div>
                              <div className="text-base uppercase text-soft">3000 SOL</div>
                           </div>
                           <div className="space-y-1">
                              <div className="text-base font-semibold text-white">
                                 {t('launchpad.content.tabs.content.title.two.list.hardcap')}
                              </div>
                              <div className="text-base uppercase text-soft">10,000 SOL</div>
                           </div>
                           <div className="space-y-1">
                              <div className="text-base font-semibold text-white">
                                 {t(
                                    'launchpad.content.tabs.content.title.two.list.presaleStartTime',
                                 )}
                              </div>
                              <div className="text-base uppercase text-soft">
                                 2024.06.12 13:00 (UTC)
                              </div>
                           </div>
                           <div className="space-y-1">
                              <div className="text-base font-semibold text-white">
                                 {t('launchpad.content.tabs.content.title.two.list.presaleEndTime')}
                              </div>
                              <div className="text-base text-soft">2024.06.12 13:00 (UTC)</div>
                           </div>
                        </div>
                     </div>
                  </div>
               </>
            ),
         },
         {
            label: (
               <div
                  className={cn(
                     `flex justify-center gap-1 text-base ${currentIndex === 2 ? 'text-white' : 'text-soft'}`,
                  )}>
                  {t('launchpad.content.tabs.title.three')}
               </div>
            ),
            content: (
               <>
                  <div className="relative rounded-2xl bg-dark2 p-6">
                     <div className="mb-4 text-2xl font-semibold text-white">
                        {t('launchpad.content.tabs.content.title.three.heading')}{' '}
                        <span className="text-primary">
                           {t('launchpad.content.tabs.content.title.three.subHeading')}
                        </span>
                     </div>
                     <div className="text-base font-medium leading-relaxed text-soft">
                        Role of RESO Tokens - Utility Token: RESO tokens play a crucial role in the
                        ecosystem as a means of payment for trading fees, staking fees, listing
                        fees, and launchpad fees. Users are incentivized to hold and use RESO tokens
                        to access platform services and participate in revenue-generating
                        activities.
                     </div>
                     <div className="pointer-events-none mt-4">
                        <img
                           src="/images/flowchart-launchpad.webp"
                           className="block w-full object-contain"
                           alt="flowchart"
                           loading="lazy"
                        />
                     </div>
                     <div className="mt-4 text-base font-medium leading-relaxed text-soft">
                        Role of RESO Tokens - Utility Token: RESO tokens play a crucial role in the
                        ecosystem as a means of payment for trading fees, staking fees, listing
                        fees, and launchpad fees.
                     </div>
                  </div>
               </>
            ),
         },
         {
            label: (
               <div
                  className={cn(
                     `flex justify-center gap-1 text-base ${currentIndex === 3 ? 'text-white' : 'text-soft'}`,
                  )}>
                  {t('launchpad.content.tabs.title.four')}
               </div>
            ),
            content: (
               <>
                  <div className="relative rounded-2xl bg-dark2 p-6">
                     <div className="mb-4 text-2xl font-semibold text-white">
                        {t('launchpad.content.tabs.content.title.four.heading')}{' '}
                        <span className="text-primary">
                           {t('launchpad.content.tabs.content.title.four.subHeading')}
                        </span>
                     </div>
                     <div className="text-base font-medium leading-relaxed text-soft">
                        Role of RESO Tokens - Utility Token: RESO tokens play a crucial role in the
                        ecosystem as a means of payment for trading fees, staking fees, listing
                        fees, and launchpad fees. Users are incentivized to hold and use RESO tokens
                        to access platform services and participate in revenue-generating
                        activities.
                     </div>
                  </div>
               </>
            ),
         },
      ],
      [currentIndex, t],
   );

   return (
      <section className="layout-dashboard  relative py-10">
         {/* Header Launchpad */}
         <div className="mb-16 flex justify-between">
            <div className="flex items-center gap-6">
               <div className="size-28">
                  <img
                     src="/images/graph-launchpad.webp"
                     alt="graph"
                     loading="lazy"
                     className="block"
                  />
               </div>
               <div className="space-y-1">
                  <div className="text-5xl font-bold text-white">{t('launchpad.header.title')}</div>
                  <div className="text-2xl font-normal text-soft">
                     {t('launchpad.header.subtitle')}
                  </div>
               </div>
            </div>

            <div className="space-y-2">
               <div className="text-soft">{t('launchpad.header.follow')}</div>
               <div className="flex gap-4">
                  <div className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-dark3">
                     <IcTwitter className="size-5" />
                  </div>
                  <div className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-dark3">
                     <IcMedium className="size-5" />
                  </div>
                  <div className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-dark3">
                     <IcDocuments />
                  </div>
               </div>
            </div>
         </div>
         {/* End Header Launchpad */}

         {/* Launchpad Content */}

         <div className="flex gap-4">
            <div className="flex w-9/12 flex-col gap-6">
               <div className="relative flex h-[750px] flex-col justify-center overflow-hidden rounded-2xl bg-dark2 p-6">
                  <div className="w-6/12 space-y-5">
                     <div className="font-bold uppercase">
                        {t('launchpad.content.cardDetail.cta')}
                     </div>
                     <div className="text-5xl font-semibold text-primary">
                        {t('launchpad.content.cardDetail.title.one')}{' '}
                        <span className="text-white">
                           {t('launchpad.content.cardDetail.title.two')}
                        </span>
                     </div>
                     <div className="text-base leading-relaxed text-soft">
                        {t('launchpad.content.cardDetail.desc')}
                     </div>
                  </div>
                  <div className="absolute -right-12 w-[500px]">
                     <img
                        src="/images/rocket-banner-launchpad.webp"
                        className="block w-full object-contain"
                        alt="banner-launchpad"
                        loading="lazy"
                     />
                  </div>
               </div>

               {/* Content Tab */}
               <TabSlider
                  items={tabs}
                  isMaxWidth
                  transparent
                  getCurrentIndex={currIdx => setCurrentIndex(currIdx)}
               />
               {/* End Content Tab */}
            </div>
            <div className="flex w-4/12 flex-col gap-4">
               {/* Form */}
               <div className="rounded-2xl bg-dark2 p-6">
                  <div className="mb-3 flex items-center justify-between">
                     <div className="space-y-3">
                        <div className="text-2xl text-white">Rectoverso</div>
                        <div className="uppercase text-soft">reso</div>
                     </div>
                     <div className="bg-info/30 text-info flex h-8 w-40 items-center justify-center rounded-bl-lg rounded-tr-lg ">
                        Upcoming
                     </div>
                  </div>

                  {/* Time duration */}
                  <div className="flex cursor-pointer flex-col gap-1 rounded-2xl border-[0.5px] border-[rgba(93,_99,_111,_0.10)] bg-dark p-4">
                     <div className="text-center text-xs text-white">Subscription Start In</div>
                     <div className="text-center">
                        <CountdownTime targetDate={new Date('2024-07-31T23:59:59')} />
                     </div>
                  </div>
                  {/* End time */}

                  <div>
                     {/* Progress Bar */}
                     <div className="mt-4 h-2.5 w-full  rounded-full bg-soft/20">
                        <div
                           className="h-2.5 rounded-full bg-transparent"
                           style={{
                              width: '45%',
                           }}
                        />
                     </div>
                     <div className="mt-3 flex justify-between border-b border-soft/40 pb-3">
                        <div className="font-bold">0 SOL</div>
                        <div className="font-bold">0 SOL</div>
                     </div>
                     {/* End Progress Bar */}

                     <div className="mt-3 flex  items-center justify-between pb-3">
                        <div className="font-medium">{t('global.amount')}</div>
                        <div className="text-sm font-medium">
                           <span className="mr-2 text-soft">{t('global.balance')}</span>
                           0000000
                        </div>
                     </div>
                     <div className="relative rounded-lg bg-dark p-4">
                        <NumberInput
                           value={0}
                           placeholder="0.00"
                           onChange={() => ''}
                           className="block w-10/12 bg-transparent placeholder:text-sm placeholder:text-soft focus:outline-none placeholder:md:text-base"
                        />
                        <button
                           type="button"
                           onClick={() => ''}
                           className="absolute inset-y-4  h-7 w-12 rounded-lg border border-primary/30 bg-primary/10 text-xs font-medium text-primary transition-all duration-150 ease-in-out hover:bg-primary/20 focus:outline-none md:bottom-6 md:end-3 md:text-xxs">
                           Max
                        </button>
                     </div>
                     <div className="mt-2 text-right text-xs text-soft">
                        You need at least 0.01 SOL for network fee.
                     </div>

                     <div className="mt-4">
                        <button
                           disabled
                           className="flex h-14 w-full items-center justify-center rounded-full bg-primary font-medium text-white disabled:bg-primary/50">
                           Connect Wallet
                        </button>
                     </div>
                  </div>
               </div>
               {/* End Form */}

               {/* Information Token */}
               <div className="rounded-2xl bg-dark2 p-6">
                  <div className="mb-4 text-2xl font-semibold text-white">
                     {t('launchpad.content.info.title.one')}{' '}
                     <span className="text-primary">{t('launchpad.content.info.title.two')}</span>
                  </div>
                  <div className="space-y-3">
                     <div className="flex items-center justify-between text-sm">
                        <div className="text-soft">
                           {t('launchpad.content.info.list.currentRate')}
                        </div>
                        <div className="text-white">1 RESO ~ 0,001 $SOL</div>
                     </div>
                     <div className="flex items-center justify-between text-sm">
                        <div className="text-soft">
                           {t('launchpad.content.info.list.minimumBuy')}
                        </div>
                        <div className="text-white">0.5 SOL</div>
                     </div>
                     <div className="flex items-center justify-between text-sm">
                        <div className="text-soft">{t('launchpad.content.info.list.maxBuy')}</div>
                        <div className="text-white">2 SOL</div>
                     </div>
                     <div className="flex items-center justify-between text-sm">
                        <div className="text-soft">{t('launchpad.content.info.list.softcap')}</div>
                        <div className="text-white">3000 SOL</div>
                     </div>
                     <div className="flex items-center justify-between text-sm">
                        <div className="text-soft">{t('launchpad.content.info.list.hardcap')}</div>
                        <div className="text-white">120000 SOL</div>
                     </div>
                     <div className="flex items-center justify-between text-sm">
                        <div className="text-soft">{t('launchpad.content.info.list.goals')}</div>
                        <div className="uppercase text-white">1000000000 RESO</div>
                     </div>
                     <div className="flex items-center justify-between text-sm">
                        <div className="text-soft">{t('launchpad.content.info.list.raised')}</div>
                        <div className="text-white">3000000 SOL</div>
                     </div>
                     <div className="flex items-center justify-between text-sm">
                        <div className="text-soft">
                           {t('launchpad.content.info.list.totalInvestor')}
                        </div>
                        <div className="text-white">825</div>
                     </div>
                  </div>
               </div>
               {/* End Information Token */}
            </div>
         </div>

         {/* End Launchpad Content */}
      </section>
   );
};
