import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';

const Tezos = new TezosToolkit('https://ghostnet.tezos.marigold.dev');

Tezos.setProvider({
  signer: new InMemorySigner('edskS1zsQPHwdhuQQ9dcvtmrgSC1f7pqMZMrst4xzB4hMgkmAzgnDHbRhHGckG7RXN6yoed1PE31S63z2Y7Pa13kvZcQgcQ8bU'),
});

interface ProposalType {
  [index: number]: string;
}

const proposal: ProposalType = { 
  1: 'KT1ExMeV39XPUEyARJYwjUMfC1Lq1PLwo8bh', 
  2: 'KT1KnNfPjgnn7jznstBZ7FXvwBEH5RwjLafK',
  3: 'KT1S9iHKShcrkJLZMTeeEcqgKZ3gQQgmcKBg'
}

export const voteProposal = async (proposalNumber: number, vote: number) =>  {
  if(proposalNumber > 3 || proposalNumber < 1) {
    return Error
  }
  
  await Tezos.contract
  .at(proposal[proposalNumber])
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
    return hash
  })
  .catch((error) => {
    console.log(`Vote error: ${JSON.stringify(error, null, 2)}`)
  });
} 

export const resetProposal = async (proposalNumber: number) =>  {
  if(proposalNumber > 3 || proposalNumber < 1) {
    return Error
  }

  await Tezos.contract
  .at(proposal[proposalNumber])
  .then((contract) => {
    console.log('Reset proposal...')
    return contract.methods.reset().send();
  })
  .then((op) => {
    console.log(`Waiting for ${op.hash} to be confirmed...`);
    return op.confirmation(1).then(() => op.hash);
  })
  .then((hash) => {
    console.log(`Reset operation finished: https://better-call.dev/ghostnet/opg/${hash}`)
    return hash
  })
  .catch((error) => {
    console.log(`Reset error: ${JSON.stringify(error, null, 2)}`)
  })
}
