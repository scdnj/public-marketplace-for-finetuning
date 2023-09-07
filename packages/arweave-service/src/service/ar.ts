
import { createTransaction, signTransaction, postTransaction } from 'arweavekit/transaction'
import { createWallet, getBalance } from 'arweavekit/wallet'

const upload = async (data: any) => {
  const wallet = await createWallet({
    seedPhrase: true,
    environment: 'local',
  })

  const transaction = await createTransaction({
    key: wallet.key,
    type: 'data',
    environment: 'local',
    data: data,
  })
  console.log(transaction)
  // const signedTransaction = await signTransaction({
  //   createdTransaction: transaction,
  //   key: wallet.key,
  //   environment: 'local',
  // })

  const response = await postTransaction({
    transaction: transaction,
    environment: 'local',
    key: wallet.key,
  })
  return response
}

async function main() {

  // const wallet = await createWallet({
  //   seedPhrase: true,
  //   environment: 'mainnet',
  // })
  const balance = await getBalance({
    address: 'eO-5rv1YCRbPCXCI_cSAdMEbfVOgAgsiPmtP_GgMss8',
    environment: 'mainnet',
  })
  console.log(balance)
  // const data = Buffer.from('Hello Arweave!')
  // const res = await upload(data)
  // console.log(res)
}

main().catch(console.error)