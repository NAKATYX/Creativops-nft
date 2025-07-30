import creativops from "@/abi/creativops.json";
import { monadTestnet } from "viem/chains";

export const contractConfig = {
  address: "0x546592467bDCa9118Ab52856eEbb5211c1Af3900",
  abi: creativops.abi,
  chainId: monadTestnet.id,
} as const;
