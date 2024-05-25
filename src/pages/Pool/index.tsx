import {
   IcDiscord,
   IcDropdown,
   IcMedium,
   IcPending,
   IcQuestionMark,
   IcRoundAdd,
   IcTelegram,
   IcWeb,
   IcX,
} from '@/assets/icons';
import { Button, Input, PoolSteps, Text } from '@/components';
import { Dispatch, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ChildrenProps {
   step: number;
   setStep: Dispatch<React.SetStateAction<number>>;
}

const FirstStep = ({ setStep, step }: ChildrenProps) => {
   const { t } = useTranslation();
   const [showToken, setShowToken] = useState(false);
   const [currentType, setCurrentType] = useState('cmc');

   const official_links = [
      {
         name: 'Official Website',
         link: 'https://bitcoin.org/en/',
         icon: <IcWeb color="#F23F5D" />,
      },
      {
         name: 'Official X',
         link: 'https://bitcoin.org/en/',
         icon: <IcX />,
      },
      {
         name: 'Official Telegram',
         link: 'https://bitcoin.org/en/',
         icon: <IcTelegram color="#F23F5D" />,
      },
      {
         name: 'Official Discord',
         link: 'https://bitcoin.org/en/',
         icon: (
            <IcDiscord
               className="h-6 w-6"
               color="#F23F5D"
            />
         ),
      },
      {
         name: 'Official Medium',
         link: 'https://bitcoin.org/en/',
         icon: <IcMedium fill='#F23F5D' />,
      },
   ];

   const handleNextStep = () => {
      if (step === 3) {
         setStep(1);
      } else {
         setStep(step + 1);
      }
   };

   return (
      <section className="min-w-sm mx-auto w-full space-y-4 rounded-xl border-[0.5px] border-[#FFFFFF1A] bg-[#181924] p-6 lg:w-3/4">
         <Text className="text-lg font-semibold">{t('pool.firstStep.title')}</Text>
         <Text className="text-[#90A3BF]">{t('pool.firstStep.subtitle')}</Text>
         <div className="flex justify-between">
            <div className="flex w-2/3 space-x-2">
               <Button
                  onClick={() => setCurrentType('cmc')}
                  className={`${currentType === 'cmc' ? 'bg-[#F23F5D]' : 'bg-[#0E0F19]'}  h-8 rounded-[4px] text-xs lg:px-4 lg:py-[6px]`}>
                  CMC Based
               </Button>
               <Button
                  onClick={() => setCurrentType('custom')}
                  className={`${currentType === 'custom' ? 'bg-[#F23F5D]' : 'bg-[#0E0F19]'}  h-8 rounded-[4px] text-xs lg:px-4 lg:py-[6px]`}>
                  Custom
               </Button>
            </div>
            <Button className="h-8 w-1/3 rounded-[4px] bg-[#0E0F19] px-4 py-[6px] text-[#90A3BF]">
               My Listing
            </Button>
         </div>
         {currentType === 'cmc' && (
            <>
               <div className="mt-6 space-y-2">
                  <div className="flex space-x-1">
                     <Text className="text-white">{t('pool.firstStep.unifiedAsset')}</Text>
                     {/* <IcQuestionMark /> */}
                  </div>
                  <div className="flex items-center space-x-2 rounded-lg bg-[#0E0F19] p-2">
                     <Input
                        placeholder="Input your token UCID from CMC"
                        className="bg-transparent"
                     />
                     <Button
                        onClick={() => setShowToken(!showToken)}
                        className="h-auto border border-[#F23F5D] bg-[#20131e] px-4 py-2 text-[#F23F5D]">
                        {t('pool.firstStep.search')}
                     </Button>
                  </div>
               </div>
               {showToken && (
                  <>
                     <div className="mt-6 space-y-2">
                        <Text className="text-[#9F9F9F]">
                           {t('pool.firstStep.tokenInformation')}
                        </Text>
                        <div className="rounded-lg bg-[#0E0F19] p-4">
                           <div className="flex items-center space-x-2">
                              <img
                                 src="https://s2.coinmarketcap.com/static/img/coins/64x64/29870.png"
                                 height={32}
                                 width={32}
                                 className='rounded-full'
                              />
                              <Text>
                                 BOME <span className="text-[#90A3BF]">Book of Meme</span>
                              </Text>
                           </div>
                           <Text className="my-1 text-[#90A3BF]">
                              Introducing the BOOK OF MEME: an experimental project poised to redefine web3 culture by amalgamating memes, decentralized storage solutions, and degen shitcoin trading and gambling. This experiment endeavors to encapsulate the ever-evolving meme culture within a digital compendium, the BOOK OF MEME, ensuring each piece is immortalized on the blockchain. The $BOME memecoin on Solana, and Arweave, IPFS as the primary storage of Book Of Meme and future expansions to Bitcoin inscriptions as immutable forever storage, this initiative aims to foster a new dimension of decentralized social media, and make memes unstoppable.
                           </Text>
                           <div className="mt-2 flex flex-col gap-4 rounded-lg bg-[#181924] p-4 lg:grid lg:grid-cols-3">
                              <div>
                                 <Text>{t('pool.firstStep.ranking')}</Text>
                                 <Text>--</Text>
                              </div>
                              <div>
                                 <Text>{t('pool.firstStep.blockExplorer')}</Text>
                                 <Text>https://solana.com</Text>
                              </div>
                              <div>
                                 <Text>{t('pool.firstStep.marketCap')}</Text>
                                 <Text>876,493,708 <span className='text-[#90A3BF]'>USD</span></Text>
                              </div>
                              <div>
                                 <Text>{t('pool.firstStep.liquidity')}</Text>
                                 <Text>874,173,797</Text>
                              </div>
                              <div>
                                 <Text>{t('pool.firstStep.maxSupply')}</Text>
                                 <Text>68,966,327,627 BOME</Text>
                              </div>
                              <div>
                                 <Text>{t('pool.firstStep.circulationSupply')}</Text>
                                 <Text>68,966,327,627 BOME</Text>
                              </div>
                              <div>
                                 <Text>{t('pool.firstStep.historicalHigh')}</Text>
                                 <Text>0.02805 <span className='text-[#90A3BF]'>USD</span></Text>
                                 <Text className='text-[#90A3BF] text-xs'>14 Mar 2024</Text>
                              </div>
                              <div>
                                 <Text>{t('pool.firstStep.historicalLow')}</Text>
                                 <Text>0.000858 <span className='text-[#90A3BF]'>USD</span></Text>
                                 <Text className='text-[#90A3BF] text-xs'>15 Jul 2010</Text>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="mt-6 space-y-2">
                        <div className="flex items-center justify-between">
                           <Text>{t('pool.firstStep.officialLinks')}</Text>
                           <IcRoundAdd />
                        </div>
                        {official_links.map(item => (
                           <div className="flex items-center justify-between rounded-xl  bg-[#0E0F19] p-2">
                              <div className="flex items-center space-x-2">
                                 <>{item.icon}</>
                                 <Text>{item.name}</Text>
                                 <IcDropdown />
                              </div>
                              <Text>{item.link}</Text>
                           </div>
                        ))}
                     </div>
                     <Button
                        onClick={handleNextStep}
                        className="w-full bg-[#F23F5D]">
                        {t('pool.firstStep.continue')}
                     </Button>
                  </>
               )}
            </>
         )}
         {currentType === 'custom' && (
            <div className="space-y-3">
               <Text className="text-sm font-semibold text-[#90A3BF]">Ticker Name</Text>
               <div className="flex items-center space-x-2 rounded-lg bg-[#0E0F19] p-2">
                  <Input
                     placeholder="HSC"
                     className="bg-transparent placeholder:text-white"
                     disabled
                  />
                  <Button
                     onClick={() => setShowToken(!showToken)}
                     className="h-auto border border-[#33D49D] bg-[#111f25] px-4 py-2 text-[#33D49D]">
                     Available
                  </Button>
               </div>
               <div className="flex items-center justify-between">
                  <div className="w-[45%]">
                     <Text className="text-sm font-semibold text-[#90A3BF]">Token Name</Text>
                     <div className="flex items-center space-x-2 rounded-lg bg-[#0E0F19] p-2">
                        <Input
                           placeholder="Heliosync"
                           className="bg-transparent placeholder:text-white"
                           disabled
                        />
                     </div>
                  </div>
                  <div className="w-[45%]">
                     <Text className="text-sm font-semibold text-[#90A3BF]">Token Icon</Text>
                     <div className="flex items-center space-x-2 rounded-lg bg-[#0E0F19] p-2">
                        <Input
                           placeholder="logo_helio.png"
                           className="bg-transparent placeholder:text-white"
                           disabled
                        />
                        <Button
                           disabled
                           onClick={() => setShowToken(!showToken)}
                           className="h-auto border border-[#F23F5D] bg-[#20131e] px-4 py-2 text-[#F23F5D]">
                           Upload
                        </Button>
                     </div>
                  </div>
               </div>
               <Text className="text-sm font-semibold text-[#90A3BF]">Block Explorer</Text>
               <div className="flex items-center space-x-2 rounded-lg bg-[#0E0F19] p-2">
                  <Input
                     placeholder="https://heliosync-explorer.com"
                     className="bg-transparent placeholder:text-white"
                     disabled
                  />
               </div>
               <div className="flex items-center justify-between">
                  <div className="w-[45%]">
                     <Text className="text-sm font-semibold text-[#90A3BF]">Max Supply</Text>
                     <div className="flex items-center space-x-2 rounded-lg bg-[#0E0F19] p-2">
                        <Input
                           placeholder="300000000"
                           className="bg-transparent placeholder:text-white"
                           disabled
                        />
                     </div>
                  </div>
                  <div className="w-[45%]">
                     <Text className="text-sm font-semibold text-[#90A3BF]">
                        Circulation Supply
                     </Text>
                     <div className="flex items-center space-x-2 rounded-lg bg-[#0E0F19] p-2">
                        <Input
                           placeholder="1000000"
                           className="bg-transparent placeholder:text-white"
                           disabled
                        />
                     </div>
                  </div>
               </div>
               <Text className="text-sm font-semibold text-[#90A3BF]">Precision</Text>
               <div className="flex items-center space-x-2 rounded-lg bg-[#0E0F19] p-2">
                  <Input
                     placeholder="8"
                     className="bg-transparent placeholder:text-white"
                     disabled
                  />
               </div>
               {/* <Text className="text-sm font-semibold text-[#90A3BF]">Contract Address</Text>
               <div className="flex items-center space-x-2 rounded-lg bg-[#0E0F19] p-2">
                  <Input
                     placeholder="Input contact address"
                     className="bg-transparent placeholder:text-white"
                  />
               </div> */}
               <Text className="text-sm font-semibold text-[#90A3BF]">Description</Text>
               <div className="flex items-center space-x-2 rounded-lg bg-[#0E0F19] p-2">
                  <Input
                     placeholder="This token is legit, it will go to the moon in no time"
                     className="bg-transparent placeholder:text-white"
                     disabled
                  />
               </div>
               <div className="mt-6 space-y-2">
                  <div className="flex items-center justify-between">
                     <Text>{t('pool.firstStep.officialLinks')}</Text>
                     <IcRoundAdd />
                  </div>
                  {official_links.map(item => (
                     <div className="flex items-center justify-between rounded-xl  bg-[#0E0F19] p-2">
                        <div className="flex items-center space-x-2">
                           <>{item.icon}</>
                           <Text>{item.name}</Text>
                           <IcDropdown />
                        </div>
                        <Text>{item.link}</Text>
                     </div>
                  ))}
               </div>
               <Button
                  onClick={handleNextStep}
                  className="w-full bg-[#F23F5D]">
                  {t('pool.firstStep.continue')}
               </Button>
            </div>
         )}
      </section>
   );
};

const FinalStep = ({ setStep, step }: ChildrenProps) => {
   const { t } = useTranslation();

   const official_links = [
      {
         name: 'Official Website',
         link: 'https://bitcoin.org/en/',
         icon: <IcWeb color="#F23F5D" />,
      },
      {
         name: 'Official X',
         link: 'https://bitcoin.org/en/',
         icon: <IcX />,
      },
      {
         name: 'Official Telegram',
         link: 'https://bitcoin.org/en/',
         icon: <IcTelegram color="#F23F5D" />,
      },
      {
         name: 'Official Discord',
         link: 'https://bitcoin.org/en/',
         icon: (
            <IcDiscord
               className="h-6 w-6"
               color="#F23F5D"
            />
         ),
      },
      {
         name: 'Official Medium',
         link: 'https://bitcoin.org/en/',
         icon: <IcMedium fill='#F23F5D' />,
      },
   ];

   const handleNextStep = () => {
      if (step === 3) {
         setStep(1);
      } else {
         setStep(step + 1);
      }
   };

   console.log('step', step)
   return (
      <section className="min-w-sm mx-auto w-full space-y-4 rounded-xl border-[0.5px] border-[#FFFFFF1A] bg-[#181924] p-6 lg:w-3/4">
         <Text className="text-lg font-semibold"></Text>
         <Text className="text-[#9F9F9F]"></Text>
         <div className="mt-6 space-y-2">
            <div className="rounded-lg bg-[#0E0F19] p-4">
               <div className='block items-center lg:flex lg:justify-between'>
                  <div className="flex items-center space-x-2">
                     <img
                        src="https://s2.coinmarketcap.com/static/img/coins/64x64/29870.png"
                        height={32}
                        width={32}
                        className='rounded-full'
                     />
                     <Text>
                        BOME <span className="text-[#90A3BF]">Book of Meme</span>
                     </Text>
                  </div>
                  <div className="mt-2 flex space-x-2 lg:mt-0">
                     {official_links.map(link => (
                        <div className="rounded-full bg-[#181924] p-2">{link.icon}</div>
                     ))}
                  </div>
               </div>
               <Text className="my-1 text-[#90A3BF]">
                  Introducing the BOOK OF MEME: an experimental project poised to redefine web3 culture by amalgamating memes, decentralized storage solutions, and degen shitcoin trading and gambling. This experiment endeavors to encapsulate the ever-evolving meme culture within a digital compendium, the BOOK OF MEME, ensuring each piece is immortalized on the blockchain. The $BOME memecoin on Solana, and Arweave, IPFS as the primary storage of Book Of Meme and future expansions to Bitcoin inscriptions as immutable forever storage, this initiative aims to foster a new dimension of decentralized social media, and make memes unstoppable.
               </Text>
               <div className="mt-2 flex flex-col gap-4 rounded-lg bg-[#181924] p-4 lg:grid lg:grid-cols-3">
                  <div>
                     <Text>{t('pool.firstStep.ranking')}</Text>
                     <Text>--</Text>
                  </div>
                  <div>
                     <Text>{t('pool.firstStep.blockExplorer')}</Text>
                     <Text>https://solana.com</Text>
                  </div>
                  <div>
                     <Text>{t('pool.firstStep.marketCap')}</Text>
                     <Text>876,493,708 <span className='text-[#90A3BF]'>USD</span></Text>
                  </div>
                  <div>
                     <Text>{t('pool.firstStep.liquidity')}</Text>
                     <Text>874,173,797</Text>
                  </div>
                  <div>
                     <Text>{t('pool.firstStep.maxSupply')}</Text>
                     <Text>68,966,327,627 BOME</Text>
                  </div>
                  <div>
                     <Text>{t('pool.firstStep.circulationSupply')}</Text>
                     <Text>68,966,327,627 BOME</Text>
                  </div>
                  <div>
                     <Text>{t('pool.firstStep.historicalHigh')}</Text>
                     <Text>0.02805 <span className='text-[#90A3BF]'>USD</span></Text>
                     <Text className='text-[#90A3BF] text-xs'>14 Mar 2024</Text>
                  </div>
                  <div>
                     <Text>{t('pool.firstStep.historicalLow')}</Text>
                     <Text>0.000858 <span className='text-[#90A3BF]'>USD</span></Text>
                     <Text className='text-[#90A3BF] text-xs'>15 Jul 2010</Text>
                  </div>
               </div>
            </div>
         </div>
         <div>
            <div className="flex items-center space-x-1">
               <Text className="text-sm font-semibold text-[#90A3BF]">Token Price</Text>
               <IcQuestionMark />
            </div>
            <div className="mt-2 flex items-center space-x-2 rounded-2xl bg-[#0E0F19] p-3">
               <div className="flex w-3/5 items-center space-x-2">
                  <img
                     src="/images/reso.png"
                     className="relative z-[999] h-7 w-7 cursor-pointer"
                     alt=""
                  />
                  <Text>RESO (Rectoverso)</Text>
                  <IcDropdown />
               </div>
               <Input
                  className="bg-transparent"
                  placeholder="Input token price"
               />
               <Text className="text-[#90A3BF]">RESO</Text>
            </div>
            <div className="mt-2 flex items-center justify-between">
               <Text className="text-[#9F9F9F]">Available Balance</Text>
               <Text>1,000 RESO</Text>
            </div>
         </div>
         <div>
            <div className="flex items-center justify-between">
               <div className="flex items-center space-x-1">
                  <Text className="text-sm font-semibold text-[#90A3BF]">Listing Fee</Text>
                  <IcQuestionMark />
               </div>
               <div className="flex items-center space-x-1">
                  <IcPending />
                  <Text>Waiting</Text>
               </div>
            </div>
            <div className="mt-2 flex items-center justify-between space-x-2 rounded-2xl bg-[#0E0F19] p-3">
               <Text>1000</Text>
               <div className="flex items-center space-x-3">
                  <Text className="font-semibold text-[#90A3BF]">RESO</Text>
                  <Button className="h-auto border border-[#F23F5D] bg-[#20131e] px-4 py-2 text-[#F23F5D]">
                     Pay
                  </Button>
               </div>
            </div>
         </div>
         <div>
            <div className="flex items-center justify-between">
               <div className="flex items-center space-x-1">
                  <Text className="text-sm font-semibold text-[#90A3BF]">Buy order</Text>
                  <IcQuestionMark />
               </div>
               <div className="flex items-center space-x-1">
                  <IcPending />
                  <Text>Waiting</Text>
               </div>
            </div>
            <div className="mt-2 flex items-center justify-between space-x-2 rounded-2xl bg-[#0E0F19] p-3">
               <Input
                  className="bg-transparent"
                  placeholder="Input buy order"
               />
               <div className="flex items-center space-x-3">
                  <Text className="font-semibold text-[#90A3BF]">RESO</Text>
                  <Button className="h-auto border border-[#F23F5D] bg-[#20131e] px-4 py-2 text-[#F23F5D]">
                     Add
                  </Button>
               </div>
            </div>
            <div className="mt-2 flex items-center justify-between">
               <Text className="text-[#9F9F9F]">Available Balance</Text>
               <Text>1,000 RESO</Text>
            </div>
         </div>
         <div>
            <div className="flex items-center justify-between">
               <div className="flex items-center space-x-1">
                  <Text className="text-sm font-semibold text-[#90A3BF]">Sell Order</Text>
                  <IcQuestionMark />
               </div>
               <div className="flex items-center space-x-1">
                  <IcPending />
                  <Text>Waiting</Text>
               </div>
            </div>
            <div className="mt-2 flex items-center justify-between space-x-2 rounded-2xl bg-[#0E0F19] p-3">
               <Input
                  className="bg-transparent"
                  placeholder="Input sell order"
               />
               <div className="flex items-center space-x-3">
                  <Text className="font-semibold text-[#90A3BF]">BTC</Text>
                  <Button className="h-auto border border-[#F23F5D] bg-[#20131e] px-4 py-2 text-[#F23F5D]">
                     Add
                  </Button>
               </div>
            </div>
            <div className="mt-2 flex items-center justify-between">
               <Text className="text-[#9F9F9F]">Available Balance</Text>
               <Text>50 BTC</Text>
            </div>
         </div>
         <div className="flex space-x-1">
            <Button
               onClick={handleNextStep}
               className="w-full bg-[#F23F5D]">
               List your coin
            </Button>
            <Button
               onClick={handleNextStep}
               className="w-full bg-[#20232e]">
               {t('pool.thirdStep.cancel')}
            </Button>
         </div>
      </section>
   );
};

const Confirmation = ({ setStep, step }: ChildrenProps) => {
   const { t } = useTranslation();

   const official_links = [
      {
         name: 'Official Website',
         link: 'https://bitcoin.org/en/',
         icon: <IcWeb color="#F23F5D" />,
      },
      {
         name: 'Official X',
         link: 'https://bitcoin.org/en/',
         icon: <IcX />,
      },
      {
         name: 'Official Telegram',
         link: 'https://bitcoin.org/en/',
         icon: <IcTelegram color="#F23F5D" />,
      },
      {
         name: 'Official Discord',
         link: 'https://bitcoin.org/en/',
         icon: (
            <IcDiscord
               className="h-6 w-6"
               color="#F23F5D"
            />
         ),
      },
      {
         name: 'Official Medium',
         link: 'https://bitcoin.org/en/',
         icon: <IcMedium fill='#F23F5D' />,
      },
   ];

   const handleNextStep = () => {
      if (step === 3) {
         setStep(1);
      } else {
         setStep(step + 1);
      }
   };
   return (
      <section className="min-w-sm mx-auto w-full space-y-4 rounded-xl border-[0.5px] border-[#FFFFFF1A] bg-[#181924] p-6 lg:w-3/4">
         <div className="flex items-center space-x-3">
            <div className="h-auto rounded-lg border border-[#F23F5D] bg-[#20131e] p-2 text-[#F23F5D]">
               <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <g id="icon-park:left">
                     <path
                        id="Vector"
                        d="M15 18.5L9 12.5L15 6.5"
                        stroke="#F23F5D"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                     />
                  </g>
               </svg>
            </div>
            <Text className="text-xl font-semibold">My Listing</Text>
         </div>
         <div className="mt-6 space-y-2">
            <div className="rounded-lg bg-[#0E0F19] p-4">
               <div className='block items-center lg:flex lg:justify-between'>
                  <div className="flex items-center space-x-2">
                     <img
                        src="https://s2.coinmarketcap.com/static/img/coins/64x64/29870.png"
                        height={32}
                        width={32}
                        className='rounded-full'
                     />
                     <Text>
                        BOME <span className="text-[#90A3BF]">Book of Meme</span>
                     </Text>
                  </div>
                  <div className="mt-2 flex space-x-2 lg:mt-0">
                     {official_links.map(link => (
                        <div className="rounded-full bg-[#181924] p-2">{link.icon}</div>
                     ))}
                  </div>
               </div>
               <Text className="my-1 text-[#90A3BF]">
                  Introducing the BOOK OF MEME: an experimental project poised to redefine web3 culture by amalgamating memes, decentralized storage solutions, and degen shitcoin trading and gambling. This experiment endeavors to encapsulate the ever-evolving meme culture within a digital compendium, the BOOK OF MEME, ensuring each piece is immortalized on the blockchain. The $BOME memecoin on Solana, and Arweave, IPFS as the primary storage of Book Of Meme and future expansions to Bitcoin inscriptions as immutable forever storage, this initiative aims to foster a new dimension of decentralized social media, and make memes unstoppable.
               </Text>
               <div className="mt-2 flex flex-col gap-4 rounded-lg bg-[#181924] p-4 lg:grid lg:grid-cols-3">
                  <div>
                     <Text>{t('pool.firstStep.ranking')}</Text>
                     <Text>--</Text>
                  </div>
                  <div>
                     <Text>{t('pool.firstStep.blockExplorer')}</Text>
                     <Text>https://solana.com</Text>
                  </div>
                  <div>
                     <Text>{t('pool.firstStep.marketCap')}</Text>
                     <Text>876,493,708 <span className='text-[#90A3BF]'>USD</span></Text>
                  </div>
                  <div>
                     <Text>{t('pool.firstStep.liquidity')}</Text>
                     <Text>874,173,797</Text>
                  </div>
                  <div>
                     <Text>{t('pool.firstStep.maxSupply')}</Text>
                     <Text>68,966,327,627 BOME</Text>
                  </div>
                  <div>
                     <Text>{t('pool.firstStep.circulationSupply')}</Text>
                     <Text>68,966,327,627 BOME</Text>
                  </div>
                  <div>
                     <Text>{t('pool.firstStep.historicalHigh')}</Text>
                     <Text>0.02805 <span className='text-[#90A3BF]'>USD</span></Text>
                     <Text className='text-[#90A3BF] text-xs'>14 Mar 2024</Text>
                  </div>
                  <div>
                     <Text>{t('pool.firstStep.historicalLow')}</Text>
                     <Text>0.000858 <span className='text-[#90A3BF]'>USD</span></Text>
                     <Text className='text-[#90A3BF] text-xs'>15 Jul 2010</Text>
                  </div>
               </div>
            </div>
         </div>
         <Button
            onClick={handleNextStep}
            className="w-full bg-[#F23F5D]">
            Continue
         </Button>
      </section>
   );
};

export const Pool = () => {
   const { t } = useTranslation();
   const [step, setStep] = useState(1);
   return (
      <main className="mx-auto w-[86vw] space-y-4 lg:w-[60vw]">
         <Text className="text-center text-xl font-semibold lg:text-4xl">
            {t('pool.title.title')}{' '}
            <span className="text-[#F23F5D]">{t('pool.title.subtitle')}</span>
         </Text>
         <Text className="text-center text-sm text-[#90A3BF] lg:text-lg">
            {t('pool.subtitle.title')} <br /> {t('pool.subtitle.subtitle')}
         </Text>
         <PoolSteps active={step} />
         {step === 1 ? (
            <FirstStep
               step={step}
               setStep={setStep}
            />
         ) : step === 2 ? (
            <FinalStep
               step={step}
               setStep={setStep}
            />
         ) : (
            <Confirmation
               step={step}
               setStep={setStep}
            />
         )}
      </main>
   );
};
