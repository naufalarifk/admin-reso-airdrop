export interface Chain {
  name: string;
  chain: string;
  icon?: string;
  rpc: string[];
  features: Feature[];
  faucets: [];
  nativeCurrency: NativeCurrency;
  infoURL: string;
  shortName: string;
  chainId: number;
  networkId: number;
  slip44: number;
  ens?: Ens;
  explorers: Explorer[];
}

export interface Ens {
  registry: string;
}

export interface Explorer {
  name: string;
  url: string;
  standard: string;
}

export interface Feature {
  name: string;
}

export interface NativeCurrency {
  name: string;
  symbol: string;
  decimals: number;
}
