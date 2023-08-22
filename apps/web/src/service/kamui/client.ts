import { createWalletClient, createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { goerli, sepolia } from 'viem/chains'

// This is example
export const account = privateKeyToAccount('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80')

export const publicClient: any = createPublicClient({
  chain: sepolia,
  transport: http("https://sepolia.infura.io/v3/")
})

export const walletClient: any = createWalletClient({
  account,
  chain: sepolia,
  transport: http("https://sepolia.infura.io/v3/")
})