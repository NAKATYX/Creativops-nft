'use client'

import { WagmiProvider, createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected, metaMask } from 'wagmi/connectors'
import { createClient } from 'viem'
import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { wagmiConfig } from '@/config/wagmi'



export function WagmiAppProvider({ children }: { children: ReactNode }) {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
        </QueryClientProvider>
    )
}
