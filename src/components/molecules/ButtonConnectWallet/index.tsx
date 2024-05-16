import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useEnsAvatar, useEnsName } from "wagmi";
import { ButtonGlow } from "@/components";
import { formatAddress } from "@/utils";
import { useTranslation } from "react-i18next";

export const ButtonConnectWallet = ({
  className,
  classNameButton,
  shortname = false,
}: {
  className?: string;
  classNameButton?: string;
  shortname?: boolean;
}) => {
  const { open } = useWeb3Modal();
  const { t } = useTranslation();
  const { address, isConnected } = useAccount();
  const formattedAddress = formatAddress(address);
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  return (
    <div className={className}>
      {!isConnected ? (
        <ButtonGlow
          classNameButton={classNameButton}
          classNameContent="text-sm   text-center font-semibold"
          onClick={() => open()}
        >
          {shortname ? "Connect" : t("button.connectWallet")}
        </ButtonGlow>
      ) : (
        <ButtonGlow
          className="flex gap-3"
          classNameButton={classNameButton}
          onClick={() => open({ view: "Account" })}
        >
          {ensAvatar ? (
            <img alt="ENS Avatar" className="avatar w-5 h-5" src={ensAvatar} />
          ) : (
            <img className="avatar" src="/images/placeholder.svg" />
          )}
          {address && (
            <div className="text-sm font-medium">
              {ensName ? `${ensName} (${formattedAddress})` : formattedAddress}
            </div>
          )}
          {/* <IcDropdown /> */}
        </ButtonGlow>
      )}
    </div>
  );
};
