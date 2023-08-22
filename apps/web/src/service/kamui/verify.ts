const { buildPoseidon } = require('circomlibjs')
const { groth16 } = require('snarkjs')

export async function exportSolidity({ proof, publicSignals }: any) {
  const rawCallData: string = await groth16.exportSolidityCallData(proof, publicSignals);
  const tokens = rawCallData
    .replace(/["[\]\s]/g, "")
    .split(",")
    .map(BigInt.from);
  const [a1, a2, b1, b2, b3, b4, c1, c2, ...inputs] = tokens;
  const a: [BigInt, BigInt] = [a1, a2];
  const b: [[BigInt, BigInt], [BigInt, BigInt]] = [
    [b1, b2],
    [b3, b4],
  ]
  const c: [BigInt, BigInt] = [c1, c2]
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
  const solidityProof = await exportSolidity({ proof, publicSignals })
  return solidityProof
}
const hexToDecimal = (hex: string) => BigInt('0x' + hex).toString()

export async function zkproof(credentialHash: string) {
  // generate VC hash
  const filePathWASM: string = '/circuits.wasm'
  const filePathZKEY: string = '/circuits.zkey'

  // issuer send this hash
  const poseidon = await buildPoseidon()
  const inputs = credentialHash
  const poseidonHash = poseidon.F.toString(poseidon([hexToDecimal(inputs)]))
  // console.log('poseidon hash:', poseidonHash)

  const circuitInputs = {
    value: `0x${inputs}`,
    hash: poseidonHash,
  }
  console.log(circuitInputs)

  const proofData = await generateProof(
    circuitInputs,
    filePathWASM,
    filePathZKEY
  )
  console.log(proofData)
  return proofData
}