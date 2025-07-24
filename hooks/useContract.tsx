"use client"

import { contractConfig } from "@/config/contract"
import { useBalance, useReadContract } from "wagmi"

const useContract = (functionName: string, params?: any[]) => {
    const args = params ? params : []
    const { data, error, isPending, isError, isFetched } = useReadContract({ ...contractConfig, functionName, args })

    return { data, error, isPending, isError, isFetched }
}

export default useContract