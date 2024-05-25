import { Fragment, useCallback, useEffect, useState } from 'react';
import { ButtonGlow, ButtonWalletConnectV2, Text } from '@/components';
// import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
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
    {
      id: 5,
      name: 'Market Overview',
      code: 'marketoverview',
      setTo: '/',
    },
    {
      id: 5,
      name: 'Create New Market',
      code: 'createnewmarket',
      setTo: '/market',
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
                className={`absolute h-[2px] w-[20px] transform rounded bg-soft transition  ${toggle ? 'translate-y-0 rotate-45' : '-translate-y-2'
                  }`}
              />
              <span
                className={`h-[2px] w-[20px] transform rounded bg-soft transition  absolute${toggle ? 'translate-x-3 opacity-0' : 'opacity-100'
                  }`}
              />
              <span
                className={`absolute h-[2px] w-[20px] transform rounded bg-soft transition  ${toggle ? 'translate-y-0 -rotate-45' : 'translate-y-2'
                  }`}
              />
            </button>
            <Link
              to={`/trade/${market?.[0]?.name?.replace('/', '-')}`}
              className=" ">
              <img
                src="/images/brand.png"
                className="relative z-[999] h-7 w-full cursor-pointer lg:h-10"
                alt=""
              />
            </Link>
            <div className="hidden gap-10 lg:flex lg:items-center lg:justify-center">
              <ul className="flex cursor-pointer gap-10  text-base items-center">
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
                      ) : item.code === 'support' ? (
                        <a
                          target="_blank"
                          className="text-base font-medium text-white"
                          href="https://t.me/rectoverso_chat">
                          {t(`navbar.menu.${item.code}`)}
                        </a>
                      ) : item.code === 'createnewmarket' ? (
                        <div
                          onClick={() => navigate('/market')}
                          className="flex font-semibold cursor-pointer items-center gap-3 rounded-full bg-primary px-4 py-2 text-white">
                          Create New Market
                        </div>
                      ) :

                        (
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
            <div style={{
              background: 'rgba(254, 159, 0, 0.10)'
            }} className='rounded-full flex space-x-2 py-2 px-4 items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path opacity="0.2" d="M25.1201 14.6147L14.6201 25.1147C14.5394 25.1955 14.4436 25.2597 14.3381 25.3034C14.2327 25.3472 14.1196 25.3697 14.0054 25.3697C13.8912 25.3697 13.7781 25.3472 13.6727 25.3034C13.5672 25.2597 13.4714 25.1955 13.3907 25.1147L2.89071 14.6147C2.80989 14.5341 2.74576 14.4382 2.70201 14.3328C2.65826 14.2273 2.63574 14.1142 2.63574 14C2.63574 13.8858 2.65826 13.7728 2.70201 13.6673C2.74576 13.5618 2.80989 13.466 2.89071 13.3853L13.3962 2.88534C13.4768 2.80452 13.5727 2.74039 13.6781 2.69664C13.7836 2.65289 13.8967 2.63037 14.0109 2.63037C14.1251 2.63037 14.2381 2.65289 14.3436 2.69664C14.4491 2.74039 14.5449 2.80452 14.6256 2.88534L25.1256 13.3908C25.2864 13.5542 25.3761 13.7746 25.3751 14.0039C25.374 14.2332 25.2824 14.4528 25.1201 14.6147Z" fill="#FE9F00" />
                <path d="M14 7.87493C14.232 7.87493 14.4546 7.96712 14.6187 8.13121C14.7828 8.29531 14.875 8.51787 14.875 8.74993V14.8749C14.875 15.107 14.7828 15.3296 14.6187 15.4937C14.4546 15.6577 14.232 15.7499 14 15.7499C13.7679 15.7499 13.5453 15.6577 13.3812 15.4937C13.2171 15.3296 13.125 15.107 13.125 14.8749V8.74993C13.125 8.51787 13.2171 8.29531 13.3812 8.13121C13.5453 7.96712 13.7679 7.87493 14 7.87493ZM12.6875 18.8124C12.6875 19.072 12.7644 19.3258 12.9087 19.5416C13.0529 19.7575 13.2579 19.9257 13.4977 20.025C13.7375 20.1244 14.0014 20.1504 14.256 20.0997C14.5106 20.0491 14.7445 19.9241 14.928 19.7405C15.1116 19.557 15.2366 19.3231 15.2872 19.0685C15.3379 18.8139 15.3119 18.55 15.2126 18.3102C15.1132 18.0703 14.945 17.8653 14.7291 17.7211C14.5133 17.5769 14.2596 17.4999 14 17.4999C13.6519 17.4999 13.318 17.6382 13.0719 17.8844C12.8257 18.1305 12.6875 18.4643 12.6875 18.8124ZM26.25 13.9999C26.2506 14.2291 26.2058 14.4562 26.1181 14.668C26.0304 14.8797 25.9016 15.072 25.7392 15.2337L15.2337 25.7402C14.9058 26.0662 14.4623 26.2491 14 26.2491C13.5376 26.2491 13.0941 26.0662 12.7662 25.7402L2.26621 15.2337C1.94027 14.9058 1.75732 14.4623 1.75732 13.9999C1.75732 13.5376 1.94027 13.0941 2.26621 12.7662L12.7717 2.25962C13.0996 1.93368 13.5431 1.75073 14.0054 1.75073C14.4678 1.75073 14.9113 1.93368 15.2392 2.25962L25.7446 12.7662C25.9061 12.9283 26.0339 13.1208 26.1206 13.3325C26.2074 13.5443 26.2513 13.7711 26.25 13.9999ZM24.5 13.9999L14 3.49993L3.49996 13.9999L14 24.4999L24.5 13.9999Z" fill="#FE9F00" />
              </svg>
              <div>
                <Text className='text-[#FE9F00]'>Info</Text>
                <Text className='text-[#FE9F00] font-semibold'>Demo Only</Text>
              </div>
            </div>
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
                            disabled={lang.abbr !== 'en'}
                            onClick={() => i18n.changeLanguage(lang.abbr)}
                            className={`flex w-full items-center justify-center gap-2 rounded-full border py-3 text-center ${i18n.language === lang.abbr
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
                              className={`${i18n.language === lang.abbr
                                ? '  text-primary' : lang.abbr !== 'en' ? 'text-gray-600'
                                  : ' text-white'
                                } text-sm`}>
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
