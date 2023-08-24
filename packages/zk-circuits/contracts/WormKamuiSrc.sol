// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./interface/IWormhole.sol";
import "./interface/ICircuitsVerifier.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WormKamuiSrc is Ownable {
    struct MyMessage {
        address recipient;
        string message;
    }

    // sepoloa core bridge: https://book.wormhole.com/reference/contracts.html#testnet
    address private whAddr = 0x4a8bc80Ed5a4067f1CCf107057b8270E0cC11A78;
    IWormhole public immutable wormhole = IWormhole(whAddr);

    uint256 public lastMessageSequence;

    struct Voter {
        bool voted;
    }

    struct Proposal {
        string name;
        address creator;
        uint acceptCount;
        uint denyCount;
        uint256 endTime;
    }

    struct ProofData {
        uint[2] a;
        uint[2][2] b;
        uint[2] c;
        uint[1] input;
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

    function createProposals(string calldata name, uint256 continueSec) public {
        Proposal storage poll = proposals[totalProposals];
        poll.creator = msg.sender;
        poll.name = name;
        poll.endTime = block.timestamp + continueSec;
        totalProposals += 1;
    }

    function vote(
        uint256 proposal,
        bool accept,
        ProofData memory proofData
    ) public {
        require(verifyProof(proofData), "Verification Failed");
        Voter storage sender = voters[msg.sender][proposal];
        require(block.timestamp < proposals[proposal].endTime, "Vote End");
        require(!sender.voted, "Already voted.");
        sender.voted = true;
        if (accept) proposals[proposal].acceptCount += 1;
        else proposals[proposal].denyCount += 1;
        emit Voted(msg.sender, proposal, accept);
    }

    function getResult(uint256 proposal) public view returns (bool) {
        require(block.timestamp > proposals[proposal].endTime, "Vote Not End");
        if (proposals[proposal].acceptCount > proposals[proposal].denyCount)
            return true;
        else return false;
    }

    function getBlockTime() public view returns (uint256) {
        return block.timestamp;
    }

    function verifyProof(
        ProofData memory proofData
    ) public view returns (bool) {
        return
            verifier.verifyProof(
                proofData.a,
                proofData.b,
                proofData.c,
                proofData.input
            );
    }

    // wormhole
    function getMessageForAddress(address recipient, string calldata message) external pure returns (bytes memory) {
        return abi.encode(MyMessage(recipient, message));
    }

    function sendKYCMessage(
        bytes memory fullMessage,
        ProofData memory proofData
    ) public payable {
        require(verifyProof(proofData), "Verification Failed");
        lastMessageSequence = wormhole.publishMessage{
            value: wormhole.messageFee()
        }(1, fullMessage, 200);
    }

    function emitterAddress() public view returns (bytes32) {
        return bytes32(uint256(uint160(address(this))));
    }
}
