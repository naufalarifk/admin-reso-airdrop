export const bsc = {
   id: 56,
   custom: {
      icon: 'https://avatars.githubusercontent.com/u/45615063?s=280&v=4',
   },
   name: 'BSC Mainnet',
   nativeCurrency: {
      name: 'Binance Chain Native Token',
      symbol: 'BNB',
      decimals: 18,
   },
   rpcUrls: {
      default: {
         http: [
            'https://bsc-dataseed1.binance.org',
            'https://bsc-dataseed2.binance.org',
            'https://bsc-dataseed3.binance.org',
            'https://bsc-dataseed4.binance.org',
            'https://bsc-dataseed1.defibit.io',
            'https://bsc-dataseed2.defibit.io',
            'https://bsc-dataseed3.defibit.io',
            'https://bsc-dataseed4.defibit.io',
            'https://bsc-dataseed1.ninicoin.io',
            'https://bsc-dataseed2.ninicoin.io',
            'https://bsc-dataseed3.ninicoin.io',
            'https://bsc-dataseed4.ninicoin.io',
            'wss://bsc-ws-node.nariox.org',
         ],
      },
   },
   blockExplorers: {
      default: { name: 'bscscan', url: 'https://bscscan.com' },
   },
} as const;
