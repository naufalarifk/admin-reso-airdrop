export const RECENT_TRADES = [
   {
      id: 1,
      address: 'FYdM7L5uJVzJutUYUziMUcgnu4YJzJjHqgA6ZEwCw5kd',
      protocol: 'BRC20',
      type: 'buy',
      createdAt: '2024-05-01T12:30:00Z',
      transaction: {
         receive: {
            name: 'bome',
            amount: 0.17311,
         },
         pay: {
            name: 'usdc',
            amount: 1.2832,
         },
      },
      txId: '62uX4aiPJhseUpj16FhWk5LUYQGH2b8z7gFgYD1tY8EPB1vy8e1KnJQ3TcTknTmh8YygweputyPMf3127bJyoqLn',
   },
   {
      id: 2,
      address: 'FYdM7L5uJVzJutUYUziMUcgnu4YJzJjHqgA6ZEwCw5kd',
      protocol: 'BRC20',
      type: 'sell',
      createdAt: '2024-05-02T14:15:00Z',
      transaction: {
         receive: {
            name: 'usdc',
            amount: 0.00311,
         },
         pay: {
            name: 'bonk',
            amount: 3.2832,
         },
      },
      txId: '95xp1g3ueWcwRETuzwFMJNtq5p9Bu8DgtuNqg1Zvndhc',
   },
   {
      id: 3,
      address: 'FXdM7L5uJVzJutUYUziMUcgnu4YJzJjHqgA6ZEwCw6ke',
      protocol: 'BRC20',
      type: 'buy',
      createdAt: '2024-05-03T09:45:00Z',
      transaction: {
         receive: {
            name: 'mew',
            amount: 0.27542,
         },
         pay: {
            name: 'usdt',
            amount: 2.3145,
         },
      },
      txId: '3BpFv8GyDuhmVwEiF6w7QoAHN5VUBBbqtZLfESdyfN4L',
   },
   {
      id: 4,
      address: 'FZdM7L5uJVzJutUYUziMUcgnu4YJzJjHqgA6ZEwCw7ml',
      protocol: 'BRC20',
      type: 'sell',
      createdAt: '2024-05-04T11:20:00Z',
      transaction: {
         receive: {
            name: 'usdt',
            amount: 0.00154,
         },
         pay: {
            name: 'bonk',
            amount: 1.9832,
         },
      },
      txId: '6KpDk7GyCfvnKTEuzwFMJNtq5p8Cu8DgtuNqg1Zvnd9r',
   },
   {
      id: 5,
      address: 'FYeM7L5uJVzJutUYUziMUcgnu4YJzJjHqgA6ZEwCw8lo',
      protocol: 'BRC20',
      type: 'buy',
      createdAt: '2024-05-05T16:00:00Z',
      transaction: {
         receive: {
            name: 'bome',
            amount: 0.39876,
         },
         pay: {
            name: 'usdt',
            amount: 3.5278,
         },
      },
      txId: '9LpEy2TyRfwoHZEuzwFMJNtq5p7Bu8DgtuNqg1Zvnd1t',
   },
];

export const HOLDERS = [
   {
      id: 1,
      rank: 1,
      address: 'As9NxA9bCfhrVLAFyGeWG5X5iLYPGhU3R7nLfX3tN6am',
      quantity: 0.000005782,
   },
   {
      id: 2,
      rank: 2,
      address: '97YSwK9j9fLXFETgkLZrt9sP6LAYMv7Nai3qkX5UwHeN',
      quantity: 0.00082,
   },
   {
      id: 3,
      rank: 3,
      address: 'BNKnJmHkorgm9iz1aNczvwuAmwtpZiSDiuLT8XC2tcNr',
      quantity: 0.000035,
   },
];

export const TOKEN_RATE = [
   {
      name: 'SOL/USDT',
      rate: '+0.25%',
   },
   {
      name: 'MEME/USDT',
      rate: '+0.25%',
   },
   {
      name: 'WIFF/USDT',
      rate: '+0.25%',
   },
   {
      name: 'MEW/ETH',
      rate: '+0.25%',
   },
   {
      name: 'ETH/BTC',
      rate: '+0.25%',
   },
   {
      name: 'DOGE/USDT',
      rate: '+0.25%',
   },
   {
      name: 'XRP/DOGE',
      rate: '+0.25%',
   },
   {
      name: 'ARB/ETH',
      rate: '+0.25%',
   },
   {
      name: 'ARB/ETH',
      rate: '+0.25%',
   },
   {
      name: 'ARB/ETH',
      rate: '+0.25%',
   },
   {
      name: 'ARB/ETH',
      rate: '+0.25%',
   },
   {
      name: 'ARB/ETH',
      rate: '+0.25%',
   },
   {
      name: 'ARB/ETH',
      rate: '+0.25%',
   },
   {
      name: 'ARB/ETH',
      rate: '+0.25%',
   },
   {
      name: 'ARB/ETH',
      rate: '+0.25%',
   },
   {
      name: 'ARB/ETH',
      rate: '+0.25%',
   },
   {
      name: 'ARB/ETH',
      rate: '+0.25%',
   },
   {
      name: 'ARB/ETH',
      rate: '+0.25%',
   },
];

export const NETWORK_DATA = [
   {
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
   },
   {
      id: 1,
      custom: {
         icon: 'https://www.logo.wine/a/logo/Ethereum/Ethereum-Icon-Purple-Dark-Dark-Background-Logo.wine.svg',
      },
      name: 'Ethereum Mainnet',
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      rpcUrls: {
         default: { http: ['https://cloudflare-eth.com'] },
      },
      blockExplorers: {
         default: { name: 'Etherscan', url: 'https://etherscan.io' },
      },
      contracts: {
         ensRegistry: {
            address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
         },
         ensUniversalResolver: {
            address: '0xE4Acdd618deED4e6d2f03b9bf62dc6118FC9A4da',
            blockCreated: 16773775,
         },
         multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 14353601,
         },
      },
   },
   {
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
   },
];
