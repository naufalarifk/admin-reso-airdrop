import { CardBorderAnimate } from '@/components';
// import { cn } from "@/utils";
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
// import { useTranslation } from "react-i18next";

const variants = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
};

export function AirdropPopUp() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <Transition
            appear
            show={isOpen}>
            <Dialog
              open={isOpen}
              onClose={() => setIsOpen(false)}
              className="relative z-50">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/30 backdrop-blur-sm"
              />
              <div className="fixed inset-0 z-full w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                  <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 transform-[scale(95%)]"
                    enterTo="opacity-100 transform-[scale(100%)]"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 transform-[scale(100%)]"
                    leaveTo="opacity-0 transform-[scale(95%)]">
                    <DialogPanel
                      as={motion.div}
                      variants={variants}
                      initial="hidden"
                      animate="visible"
                      exit="exit">
                      <CardBorderAnimate className="relative h-[600px] !max-w-[472px] overflow-hidden rounded-2xl !bg-dark p-6 lg:h-full lg:!max-w-[982px]">
                        <div className="absolute -left-16  top-0 size-[420px] scale-125 lg:hidden">
                          <img
                            src="/images/airdrop-banner.webp"
                            alt="airdrop"
                            loading="lazy"
                            className="block object-contain"
                          />
                        </div>
                        <div className="mt-72 w-full space-y-6 text-center lg:mt-0 lg:w-8/12 lg:text-start">
                          <div className="flex items-center justify-center gap-3 font-dm font-bold lg:justify-start">
                            <div className="h-1 w-10 rounded bg-white" />{' '}
                            <div>AIRDROP ANNOUNCEMENT</div>
                          </div>
                          <div className="font-dm text-2xl font-bold lg:text-4xl">
                            JOIN OUR <span className="text-primary">AIRDROP</span>{' '}
                            NOW!
                          </div>
                          <div className="font-dm text-base font-semibold text-white lg:text-2xl">
                            Join our airdrop and get{' '}
                            <span className="text-primary">$31</span> in RESO tokens!
                            Available for <span className="text-primary">17.000</span>{' '}
                            Solana wallet holder and recent transaction.
                          </div>
                          <a
                            href="https://beta.rectoverso.exchange/airdrop"
                            className="block">
                            <button onClick={() => [localStorage.setItem('local_popover', 'false'), setIsOpen(false)]} className="relative z-10 inline-flex w-full items-center justify-center gap-x-2 rounded-full border border-transparent bg-primary px-8 py-3 text-center text-sm font-semibold text-white hover:bg-primary/80 disabled:pointer-events-none disabled:opacity-50 lg:w-[300px] lg:px-4">
                              Join Airdrop
                            </button>
                          </a>
                        </div>
                        <div className="absolute -right-5 top-0 hidden size-[500px] lg:block">
                          <img
                            src="/images/airdrop-banner.webp"
                            alt="airdrop"
                            loading="lazy"
                            className="block object-contain"
                          />
                        </div>
                      </CardBorderAnimate>
                    </DialogPanel>
                  </TransitionChild>
                </div>
              </div>
            </Dialog>
          </Transition>
        )}
      </AnimatePresence>
    </>
  );
}
