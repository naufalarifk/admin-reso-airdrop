import { Fragment, useState } from "react";
import { ButtonConnectWallet, ButtonGlow } from "@/components";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { IcWeb } from "@/assets/icons";
import { useTranslation } from "react-i18next";
import { Transition, Dialog, Menu } from "@headlessui/react";
import { langs, Language } from "@/locales/langs";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useConfig, useConnections } from "wagmi";

const navLink = [
  // {
  //   id: 1,
  //   name: "Trades",
  //   code: "trade",
  //   setTo: "/trade",
  // },
  {
    id: 2,
    name: "Staking",
    code: "staking",
    setTo: "/staking",
  },
  {
    id: 3,
    name: "Bridge",
    setTo: "/bridge",
    code: "bridge",
  },
  {
    id: 4,
    name: "Swap",
    setTo: "/swap",
    code: "swap",
  },
  {
    id: 5,
    name: "Supports",
    setTo: "/support",
    code: "supports",
  },
  {
    id: 6,
    name: "Pool",
    setTo: "/pool",
    code: "pool",
  },
];

export const Header = ({ isLanding = false }: { isLanding?: boolean }) => {
  const { i18n, t } = useTranslation();
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);
  const modal = useWeb3Modal();
  const { chain, isConnected } = useAccount();
  const connections = useConnections();
  const { chains } = useConfig();

  const listChain = chains.map((c) => c.id);
  const currentChain = connections[0]?.chainId;
  const supportNetwork =
    currentChain !== undefined && listChain.some((e) => currentChain === e);

  return (
    <div
      className="fixed top-0 bg-dark2 backdrop-blur-lg 
      z-50 flex h-[70px] w-full items-center shadow transition-all   duration-300 ease-in-out"
    >
      <div className={` ${isLanding ? "layout" : "layout-dashboard"}`}>
        <div className="flex items-center justify-between">
          <div className="flex  gap-3">
            <button
              type="button"
              onClick={() => setToggle(!toggle)}
              className="z-[999] flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-md  text-lg  lg:hidden"
            >
              <span
                className={`absolute h-[2px] w-[20px] transform rounded bg-soft transition  ${toggle ? "translate-y-0 rotate-45" : "-translate-y-2"
                  }`}
              />
              <span
                className={`h-[2px] w-[20px] transform rounded bg-soft transition  absolute${toggle ? "translate-x-3 opacity-0" : "opacity-100"
                  }`}
              />
              <span
                className={`absolute h-[2px] w-[20px] transform rounded bg-soft transition  ${toggle ? "translate-y-0 -rotate-45" : "translate-y-2"
                  }`}
              />
            </button>
            <Link to="/" className=" ">
              <img
                src="/images/brand.png"
                className="cursor-pointer w-full relative h-10 z-[999]"
                alt=""
              />
            </Link>
          </div>
          <ButtonConnectWallet
            shortname
            classNameButton="!w-[130px] lg:hidden block"
          />

          <AnimatePresence>
            {toggle && (
              <motion.div
                className="fixed overflow-hidden justify-between flex flex-col bottom-0 left-0 top-0 z-[60] h-full min-h-screen bg-black  lg:hidden"
                initial={{ width: 0 }}
                animate={{
                  width: "100%",
                }}
                exit={{
                  width: 0,
                  transition: { ease: "circIn" },
                }}
              >
                <ul className="mt-20 border-t-[0.98px] border-darkSoft flex flex-col justify-center space-y-7 p-5">
                  {navLink &&
                    navLink.map((item, i) => (
                      <li key={i}>
                        <NavLink
                          to={item.setTo}
                          className={({ isActive }) =>
                            isActive
                              ? "text-primary text-base font-medium"
                              : "text-white text-base font-medium"
                          }
                          onClick={() => setToggle(false)}
                        >
                          {t(`navbar.menu.${item.code}`)}
                        </NavLink>
                      </li>
                    ))}
                </ul>
                <div className="flex  py-5 layout items-center justify-between gap-3">
                  <div
                    onClick={() => modal.open({ view: "Networks" })}
                    className="cursor-pointer border-animate-wrapper rounded-full w-full h-12 px-20 py-5 "
                  >
                    <div className="border-animate-content w-full gap-2 text-white bg-gradient-to-l from-[#161415] to-[#040102] rounded-full flex items-center justify-center">
                      {chain && (
                        <div className="flex w-8 h-9  clip-hexa items-center justify-center overflow-hidden bg-neutral-800">
                          <img
                            className="w-full h-full"
                            src={chain?.custom?.icon as string}
                          />
                        </div>
                      )}
                      {!supportNetwork && isConnected && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {chain
                        ? chain.name
                        : !supportNetwork && isConnected
                          ? t("button.network")
                          : t("button.selectNetwork")}
                    </div>
                  </div>
                  <ButtonGlow
                    onClick={() => setOpen(!open)}
                    className="w-12 p-0"
                  >
                    <IcWeb className="text-white" />
                  </ButtonGlow>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="hidden lg:flex lg:items-center lg:justify-center gap-10">
            <ul className="flex gap-10 text-base  cursor-pointer">
              {navLink &&
                navLink.map((item, i) => (
                  <li key={i}>
                    <NavLink
                      to={item.setTo}
                      className={({ isActive }) =>
                        isActive
                          ? "text-primary text-base font-medium"
                          : "text-white text-base font-medium"
                      }
                      onClick={() => setToggle(false)}
                    >
                      {t(`navbar.menu.${item.code}`)}
                    </NavLink>
                  </li>
                ))}
            </ul>

            {/* <div onClick={() => setOpenTokenList(!openTokenList)}>test</div> */}
            <div className="flex gap-2">
              <div
                onClick={() => modal.open({ view: "Networks" })}
                className="cursor-pointer border-animate-wrapper rounded-full w-full px-28 "
              >
                <div className="border-animate-content w-full gap-2 text-white bg-gradient-to-l from-[#161415] to-[#040102] rounded-full flex items-center justify-center">
                  {chain && (
                    <div className="flex w-8 h-9  clip-hexa items-center justify-center overflow-hidden bg-neutral-800">
                      <img
                        className="w-full h-full"
                        src={chain?.custom?.icon as string}
                      />
                    </div>
                  )}
                  {!supportNetwork && isConnected && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {chain
                    ? chain.name
                    : !supportNetwork && isConnected
                      ? t("button.network")
                      : t("button.selectNetwork")}
                </div>
              </div>
              <ButtonConnectWallet />
              <Menu>
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
              </Menu>
            </div>
          </div>
        </div>
      </div>

      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative" onClose={() => setOpen(!open)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 z-[99]  bg-black/50 " />
          </Transition.Child>

          <div className="fixed z-[999] backdrop-blur-sm inset-0 overflow-y-auto">
            <div className="flex min-h-full   items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full h-full  max-w-3xl transform overflow-hidden  relative bg-dark border-soft/15 rounded-lg border  p-2  shadow-xl transition-all">
                  <div className="py-6">
                    <div className="text-center font-bold text-white">
                      {t("tags.language")}
                    </div>
                    <div className="mt-4 grid grid-cols-3  gap-3">
                      {langs.map((lang: Language) => (
                        <div key={lang.abbr}>
                          <button
                            onClick={() => i18n.changeLanguage(lang.abbr)}
                            className={`flex items-center w-full gap-2 border text-center py-3 rounded-full justify-center ${i18n.language === lang.abbr
                              ? "border-primary"
                              : "border-soft/45"
                              }`}
                          >
                            <div>
                              <img
                                src={lang.icon}
                                className="w-4 h-4"
                                alt="icon-lang"
                              />
                            </div>
                            <div
                              className={`${i18n.language === lang.abbr
                                ? "  text-primary"
                                : " text-white"
                                } text-sm `}
                            >
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
                      className="p-4 w-full bg-primary rounded-full"
                    >
                      {t("button.continue")}
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
