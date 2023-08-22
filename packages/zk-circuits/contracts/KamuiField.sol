// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./interface/ICircuitsVerifier.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract KamuiField is Ownable {
    struct Voter {
        bool voted;
    }

    struct Proposal {
        string name;
        address creater;
        uint acceptCount;
        uint denyCount;
        uint256 endTime;
    }

    struct ProofData {
        uint[2] a;
        uint[2][2] b;
        uint[2] c;
    }

    event Voted(address indexed from, uint256 proposal, bool accept);

    ICircuitsVerifier public verifier;

    constructor(address _verifierAddress) {
        verifier = ICircuitsVerifier(_verifierAddress);
    }

    mapping(address => mapping(uint256 => Voter)) public voters;

    mapping(uint256 => Proposal) public proposals;

    mapping(address => uint[1]) public users; 

    uint public totalProposals = 0;
    
    function createProposals (string calldata name, uint256 continueSec) public{
        Proposal storage poll = proposals[totalProposals];
        poll.creater = msg.sender;
        poll.name = name;
        poll.endTime = block.timestamp + continueSec;
        totalProposals += 1;
    }

    function vote(uint256 proposal, bool accept, ProofData memory proofData) public {
        require(verifyProof(proofData), "Verification Failed");
        Voter storage sender = voters[msg.sender][proposal];
        require(block.timestamp < proposals[proposal].endTime, "Vote End");
        require(!sender.voted, "Already voted.");
        sender.voted = true;
        if (accept) proposals[proposal].acceptCount += 1;
        else proposals[proposal].denyCount += 1;
        emit Voted(msg.sender, proposal, accept);
    }

   function getResult (uint256 proposal) public view returns (bool) {
        require(block.timestamp > proposals[proposal].endTime, "Vote Not End");
        if(proposals[proposal].acceptCount > proposals[proposal].denyCount) return true;
        else return false;
   }

   function getBlockTime () public view returns(uint256) {
        return block.timestamp;
   }

   function verifyProof(ProofData memory proofData) public view returns (bool) {
        return verifier.verifyProof(
            proofData.a,
            proofData.b,
            proofData.c
        );
   }

   function registerUser (address user, uint proof) public onlyOwner {
        users[user] = [proof];
   }
}