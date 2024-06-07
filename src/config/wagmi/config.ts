import { bsc } from '@/constants/chains/bsc';
import { eth } from '@/constants/chains/eth';
import { matic } from '@/constants/chains/polygon';
// import { cookieStorage, createStorage } from "wagmi";

export const chains = [eth, matic, bsc] as const;
