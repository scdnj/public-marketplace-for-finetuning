import "../styles/globals.css";
// include styles from the ui package
import "ui/styles.css";
import Header from '../components/NavBar/Header'
import { ConnectKitProvider } from 'connectkit'
import { WagmiConfig, useAccount } from 'wagmi'
import { config } from "process";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-zinc-900">
      <body>
      <WagmiConfig config={config}>
        <ConnectKitProvider>
        <Header />
        {children}
        </ConnectKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
