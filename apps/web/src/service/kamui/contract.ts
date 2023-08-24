'use client'

import { writeContract, prepareWriteContract, getNetwork } from 'wagmi/actions'
import { wagmiAbi } from './abi'
import { zkproof } from './verify'
import { sepoliaClient, goerliClient, account } from './client'
import { copyFileSync } from 'fs'

const { buildPoseidon } = require('circomlibjs')

const contractAddress: any = {
  'Goerli': '0x6385Bcd08b7478992f7f0146A114f171701a8de2',
  'Sepolia': process.env.NEXT_PUBLIC_SEPOLIA_CONTRACT
}

const publicClients: any = {
  'Goerli': goerliClient,
  'Sepolia': sepoliaClient,
}

export const createProposal = async (name: string, endTime: number) => {
  const { chain } = getNetwork()
  const { request } = await prepareWriteContract({
    address: contractAddress[chain!.name],
    abi: wagmiAbi,
    functionName: 'createProposals',
    args: [name, endTime],
  })
  await writeContract(request)
}

export const vote = async (proof: any, proposalId: number, accept: boolean) => {
  const { chain } = getNetwork()

  const { request } = await prepareWriteContract({
    address: contractAddress[chain!.name],
    abi: wagmiAbi,
    functionName: 'vote',
    args: [proposalId, accept, proof],
  })
  await writeContract(request)
}

export const getResult = async (proposal: bigint) => {
  const { chain } = getNetwork()
  const publicClient = publicClients[chain!.name]
  const data = await publicClient.readContract({
    address: contractAddress[chain!.name],
    abi: wagmiAbi,
    functionName: 'getResult',
    args: [proposal],
  })
  return data
}

export const getBlockTime = async () => {
  const { chain } = getNetwork()
  const publicClient = publicClients[chain!.name]
  const data = await publicClient.readContract({
    address: contractAddress[chain!.name],
    abi: wagmiAbi,
    functionName: 'getBlockTime',
  })
  return data
}

export const getProposal = async (proposalId: number) => {
  const { chain } = getNetwork()
  const publicClient = publicClients[chain!.name]
  const data = await publicClient.readContract({
    address: contractAddress[chain!.name],
    abi: wagmiAbi,
    functionName: 'proposals',
    args: [BigInt(proposalId)],
  })
  return data
}

export const getProposalCount = async () => {
  const { chain } = getNetwork()
  const publicClient = publicClients[chain!.name]
  const data = await publicClient.readContract({
    address: contractAddress[chain!.name],
    abi: wagmiAbi,
    functionName: 'totalProposals',
  })
  return data
}

export const getProposals = async () => {
  let proposals = []
  const count = Number(await getProposalCount())
  for (let i = 0; i < count; i++) {
    const proposal = await getProposal(i)
    proposals.push(proposal)
  }
  return proposals
}
