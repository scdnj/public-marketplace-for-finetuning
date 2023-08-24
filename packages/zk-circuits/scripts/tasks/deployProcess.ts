import fs from 'fs'
import { task } from 'hardhat/config'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { writeFileSync } from '../helpers/pathHelper'

task('deploy:contract', 'Deploy contract')
  .addParam('contract')
  .setAction(async ({ contract }, hre) => {
    await hre.run('compile')
    const [signer] = await hre.ethers.getSigners()
    const contractFactory = await hre.ethers.getContractFactory(contract)
    // if you mint in constructor, you need to add value in deploy function
    const deployContract = await contractFactory.connect(signer).deploy()
    console.log(`TestToken.sol deployed to ${deployContract.address}`)

    const address = {
      main: deployContract.address,
    }
    const addressData = JSON.stringify(address)
    writeFileSync(`scripts/address/${hre.network.name}/`, 'mainContract.json', addressData)

    await deployContract.deployed()
  },
  )

task('deploy:kamui', 'Deploy contract')
  .addFlag('verify', 'Validate contract after deploy')
  .setAction(async ({verify}, hre) => {
    await hre.run('compile')
    const [signer] = await hre.ethers.getSigners()

    const contractAddress = fs.readFileSync(`scripts/address/${hre.network.name}/CircuitsVerifier.json`)
    const himitsuAddress = JSON.parse(contractAddress.toString())

    const feeData = await hre.ethers.provider.getFeeData()
    const contractFactory = await hre.ethers.getContractFactory('contracts/KamuiField.sol:KamuiField')
    // if you mint in constructor, you need to add value in deploy function
    const deployContract = await contractFactory.connect(signer).deploy(himitsuAddress.main, {
      maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
      maxFeePerGas: feeData.maxFeePerGas,
      gasLimit: 4000000,
    })
    console.log(`KamuiField.sol deployed to ${deployContract.address}`)

    const address = {
      main: deployContract.address,
    }
    const addressData = JSON.stringify(address)
    writeFileSync(`scripts/address/${hre.network.name}/`, 'KamuiField.json', addressData)

    await deployContract.deployed()
    
    if (verify) {
      console.log('verifying contract...')
      await deployContract.deployTransaction.wait(5)
      try {
        await hre.run('verify:verify', {
          address: deployContract.address,
          constructorArguments: [himitsuAddress.main],
          contract: 'contracts/KamuiField.sol:KamuiField',
        })
      } catch (e) {
        console.log(e)
      }
    }
  },
  )

  task('deploy:verifier', 'Deploy contract verifier')
  .addFlag('verify', 'Validate contract after deploy')
  .setAction(async ({verify}, hre) => {
    await hre.run('compile')
    const [signer] = await hre.ethers.getSigners()
    const contractFactory = await hre.ethers.getContractFactory('contracts/CircuitsVerifier.sol:Verifier')
    // if you mint in constructor, you need to add value in deploy function
    const feeData = await hre.ethers.provider.getFeeData()
    const deployContract = await contractFactory.connect(signer).deploy({
      maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
      maxFeePerGas: feeData.maxFeePerGas,
      gasLimit: 4000000,
    })
    console.log(`CircuitsVerifier.sol deployed to ${deployContract.address}`)

    const address = {
      main: deployContract.address,
    }
    const addressData = JSON.stringify(address)
    writeFileSync(`scripts/address/${hre.network.name}/`, 'CircuitsVerifier.json', addressData)

    await deployContract.deployed()
    
    if (verify) {
      console.log('verifying contract...')
      await deployContract.deployTransaction.wait(5)

      try {
        await hre.run('verify:verify', {
          address: deployContract.address,
          constructorArguments: [],
          contract: 'contracts/CircuitsVerifier.sol:Verifier',
        })
      } catch (e) {
        console.log(e)
      }
    }
  },
  )

  task('deploy:wormsrc', 'Deploy contract verifier')
  .addFlag('verify', 'Validate contract after deploy')
  .setAction(async ({verify}, hre) => {
    await hre.run('compile')
    const [signer] = await hre.ethers.getSigners()
    const contractFactory = await hre.ethers.getContractFactory('contracts/WormKamuiSrc.sol:WormKamuiSrc')
    
    const contractAddress = fs.readFileSync(`scripts/address/${hre.network.name}/CircuitsVerifier.json`)
    const himitsuAddress = JSON.parse(contractAddress.toString())

    const feeData = await hre.ethers.provider.getFeeData()
    const deployContract = await contractFactory.connect(signer).deploy(himitsuAddress.main,{
      maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
      maxFeePerGas: feeData.maxFeePerGas,
      gasLimit: 4000000,
    })
    console.log(`WormKamuiSrc.sol deployed to ${deployContract.address}`)

    const address = {
      main: deployContract.address,
    }
    const addressData = JSON.stringify(address)
    writeFileSync(`scripts/address/${hre.network.name}/`, 'WormKamuiSrc.json', addressData)

    await deployContract.deployed()
    
    if (verify) {
      console.log('verifying contract...')
      await deployContract.deployTransaction.wait(5)

      try {
        await hre.run('verify:verify', {
          address: deployContract.address,
          constructorArguments: [himitsuAddress.main],
          contract: 'contracts/WormKamuiSrc.sol:WormKamuiSrc',
        })
      } catch (e) {
        console.log(e)
      }
    }
  },
  )

  task('deploy:wormdst', 'Deploy contract verifier')
  .addFlag('verify', 'Validate contract after deploy')
  .setAction(async ({verify}, hre) => {
    await hre.run('compile')
    const [signer] = await hre.ethers.getSigners()
    const contractFactory = await hre.ethers.getContractFactory('contracts/WormKamuiDst.sol:WormKamuiDst')

    const feeData = await hre.ethers.provider.getFeeData()
    const deployContract = await contractFactory.connect(signer).deploy({
      maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
      maxFeePerGas: feeData.maxFeePerGas,
      gasLimit: 4000000,
    })
    console.log(`WormKamuiDst.sol deployed to ${deployContract.address}`)

    const address = {
      main: deployContract.address,
    }
    const addressData = JSON.stringify(address)
    writeFileSync(`scripts/address/${hre.network.name}/`, 'WormKamuiDst.json', addressData)

    await deployContract.deployed()
    
    if (verify) {
      console.log('verifying contract...')
      await deployContract.deployTransaction.wait(5)

      try {
        await hre.run('verify:verify', {
          address: deployContract.address,
          constructorArguments: [],
          contract: 'contracts/WormKamuiDst.sol:WormKamuiDst',
        })
      } catch (e) {
        console.log(e)
      }
    }
  },
  )