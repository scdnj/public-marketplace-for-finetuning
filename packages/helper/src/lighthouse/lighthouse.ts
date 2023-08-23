import lighthouse from '@lighthouse-web3/sdk'
import { ethers } from 'ethers'
// for example
import { config as dotenvConfig } from 'dotenv'
import { resolve } from 'path'

dotenvConfig({ path: resolve(__dirname, '../../.env') })

const sign = async (privateKey: string) => {
  const provider = new ethers.providers.JsonRpcProvider('https://eth.llamarpc.com');
  const signer = new ethers.Wallet(privateKey, provider);
  const messageRequested = (await lighthouse.getAuthMessage(await signer.getAddress())).data.message;
  const signMessage = await signer.signMessage(messageRequested);
  return signMessage
}

export const uploadModel = async (file: any, apiKey: string, privKey: string, shareAddr?: string[]) => {
  return await lighthouse.upload(file, apiKey)
}

export const installEncryptModel = async (cid: string, privKey: string) => {
  const provider = new ethers.providers.JsonRpcProvider('https://eth.llamarpc.com');
  const signer = new ethers.Wallet(privKey, provider);
  const pubKey = await signer.getAddress()
  const signMessage = await sign(privKey)
  console.log(cid)
  lighthouse.fetchEncryptionKey(
    cid,
    pubKey,
    signMessage
  ).then((key) => {
    console.log(key)
  }).catch((e) => {
    console.log(e)
})
}

const example = async () => {
  const apiKey = process.env.LIGHT_HOUSE_API as string
  const privateKey = process.env.PRIVATE_KEY as string
  const res = await uploadModel('./circuit.json', apiKey, privateKey)
  console.log(res)

  const model = await installEncryptModel(res.data.Hash, privateKey)
  console.log(model)
}

