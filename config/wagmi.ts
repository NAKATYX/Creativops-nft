import { createConfig, http } from "wagmi";
import { injected, metaMask } from "wagmi/connectors";
import { Chain, createClient } from "viem";
import { ALCHEMY_RPC_URL } from "@/keys";

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
      http: [ALCHEMY_RPC_URL],
    },
    default: {
      http: [ALCHEMY_RPC_URL],
    },
  },
  blockExplorers: {
    default: {
      name: "Monad Explorer",
      url: "https://testnet-explorer.monad.xyz",
    },
  },
  testnet: true,
};

export const wagmiConfig = createConfig({
  chains: [monadTestnet],
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
  connectors: [injected(), metaMask()],
  ssr: true,
});
