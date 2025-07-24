import creativops from "@/abi/creativops.json";
import { sepolia } from "viem/chains";

export const contractConfig = {
  address: "0x9e9704F90A990F0F69FAE37fd18199Be0395ECd0",
  abi: creativops.abi,
  chainId: sepolia.id,
} as const;
