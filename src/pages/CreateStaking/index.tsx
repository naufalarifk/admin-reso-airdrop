import { useSearchParams } from "react-router-dom";

import { Balance, Button, ModalUnstake } from "@/components";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, Transition } from "@headlessui/react";

export const CreateStakingPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [modalConfirm, setModalConfirm] = useState(false);

  const yourStaked = 0;
  const balance = 100000;

  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [usdAmount, setUsdAmount] = useState<number | null>(null);

  const isMultiple = searchParams.get("type");

  const handleCryptoAmountChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const decimals = searchParams.get("decimals") || "9";
      const rate = searchParams.get("rate") || "171.05";
      const regex = new RegExp(`^\\d*\\.?\\d{0,${decimals}}$`);

      if (value === "" || regex.test(value)) {
        setAmount(value);
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue)) {
          setUsdAmount(
            parseFloat((numericValue * parseFloat(rate)).toFixed(5))
          );
        } else {
          setUsdAmount(null);
        }
      }
    },
    [searchParams]
  );

  useEffect(() => {
    setTimeout(() => {
      setModalConfirm(false);
      setAmount("");
    }, 5000);
  }, [modalConfirm]);

  const renderTypeStack = useMemo(() => {
    if (isMultiple === "multiple") {
      return (
        <>
          <div className="bg-dark mt-4 w-full   p-4 md:p-6  border-soft/15 rounded-xl border-[0.5px]">
            <form autoComplete="off">
              <div className="flex flex-col md:flex-row md:justify-between gap-2 md:gap-4 items-center">
                <div className="relative w-full  p-4 rounded-lg">
                  <div className="absolute inset-y-0 start-5 flex items-center  pointer-events-none">
                    <svg
                      width={30}
                      height={30}
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_726_3281)">
                        <path
                          d="M14.71 29.92c8.124 0 14.71-6.586 14.71-14.71S22.833.5 14.71.5 0 7.086 0 15.21s6.586 14.71 14.71 14.71z"
                          fill="#F7931A"
                        />
                        <path
                          d="M21.174 13.39c.29-1.927-1.18-2.963-3.185-3.655l.65-2.61-1.588-.396-.634 2.542c-.418-.105-.846-.202-1.274-.3l.64-2.558-1.59-.396-.65 2.61c-.346-.08-.686-.157-1.015-.24l.002-.008-2.192-.547-.423 1.697s1.18.27 1.155.287c.643.161.76.587.74.925l-.741 2.974c.044.011.101.028.165.053l-.168-.042-1.039 4.167c-.079.195-.278.488-.729.377.017.023-1.154-.288-1.154-.288l-.79 1.819 2.07.515c.384.097.76.198 1.131.293l-.657 2.64 1.587.395.651-2.61c.434.116.855.225 1.267.328l-.649 2.6 1.589.395.657-2.635c2.71.513 4.748.306 5.605-2.145.692-1.973-.034-3.112-1.46-3.854 1.04-.239 1.82-.922 2.03-2.333zm-3.631 5.091c-.49 1.974-3.813.907-4.89.64l.872-3.499c1.078.27 4.532.802 4.018 2.86zm.492-5.12c-.448 1.796-3.213.883-4.11.66l.791-3.172c.896.223 3.786.64 3.319 2.512z"
                          fill="#fff"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_726_3281">
                          <path
                            fill="#fff"
                            transform="translate(0 .5)"
                            d="M0 0H29.4194V29.4194H0z"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <input
                    type="number"
                    id="default-search"
                    className="block bg-transparent w-9/12 md:w-full p-4 ps-14 text-sm  placeholder:text-soft text-white font-semibold outline-none  rounded-lg"
                    placeholder="0.00"
                  />
                  <button
                    type="button"
                    className="text-primary absolute end-5 bottom-6  md:end-5 md:bottom-5 bg-primary/10 focus:outline-none font-medium rounded-lg text-xs md:text-base p-2"
                  >
                    {t("global.max")}
                  </button>
                </div>

                <div className="relative w-full p-4 rounded-lg">
                  <div className="absolute inset-y-0 start-5 flex items-center  pointer-events-none">
                    <img src="/images/reso.png" className="w-7 h-7" />
                  </div>
                  <input
                    type="number"
                    id="default-search"
                    className="block bg-transparent w-10/12 md:w-full p-4 ps-14 text-sm  placeholder:text-soft text-white font-semibold outline-none  rounded-lg"
                    placeholder="0.00"
                  />
                  <button
                    type="button"
                    className="text-primary absolute end-5 bottom-6  md:end-5 md:bottom-5 bg-primary/10 focus:outline-none font-medium rounded-lg text-xs md:text-base p-2"
                  >
                    {t("global.max")}
                  </button>
                </div>
              </div>
            </form>
            <div className="mt-4 space-y-2">
              <Button type="button" className="w-full bg-primary">
                {t("button.submit")}
              </Button>
              <Button type="button" className="w-full bg-transparent">
                {t("global.unstake")}
              </Button>
            </div>
          </div>
          <div className=" mt-4 w-full ">
            <div className="text-base md:text-2xl font-semibold text-white mb-4">
              {t("staking.create.stakeRewards")}
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-base text-white mb-2.5">
                  {t("staking.create.yourStaked")}
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="relative w-full bg-dark p-4 rounded-lg">
                    <div className="absolute inset-y-0 start-5 flex items-center  pointer-events-none">
                      <svg
                        width={30}
                        height={30}
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_726_3281)">
                          <path
                            d="M14.71 29.92c8.124 0 14.71-6.586 14.71-14.71S22.833.5 14.71.5 0 7.086 0 15.21s6.586 14.71 14.71 14.71z"
                            fill="#F7931A"
                          />
                          <path
                            d="M21.174 13.39c.29-1.927-1.18-2.963-3.185-3.655l.65-2.61-1.588-.396-.634 2.542c-.418-.105-.846-.202-1.274-.3l.64-2.558-1.59-.396-.65 2.61c-.346-.08-.686-.157-1.015-.24l.002-.008-2.192-.547-.423 1.697s1.18.27 1.155.287c.643.161.76.587.74.925l-.741 2.974c.044.011.101.028.165.053l-.168-.042-1.039 4.167c-.079.195-.278.488-.729.377.017.023-1.154-.288-1.154-.288l-.79 1.819 2.07.515c.384.097.76.198 1.131.293l-.657 2.64 1.587.395.651-2.61c.434.116.855.225 1.267.328l-.649 2.6 1.589.395.657-2.635c2.71.513 4.748.306 5.605-2.145.692-1.973-.034-3.112-1.46-3.854 1.04-.239 1.82-.922 2.03-2.333zm-3.631 5.091c-.49 1.974-3.813.907-4.89.64l.872-3.499c1.078.27 4.532.802 4.018 2.86zm.492-5.12c-.448 1.796-3.213.883-4.11.66l.791-3.172c.896.223 3.786.64 3.319 2.512z"
                            fill="#fff"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_726_3281">
                            <path
                              fill="#fff"
                              transform="translate(0 .5)"
                              d="M0 0H29.4194V29.4194H0z"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <input
                      type="string"
                      id="default-search"
                      className="block bg-transparent w-full p-4 ps-14 text-sm  placeholder:text-soft text-white font-semibold outline-none  rounded-lg"
                      placeholder="0.00"
                      value={"0,7235 BTC"}
                      readOnly
                    />
                    <span className="text-white absolute end-5 bottom-5  font-medium rounded-lg text-base p-2">
                      ≈ $ 0
                    </span>
                  </div>
                  <div className="relative w-full bg-dark p-4 rounded-lg">
                    <div className="absolute inset-y-0 start-5 flex items-center  pointer-events-none">
                      <img src="/images/reso.png" className="w-7 h-7" />
                    </div>
                    <input
                      type="string"
                      id="default-search"
                      className="block bg-transparent w-full p-4 ps-14 text-sm  placeholder:text-soft text-white font-semibold outline-none  rounded-lg"
                      placeholder="0.00"
                      value={"0,7235 BTC"}
                      readOnly
                    />
                    <span className="text-white absolute end-5 bottom-5  font-medium rounded-lg text-base p-2">
                      ≈ $ 0
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-base text-white mb-2.5">
                  {t("staking.create.unclaimedRewards")}
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="relative w-full bg-dark p-4 rounded-lg">
                    <div className="absolute inset-y-0 start-5 flex items-center  pointer-events-none">
                      <svg
                        width={30}
                        height={30}
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_726_3281)">
                          <path
                            d="M14.71 29.92c8.124 0 14.71-6.586 14.71-14.71S22.833.5 14.71.5 0 7.086 0 15.21s6.586 14.71 14.71 14.71z"
                            fill="#F7931A"
                          />
                          <path
                            d="M21.174 13.39c.29-1.927-1.18-2.963-3.185-3.655l.65-2.61-1.588-.396-.634 2.542c-.418-.105-.846-.202-1.274-.3l.64-2.558-1.59-.396-.65 2.61c-.346-.08-.686-.157-1.015-.24l.002-.008-2.192-.547-.423 1.697s1.18.27 1.155.287c.643.161.76.587.74.925l-.741 2.974c.044.011.101.028.165.053l-.168-.042-1.039 4.167c-.079.195-.278.488-.729.377.017.023-1.154-.288-1.154-.288l-.79 1.819 2.07.515c.384.097.76.198 1.131.293l-.657 2.64 1.587.395.651-2.61c.434.116.855.225 1.267.328l-.649 2.6 1.589.395.657-2.635c2.71.513 4.748.306 5.605-2.145.692-1.973-.034-3.112-1.46-3.854 1.04-.239 1.82-.922 2.03-2.333zm-3.631 5.091c-.49 1.974-3.813.907-4.89.64l.872-3.499c1.078.27 4.532.802 4.018 2.86zm.492-5.12c-.448 1.796-3.213.883-4.11.66l.791-3.172c.896.223 3.786.64 3.319 2.512z"
                            fill="#fff"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_726_3281">
                            <path
                              fill="#fff"
                              transform="translate(0 .5)"
                              d="M0 0H29.4194V29.4194H0z"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <input
                      type="string"
                      id="default-search"
                      className="block bg-transparent w-full p-4 ps-14 text-sm  placeholder:text-soft text-white font-semibold outline-none  rounded-lg"
                      placeholder="0.00"
                      value={"0.001 BTC"}
                      readOnly
                    />
                    <span className="text-white absolute end-5 bottom-5  font-medium rounded-lg text-base p-2">
                      ≈ $ 0
                    </span>
                  </div>
                  <div className="relative w-full bg-dark p-4 rounded-lg">
                    <div className="absolute inset-y-0 start-5 flex items-center  pointer-events-none">
                      <img src="/images/reso.png" className="w-7 h-7" />
                    </div>
                    <input
                      type="string"
                      id="default-search"
                      className="block bg-transparent w-full p-4 ps-14 text-sm  placeholder:text-soft text-white font-semibold outline-none  rounded-lg"
                      placeholder="0.00"
                      value={"0.001 BTC"}
                      readOnly
                    />
                    <span className="text-white absolute end-5 bottom-5  font-medium rounded-lg text-base p-2">
                      ≈ $ 0
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Button type="button" className="w-full bg-primary">
                {t("button.claim")}
              </Button>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="bg-dark mt-4 w-full  p-4 md:p-6  border-soft/15 rounded-xl border-[0.5px]">
            <form autoComplete="off">
              <div className="relative p-4">
                <div className="absolute inset-y-0 start-5 flex items-center  pointer-events-none">
                  <img
                    className="w-10 h-10 overflow-hidden rounded-full"
                    src={
                      searchParams.get("token1") === "null"
                        ? "/images/reso.png"
                        : searchParams.get("token1")!
                    }
                    alt=""
                  />
                </div>
                <div className="relative">
                  <input
                    type="string"
                    value={amount}
                    className="block bg-transparent w-full p-4 ps-14 text-sm  placeholder:text-soft text-white font-semibold outline-none  rounded-lg"
                    placeholder="0.00"
                    onChange={handleCryptoAmountChange}
                  />
                  {amount.length > 0 && (
                    <div className="absolute text-red-500 left-14 text-xs font-bold">
                      ~ {usdAmount?.toFixed(4)} USD
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  className="text-primary absolute end-5 bottom-5 bg-primary/10 focus:outline-none font-medium rounded-lg text-xs md:text-base p-2"
                >
                  {t("global.max")}
                </button>
              </div>
            </form>
            <div className="mt-4 space-y-2">
              <Button
                type="button"
                onClick={() => setModalConfirm(!modalConfirm)}
                disabled={+amount <= 0 || balance <= 0}
                className="w-full bg-primary"
              >
                {t("button.submit")}
              </Button>
              <Button
                onClick={() => setOpen(!open)}
                type="button"
                disabled={!yourStaked}
                className="w-full bg-transparent"
              >
                {t("button.unstake")}
              </Button>
            </div>
          </div>
          <div className=" mt-4 w-full">
            <div className="text-2xl font-semibold text-white mb-4">
              {t("staking.create.stakeRewards")}
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-base text-white mb-2.5">
                  {t("staking.create.yourStaked")}
                </div>
                <div className="relative bg-dark p-4 rounded-lg">
                  <div className="absolute inset-y-0 start-5 flex items-center  pointer-events-none">
                    <img
                      className="w-10 h-10 overflow-hidden rounded-full"
                      src={
                        searchParams.get("token1") === "null"
                          ? "/images/reso.png"
                          : searchParams.get("token1")!
                      }
                      alt=""
                    />
                  </div>
                  <input
                    type="string"
                    id="default-search"
                    className="block bg-transparent w-full p-4 ps-14 text-sm  placeholder:text-soft text-white font-semibold outline-none  rounded-lg"
                    placeholder="0.00"
                    readOnly
                  />
                  <span className="text-white absolute end-5 bottom-5  font-medium rounded-lg text-base p-2">
                    ≈ $ 0
                  </span>
                </div>
              </div>
              <div>
                <div className="text-base text-white mb-2.5">
                  {t("staking.create.unclaimedRewards")}
                </div>
                <div className="relative bg-dark p-4 rounded-lg">
                  <div className="absolute inset-y-0 start-5 flex items-center  pointer-events-none">
                    <img
                      className="w-10 h-10 overflow-hidden rounded-full"
                      src={
                        searchParams.get("token0") === "null"
                          ? "/images/reso.png"
                          : searchParams.get("token0")!
                      }
                      alt=""
                    />
                  </div>
                  <input
                    type="number"
                    id="default-search"
                    className="block bg-transparent w-full p-4 ps-14 text-sm  placeholder:text-soft text-white font-semibold outline-none  rounded-lg"
                    placeholder="0.00"
                    value={"0.001 BTC"}
                    readOnly
                  />
                  <span className="text-white absolute end-5 bottom-5  font-medium rounded-lg text-base p-2">
                    ≈ $ 0
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Button
                type="button"
                disabled={yourStaked === 0}
                className="w-full bg-primary"
              >
                {t("button.claim")}
              </Button>
            </div>
          </div>
        </>
      );
    }
  }, [
    isMultiple,
    t,
    searchParams,
    amount,
    handleCryptoAmountChange,
    modalConfirm,
    open,
  ]);

  return (
    <>
      <div className="bg-dark2 mt-4  p-4 md:py-6 md:px-8 border-soft/15 rounded-2xl border-[0.5px]">
        <div className="flex justify-between items-center  mb-8 border-b-[0.5px] border-soft/30 pb-3">
          <div>
            <div className="text-xs md:text-base mb-3 md:mb-0 font-medium text-soft">
              {t("staking.create.available")}
            </div>
            <div className="text-white font-semibold text-sm md:text-2xl">
              0.00 {searchParams.get("symbol")}
            </div>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-dark h-f w-full  p-4   border-soft/15 rounded-xl border-[0.5px]">
            <div className="flex space-x-14 justify-between items-center">
              <div className="md:space-y-2 space-y-3">
                <div className="text-xs  md:text-base text-soft font-medium">
                  {t("staking.create.totalStaked")}
                </div>
                <div className="text-white font-semibold text-xs md:text-lg">
                  ≈ $ {searchParams.get("totalStaked")}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-xs md:text-base font-medium text-soft">
                  {t("staking.card.apy")}
                </div>
                <div className="text-white font-semibold text-xs md:text-lg">
                  <Balance value={Number(searchParams.get("apy"))!} />%
                </div>
              </div>
            </div>
          </div>
          <div className="bg-dark w-full p-4   border-soft/15 rounded-xl border-[0.5px]">
            <div className="flex space-x-14 justify-between items-center">
              <div className="space-y-2">
                <div className="text-sm md:text-base text-soft">
                  {t("staking.create.stakeCountDown")}
                </div>
                <div className="bg-secondary/10 text-center text-xs md:text-sm flex justify-center items-center  text-secondary rounded p-2 gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16.5 12" />
                  </svg>
                  <span>{t("staking.card.end")} 25d 12h 10m</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {renderTypeStack}
      </div>
      <ModalUnstake isOpen={open} closeModal={() => setOpen(!open)} />

      <Transition appear show={modalConfirm} as={Fragment}>
        <Dialog
          as="div"
          className="relative"
          onClose={() => setModalConfirm(!modalConfirm)}
        >
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
                    Please Wait
                  </Dialog.Title>
                  <div className="flex items-center justify-center my-7">
                    <svg
                      className="animate-spin size-20 text-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-0"
                        cx={50}
                        cy={50}
                        r={20}
                        stroke="currentColor"
                        strokeWidth={4}
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <div>
                      Please wait a sec, transaction demo has been processed
                    </div>
                    <div>
                      Staked {searchParams.get("symbol")} {amount}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
