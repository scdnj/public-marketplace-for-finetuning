import { voteProposal, resetProposal } from './index';

const main = async () => {
  await voteProposal(1, 1)
  await resetProposal(1)
}

main()
