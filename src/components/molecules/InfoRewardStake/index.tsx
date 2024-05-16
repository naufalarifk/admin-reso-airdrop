import { Balance } from "@/components/atoms";
import { useTranslation } from "react-i18next";

interface InfoRewardStakeProps {
  totalValueLocked: number | undefined;
  estimatedAPY: number | undefined;
  estimatedTotalReward: number | undefined;
}

export const InfoRewardStake = ({
  estimatedAPY,
  estimatedTotalReward,
  totalValueLocked,
}: InfoRewardStakeProps) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="bg-dark2 rounded-lg p-4 my-6">
        <div className="font-semibold text-sm md:text-base">
          {t("staking.add.card.info.reward")}
        </div>
        <div className="space-y-2 mt-3 text-sm md:text-base">
          <div className="flex justify-between text-sm md:text-base items-center">
            <div className="text-soft">{t("staking.layout.info.one")}</div>
            <div className="text-white">
              ~$
              <Balance value={totalValueLocked!} />{" "}
            </div>
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
            <div className="text-white">
              ~$ <Balance value={estimatedTotalReward!} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
