/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useTranslation } from "react-i18next";
import { format } from "date-fns";

import {
  MultipleSelectCoin,
  NumberInput,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Calendar,
} from "@/components";
import type { Coin } from "@/types/components";
import { cn } from "@/utils";
import { ChangeEvent } from "react";

interface FormAddNewStakingProps {
  coins: Coin[];
  selectedOptions: Coin[];
  handleSelectedOptions: (value: Coin[]) => void;
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
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
}

export const FormAddNewStaking = ({
  endDate,
  handleChangeCoinOne,
  handleChangeCoinTwo,
  handleMaxUserJoin,
  handleMinUserJoin,
  handleRewardPerBlock,
  handleSelectedOptions,
  selectedOptions,
  setEndDate,
  setStartDate,
  startDate,
  valueCoinOne,
  valueCoinTwo,
  coins,
  valueMaxUserJoin,
  valueMinUserJoin,
  valueRewardPerBlock,
}: FormAddNewStakingProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <label className="text-sm md:text-base">
          {t("staking.add.card.form.one.label")}
        </label>
        <MultipleSelectCoin
          options={coins}
          setSelectedOptions={handleSelectedOptions}
          selectedOptions={selectedOptions}
          placeholder={t("staking.add.card.form.one.placeholder")}
        />
      </div>

      {selectedOptions.length >= 2 && selectedOptions !== null && (
        <div className="space-y-3">
          <label className="text-sm md:text-base">
            {selectedOptions[0]?.name} ({selectedOptions[0]?.symbol}){" "}
          </label>
          <div className="relative">
            <NumberInput
              value={valueCoinOne}
              placeholder={`${t("staking.add.card.form.two.placeholder")}`}
              onChange={handleChangeCoinOne}
              className="p-4 block placeholder:text-sm placeholder:md:text-base w-full border border-soft/20 rounded-lg bg-dark focus:outline-none placeholder:text-soft"
            />
            <img
              src={selectedOptions[0]?.iconUrl!}
              className="absolute inset-y-5 w-5 h-5 right-4"
              alt="icon-coin-one"
            />
          </div>
        </div>
      )}

      {selectedOptions.length >= 2 && selectedOptions !== null && (
        <div className="space-y-3">
          <label className="text-sm md:text-base">
            {selectedOptions[1]?.name} ({selectedOptions[1]?.symbol})
          </label>
          <div className="relative">
            <NumberInput
              placeholder={`${t("staking.add.card.form.two.placeholder")}`}
              className="p-4 block placeholder:text-sm placeholder:md:text-base w-full border border-soft/20 rounded-lg bg-dark focus:outline-none placeholder:text-soft"
              value={valueCoinTwo}
              onChange={handleChangeCoinTwo}
            />
            <img
              src={selectedOptions[1]?.iconUrl!}
              className="absolute inset-y-5 w-5 h-5 right-4"
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
              name="minUserJoin"
              onChange={handleMinUserJoin}
              value={valueMinUserJoin}
              placeholder={t("staking.add.card.form.three.placeholder.one")}
              className="p-4 block placeholder:text-sm placeholder:md:text-base w-full border border-soft/20 rounded-lg bg-dark focus:outline-none placeholder:text-soft"
            />
          </div>
          <div className="space-y-3">
            <input
              type="text"
              value={valueMaxUserJoin}
              onChange={() => handleMaxUserJoin}
              placeholder={t("staking.add.card.form.three.placeholder.two")}
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
          onChange={() => handleRewardPerBlock}
          placeholder={`${t("staking.add.card.form.two.placeholder")}`}
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
                      {t("staking.add.card.form.five.placeholder.one")}
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
                    <span className="text-soft text-sm md:text-base">
                      {t("staking.add.card.form.five.placeholder.two")}
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
  );
};
