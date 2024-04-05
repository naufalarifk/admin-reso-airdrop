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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
                      {t("staking.add.card.title")}
                    </div>
                    <div className="text-soft">
                      {t("staking.add.card.subtitle")}
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <label>{t("staking.add.card.form.one.label")}</label>
                      <MultipleSelectCoin
                        options={coins}
                        setSelectedOptions={handleSelectedOptions}
                        selectedOptions={selectedOptions}
                        placeholder={t("staking.add.card.form.one.placeholder")}
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
                              placeholder={`${t(
                                "staking.add.card.form.two.placeholder"
                              )}`}
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
                              placeholder={`${t(
                                "staking.add.card.form.two.placeholder"
                              )}`}
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
                      <div className="text-white mb-3">
                        {t("staking.add.card.form.three.label")}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder={t(
                              "staking.add.card.form.three.placeholder.one"
                            )}
                            className="p-4 block w-full border border-soft/20 rounded-lg bg-dark focus:outline-none placeholder:text-soft"
                          />
                        </div>
                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder={t(
                              "staking.add.card.form.three.placeholder.two"
                            )}
                            className="p-4 block w-full border border-soft/20 rounded-lg bg-dark focus:outline-none placeholder:text-soft"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label>{t("staking.add.card.form.four.label")}</label>
                      <input
                        type="text"
                        placeholder={`${t(
                          "staking.add.card.form.two.placeholder"
                        )}`}
                        className="p-4 block w-full border border-soft/20 rounded-lg bg-dark focus:outline-none placeholder:text-soft"
                      />
                    </div>
                    <div>
                      <div className="text-white mb-3">
                        {t("staking.add.card.form.five.label")}
                      </div>
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
                                  <span className="text-soft">
                                    {t(
                                      "staking.add.card.form.five.placeholder.one"
                                    )}
                                  </span>
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
                                  <span className="text-soft">
                                    {t(
                                      "staking.add.card.form.five.placeholder.two"
                                    )}
                                  </span>
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
                      {t("global.requirement")}
                    </div>
                    <ul className="list-disc text-xs text-secondary space-y-1 list-inside">
                      <li> {t("staking.add.card.info.list.one")} 100 RESO</li>
                      <li>{t("staking.add.card.info.list.two")}</li>
                    </ul>
                  </div>
                  <div className="bg-dark2 rounded-lg p-4 my-6">
                    <div className="font-semibold text-base">
                      {t("staking.add.card.info.reward")}
                    </div>
                    <div className="space-y-2 mt-3">
                      <div className="flex justify-between items-center">
                        <div className="text-soft">
                          {t("staking.layout.info.one")}
                        </div>
                        <div className="text-white">~${totalValueLocked}</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-soft">
                          {t("staking.add.card.info.estimatedAPY")}
                        </div>
                        <div className="text-white">~{estimatedAPY}%</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-soft">
                          {t("staking.add.card.info.estimatedTotalReward")}
                        </div>
                        <div className="text-white">~${totalReward}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    onClick={closeModal}
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
  );
};
