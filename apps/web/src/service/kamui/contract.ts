'use client'

import { writeContract, prepareWriteContract, getNetwork, readContract } from 'wagmi/actions'
import { wagmiAbi } from './abi'
import { zkproof } from './verify'
import { publicClient, walletClient, account } from './client'
import { copyFileSync } from 'fs'

const { buildPoseidon } = require('circomlibjs')

const contractAddress: any = {
  'Goerli': '0xCEFbaE8c6afEdC5C5e312B34fd8993EfD076d130',
  'Sepolia': '0x6385Bcd08b7478992f7f0146A114f171701a8de2'
}

export const registerUser = async (userAddress: string, poseidonHash: string,) => {
  const { chain } = getNetwork()

  const { request } = await publicClient.simulateContract({
    account,
    address: contractAddress[chain!.name],
    abi: wagmiAbi,
    functionName: 'registerUser',
    args: [userAddress, poseidonHash]
  })
  await walletClient.writeContract(request)
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

export const vote = async (credentialHash: string, proposalId: number, accept: boolean) => {
  const proof = await zkproof(credentialHash)
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

  const data = await readContract({
    address: contractAddress[chain!.name],
    abi: wagmiAbi,
    functionName: 'getResult',
    args: [proposal],
  })
  return data
}

export const getBlockTime = async () => {
  const { chain } = getNetwork()

  const data = await readContract({
    address: contractAddress[chain!.name],
    abi: wagmiAbi,
    functionName: 'getBlockTime',
  })
  return data
}

export const getProposal = async (proposalId: number) => {
  const { chain } = getNetwork()
  const data = await readContract({
    address: contractAddress[chain!.name],
    abi: wagmiAbi,
    functionName: 'proposals',
    args: [BigInt(proposalId)],
  })
  console.log()
  return data
}

export const getProposalCount = async () => {
  const { chain } = getNetwork()

  const data = await readContract({
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
