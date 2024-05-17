import { ChangeEvent, Fragment, memo } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { InfoRewardStake, MultipleSelectCoin } from "@/components/molecules";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Calendar,
  NumberInput,
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
  startDate: Date | string | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | string | undefined;
  setEndDate: (date: Date | undefined) => void;
  totalValueLocked?: string;
  estimatedAPY?: string | number;
  totalReward?: string | number;
  handleChangeCoinOne: (value: number) => void;
  valueCoinOne: number;
  handleChangeCoinTwo: (value: number) => void;
  valueCoinTwo: number;
  valueMinUserJoin: string;
  handleMinUserJoin: (value: ChangeEvent<HTMLInputElement>) => void;
  valueMaxUserJoin: string;
  handleMaxUserJoin: (value: ChangeEvent<HTMLInputElement>) => void;
  valueRewardPerBlock: string;
  handleRewardPerBlock: (value: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
}

export const ModalAddStaking = memo(
  ({
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
    handleChangeCoinOne,
    valueCoinOne,
    handleChangeCoinTwo,
    valueCoinTwo,
    valueMinUserJoin,
    handleMinUserJoin,
    valueMaxUserJoin,
    handleMaxUserJoin,
    valueRewardPerBlock,
    handleRewardPerBlock,
    handleSubmit,
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
                      <div className="text-lg md:text-2xl font-semibold mb-1 text-white">
                        {t("staking.add.card.title")}
                      </div>
                      <div className="text-sm md:tex-base text-soft">
                        {t("staking.add.card.subtitle")}
                      </div>
                    </div>
                    <div onClick={closeModal} className="cursor-pointer">
                      <svg
                        width={24}
                        height={25}
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2C6.15 2 1.5 6.65 1.5 12.5S6.15 23 12 23s10.5-4.65 10.5-10.5S17.85 2 12 2zm0 19.5c-4.95 0-9-4.05-9-9s4.05-9 9-9 9 4.05 9 9-4.05 9-9 9z"
                          fill="#90A3BF"
                        />
                        <path
                          d="M16.05 17.75L12 13.7l-4.05 4.05-1.2-1.2 4.05-4.05-4.05-4.05 1.2-1.2L12 11.3l4.05-4.05 1.2 1.2-4.05 4.05 4.05 4.05-1.2 1.2z"
                          fill="#90A3BF"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <label className="text-sm md:text-base">
                          {t("staking.add.card.form.one.label")}
                        </label>
                        <MultipleSelectCoin
                          options={coins}
                          setSelectedOptions={handleSelectedOptions}
                          selectedOptions={selectedOptions}
                          placeholder={t(
                            "staking.add.card.form.one.placeholder"
                          )}
                        />
                      </div>

                      {selectedOptions.length >= 2 &&
                        selectedOptions !== null && (
                          <div className="space-y-3">
                            <label className="text-sm md:text-base capitalize">
                              {selectedOptions[0]?.name} (
                              {selectedOptions[0]?.symbol}){" "}
                            </label>
                            <div className="relative">
                              <NumberInput
                                value={valueCoinOne}
                                placeholder={`${t(
                                  "staking.add.card.form.two.placeholder"
                                )}`}
                                onChange={handleChangeCoinOne}
                                className="p-4 block placeholder:text-sm placeholder:md:text-base w-full border border-soft/20 rounded-lg bg-dark focus:outline-none placeholder:text-soft"
                              />
                              <img
                                src={
                                  selectedOptions[0]?.iconUrl ||
                                  "/images/reso.png"
                                }
                                className="absolute overflow-hidden rounded-full inset-y-5 w-5 h-5 right-4"
                                alt="icon-coin-one"
                              />
                            </div>
                          </div>
                        )}

                      {selectedOptions.length >= 2 &&
                        selectedOptions !== null && (
                          <div className="space-y-3">
                            <label className="text-sm md:text-base capitalize">
                              {selectedOptions[1]?.name} (
                              {selectedOptions[1]?.symbol})
                            </label>
                            <div className="relative">
                              <NumberInput
                                placeholder={`${t(
                                  "staking.add.card.form.two.placeholder"
                                )}`}
                                className="p-4 block placeholder:text-sm placeholder:md:text-base w-full border border-soft/20 rounded-lg bg-dark focus:outline-none placeholder:text-soft"
                                value={valueCoinTwo}
                                onChange={handleChangeCoinTwo}
                              />
                              <img
                                src={
                                  selectedOptions[1]?.iconUrl ||
                                  "/images/reso.png"
                                }
                                className="absolute overflow-hidden rounded-full inset-y-5 w-5 h-5 right-4"
                                alt="icon-coin-one"
                              />
                            </div>
                          </div>
                        )}

                      <div>
                        <div className="text-white mb-3 text-sm md:text-base">
                          {t("staking.add.card.form.three.label")}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                          <div className="space-y-3">
                            <input
                              type="text"
                              onChange={handleMinUserJoin}
                              value={valueMinUserJoin}
                              placeholder={t(
                                "staking.add.card.form.three.placeholder.one"
                              )}
                              className="p-4 block placeholder:text-sm placeholder:md:text-base w-full border border-soft/20 rounded-lg bg-dark focus:outline-none placeholder:text-soft"
                            />
                          </div>
                          <div className="space-y-3">
                            <input
                              type="text"
                              value={valueMaxUserJoin}
                              onChange={handleMaxUserJoin}
                              placeholder={t(
                                "staking.add.card.form.three.placeholder.two"
                              )}
                              className="p-4 block w-full placeholder:text-sm placeholder:md:text-base border border-soft/20 rounded-lg bg-dark focus:outline-none placeholder:text-soft"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm md:text-base">
                          {t("staking.add.card.form.four.label")}
                        </label>
                        <input
                          type="text"
                          value={valueRewardPerBlock}
                          onChange={handleRewardPerBlock}
                          placeholder={`${t(
                            "staking.add.card.form.two.placeholder"
                          )}`}
                          className="p-4 block w-full border border-soft/20 rounded-lg bg-dark focus:outline-none placeholder:text-soft"
                        />
                      </div>
                      <div>
                        <div className="text-white text-sm md:text-base mb-3">
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
                                    <span className="text-soft text-sm md:text-base">
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
                                  selected={startDate as Date}
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
                                    <span className="text-soft text-sm md:text-base">
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
                                  selected={endDate as Date}
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
                      <div className="text-secondary text-sm md:text-base font-medium">
                        {t("global.requirement")}
                      </div>
                      <ul className="list-disc text-xs text-secondary space-y-1 list-inside">
                        <li> {t("staking.add.card.info.list.one")} 100 RESO</li>
                        <li>{t("staking.add.card.info.list.two")}</li>
                      </ul>
                    </div>
                    <InfoRewardStake
                      totalValueLocked={Number(totalValueLocked)}
                      estimatedAPY={Number(estimatedAPY)}
                      estimatedTotalReward={Number(totalReward)}
                    />
                  </div>
                  <div>
                    <button
                      onClick={handleSubmit}
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
  }
);
