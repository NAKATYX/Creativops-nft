"use client"

import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Wallet } from 'lucide-react'
import { injected, useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi'
import { monadTestnet } from 'viem/chains'


interface WalletState {
    connected: boolean
    address: string
    balance: string
}

const WalletConnectButton = () => {

    const { connect, isPending } = useConnect()
    const { isConnected, address } = useAccount()
    const { disconnect } = useDisconnect()

    // Simulate wallet connection
    const connectWallet = async () => {
        connect({ connector: injected(), chainId: monadTestnet.id })
    }

    return (
        <Card className="bg-black/40 border-purple-500/30 backdrop-blur-sm mb-6">
            <CardContent className="p-4">
                {isConnected ? (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                            <span className="text-sm text-gray-100 font-mono">{address?.slice(0, 4)}...{address?.slice(-5)}</span>
                        </div>
                        <Button
                            onClick={() => disconnect()}
                            variant="outline"
                            size="sm"
                            className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20 bg-transparent"
                        >
                            Disconnect
                        </Button>
                    </div>
                ) : (
                    <Button
                        onClick={connectWallet}
                        variant="outline"
                        className="w-full border-purple-500/50 text-purple-300 hover:bg-purple-500/20 bg-transparent"
                    >
                        <Wallet className="w-4 h-4 mr-2" />
                        {isPending ? 'Connecting...' : 'Connect Wallet'}
                    </Button>
                )}
            </CardContent>
        </Card>
    )
}

export default WalletConnectButton