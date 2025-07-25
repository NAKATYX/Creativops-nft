import creativops from "@/abi/creativops.json";
import { monadTestnet, sepolia } from "viem/chains";

export const contractConfig = {
  address: "0x43e9ED9e357908D7e52CB8C34E0c4c4A77e3b97D",
  abi: creativops.abi,
  chainId: monadTestnet.id,
} as const;
