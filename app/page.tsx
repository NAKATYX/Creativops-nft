"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, ExternalLink, Zap, Users, Clock } from "lucide-react"

// Extend window type to support Farcaster Mini-App
declare global {
  interface Window {
    farcaster?: {
      actions?: {
        ready: () => void
      }
    }
  }
}

interface MintData {
  price: string
  remaining: string
  userMints: string
  userBalance: string
  totalSupply: number
  maxSupply: number
}

interface WalletState {
  connected: boolean
  address: string
  balance: string
}

export default function CreativOpsMint() {
  const [wallet, setWallet] = useState<WalletState>({
    connected: false,
    address: "",
    balance: "0",
  })

  const [mintData, setMintData] = useState<MintData>({
    price: "0.1 MON",
    remaining: "9850 / 10000",
    userMints: "0 / 10",
    userBalance: "0 MON",
    totalSupply: 150,
    maxSupply: 10000,
  })

  const [isMinting, setIsMinting] = useState(false)
  const [mintStatus, setMintStatus] = useState("")

  // ✅ Notify Farcaster Mini-App is ready
  useEffect(() => {
    const ready = () => {
      if (typeof window !== "undefined" && window.farcaster?.actions?.ready) {
        console.log("✅ Farcaster Mini-App ready")
        window.farcaster.actions.ready()
      } else {
        console.warn("⚠️ Farcaster window.farcaster not found")
      }
    }
    setTimeout(ready, 0)
  }, [])

  const connectWallet = async () => {
    setMintStatus("Connecting wallet...")
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setWallet({
      connected: true,
      address: "0x1234...5678",
      balance: "1.4321",
    })

    setMintData((prev) => ({
      ...prev,
      userBalance: "1.4321 MON",
      userMints: "2 / 10",
    }))

    setMintStatus("Wallet connected!")
    setTimeout(() => setMintStatus(""), 3000)
  }

  const disconnectWallet = () => {
    setWallet({ connected: false, address: "", balance: "0" })
    setMintData((prev) => ({
      ...prev,
      userBalance: "0 MON",
      userMints: "0 / 10",
    }))
    setMintStatus("Wallet disconnected")
    setTimeout(() => setMintStatus(""), 3000)
  }

  const handleMint = async () => {
    if (!wallet.connected) {
      setMintStatus("Please connect your wallet first")
      setTimeout(() => setMintStatus(""), 3000)
      return
    }

    setIsMinting(true)
    setMintStatus("Preparing transaction...")

    try {
      await new Promise((r) => setTimeout(r, 1000))
      setMintStatus("Confirming transaction...")
      await new Promise((r) => setTimeout(r, 2000))
      setMintStatus("Minting your NFT...")
      await new Promise((r) => setTimeout(r, 2000))

      setMintData((prev) => ({
        ...prev,
        totalSupply: prev.totalSupply + 1,
        remaining: `${prev.maxSupply - (prev.totalSupply + 1)} / ${prev.maxSupply}`,
        userMints: "3 / 10",
        userBalance: "1.3321 MON",
      }))

      setMintStatus("🎉 Successfully minted CreativOps NFT!")
      setTimeout(() => setMintStatus(""), 5000)
    } catch {
      setMintStatus("❌ Mint failed. Try again.")
      setTimeout(() => setMintStatus(""), 5000)
    } finally {
      setIsMinting(false)
    }
  }

  const progressPercentage = (mintData.totalSupply / mintData.maxSupply) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black text-white">
      {/* Background pattern and radial light */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black"></div>
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      }} />

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
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <p className="text-purple-300 font-semibold">CreativOps OG</p>
                <p className="text-xs text-gray-400">Genesis Collection</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>Minted</span>
                <span>{mintData.totalSupply} / {mintData.maxSupply}</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mint Data & Balance */}
        <Card className="bg-black/40 border-purple-500/30 backdrop-blur-sm mb-6">
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-400">{mintData.price}</p>
                <p className="text-xs text-gray-400">Mint Price</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-pink-400">{mintData.remaining.split(" / ")[0]}</p>
                <p className="text-xs text-gray-400">Remaining</p>
              </div>
            </div>

            {wallet.connected && (
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-purple-500/20">
                <div className="text-center">
                  <p className="text-lg font-semibold text-green-400">{mintData.userMints}</p>
                  <p className="text-xs text-gray-400">Your Mints</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-blue-400">{mintData.userBalance}</p>
                  <p className="text-xs text-gray-400">Your Balance</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Mint Button */}
        <div className="mb-6">
          <Button
            onClick={handleMint}
            disabled={isMinting || !wallet.connected}
            className="w-full h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isMinting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Minting...
              </div>
            ) : wallet.connected ? (
              `MINT CreativOps NFT (${mintData.price})`
            ) : (
              "Connect Wallet to Mint"
            )}
          </Button>
        </div>

        {/* Wallet Info */}
        <Card className="bg-black/40 border-purple-500/30 backdrop-blur-sm mb-6">
          <CardContent className="p-4">
            {wallet.connected ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse" />
                  <span className="text-sm font-mono">{wallet.address}</span>
                </div>
                <Button
                  onClick={disconnectWallet}
                  variant="outline"
                  size="sm"
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button
                onClick={connectWallet}
                variant="outline"
                className="w-full border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
              >
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Mint Status */}
        {mintStatus && (
          <Card className="bg-black/60 border-purple-500/50 backdrop-blur-sm mb-4">
            <CardContent className="p-4 flex items-center text-purple-300 text-sm">
              <Clock className="w-4 h-4 mr-2" />
              {mintStatus}
            </CardContent>
          </Card>
        )}

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
