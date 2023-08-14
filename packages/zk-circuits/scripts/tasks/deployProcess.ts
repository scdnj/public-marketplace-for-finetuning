import { task } from 'hardhat/config'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { writeFileSync } from '../helpers/pathHelper'

task('deploy:contract', 'Deploy contract')
  .addParam('contract')
  .addFlag('verify', 'Verify contract after deploy')
  .setAction(async ({ contract, verify }, hre) => {
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

    if (verify) {
      console.log('verifying contract...')
      await deployContract.deployTransaction.wait(5)
      try {
        await hre.run('verify:verify', {
          address: deployContract.address,
          constructorArguments: [address.main],
          contract: contract,
        })
      } catch (e) {
        console.log(e)
      }
    }
  },
  )
