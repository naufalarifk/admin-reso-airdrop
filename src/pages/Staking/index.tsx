import {
  ChangeEvent,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import {
  CardStaking,
  ModalAddStaking,
  Tabs,
  useWalletStore,
} from "@/components";
import { COIN, STAKE_MEME_TOKEN } from "@/constants";
import { Coin } from "@/types/components";

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

  const { setModalVisible } = useWalletStore((state) => state);
  const [modalSucces, setModalSuccess] = useState(false);

  // const { isConnected } = useAccount();
  // const { open } = useWeb3Modal();

  const connected = true;

  const [openAddStakeModal, setOpenAddStakeModal] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Coin[]>([]);

  const handleConnect = useCallback(() => {
    setModalVisible(true);
  }, [setModalVisible]);

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
              {STAKE_MEME_TOKEN.map((item, i) => (
                <CardStaking
                  key={i}
                  handleConnected={handleConnect}
                  isConnected={connected}
                  whileConnected={() =>
                    navigate(
                      `create?type=one&ticker=${
                        item.token0.name ?? "RESO"
                      }&symbol=${item.token1.symbol}&totalStaked=${
                        item.totalStaked
                      }&apy=${item.apy}&token0=${item.token0.imgUrl}&token1=${
                        item.token1.imgUrl
                      }&price=${item.quoteTokenPriceBusd ?? "5000"}&reward=${
                        item.reward
                      }&stakingbalance=${item.feeAmount ?? 5}`
                    )
                  }
                  item={item}
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
    [t, handleConnect, connected, navigate]
  );

  useEffect(() => {
    setTimeout(() => {
      setModalSuccess(false);
      setNewStakingData({
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
      setSelectedOptions([]);
    }, 8000);
  }, [modalSucces]);

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
          closeModal={() => {
            setOpenAddStakeModal(!openAddStakeModal);
          }}
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
          handleSubmit={() => {
            setOpenAddStakeModal(false);
            setModalSuccess(true);
          }}
        />
      </div>

      <Transition appear show={modalSucces} as={Fragment}>
        <Dialog onClose={() => ""} as="div" className="relative">
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
                      Please wait a sec, new staking demo has been processed
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
