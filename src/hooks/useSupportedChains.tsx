/* eslint-disable react-refresh/only-export-components */
import { createContext, FC, PropsWithChildren, useContext } from "react";

import { chainName } from "@/constants/chains";

const SupportedChainsContext = createContext<number[]>([]);

export const SupportedChainsProvider: FC<
  { supportedChains: number[] } & PropsWithChildren
> = ({ children, supportedChains }) => {
  return (
    <SupportedChainsContext.Provider value={supportedChains}>
      {children}
    </SupportedChainsContext.Provider>
  );
};

export const useSupportedChains = () => {
  return useContext(SupportedChainsContext);
};

export const useSupportedChainList = (): string => {
  const supportedChains = useSupportedChains();
  const [last, ...supportedChainNames] = supportedChains.map((chainId) => {
    return chainName[chainId];
  });
  return `${supportedChainNames.join(", ")} and ${last}`;
};
