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

export const formatBalance = (weiValue: bigint | undefined, decimals = 4) => {
  if (!weiValue) return "0.0000";
  const ethValue = formatEther(weiValue);
  return parseFloat(ethValue).toLocaleString(undefined, {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  });
};
