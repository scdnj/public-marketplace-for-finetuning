'use client'

import { writeContract, prepareWriteContract, getNetwork, getAccount } from 'wagmi/actions'
import { parseEther } from 'viem'
import { marketAbi } from './abi'
import { sepoliaClient, goerliClient, account } from '../kamui/client'
import { cookies } from 'next/dist/client/components/headers'


const contractAddress: any = {
  'Goerli': '0x1E1a8Daf714617DD53f99d0bb191F794593dBD8D',
  'Sepolia': process.env.NEXT_PUBLIC_SEPOLIA_WEIGHT_MARKET_CONTRACT
}

const publicClients: any = {
  'Goerli': goerliClient,
  'Sepolia': sepoliaClient,
}

export const buyWeight = async (id: number) => {
  const { chain } = getNetwork()
  const { request } = await prepareWriteContract({
    address: contractAddress[chain!.name],
    abi: marketAbi,
    functionName: 'buyWeight',
    args: [id],
    value: parseEther('0.001')
  })
  await writeContract(request)
}

export const getTotalWeightCount = async () => {
  const { chain } = getNetwork()
  const publicClient = publicClients[chain!.name]
  const data = await publicClient.readContract({
    address: contractAddress[chain!.name],
    abi: marketAbi,
    functionName: 'totalWeight',
  })
  return data
}

export const getTotalWeightList = async () => {
  const { chain } = getNetwork()
  const publicClient = publicClients[chain!.name]
  const totalCount = await getTotalWeightCount()
  const weightList = []
  for (let i = 0; i < totalCount; i += 1) {
    const data = await publicClient.readContract({
      address: contractAddress[chain!.name],
      abi: marketAbi,
      functionName: 'weightList',
      args: [i],
    })
    weightList.push(data)
  }
  return weightList
}

export const getUserWeight = async (address: string) => {
  const { chain } = getNetwork()
  const publicClient = publicClients[chain!.name]
  const data = await publicClient.readContract({
    address: contractAddress[chain!.name],
    abi: marketAbi,
    functionName: 'getList',
    args: [address],
  })
  return data
}