import { type Chain } from 'viem';

export const sol = {
   name: 'Solana Mainnet',
   rpcUrls: {
      default: {
         http: ['https://api.mainnet-beta.solana.com'],
      },
   },
   nativeCurrency: {
      name: 'Solana',
      symbol: 'SOL',
      decimals: 18,
   },
   id: 5426,
   blockExplorers: {
      default: {
         name: 'Solscan',
         url: 'https://solscan.io/',
      },
   },
   custom: {
      icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png',
   },
} as const satisfies Chain;
