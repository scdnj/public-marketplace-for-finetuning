'use client'

import { Chain, configureChains, createConfig, WagmiConfig } from 'wagmi'
import { goerli, polygonMumbai, sepolia } from 'wagmi/chains'
import { ConnectKitProvider, ConnectKitButton, getDefaultConfig } from "connectkit"
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { publicProvider } from 'wagmi/providers/public'
import * as React from 'react';

const defaultChains: Chain[] = [
    goerli,
    sepolia,
    polygonMumbai
];

const { chains, publicClient, webSocketPublicClient } = configureChains(
    defaultChains,
    [publicProvider()],
)
// const config = createConfig({
//     autoConnect: true,
//     connectors: [
//         new MetaMaskConnector({ chains }),
//     ],
//     publicClient,
//     webSocketPublicClient,
// });

const config = createConfig(
    getDefaultConfig({
        autoConnect: true,
        publicClient,
        webSocketPublicClient,
        // Required API Keys
        alchemyId: process.env.ALCHEMY_ID, // or infuraId
        walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID,
        chains: defaultChains,

        // Required
        appName: "Tobi",
    }),
);

export const WagmiProvider = ({ children }: { children: React.ReactNode }) => {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
    return (
        <WagmiConfig config={config}>
            <ConnectKitProvider>
                {mounted && children}
            </ConnectKitProvider>
        </WagmiConfig>
    )
}