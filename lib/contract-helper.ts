import { formatEther } from "viem";

export const weiToEthers = (
  value?: string | number | bigint | null
): string => {
  try {
    if (value === undefined || value === null) return "0";

    return formatEther(BigInt(value.toString()));
  } catch (error: any) {
    console.log({ error: error.message });

    return "0";
  }
};
