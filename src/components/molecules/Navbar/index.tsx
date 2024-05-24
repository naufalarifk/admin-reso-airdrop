import { Fragment, useCallback, useEffect, useState } from 'react';
import { ButtonGlow, ButtonWalletConnectV2 } from '@/components';
// import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink, useLocation,useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Transition, Dialog } from '@headlessui/react';
import { langs, Language } from '@/locales/langs';
import { usePublicMarket } from '@/pages/Swap/hooks/usePublicMarkets';
import { getMarketList } from '@/api/services/public/markets';
import { IcWeb } from '@/assets/icons';
import { AnimatePresence, motion } from 'framer-motion';

export const Header = ({ isLanding = false }: { isLanding?: boolean }) => {
   const { i18n, t } = useTranslation();
   const [toggle, setToggle] = useState(false);
   const [open, setOpen] = useState(false);
   const location = useLocation();
   const navigate = useNavigate();

   const market = usePublicMarket(state => state.market);
   const updateMarket = usePublicMarket(state => state.updateMarketState);

   const getData = useCallback(async () => {
      const market = await getMarketList({});
      updateMarket(market);
   }, [updateMarket]);

   useEffect(() => {
      getData();
   }, [getData]);

   const navLink = [
      // {
      //   id: 0,
      //   name: "Docs",
      //   code: "docs",
      //   setTo: "/",
      // },
      {
         id: 0,
         name: 'Staking',
         code: 'staking',
         setTo: '/staking',
      },
      // {
      //   id: 1,
      //   name: "Trades",
      //   code: "trade",
      //   setTo: "/trade",
      // },
      {
         id: 2,
         name: 'Bridge',
         setTo: '/bridge',
         code: 'bridge',
      },
      {
         id: 3,
         name: 'Trade',
         setTo: `/trade/${market ? market?.[0]?.name?.replace('/', '-') : 'MEME-USDT'}`,
         code: 'trade',
      },
      {
         id: 4,
         name: 'Support',
         code: 'support',
         setTo: '/support',
      },
      // {
      //   id: 5,
      //   name: "Market",
      //   setTo: "/market",
      //   code: "market",
      // },
      // {
      //   id: 6,
      //   name: "Supports",
      //   setTo: "/support",
      //   code: "supports",
      // },
   ];

   // const modal = useWeb3Modal();
   // const { chain, isConnected } = useAccount();
   // const connections = useConnections();
   // const { chains } = useConfig();

   // const listChain = chains.map((c) => c.id);
   // const currentChain = connections[0]?.chainId;
   // const supportNetwork =
   //   currentChain !== undefined && listChain.some((e) => currentChain === e);

   return (
      <div
         className="fixed top-0 z-50 flex 
      h-[70px] w-full items-center bg-dark2 shadow backdrop-blur-lg transition-all   duration-300 ease-in-out">
         <div className={` ${isLanding ? 'layout' : 'layout-dashboard'}`}>
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3 lg:gap-10">
                  <button
                     type="button"
                     onClick={() => setToggle(!toggle)}
                     className="z-[999] flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-md  text-lg  lg:hidden">
                     <span
                        className={`absolute h-[2px] w-[20px] transform rounded bg-soft transition  ${
                           toggle ? 'translate-y-0 rotate-45' : '-translate-y-2'
                        }`}
                     />
                     <span
                        className={`h-[2px] w-[20px] transform rounded bg-soft transition  absolute${
                           toggle ? 'translate-x-3 opacity-0' : 'opacity-100'
                        }`}
                     />
                     <span
                        className={`absolute h-[2px] w-[20px] transform rounded bg-soft transition  ${
                           toggle ? 'translate-y-0 -rotate-45' : 'translate-y-2'
                        }`}
                     />
                  </button>
                  <Link
                     to={`/swap/${market?.[0]?.name?.replace('/', '-')}`}
                     className=" ">
                     <img
                        src="/images/brand.png"
                        className="relative z-[999] h-7 w-full cursor-pointer lg:h-10"
                        alt=""
                     />
                  </Link>
                  <div className="hidden gap-10 lg:flex lg:items-center lg:justify-center">
                     <ul className="flex cursor-pointer gap-10  text-base">
                        {navLink &&
                           navLink.map((item, i) => (
                              <li key={i}>
                                 {item.code === 'docs' ? (
                                    <a
                                       target="_blank"
                                       className="text-base font-medium text-white"
                                       href="https://docs.rectover.so/">
                                       {t(`navbar.menu.${item.code}`)}
                                    </a>
                                 ) : (
                                    <NavLink
                                       aria-current="page"
                                       state={{
                                          id: item.name === 'Swap' ? 'btcusd' : null,
                                          name: item.name === 'Swap' ? 'BTC/USD' : null,
                                       }}
                                       to={{
                                          pathname: item.setTo,
                                       }}
                                       className={({ isActive }) => {
                                          if (item.code === 'trade') {
                                             // Specifically check if the current path starts with `/trade`
                                             return location.pathname.startsWith('/trade')
                                                ? 'text-base font-medium text-primary'
                                                : 'text-base font-medium text-white';
                                          } else {
                                             return isActive
                                                ? 'text-base font-medium text-primary'
                                                : 'text-base font-medium text-white';
                                          }
                                       }}
                                       onClick={() => setToggle(false)}>
                                       {t(`navbar.menu.${item.code}`)}
                                    </NavLink>
                                 )}
                              </li>
                           ))}
                     </ul>
                     <div
                        onClick={() => navigate('/market')}
                        className="flex cursor-pointer items-center gap-3 rounded-full bg-primary/10 px-4 py-2 text-primary">
                        Create New Market
                     </div>
                  </div>
               </div>
               {/* <ButtonConnectWallet
            shortname
            classNameButton="!w-[130px] lg:hidden block"
          /> */}
               <div>
                  <ButtonWalletConnectV2 className="block lg:hidden" />
               </div>

               <AnimatePresence>
                  {toggle && (
                     <motion.div
                        className="fixed bottom-0 left-0 top-0 z-[60] flex h-full min-h-screen flex-col justify-between overflow-hidden bg-black  lg:hidden"
                        initial={{ width: 0 }}
                        animate={{
                           width: '100%',
                        }}
                        exit={{
                           width: 0,
                           transition: { ease: 'circIn' },
                        }}>
                        <ul className="mt-20 flex flex-col justify-center space-y-7 border-t-[0.98px] border-darkSoft p-5">
                           {navLink &&
                              navLink.map((item, i) => (
                                 <li key={i}>
                                    <NavLink
                                       to={item.setTo}
                                       className={({ isActive }) =>
                                          isActive
                                             ? 'text-base font-medium text-primary'
                                             : 'text-base font-medium text-white'
                                       }
                                       onClick={() => setToggle(false)}>
                                       {t(`navbar.menu.${item.code}`)}
                                    </NavLink>
                                 </li>
                              ))}
                        </ul>
                        <div className="layout  flex items-center justify-between gap-3 py-5">
                           <ButtonGlow
                              onClick={() => setOpen(!open)}
                              className="w-12 p-0">
                              <IcWeb className="text-white" />
                           </ButtonGlow>
                        </div>
                     </motion.div>
                  )}
               </AnimatePresence>

               <div className="hidden gap-10 lg:flex lg:items-center lg:justify-center">
                  <div className="flex items-center gap-4">
                     <ButtonWalletConnectV2 />
                     <div
                        className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-dark"
                        onClick={() => setOpen(!open)}>
                        <IcWeb className="text-white" />
                     </div>
                     {/* <Menu>
                <>
                  <Menu.Button>
                    <ButtonGlow classNameButton="!w-[50px] p-0">
                      <IcWeb className="text-white" />
                    </ButtonGlow>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute  mt-14 w-max right-24 origin-top-right border border-dark2  rounded-xl bg-black shadow-lg focus:outline-none">
                      <div className="py-6 px-4">
                        <div className="text-center font-bold text-white">
                          {t("tags.language")}
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-3">
                          {langs.map((lang: Language) => (
                            <Menu.Item key={lang.abbr}>
                              <button
                                onClick={() => i18n.changeLanguage(lang.abbr)}
                                className={`flex items-center px-6 gap-1 border text-center py-3 rounded-full justify-center ${i18n.language === lang.abbr
                                  ? "border-primary"
                                  : "border-soft/45"
                                  }`}
                              >
                                <div>
                                  <img
                                    src={lang.icon}
                                    className="w-5 h-5"
                                    alt="icon-lang"
                                  />
                                </div>
                                <div
                                  className={`${i18n.language === lang.abbr
                                    ? "  text-primary"
                                    : " text-white"
                                    }`}
                                >
                                  {lang.nativeName}
                                </div>
                              </button>
                            </Menu.Item>
                          ))}
                        </div>
                      </div>
                    </Menu.Items>
                  </Transition>
                </>
              </Menu> */}
                  </div>
               </div>
            </div>
         </div>

         <Transition
            appear
            show={open}
            as={Fragment}>
            <Dialog
               as="div"
               className="relative"
               onClose={() => setOpen(!open)}>
               <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0">
                  <div className="fixed inset-0 z-[99]  bg-black/50 " />
               </Transition.Child>

               <div className="fixed inset-0 z-[999] overflow-y-auto backdrop-blur-sm">
                  <div className="flex min-h-full   items-center justify-center p-4">
                     <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95">
                        <Dialog.Panel className="relative h-full  w-full max-w-3xl transform  overflow-hidden rounded-lg border border-soft/15 bg-dark  p-2  shadow-xl transition-all">
                           <div className="py-6">
                              <div className="text-center font-bold text-white">
                                 {t('tags.language')}
                              </div>
                              <div className="mt-4 grid grid-cols-3  gap-3">
                                 {langs.map((lang: Language) => (
                                    <div key={lang.abbr}>
                                       <button
                                          onClick={() => i18n.changeLanguage(lang.abbr)}
                                          className={`flex w-full items-center justify-center gap-2 rounded-full border py-3 text-center ${
                                             i18n.language === lang.abbr
                                                ? 'border-primary'
                                                : 'border-soft/45'
                                          }`}>
                                          <div>
                                             <img
                                                src={lang.icon}
                                                className="h-4 w-4"
                                                alt="icon-lang"
                                             />
                                          </div>
                                          <div
                                             className={`${
                                                i18n.language === lang.abbr
                                                   ? '  text-primary'
                                                   : ' text-white'
                                             } text-sm `}>
                                             {lang.nativeName}
                                          </div>
                                       </button>
                                    </div>
                                 ))}
                              </div>
                           </div>
                           <div>
                              <button
                                 onClick={() => setOpen(!open)}
                                 className="w-full rounded-full bg-primary p-4">
                                 {t('button.continue')}
                              </button>
                           </div>
                        </Dialog.Panel>
                     </Transition.Child>
                  </div>
               </div>
            </Dialog>
         </Transition>
      </div>
   );
};
