import { Fragment, useState } from "react";
import { ButtonConnectWallet, ButtonGlow } from "@/components";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { IcWeb } from "@/assets/icons";
import { useTranslation } from "react-i18next";
import { Transition, Dialog, Menu } from "@headlessui/react";
import { langs, Language } from "@/locales/langs";

const navLink = [
  {
    id: 1,
    name: "Trades",
    code: "trade",
    setTo: "/trade",
  },
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
];

export const Header = ({ isLanding = false }: { isLanding?: boolean }) => {
  const { i18n, t } = useTranslation();
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(true);

  return (
    <div
      className="fixed top-0 bg-dark2 backdrop-blur-lg 
      z-50 flex h-[70px] w-full items-center shadow transition-all   duration-300 ease-in-out"
    >
      <div className={` ${isLanding ? "layout" : "layout-dashboard"}`}>
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setToggle(!toggle)}
              className="z-[999] flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-md  text-lg  md:hidden"
            >
              <span
                className={`absolute h-[2px] w-[20px] transform rounded bg-soft transition  ${
                  toggle ? "translate-y-0 rotate-45" : "-translate-y-2"
                }`}
              />
              <span
                className={`h-[2px] w-[20px] transform rounded bg-soft transition  absolute${
                  toggle ? "translate-x-3 opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute h-[2px] w-[20px] transform rounded bg-soft transition  ${
                  toggle ? "translate-y-0 -rotate-45" : "translate-y-2"
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
                          {item.name}
                        </NavLink>
                      </li>
                    ))}
                </ul>
                <div className="flex items-center justify-center gap-3">
                  <div className="p-5">
                    <ButtonConnectWallet className="w-full" />
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

          <div className="hidden md:flex md:items-center md:justify-center gap-10">
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
              <ButtonConnectWallet />
              <Menu>
                <>
                  <Menu.Button>
                    <ButtonGlow className="w-12 p-0">
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
                                className={`flex items-center px-6 gap-1 border text-center py-3 rounded-full justify-center ${
                                  i18n.language === lang.abbr
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
                                  className={`${
                                    i18n.language === lang.abbr
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
                            className={`flex items-center w-full gap-2 border text-center py-3 rounded-full justify-center ${
                              i18n.language === lang.abbr
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
                              className={`${
                                i18n.language === lang.abbr
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
