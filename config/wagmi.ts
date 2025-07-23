import { createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected, metaMask } from "wagmi/connectors";
import { createClient } from "viem";

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
  connectors: [injected(), metaMask()],
  ssr: true,
});
