"use client"
import { useAccount, useBalance } from 'wagmi'
import { Card, CardContent } from './ui/card'
import { useEffect, useState } from 'react'
import useContract from '@/hooks/useContract'
import { formatBalance, weiToEthers } from '@/lib/contract-helper'
import { useEventBus } from '@/store/events-bus'

const MintInformation = () => {
    const { isConnected, address } = useAccount()
    const { data: balance, refetch: refetchNativeBalance } = useBalance({ address })

    const { isDirty, markBalanceClean } = useEventBus()

    const { data: totalSupply, error, isPending, refetch: refetchSupply } = useContract('totalSupply')
    const { data: price, error: priceError } = useContract('price')
    const { data: tokenBalance, refetch: refetchBalance } = useContract('balanceOf', [address])

    useEffect(() => console.log({ error, priceError }), [error, priceError])

    useEffect(() => {
        if (isDirty) {
            console.log({ received: "Status indicating a refetch is needed" })
            refetchSupply();
            refetchBalance()
            markBalanceClean()
            refetchNativeBalance()

            console.log({ totalSupply, tokenBalance, isPending, error })
        }
    }, [isDirty, isPending, error])

    return (
        <Card className="bg-black/40 border-purple-500/30 backdrop-blur-sm mb-6">
            <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-purple-400">{priceError ? "??" : weiToEthers(price?.toString() as string)} MON</p>
                        <p className="text-xs text-gray-400">Mint Price</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-pink-400">{isPending ? "Loading..." : error ? "Error" : (10000 - (parseInt(totalSupply?.toString() as string))).toLocaleString()}</p>
                        <p className="text-xs text-gray-400">Remaining</p>
                    </div>
                </div>

                {isConnected && (
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-purple-500/20">
                        <div className="text-center">
                            <p className="text-lg font-semibold text-green-400">{tokenBalance?.toString()}</p>
                            <p className="text-xs text-gray-400">Your Mints</p>
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-semibold text-blue-400">{formatBalance(balance?.value as bigint)} {balance?.symbol}</p>
                            <p className="text-xs text-gray-400">Your Balance</p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default MintInformation