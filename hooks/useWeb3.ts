"use client"

import { useState } from "react"

interface Web3State {
  connected: boolean
  address: string
  balance: string
  chainId: number
}

interface ContractData {
  totalSupply: number
  maxSupply: number
  mintPrice: string
  maxMintPerWallet: number
  userMintCount: number
}

export function useWeb3() {
  const [web3State, setWeb3State] = useState<Web3State>({
    connected: false,
    address: "",
    balance: "0",
    chainId: 0,
  })

  const [contractData, setContractData] = useState<ContractData>({
    totalSupply: 150,
    maxSupply: 10000,
    mintPrice: "0.1",
    maxMintPerWallet: 10,
    userMintCount: 0,
  })

  const connectWallet = async () => {
    try {
      // In a real implementation, this would use ethers.js or web3.js
      // to connect to MetaMask or other wallet providers

      // Simulate wallet connection
      const mockAddress =
        "0x" + Math.random().toString(16).substr(2, 8) + "..." + Math.random().toString(16).substr(2, 4)
      const mockBalance = (Math.random() * 5).toFixed(4)

      setWeb3State({
        connected: true,
        address: mockAddress,
        balance: mockBalance,
        chainId: 41144, // Monad testnet chain ID
      })

      return true
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      return false
    }
  }

  const disconnectWallet = () => {
    setWeb3State({
      connected: false,
      address: "",
      balance: "0",
      chainId: 0,
    })
  }

  const mintNFT = async () => {
    if (!web3State.connected) {
      throw new Error("Wallet not connected")
    }

    try {
      // In a real implementation, this would call the smart contract
      // const contract = new ethers.Contract(contractAddress, abi, signer)
      // const tx = await contract.mint()
      // await tx.wait()

      // Simulate minting process
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Update contract data
      setContractData((prev) => ({
        ...prev,
        totalSupply: prev.totalSupply + 1,
        userMintCount: prev.userMintCount + 1,
      }))

      // Update user balance (subtract mint price + gas)
      const newBalance = (Number.parseFloat(web3State.balance) - 0.1).toFixed(4)
      setWeb3State((prev) => ({
        ...prev,
        balance: newBalance,
      }))

      return true
    } catch (error) {
      console.error("Minting failed:", error)
      throw error
    }
  }

  const validateMint = () => {
    const errors: string[] = []

    if (!web3State.connected) {
      errors.push("Wallet not connected")
    }

    if (Number.parseFloat(web3State.balance) < Number.parseFloat(contractData.mintPrice)) {
      errors.push("Insufficient balance")
    }

    if (contractData.userMintCount >= contractData.maxMintPerWallet) {
      errors.push("Mint limit exceeded")
    }

    if (contractData.totalSupply >= contractData.maxSupply) {
      errors.push("Collection sold out")
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  return {
    web3State,
    contractData,
    connectWallet,
    disconnectWallet,
    mintNFT,
    validateMint,
  }
}
