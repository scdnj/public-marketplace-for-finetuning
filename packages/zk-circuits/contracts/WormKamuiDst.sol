// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "./interface/IWormhole.sol";
import "./interface/IWormholeReceiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WormKamuiDst is Ownable, IWormholeReceiver {
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

    struct MyMessage {
        address recipient;
        string message;
    }

    event Voted(address indexed from, uint256 proposal, bool accept);

    // goerli core bridge: https://book.wormhole.com/reference/contracts.html#testnet
    address private whAddr = 0x706abc4E45D419950511e474C7B9Ed348A4a716c;
    IWormhole public immutable wormhole = IWormhole(whAddr);


    mapping(uint16 => bytes32) public registeredContracts;
    mapping(bytes32 => bool) public hasProcessedMessage;
    string[] public messageHistory;


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
        bool accept
    ) public {
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

    function registerEmitter(uint16 chainId, bytes32 emitterAddress) public {
        // require(msg.sender == owner);
        registeredContracts[chainId] = emitterAddress;
    }

    function receiveWormholeMessages(
        bytes[] memory signedVaas,
        bytes[] memory
    ) public payable override {
        (IWormhole.VM memory parsed, bool valid, string memory reason)
            = wormhole.parseAndVerifyVM(signedVaas[0]);

        require(valid, reason);
        require(
            registeredContracts[parsed.emitterChainId] == parsed.emitterAddress,
            "Emitter address not valid"
        );

        require(!hasProcessedMessage[parsed.hash]);

        MyMessage memory message = abi.decode(parsed.payload, (MyMessage));
        require(message.recipient == address(this));

        hasProcessedMessage[parsed.hash] = true;
        messageHistory.push(message.message);
    }

    function getFullMessageHistory() public view returns (string[] memory) {
        return messageHistory;
    }
}
