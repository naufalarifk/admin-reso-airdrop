import { IcClose } from "@/assets/icons";
import {
  // ButtonGlow,
  Text, Button
} from "@/components/atoms";
// import { cn } from "@/utils";
import {
  CloseButton,
  // Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
// import { useTranslation } from "react-i18next";

const variants = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

export function AirdropPopUp() {
  // const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <Transition appear show={isOpen}>
            <Dialog
              open={isOpen}
              onClose={() => setIsOpen(false)}
              className="relative z-50"
            >
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
                    leaveTo="opacity-0 transform-[scale(95%)]"
                  >
                    <DialogPanel
                      as={motion.div}
                      variants={variants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="w-full max-w-4xl space-y-4 rounded-2xl border border-white/10 bg-dark px-4 py-6"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <DialogTitle
                          as="h3"
                          className="text-base font-semibold text-white lg:block hidden"
                        >
                          - NEW AIRDROPS RELEASE
                        </DialogTitle>
                        <CloseButton className="grid size-6 place-items-center rounded-full transition-all duration-300 data-[hover]:scale-110">
                          <IcClose />
                        </CloseButton>
                      </div>
                      <div className="flex space-x-0 lg:space-x-2 flex-col-reverse lg:flex-row">
                        <div className="w-full lg:w-3/5 space-y-2 lg:space-y-5">
                          <Text className="text-center lg:hidden">
                            - NEW AIRDROPS RELEASE
                          </Text>
                          <Text className="text-lg text-center lg:text-left lg:text-5xl font-semibold"><span className="text-[#F23F5D]">RECTOVERSO</span> New Airdrop has been release,
                            <span className="text-[#F23F5D]">{' '} Up to $31</span> Join Now</Text>
                          <Text className="text-[#90A3BF] lg:text-left text-center">
                            Join our airdrop and get $31 in RESO tokens! Available for 4000 Solana wallet holder and recent transaction.
                          </Text>
                          <Button className="bg-[#F23F5D] rounded-full lg:w-auto w-full">Join Airdrop</Button>
                        </div>
                        <div className="w-full lg:w-2/5 relative">
                          {/* <img className="hidden h-full w-full rotate-[15deg]" src="/images/airdrop-pic.webp" alt="" srcSet="" /> */}
                          <img className="h-full w-full rotate-[15deg]" src="/images/airdrop-pic-mobile.webp" alt="" srcSet="" />
                          <img className="absolute inset-0 -z-10" src="/images/airdrop-bg.svg" alt="" srcSet="" />
                        </div>
                      </div>
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
