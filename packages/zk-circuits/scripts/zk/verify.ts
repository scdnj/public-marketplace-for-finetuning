import { BigNumber } from 'ethers'
import fs from 'fs'
const { buildPoseidon } = require('circomlibjs')
const { groth16 } = require('snarkjs')

export async function exportSolidity({ proof, publicSignals }: any) {
  const rawCallData: string = await groth16.exportSolidityCallData(proof, publicSignals);
  const tokens = rawCallData
    .replace(/["[\]\s]/g, "")
    .split(",")
    .map(BigNumber.from);
  const [a1, a2, b1, b2, b3, b4, c1, c2, ...inputs] = tokens;
  const a: [BigNumber, BigNumber] = [a1, a2] ;
  const b: [[BigNumber, BigNumber], [BigNumber, BigNumber]] = [
    [b1, b2],
    [b3, b4],
  ]
  const c: [BigNumber, BigNumber] = [c1, c2]
  return {
    a, b, c, inputs
  }
}

export async function generateProof(circuitInputs: any, filePathWASM: any, filePathZKEY: any) {
  const { proof, publicSignals } = await groth16.fullProve(
    circuitInputs,
    filePathWASM,
    filePathZKEY
  )
  console.log(publicSignals)
  const solidityProof = await exportSolidity({ proof, publicSignals })
  return solidityProof
}

async function main() {
  // generate VC hash
  const WASM_FILE_PATH = 'circuits/circuits.wasm'
  const ZKEY_FILE_PATH = 'circuits/circuits.zkey'
  
  const circuitsInputs = JSON.parse(fs.readFileSync('circuits/circuits.json', 'utf8'))
  
  const proofData = await generateProof(
    circuitsInputs,
    WASM_FILE_PATH,
    ZKEY_FILE_PATH
  )
  console.log(`['${proofData.a[0]._hex}', '${proofData.a[1]._hex}']`)
  console.log(`[['${proofData.b[0][0]._hex}', '${proofData.b[0][1]._hex}'],['${proofData.b[1][0]._hex}', '${proofData.b[1][1]._hex}']]`)
  console.log(`['${proofData.c[0]._hex}', '${proofData.c[1]._hex}']`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
