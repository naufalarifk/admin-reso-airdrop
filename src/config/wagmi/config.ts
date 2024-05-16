import { bsc } from "@/constants/chains/bsc";
import { eth } from "@/constants/chains/eth";
import { matic } from "@/constants/chains/polygon";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
// import { cookieStorage, createStorage } from "wagmi";

export const chains = [eth, matic, bsc] as const;

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com", 
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

export const config = defaultWagmiConfig({
  chains,
  projectId: "b19059d1209d33e9994a738bd1562013",
  metadata,
  // storage: createStorage({
  //   storage: cookieStorage,
  // }),
});
