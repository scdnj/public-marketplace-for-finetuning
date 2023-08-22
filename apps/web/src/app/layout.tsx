import "../styles/globals.css";
// include styles from the ui package
import { Metadata } from 'next'
import "ui/styles.css";
import Header from '../components/NavBar/Header'
import { WagmiProvider } from '../components/Provider/WagmiProvider'
import ClientOnly from '../components/ClientOnly'

export const metadata: Metadata = {
  title: 'Tobi',
  icons: {
    icon: [
      '/tobi/tobi.png'
    ]
  },
  description: 'Welcome to HollowLeaf',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="overflow-hidden">
        <WagmiProvider>
          <ClientOnly>
            <Header />
          </ClientOnly>
          <div className="grow bg-cat-base overflow-y-auto" style={{ height: 'calc(100vh - 108px)' }}>{children}</div>
        </WagmiProvider>
      </body>
    </html>
  );
}
