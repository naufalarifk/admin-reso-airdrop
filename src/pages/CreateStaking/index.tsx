import { useSearchParams, useLocation } from "react-router-dom";

import { Button, ModalUnstake, Text } from "@/components";
import { useEffect, useState } from "react";

export const CreateStakingPage = () => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const isMultiple = searchParams.get("type");

  if (isMultiple === "multiple") {
    return (
      <div className="flex items-center justify-center">
        <div className="max-w-">
          <div className="pt-10 text-center">
            <Text variant={"title"} className="text-white" weight={"semiBold"}>
              Reso Staking: Maximize{" "}
              <span className="text-primary">Your Earnings</span>{" "}
            </Text>
            <Text className="text-base text-soft">
              Maximize Your Earnings with Reso Staking and discover expert tips
              and tricks to boost your profits in the Reso staking ecosystem
            </Text>
          </div>

          <div className="bg-card-background mt-8 from-[#5D636F1A] py-6 px-8 to-[#191E2859] border-soft/15 rounded border-[0.5px]">
            <div className="flex justify-between items-center  mb-8 border-b-[0.5px] border-soft/30 pb-3">
              <div>
                <div className="text-base font-medium text-soft">
                  Available to Stake
                </div>
                <div className="text-white font-semibold text-2xl">
                  0.00 BTC
                </div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-card-background h-f w-full from-[#5D636F1A] p-4 to-[#191E2859] border-soft/15 rounded-xl border-[0.5px]">
                <div className="flex space-x-14 justify-between items-center">
                  <div className="space-y-2">
                    <div className="text-base text-soft">Total Staked</div>
                    <div className="text-white font-semibold text-lg">
                      ≈ $ 980,000,000
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-base text-soft">APY</div>
                    <div className="text-white font-semibold text-lg">30%</div>
                  </div>
                </div>
              </div>
              <div className="bg-card-background w-full from-[#5D636F1A] p-4 to-[#191E2859] border-soft/15 rounded-xl border-[0.5px]">
                <div className="flex space-x-14 justify-between items-center">
                  <div className="space-y-2">
                    <div className="text-base text-soft">Staking Countdown</div>
                    <div className="bg-primary/5 text-center text-sm flex justify-center items-center  text-primary rounded p-2 gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="w-4 h-4"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16.5 12" />
                      </svg>
                      <span>End 25d 12h 10m</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card-background mt-4 w-full from-[#5D636F1A] p-6 to-[#191E2859] border-soft/15 rounded-xl border-[0.5px]">
              <div className="bg-card-background w-full to-[#5D636F1A] from-55% p-6 from-[#191E2859] border-soft/15 rounded-xl border-[0.5px]">
                <form autoComplete="off">
                  <div className="flex flex-col md:flex-row md:justify-between gap-4 items-center">
                    <div className="relative w-full bg-[#5D636F1A] p-4 rounded-lg">
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
                        className="block bg-transparent w-full p-4 ps-14 text-sm  placeholder:text-soft text-white font-semibold outline-none  rounded-lg"
                        placeholder="0.00"
                      />
                      <button
                        type="button"
                        className="text-primary absolute end-5 bottom-5 bg-primary/10 focus:outline-none font-medium rounded-lg text-base p-2"
                      >
                        MAX
                      </button>
                    </div>
                    <span className="text-2xl font-semibold">-</span>
                    <div className="relative w-full bg-[#5D636F1A] p-4 rounded-lg">
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
                        className="block bg-transparent w-full p-4 ps-14 text-sm  placeholder:text-soft text-white font-semibold outline-none  rounded-lg"
                        placeholder="0.00"
                      />
                      <button
                        type="button"
                        className="text-primary absolute end-5 bottom-5 bg-primary/10 focus:outline-none font-medium rounded-lg text-base p-2"
                      >
                        MAX
                      </button>
                    </div>
                  </div>
                </form>
                <div className="mt-4 space-y-2">
                  <Button type="button" className="w-full bg-primary">
                    Submit
                  </Button>
                  <Button type="button" className="w-full bg-transparent">
                    Unstake
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-card-background mt-4 w-full from-[#5D636F1A] p-6 to-[#191E2859] border-soft/15 rounded-xl border-[0.5px]">
              <div className="text-2xl font-semibold text-white mb-4">
                Staked Rewards
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-base text-white mb-2.5">Your Staked</div>
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="relative w-full bg-[#5D636F1A] p-4 rounded-lg">
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
                    <div className="relative w-full bg-[#5D636F1A] p-4 rounded-lg">
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
                  </div>
                </div>
                <div>
                  <div className="text-base text-white mb-2.5">
                    Unclaimed Rewards
                  </div>
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="relative w-full bg-[#5D636F1A] p-4 rounded-lg">
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
                    <div className="relative w-full bg-[#5D636F1A] p-4 rounded-lg">
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
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Button type="button" className="w-full bg-primary">
                  Claim
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-">
        <div className="pt-10 text-center">
          <Text variant={"title"} className="text-white" weight={"semiBold"}>
            Reso Staking: Maximize{" "}
            <span className="text-primary">Your Earnings</span>{" "}
          </Text>
          <Text className="text-base text-soft">
            Maximize Your Earnings with Reso Staking and discover expert tips
            and tricks to boost your profits in the Reso staking ecosystem
          </Text>
        </div>

        <div className="bg-card-background mt-8 from-[#5D636F1A] py-6 px-8 to-[#191E2859] border-soft/15 rounded border-[0.5px]">
          <div className="flex justify-between items-center  mb-8 border-b-[0.5px] border-soft/30 pb-3">
            <div>
              <div className="text-base font-medium text-soft">
                Available to Stake
              </div>
              <div className="text-white font-semibold text-2xl">0.00 BTC</div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card-background h-f w-full from-[#5D636F1A] p-4 to-[#191E2859] border-soft/15 rounded-xl border-[0.5px]">
              <div className="flex space-x-14 justify-between items-center">
                <div className="space-y-2">
                  <div className="text-base text-soft">Total Staked</div>
                  <div className="text-white font-semibold text-lg">
                    ≈ $ 980,000,000
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-base text-soft">APY</div>
                  <div className="text-white font-semibold text-lg">30%</div>
                </div>
              </div>
            </div>
            <div className="bg-card-background w-full from-[#5D636F1A] p-4 to-[#191E2859] border-soft/15 rounded-xl border-[0.5px]">
              <div className="flex space-x-14 justify-between items-center">
                <div className="space-y-2">
                  <div className="text-base text-soft">Staking Countdown</div>
                  <div className="bg-primary/5 text-center text-sm flex justify-center items-center  text-primary rounded p-2 gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="w-4 h-4"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16.5 12" />
                    </svg>
                    <span>End 25d 12h 10m</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card-background mt-4 w-full from-[#5D636F1A] p-6 to-[#191E2859] border-soft/15 rounded-xl border-[0.5px]">
            <div className="bg-card-background w-full to-[#5D636F1A] from-55% p-6 from-[#191E2859] border-soft/15 rounded-xl border-[0.5px]">
              <form autoComplete="off">
                <div className="relative bg-[#5D636F1A] p-4 rounded-lg">
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
                    className="block bg-transparent w-full p-4 ps-14 text-sm  placeholder:text-soft text-white font-semibold outline-none  rounded-lg"
                    placeholder="0.00"
                  />
                  <button
                    type="button"
                    className="text-primary absolute end-5 bottom-5 bg-primary/10 focus:outline-none font-medium rounded-lg text-base p-2"
                  >
                    MAX
                  </button>
                </div>
              </form>
              <div className="mt-4 space-y-2">
                <Button type="button" className="w-full bg-primary">
                  Submit
                </Button>
                <Button
                  onClick={() => setOpen(!open)}
                  type="button"
                  className="w-full bg-transparent"
                >
                  Unstake
                </Button>
              </div>
            </div>
          </div>
          <div className="bg-card-background mt-4 w-full from-[#5D636F1A] p-6 to-[#191E2859] border-soft/15 rounded-xl border-[0.5px]">
            <div className="text-2xl font-semibold text-white mb-4">
              Staked Rewards
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-base text-white mb-2.5">Your Staked</div>
                <div className="relative bg-[#5D636F1A] p-4 rounded-lg">
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
              </div>
              <div>
                <div className="text-base text-white mb-2.5">
                  Unclaimed Rewards
                </div>
                <div className="relative bg-[#5D636F1A] p-4 rounded-lg">
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
              <Button type="button" className="w-full bg-primary">
                Claim
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ModalUnstake isOpen={open} closeModal={() => setOpen(!open)} />
    </div>
  );
};
