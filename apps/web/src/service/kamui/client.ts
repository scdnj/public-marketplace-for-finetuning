import { fallback, createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { goerli, sepolia } from 'viem/chains'

// This is example
export const account = privateKeyToAccount(`0x${process.env.NEXT_PUBLIC_PRIVATE_KEY}`)

const sepoliaProvider = [
  http('https://api.zan.top/node/v1/eth/sepolia/public'),
  http('https://rpc.notadegen.com/eth/sepolia'),
  http('https://rpc-sepolia.rockx.com'),
  http('https://rpc.notadegen.com/eth/sepolia')
]

const goerliProvider = [
  http('https://eth-goerli.api.onfinality.io/public'),
  http('https://goerli.blockpi.network/v1/rpc/public'),
  http('https://ethereum-goerli.publicnode.com'),
  http('https://api.zan.top/node/v1/eth/goerli/public')
]

export const sepoliaClient: any = createPublicClient({
  chain: sepolia,
  transport: fallback(sepoliaProvider)
})

export const goerliClient: any = createPublicClient({
  chain: goerli,
  transport: fallback(goerliProvider)
})