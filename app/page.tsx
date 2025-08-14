"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useEffect } from "react"
import { sdk } from '@farcaster/miniapp-sdk'
import { Wallet, ExternalLink, Zap } from "lucide-react"
import ProgressBar from "@/components/progress-bar"
import MintButton from "@/components/mint-button"
import MintInformation from "@/components/mint-information"
import { useAccount } from "wagmi"

// Utility: truncate address
function truncateAddress(addr: string) {
  return addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : ""
}

export default function CreativOpsMint() {
  const { address, isConnected } = useAccount()

    // Ensure Farcaster Mini-App signals it's ready
  useEffect(() => {
    if (sdk?.actions?.ready) {
      sdk.actions.ready()
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black text-white relative">
      {/* Background pattern and radial light */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black"></div>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      {/* Connected Wallet Top Right */}
      {isConnected && address && (
        <div className="absolute top-4 right-4 bg-black/50 border border-purple-500/40 px-3 py-1 rounded-lg text-xs flex items-center space-x-2">
          <Wallet className="w-3 h-3 text-purple-400" />
          <span>{truncateAddress(address)}</span>
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                CreativOps OG Mint
              </h1>
              <p className="text-sm text-gray-400">Melobanc Labs</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm">
            Claim your CreativOps Genesis NFT — 10k drop on Monad Testnet
          </p>
        </div>

        {/* Mint Progress */}
        <Card className="bg-black/40 border-purple-500/30 backdrop-blur-sm mb-6">
          <CardContent className="p-6">
            <div className="aspect-square bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg mb-4 flex items-center justify-center border border-purple-500/20">
              <img
                src="https://ipfs.io/ipfs/bafybeietjunj777cocic7kz3rvfy6arigpbi7e4dytgwzpumqunlcesht4"
                className="h-auto w-full object-cover"
              />
            </div>
            <ProgressBar />
          </CardContent>
        </Card>

        {/* Mint Information */}
        <MintInformation />

        {/* Mint Button */}
        <MintButton />

        <div className="text-center mt-8 text-xs text-gray-500">
          <p>Powered by Monad Testnet</p>
          <div className="flex items-center justify-center mt-2">
            <ExternalLink className="w-3 h-3 mr-1" />
            <span>View on Explorer</span>
          </div>
        </div>
      </div>
    </div>
  )
}
