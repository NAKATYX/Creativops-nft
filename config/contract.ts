import creativops from "@/abi/creativops.json";
import { sepolia } from "viem/chains";

export const contractConfig = {
  address: "0xad5D0dB63707b3F27AbC79D157C09ED3E1536448",
  abi: creativops.abi,
  chainId: sepolia.id,
} as const;
