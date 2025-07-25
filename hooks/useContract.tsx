"use client"

import { contractConfig } from "@/config/contract"
import { useEffect, useState } from "react"
import { useBalance, useReadContract, useWriteContract } from "wagmi"
import { WriteContractData } from "wagmi/query"

const useContract = (functionName: string, params?: any[]) => {
    const args = params ? params : []
    const { data, error, isPending, isError, isFetched, refetch } = useReadContract({ ...contractConfig, functionName, args })

    return { data, error, isPending, isError, isFetched, refetch }
}

export const useWrite = (functionName: string, args: (string | number | bigint)[], value: bigint = BigInt(0)) => {
    const [data, setData] = useState<WriteContractData | undefined>()
    const { writeContract } = useWriteContract()

    const write = () => {
        const response = writeContract({ ...contractConfig, functionName, args, value })
        setData(data)
    }

    useEffect(() => {
        write();
    }, [])

    return data
}

export default useContract