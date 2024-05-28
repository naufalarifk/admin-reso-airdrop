export const matic = {
   name: 'Polygon Mainnet',
   rpcUrls: {
      default: {
         http: ['https://polygon-rpc.com/'],
      },
   },
   nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
   },
   id: 137,
   blockExplorers: {
      default: {
         name: 'polygonscan',
         url: 'https://polygonscan.com',
      },
   },
   custom: {
      icon: 'https://miro.medium.com/v2/resize:fit:2400/1*jGa6EsELZlUPWjgPegEmqA.png',
   },
} as const;
