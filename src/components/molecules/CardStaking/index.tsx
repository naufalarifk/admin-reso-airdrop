import { Balance, Button } from "@/components";
import { useTranslation } from "react-i18next";

interface Item {
  pid: number;
  token0: Token0Class;
  token1: Token0Class;
  lpAddress: string;
  feeAmount: number;
  lpSymbol: string;
  token: QuoteTokenClass;
  quoteToken: QuoteTokenClass;
  lmPool: string;
  lmPoolLiquidity: string;
  _rewardGrowthGlobalX128: string;
  tokenPriceVsQuote: string;
  poolWeight: string;
  multiplier: string;
  tokenPriceBusd: string;
  quoteTokenPriceBusd: string;
  totalStaked: number;
  apy: string;
}

interface QuoteTokenClass {
  address: string;
  chainId: number;
  decimals: number;
  symbol: string;
  name: string;
  projectLink?: string;
}

interface Token0Class {
  chainId: number;
  decimals: number;
  symbol: string;
  name: string;
  isNative: boolean;
  imgUrl: string | null;
  isToken: boolean;
  address: string;
  projectLink?: string;
}

interface CardStakingProps {
  isConnected: boolean;
  item: Item;
  handleConnected?: () => void;
  whileConnected: () => void;
}

export const CardStaking = ({
  isConnected,
  handleConnected,
  whileConnected,
  item,
}: CardStakingProps) => {
  const { t } = useTranslation();
  return (
    <>
      <div
        key={item.pid}
        className="relative z-20 bg-dark2 p-4 md:p-6 border-[0.5px] border-[#FFFFFF1A] w-full min-w-sm rounded-2xl"
      >
        <div className="space-y-6">
          <div className="flex  items-center gap-7">
            <div className="relative flex items-center justify-center">
              <div className="relative z-10 ">
                <img
                  src={
                    item.token0?.imgUrl === null
                      ? "/images/reso.png"
                      : item.token0.imgUrl
                  }
                  className="w-9 h-9 rounded-full bg-black overflow-hidden"
                />
              </div>
              <div className="absolute w-9 h-9 top-3 left-3">
                <img
                  src={
                    item.token1?.imgUrl === null
                      ? "/images/reso.png"
                      : item.token1.imgUrl
                  }
                  alt="icon-reso"
                  className="rounded-full overflow-hidden"
                />
              </div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-white">
                {t("staking.card.earn")} {item.token0?.symbol}
              </div>
              <div className="text-base">
                {t("staking.card.stake")} {item.token1?.symbol}
              </div>
            </div>
          </div>
          <div className="bg-dark space-y-4 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="text-soft">{t("staking.card.staked")}</div>
              <div className="flex gap-2 items-center">
                {/* {item.isMultiple ? (
                <div className="flex flex-row gap-2 items-center">
                  <div className="flex flex-row gap-2 items-center">
                    <div>{item.coinOne}</div>
                    <img className="w-7 h-7" src="/images/btc.png" />
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <div>{item.coinTwo}</div>
                    <img className="w-7 h-7" src="/images/reso.png" />
                  </div>
                </div>
              ) : ( */}
                <div className="flex flex-row items-center gap-3">
                  <span>{item.token1?.symbol}</span>
                  <img
                    className="w-7 h-7 rounded-full overflow-hidden"
                    src={
                      item.token1?.imgUrl === null
                        ? "/images/reso.png"
                        : item.token1.imgUrl
                    }
                  />
                </div>
                {/* )} */}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-soft">{t("staking.card.rewardCard")}</div>
              <div className="flex gap-2 items-center">
                {item.token0?.symbol} + Fees
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-soft">{t("staking.card.apy")}</div>
              <div className="flex">
                <Balance
                  className="flex gap-2 items-center"
                  value={+item.apy!}
                />
                %
              </div>
            </div>
            <div className="flex justify-between border-t border-white/15 pt-5 items-center">
              <div className="text-soft">{t("staking.card.totalStaked")}</div>
              <div className="flex gap-2 items-center">
                ~${item?.totalStaked}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-secondary/10 text-center text-sm flex justify-center items-center mt-3 text-secondary rounded px-2 py-4 gap-2">
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
        <Button
          type="button"
          onClick={isConnected ? whileConnected : handleConnected}
          className="w-full mt-6 bg-primary font-semibold"
        >
          {isConnected ? t("staking.card.stake") : t("button.connectWallet")}
        </Button>
      </div>
    </>
  );
};
