// import { useEffect, useRef, useState } from "react";

import { useState } from "react";
import { ButtonGlow } from "@/components";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useWeb3Modal } from '@web3modal/wagmi/react'

const navLink = [
  {
    id: 1,
    name: "Trade",
    setTo: "/trade",
  },
  {
    id: 2,
    name: "Staking",
    setTo: "/staking",
  },
  {
    id: 3,
    name: "Docs",
    setTo: "/",
  },
  {
    id: 4,
    name: "Change Log",
    setTo: "/",
  },
];

export const Header = () => {
  // const lastScrollTop = useRef(0);

  const [toggle, setToggle] = useState(false);
  const { open } = useWeb3Modal()

  // const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  // useEffect(() => {
  //   window.addEventListener(
  //     "scroll",
  //     () => {
  //       const { scrollY } = window;
  //       if (scrollY > lastScrollTop.current) {
  //         setIsNavbarVisible(false);
  //       } else if (scrollY < lastScrollTop.current) {
  //         setIsNavbarVisible(true);
  //       }
  //       lastScrollTop.current = scrollY <= 0 ? 0 : scrollY;
  //     },
  //     { passive: true }
  //   );
  // }, []);

  return (
    <div
      className="fixed top-0 bg-black/15 backdrop-blur-lg 
      z-50 flex h-20 w-full items-center shadow transition-all border-b border-[#FFFFFF33] duration-300 ease-in-out"
    >
      <div className="layout">
        <div className="flex items-center justify-between">
          <div className=" ">
            <img
              src="/images/logo.png"
              className="cursor-pointer w-full relative h-7 z-[999]"
              alt=""
            />
          </div>

          <button
            type="button"
            onClick={() => setToggle(!toggle)}
            className="z-[999] flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-md bg-primary text-lg hover:bg-yellow md:hidden"
          >
            <span
              className={`absolute h-[2px] w-[20px] transform rounded bg-white transition  ${toggle ? "translate-y-0 rotate-45" : "-translate-y-2"
                }`}
            />
            <span
              className={`h-[2px] w-[20px] transform rounded bg-white transition  absolute${toggle ? "translate-x-3 opacity-0" : "opacity-100"
                }`}
            />
            <span
              className={`absolute h-[2px] w-[20px] transform rounded bg-white transition  ${toggle ? "translate-y-0 -rotate-45" : "translate-y-2"
                }`}
            />
          </button>
          <AnimatePresence>
            {toggle && (
              <motion.div
                className="fixed overflow-hidden justify-between flex flex-col bottom-0 right-0 top-0 z-[60] h-full min-h-screen bg-black  lg:hidden"
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
                          className="block cursor-pointer p-5 py-2 text-white"
                          onClick={() => setToggle(false)}
                        >
                          {item.name}
                        </NavLink>
                      </li>
                    ))}
                </ul>
                <div className="p-5">
                  <div className="border-animate-wrapper cursor-pointer rounded-full lg:w-[450px] lg:min-w--[150px] lg:min-h-[48px] w-full h-[60px]">
                    <div className="border-animate-content text-white bg-gradient-to-l from-[#2F292B] to-[#040102] rounded-full flex items-center justify-center">
                      Connect Wallet
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="hidden md:flex md:items-center md:justify-center gap-9">
            <ul className="flex gap-5 text-base text-white">
              {navLink &&
                navLink.map((item, i) => (
                  <li key={i}>
                    <NavLink
                      to={item.setTo}
                      // className="block cursor-pointer p-5 py-2 text-white"
                      onClick={() => setToggle(false)}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
            </ul>
            <ButtonGlow onClick={() => open()}>Connect Wallet</ButtonGlow>
          </div>
        </div>
      </div>
    </div>
  );
};
