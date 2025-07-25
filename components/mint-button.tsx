import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import useContract, { useWrite } from '@/hooks/useContract'
import { contractConfig } from '@/config/contract'
import { weiToEthers } from '@/lib/contract-helper'
import { config } from 'process'
import { useEventBus } from '@/store/events-bus'

const MintButton = () => {
    const { isConnected, address } = useAccount()
    const { markBalanceDirty } = useEventBus()
    const { data: price, isPending: pricePending, error: priceError } = useContract('price');
    const { data: hash, writeContract, isPending: isMinting, error: mintError, reset: resetMint } = useWriteContract()
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    })

    useEffect(() => {
        if (isSuccess) {
            markBalanceDirty()
        }
    }, [isSuccess])


    const handleMint = async () => {
        resetMint();

        if (priceError || pricePending) { console.log({ pricePending, priceError }) }
        else {
            const { chainId, ...config } = contractConfig;

            writeContract({
                ...config,
                functionName: 'buy',
                args: [address],
                value: BigInt(price?.toString() as string)
            })
        }

    }

    return (
        <div className="mb-6">
            <Button
                onClick={handleMint}
                disabled={!isConnected}
                className="w-full h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
                {isMinting || isConfirming ? (
                    <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        {isConfirming ? 'Confirming...' : 'Minting...'}
                    </div>
                ) : isConnected ? (
                    pricePending ? "Fetching price..." : priceError ? "Failed to fetch price" : `MINT CreativOps NFT (${weiToEthers(price as string)} ETH)`
                ) : (
                    "Connect Wallet to Mint"
                )}
            </Button>
        </div>
    )
}

export default MintButton