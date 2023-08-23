import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner, importKey } from '@taquito/signer';

const Tezos = new TezosToolkit('https://ghostnet.tezos.marigold.dev');

Tezos.setProvider({
  signer: new InMemorySigner('edskS1zsQPHwdhuQQ9dcvtmrgSC1f7pqMZMrst4xzB4hMgkmAzgnDHbRhHGckG7RXN6yoed1PE31S63z2Y7Pa13kvZcQgcQ8bU'),
});


export const accessProposal = async () =>  {
  await Tezos.contract
  .at('KT1KqDtnTZMYiEpe81f6u24Jnmq5Hg2h9z5v')
  .then((contract) => {
    console.log('Access proposal...')
    return contract.methods.access().send();
  })
  .then((op) => {
    const result: any = op.results[0]
    console.log(`Waiting for ${op.hash} to be confirmed...`);
    return op.confirmation(1).then(() => op.hash);
  })
  .then((hash) => {
    console.log(`Access operation finished: https://better-call.dev/ghostnet/opg/${hash}`)
  })
  .catch((error) => {
    console.log(`Access error: ${JSON.stringify(error, null, 2)}`)
  })
}

export const voteProposal = async (vote: number) =>  {
  await Tezos.contract
  .at('KT1KqDtnTZMYiEpe81f6u24Jnmq5Hg2h9z5v')
  .then((contract) => {
    console.log('Vote proposal...')
    return contract.methods.vote(vote).send();
  })
  .then((op) => {
    console.log(`Waiting for ${op.hash} to be confirmed...`);
    return op.confirmation(1).then(() => op.hash);
  })
  .then((hash) => {
    console.log(`Vote finished: https://better-call.dev/ghostnet/opg/${hash}`)
  })
  .catch((error) => {
    console.log(`Vote error: ${JSON.stringify(error, null, 2)}`)
  });
} 

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const main = async () => {
  // await voteProposal(1)
  // sleep(15000)
  // await accessProposal()
}

main()

