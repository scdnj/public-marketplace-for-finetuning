import { BigNumber } from 'ethers'
import modelWeight from './circuits.json'
const { buildPoseidon } = require('circomlibjs')
const { groth16 } = require('snarkjs')

export async function exportSolidity({ proof, publicSignals }: any) {
  const rawCallData: string = await groth16.exportSolidityCallData(proof, publicSignals);
  const tokens = rawCallData
    .replace(/["[\]\s]/g, "")
    .split(",")
    .map(BigNumber.from);
  const [a1, a2, b1, b2, b3, b4, c1, c2, ...input] = tokens;
  const a: [BigNumber, BigNumber] = [a1, a2];
  const b: [[BigNumber, BigNumber], [BigNumber, BigNumber]] = [
    [b1, b2],
    [b3, b4],
  ]
  const c: [BigNumber, BigNumber] = [c1, c2]
  return {
    a, b, c, input
  }
}

export async function generateProof(circuitInputs: any, filePathWASM: any, filePathZKEY: any) {
  const { proof, publicSignals } = await groth16.fullProve(
    circuitInputs,
    filePathWASM,
    filePathZKEY
  )
  const solidityProof = await exportSolidity({ proof, publicSignals })
  return solidityProof
}
const hexToDecimal = (hex: string) => BigInt('0x' + hex).toString()

export async function zkproof(photo: any) {
  const filePathWASM: string = 'circuits.wasm'
  const filePathZKEY: string = 'circuits.zkey'

  const circuitInputs = {
    in: photo,
    ...modelWeight
  }

  const proofData = await generateProof(
    circuitInputs,
    filePathWASM,
    filePathZKEY
  )
  console.log(proofData)
  return proofData
}