import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MultipleSelectCoin } from "@/components/molecules";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Calendar,
} from "@/components/atoms";
import { cn } from "@/utils";

import type { Coin } from "@/types/components";

interface ModalAddStakeProps {
  isOpen: boolean;
  coins: Coin[];
  closeModal: () => void;
  selectedOptions: Coin[];
  handleSelectedOptions: (value: Coin[]) => void;
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
  totalValueLocked?: string;
  estimatedAPY?: string;
  totalReward?: string;
}

export const ModalAddStaking = ({
  closeModal,
  isOpen,
  handleSelectedOptions,
  coins,
  selectedOptions,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  totalValueLocked,
  estimatedAPY,
  totalReward,
}: ModalAddStakeProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative" onClose={closeModal}>
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
              <Dialog.Panel className="w-full h-full  max-w-3xl transform overflow-hidden  relative bg-dark border-soft/15 rounded-lg border  p-6  shadow-xl transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-2xl font-semibold mb-1 text-white">
                      Add New Staking
                    </div>
                    <div className="text-soft">
                      Register a new staking pool for public access
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <label>Select Token</label>
                      <MultipleSelectCoin
                        options={coins}
                        setSelectedOptions={handleSelectedOptions}
                        selectedOptions={selectedOptions}
                        placeholder="Add token staking"
                      />
                    </div>
                    {selectedOptions.length >= 2 &&
                      selectedOptions !== null && (
                        <div className="space-y-3">
                          <label>
                            {selectedOptions[0]?.name} (
                            {selectedOptions[0]?.symbol}){" "}
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="Input amount"
                              className="p-4 block w-full border border-soft/20 rounded-lg bg-dark focus:outline-none placeholder:text-soft"
                            />
                            <img
                              src={selectedOptions[0]?.iconUrl}
                              className="absolute inset-y-5 w-5 h-5 right-4"
                              alt="icon-coin-one"
                            />
                          </div>
                        </div>
                      )}
                    {selectedOptions.length >= 2 &&
                      selectedOptions !== null && (
                        <div className="space-y-3">
                          <label>
                            {selectedOptions[1]?.name} (
                            {selectedOptions[1]?.symbol})
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="Input amount"
                              className="p-4 block w-full border border-soft/20 rounded-lg bg-dark focus:outline-none placeholder:text-soft"
                            />
                            <img
                              src={selectedOptions[1]?.iconUrl}
                              className="absolute inset-y-5 w-5 h-5 right-4"
                              alt="icon-coin-one"
                            />
                          </div>
                        </div>
                      )}
                    <div>
                      <div className="text-white mb-3">Set User Join</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="Minimum User"
                            className="p-4 block w-full border border-soft/20 rounded-lg bg-dark focus:outline-none placeholder:text-soft"
                          />
                        </div>
                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="Maximum User"
                            className="p-4 block w-full border border-soft/20 rounded-lg bg-dark focus:outline-none placeholder:text-soft"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label>Reward Per-Block</label>
                      <input
                        type="text"
                        placeholder="Input amount"
                        className="p-4 block w-full border border-soft/20 rounded-lg bg-dark focus:outline-none placeholder:text-soft"
                      />
                    </div>
                    <div>
                      <div className="text-white mb-3">Period Staking</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                        <div className="space-y-3">
                          <Popover>
                            <PopoverTrigger asChild>
                              <button
                                className={cn(
                                  " justify-between flex text-left border text-white border-soft/20 p-4 rounded-lg w-full font-normal",
                                  !startDate && "text-muted-foreground"
                                )}
                              >
                                {startDate ? (
                                  format(startDate, "dd/MM/yyyy")
                                ) : (
                                  <span className="text-soft">Starting</span>
                                )}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-6 h-6 text-soft"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto border border-soft/50 z-[99999] relative bg-dark p-1">
                              <Calendar
                                mode="single"
                                selected={startDate}
                                onSelect={setStartDate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="space-y-3">
                          <Popover>
                            <PopoverTrigger asChild>
                              <button
                                className={cn(
                                  " justify-between flex text-left border text-white border-soft/20 p-4 rounded-lg w-full font-normal",
                                  !endDate && "text-muted-foreground"
                                )}
                              >
                                {endDate ? (
                                  format(endDate, "dd/MM/yyyy")
                                ) : (
                                  <span className="text-soft">Ended</span>
                                )}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-6 h-6 text-soft"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto border border-soft/50 z-[99999] relative bg-dark p-1">
                              <Calendar
                                mode="single"
                                selected={endDate}
                                onSelect={setEndDate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-secondary/10 rounded-lg p-3 mt-6">
                    <div className="text-secondary text-base font-medium">
                      Requirement
                    </div>
                    <ul className="list-disc text-xs text-secondary space-y-1 list-inside">
                      <li>To continue staking listing fee is 100 RESO</li>
                      <li>
                        Token has never been registered on Reso Exchange trade,
                        please register to continue
                      </li>
                    </ul>
                  </div>
                  <div className="bg-dark2 rounded-lg p-4 my-6">
                    <div className="font-semibold text-base">
                      Total Rewards Need be Paid
                    </div>
                    <div className="space-y-2 mt-3">
                      <div className="flex justify-between items-center">
                        <div className="text-soft">
                          Total Value Locked (TLV)
                        </div>
                        <div className="text-white">~${totalValueLocked}</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-soft">Estimated APY</div>
                        <div className="text-white">~{estimatedAPY}%</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-soft">Estimated Total Rewards</div>
                        <div className="text-white">~${totalReward}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    onClick={closeModal}
                    className="p-4 w-full bg-dark2 rounded-lg"
                  >
                    Continue
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
