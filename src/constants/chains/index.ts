import { bsc } from "./bsc";
import { eth } from "./eth";
import { matic } from "./polygon";

const chainMap = { eth };

const chains = Object.values(chainMap);

export const getChain = (chainId: string) => {
  return chains.find((chain) => chain.name === chainId);
};

export enum ChainId {
  ETH = eth.id,
  BSC = bsc.id,
  MATIC = matic.id,
}

export const chainName: Record<ChainId, string> = {
  [ChainId.ETH]: "Ethereum",
  [ChainId.MATIC]: "Polygon",
  [ChainId.BSC]: "BSC",
};
