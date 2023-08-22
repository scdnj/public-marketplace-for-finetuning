'use client'

import { writeContract } from 'wagmi/actions'
import { kamuiContractConfig } from './kamuiField'
import ABI from "./ABI.json"
import { BytesLike, ethers } from "ethers";
import { zkproof } from "./verify";
const { buildPoseidon } = require("circomlibjs");


export const createProposal = async (name: string, endTime: number) => {
  const result = await writeContract({
    address: kamuiContractConfig.address,
    abi: kamuiContractConfig.abi,
    functionName: 'createProposals',
    args: [name, endTime],
  })
}