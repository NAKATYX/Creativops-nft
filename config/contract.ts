import creativops from "@/abi/creativops.json";
import { monadTestnet } from "viem/chains";

export const contractConfig = {
  address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
  abi: creativops.abi,
  chainId: monadTestnet.id,
} as const;
