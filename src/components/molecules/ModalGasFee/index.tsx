import { Button } from "@/components/atoms";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import type { Gas } from "./hooks/useGasStore";

interface ModalGasFeeProps {
  isOpen: boolean;
  closeModal: () => void;
  gasList?: Gas[];
  handleSelectedGas: (value: Gas) => void;
  selected: Gas | null;
}

export const ModalGasFee = ({
  isOpen,
  closeModal,
  gasList,
  handleSelectedGas,
  selected,
}: ModalGasFeeProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative" onClose={closeModal!}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-[99]  bg-black/20 " />
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
              <Dialog.Panel className="w-full  max-w-lg transform overflow-hidden  relative bg-dark border-soft/15 rounded-lg border  p-6  shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-semibold leading-6 text-center text-white"
                >
                  Gas Fee
                </Dialog.Title>
                <div>
                  <div className="grid grid-cols-3 mt-5 gap-3">
                    {gasList?.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelectedGas(item)}
                        className={`flex items-center justify-center rounded-lg border p-2 transition-colors duration-300 ease-in-out ${
                          selected === item
                            ? "border-primary bg-primary/10"
                            : "border-dark2 bg-dark"
                        } `}
                      >
                        <div className="space-y-2 text-center">
                          <div className="text-sm text-soft">{item?.title}</div>
                          <div>{item.feeRate} GWEI</div>
                          <div className="text-xs text-soft">{item.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <Button
                    onClick={closeModal}
                    className="w-full rounded-full mt-10 bg-[#F23F5D]"
                  >
                    Confirm
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
