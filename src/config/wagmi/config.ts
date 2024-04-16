import { bsc } from "@/constants/chains/bsc";
import { eth } from "@/constants/chains/eth";
import { matic } from "@/constants/chains/polygon";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

export const chains = [eth, matic, bsc] as const;

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

export const config = defaultWagmiConfig({
  chains,
  projectId: import.meta.env.VITE_WAGMI_PROJECT_ID,
  metadata,
});
