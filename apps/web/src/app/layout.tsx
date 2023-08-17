import "../styles/globals.css";
// include styles from the ui package
import { Metadata } from 'next'
import "ui/styles.css";
import Header from '../components/NavBar/Header'
import { WagmiProvider } from '../components/Provider/WagmiProvider'
import ClientOnly from '../components/ClientOnly'


export const metadata: Metadata = {
  title: 'Tobi',
  description: 'Welcome to HollowLeaf',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-zinc-900">
      <body className="overflow-hidden">
        <WagmiProvider>
          <ClientOnly>
            <Header />
          </ClientOnly>
          <div className="grow bg-cat-base overflow-y-auto" >{children}</div>
        </WagmiProvider>
      </body>
    </html>
  );
}
