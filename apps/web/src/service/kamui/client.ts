import { createWalletClient, createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { goerli, sepolia } from 'viem/chains'

// This is example
export const account = privateKeyToAccount(`0x${process.env.NEXT_PUBLIC_PRIVATE_KEY}`)

export const publicClient: any = createPublicClient({
  chain: sepolia,
  transport: http(`https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`)
})

export const walletClient: any = createWalletClient({
  account,
  chain: sepolia,
  transport: http(`https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`)
})