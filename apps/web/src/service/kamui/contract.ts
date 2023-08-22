'use client'

import { writeContract, prepareWriteContract, getNetwork } from 'wagmi/actions'
import { wagmiAbi } from './abi'
import { zkproof } from './verify'
import { publicClient, walletClient, account } from './client'

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
  const config = await prepareWriteContract({
    address: contractAddress[chain!.name],
    abi: wagmiAbi,
    functionName: 'createProposals',
    args: [name, endTime],
  })
  await writeContract(config)
}

export const vote = async (credentialHash: string, proposalId: number, accept: boolean) => {
  const proof = await zkproof(credentialHash)
  const { chain } = getNetwork()

  const config = await prepareWriteContract({
    address: contractAddress[chain!.name],
    abi: wagmiAbi,
    functionName: 'vote',
    args: [proposalId, accept, proof],
  })
  await writeContract(config)
}

export const getResult = async (proposal: number) => {
  const { chain } = getNetwork()

  const data = await readContract({
    address: contractAddress[chain!.name],
    abi: wagmiAbi,
    functionName: 'getResult(uint256)',
    args: [proposal],
  })
  return data
}

export const getBlockTime = async () => {
  const { chain } = getNetwork()

  const data = await readContract({
    address: contractAddress[chain!.name],
    abi: wagmiAbi,
    functionName: 'getBlockTime()',
    args: [],
  })
  return data
}

export const getProposal = async (proposalId: number) => {
  const { chain } = getNetwork()
  const data = await readContract({
    // @ts-ignore
    address: contractAddress[chain!.name],
    abi: wagmiAbi,
    functionName: 'proposals(uint256)',
    args: [proposalId],
  })
  return data
}

export const getProposalCount = async () => {
  const { chain } = getNetwork()

  const data = await readContract({
    address: contractAddress[chain!.name],
    abi: abi,
    functionName: 'totalProposals()',
    args: [],
  })
  return data
}

export const getProposals = async () => {
  let proposals = []
  const count = (await getProposalCount()) as number
  for (let i = 0 ; i < count ; i++) {
    const proposal = await getProposal(i)
    proposals.push(proposal)
  }
  return proposals
}
