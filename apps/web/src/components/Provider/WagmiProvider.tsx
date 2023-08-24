'use client'

import { Chain, configureChains, createConfig, WagmiConfig } from 'wagmi'
import { goerli, polygonMumbai, sepolia } from 'wagmi/chains'
import { ConnectKitProvider, getDefaultConfig } from "connectkit"
import { publicProvider } from 'wagmi/providers/public'

const defaultChains: Chain[] = [
    sepolia,
    goerli,
    polygonMumbai
];

const { chains, publicClient, webSocketPublicClient } = configureChains(
    defaultChains,
    [publicProvider()],
)

const config = createConfig(
    getDefaultConfig({
        autoConnect: true,
        walletConnectProjectId: 'walletConnectProjectId',
        // Required API Keys
        chains: chains,
        // Required
        appName: "Tobi",
        publicClient,
        webSocketPublicClient,
    }),
);

export const WagmiProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <WagmiConfig config={config}>
            <ConnectKitProvider>
                {children}
            </ConnectKitProvider>
        </WagmiConfig>
    )
}