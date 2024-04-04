import { Outlet } from "react-router-dom";

import { Balance, Header, Text } from "@/components";
import { IcPattern } from "@/assets/icons/IcPattern";

export const StakeLayout = () => {
  return (
    <div className="relative">
      <Header />

      <IcPattern className="absolute -top-[200px] w-full h-full" />

      <div className="layout h-full min-h-screen max-w-5xl">
        <div className="relative py-28">
          <div className="flex items-center justify-center">
            <div className="max-w-">
              <div className="flex items-center justify-center flex-col p-0 lg:p-8">
                <div className="text-white font-semibold text-2xl text-center lg:text-5xl mb-4">
                  Reso Staking: Maximize{" "}
                  <span className="text-primary">Your Earnings</span>{" "}
                </div>
                <Text className="text-sm text-center  md:text-base text-soft mb-4">
                  Maximize Your Earnings with Reso Staking and discover expert
                  tips and tricks to boost your profits in the Reso staking
                  ecosystem
                </Text>
              </div>
              <div className="flex gap-3 md:gap-0 mb-4 border-soft/15 rounded-2xl border-[0.5px] justify-between items-center p-4 md:py-4 md:px-6 bg-dark2">
                <div className="space-y-1 text-center">
                  <div className="text-soft text-xxs  md:text-base font-normal">
                    Total Value Locked (TVL)
                  </div>
                  <div className="text-white font-semibold text-sm md:text-xl">
                    ~$ <Balance value={3478542} />
                  </div>
                </div>
                <div className="space-y-1 text-center">
                  <div className="text-soft text-xxs md:text-base font-normal">
                    Estimated APY
                  </div>
                  <div className="text-white font-semibold text-sm md:text-xl">
                    ~236%
                  </div>
                </div>
                <div className="space-y-1 text-center">
                  <div className="text-soft text-xxs  md:text-base font-normal">
                    Estimated Total Rewards
                  </div>
                  <div className="text-white font-semibold text-sm md:text-xl">
                    ~$79.323
                  </div>
                </div>
              </div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
