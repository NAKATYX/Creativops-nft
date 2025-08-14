"use client"

import { createConfig, http } from "wagmi"
import { Chain } from "viem"
import { farcasterMiniApp } from "@farcaster/miniapp-wagmi-connector"

// ✅ Define Monad Testnet chain
export const monadTestnet: Chain = {
  id: 10143,
  name: "Monad Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Monad",
    symbol: "MON",
  },
  rpcUrls: {
    public: {
      http: [process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL!],
    },
    default: {
      http: [process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL!],
    },
  },
  blockExplorers: {
    default: {
      name: "Monad Explorer",
      url: "https://testnet-explorer.monad.xyz",
    },
  },
  testnet: true,
}

export const wagmiConfig = createConfig({
  chains: [monadTestnet],
  transports: {
    [monadTestnet.id]: http(process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL!),
  },
  connectors: [
    farcasterMiniApp(), // Farcaster Mini-App connector
  ],
  ssr: true,
})
