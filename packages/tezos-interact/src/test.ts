import { voteProposal, accessProposal } from './index';

const main = async () => {
  await voteProposal(1)
  await accessProposal()
}

main()
