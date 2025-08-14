"use client"

import { WagmiProvider, useConnect } from "wagmi"
import { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { wagmiConfig } from "@/config/wagmi"

const queryClient = new QueryClient()

// 🔑 Custom wrapper to trigger autoConnect in wagmi v2
function AutoConnectWrapper({ children }: { children: ReactNode }) {
  useConnect()
  return <>{children}</>
}

export function WagmiAppProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <AutoConnectWrapper>{children}</AutoConnectWrapper>
      </WagmiProvider>
    </QueryClientProvider>
  )
}
