import fs from 'fs'
import { ethers } from 'ethers'
import { createTransaction, signTransaction, postTransaction } from 'arweavekit/transaction'
import { IAgeModel } from '../interface/model'

export const upload: any = async (data: IAgeModel, key: any, net: 'local' | 'mainnet') => {
  const modelData = JSON.stringify(data)
  
  const transaction = await createTransaction({
    key: key,
    type: 'data',
    environment: net,
    data: modelData,
  })
  await signTransaction({
    createdTransaction: transaction,
    key: key,
    environment: net,
  })
  const response = await postTransaction({
    transaction: transaction,
    environment: net,
    key: key,
  })
  return response
}

export const list: any = async (priv: string, name: string, url: string) => {
  const provider = new ethers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/demo')
  const wallet = new ethers.Wallet(priv, provider)
  const abi = JSON.parse(fs.readFileSync('./src/resource/abi.json').toString())
  const contract = new ethers.Contract('0x08A7a3bF86781E5059272b6079F735cf39ffE4B2', 
    abi.result,
    wallet
  )
  const tx = await contract.uploadWeight(name, url, 'AR', 1000000000000000)
  return tx
}
