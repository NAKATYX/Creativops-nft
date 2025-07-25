import type { Metadata } from 'next'
import './globals.css'
import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from '@/config/wagmi'
import { WagmiAppProvider } from '@/components/wagmi-app-provider'

export const metadata: Metadata = {
  title: 'CreativOps',
  description: 'Genesis mint for the CreativOps NFT collection',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <WagmiAppProvider>
          {children}
        </WagmiAppProvider>
      </body>
    </html>
  )
}
