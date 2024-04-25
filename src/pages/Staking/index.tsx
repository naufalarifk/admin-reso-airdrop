import {
  CardStaking,
  ModalAddStaking,
  Tabs,
  useWalletStore,
} from "@/components";
import { COIN, STAKE_COIN } from "@/constants";
import { Coin } from "@/types/components";
import { ChangeEvent, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface NewStakingDataPayload {
  coinOne: Coin | null;
  coinTwo: Coin | null;
  amountCoinOne: string;
  amountCoinTwo: string;
  minUserJoin: string;
  maxUserJoin: string;
  rewardPerBlock: string;
  startStake: Date | string;
  endStake: Date | string;
}

export const Staking = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { connected, setModalVisible } = useWalletStore((state) => state);

  // const { isConnected } = useAccount();
  // const { open } = useWeb3Modal();

  const [openAddStakeModal, setOpenAddStakeModal] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Coin[]>([]);

  const handleConnect = () => {
    setModalVisible(true);
  };

  const [newStakingData, setNewStakingData] = useState<NewStakingDataPayload>({
    coinOne: null,
    coinTwo: null,
    amountCoinOne: "",
    amountCoinTwo: "",
    endStake: "",
    maxUserJoin: "",
    minUserJoin: "",
    rewardPerBlock: "",
    startStake: "",
  });

  const handleSelectedOptionsChange = (selected: Coin[]) => {
    setSelectedOptions(selected);
    setNewStakingData({
      ...newStakingData,
      coinOne: selected[0],
      coinTwo: selected[1],
    });
  };

  const handlePriceCoinOne = (value: number) => {
    setNewStakingData({ ...newStakingData, amountCoinOne: String(value) });
  };

  const handlePricCoinTwo = (value: number) => {
    setNewStakingData({ ...newStakingData, amountCoinTwo: String(value) });
  };

  const handleMinUserJoin = (event: ChangeEvent<HTMLInputElement>) => {
    setNewStakingData({
      ...newStakingData,
      minUserJoin: String(event.target.value),
    });
  };

  const handleMaxUserJoin = (event: ChangeEvent<HTMLInputElement>) => {
    setNewStakingData({
      ...newStakingData,
      maxUserJoin: String(event.target.value),
    });
  };

  const handleRewardPerBlock = (event: ChangeEvent<HTMLInputElement>) => {
    setNewStakingData({
      ...newStakingData,
      rewardPerBlock: String(event.target.value),
    });
  };

  const tabs = useMemo(
    () => [
      {
        label: t("global.activate"),
        content: (
          <div className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {STAKE_COIN.map((item, i) => (
                <CardStaking
                  key={i}
                  handleConnected={handleConnect}
                  isConnected={connected}
                  whileConnected={() =>
                    navigate(
                      `create?type=${
                        item.staking_card.staking_cryptos &&
                        item.staking_card.staking_cryptos.length > 1
                          ? "multiple"
                          : "one"
                      }&ticker=${
                        item.staking_card.ticker_symbol ?? "BTC"
                      }&price=${
                        item.staking_card?.current_price ?? "5000"
                      }&reward=${
                        item.staking_card?.estimated_reward
                      }&stakingbalance=${
                        item.staking_card?.staking_balance ?? 5
                      }`
                    )
                  }
                  item={{
                    coinOne: item.staking_card?.ticker_symbol || "BTC",
                    coinTwo: "Rectoverso",
                    apy: String(item.staking_card.annual_reward_percentage),
                    isMultiple:
                      item.staking_card.staking_cryptos &&
                      item.staking_card.staking_cryptos.length > 1,
                    totalStake: item.staking_card.total_staking_balance!,
                  }}
                />
              ))}
            </div>
          </div>
        ),
      },
      {
        label: t("global.ended"),
        content: (
          <div className="flex items-center justify-center mt-32 text-2xl font-bold">
            {t("global.noData")}
          </div>
        ),
      },
      {
        label: t("global.myStaking"),
        content: (
          <div className="flex items-center justify-center mt-32 text-2xl font-bold">
            {t("global.noData")}
          </div>
        ),
      },
    ],
    [navigate, t, connected]
  );

  return (
    <>
      <div>
        <Tabs
          classNameWrapper="justify-between flex gap-4 md:justify-start"
          items={tabs}
          isBetween
          rightContent={
            <>
              <button
                onClick={() => setOpenAddStakeModal(!openAddStakeModal)}
                className="flex bg-dark py-2 px-3.5 text-center justify-center text-soft text-sm font-medium items-center gap-2 rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                {t("global.addStaking")}
              </button>
            </>
          }
        />

        <ModalAddStaking
          isOpen={openAddStakeModal}
          closeModal={() => setOpenAddStakeModal(!openAddStakeModal)}
          coins={COIN}
          selectedOptions={selectedOptions}
          handleSelectedOptions={handleSelectedOptionsChange}
          startDate={newStakingData.startStake}
          setStartDate={(e) =>
            setNewStakingData({ ...newStakingData, startStake: e! })
          }
          endDate={newStakingData.endStake}
          setEndDate={(e) =>
            setNewStakingData({ ...newStakingData, endStake: e! })
          }
          totalReward="400000"
          estimatedAPY="232"
          totalValueLocked="2128900"
          handleChangeCoinOne={handlePriceCoinOne}
          valueCoinOne={Number(newStakingData.amountCoinOne)}
          handleChangeCoinTwo={handlePricCoinTwo}
          valueCoinTwo={Number(newStakingData.amountCoinTwo)}
          valueMinUserJoin={newStakingData.minUserJoin}
          handleMinUserJoin={handleMinUserJoin}
          valueMaxUserJoin={newStakingData.maxUserJoin}
          handleMaxUserJoin={handleMaxUserJoin}
          valueRewardPerBlock={newStakingData.rewardPerBlock}
          handleRewardPerBlock={handleRewardPerBlock}
        />
      </div>
    </>
  );
};
