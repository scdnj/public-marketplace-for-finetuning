// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract WeightMarket {
    struct Weight {
        string name;
        string url;
        string uploadType;
        uint256 price;
    }

    mapping (address => string[]) public userWeight;
    mapping (uint256 => Weight) public weightList;
    uint public totalWeight = 0;
    
    function uploadWeight (
        string memory name,
        string memory url,
        string memory uploadType,
        uint256 price
        ) public {
            Weight storage weight = weightList[totalWeight];
            weight.name = name;
            weight.url = url;
            weight.uploadType = uploadType;
            weight.price = price;
            totalWeight += 1;
    }

    function buyWeight (uint256 id) public payable{
        require(msg.value == weightList[id].price, "need to pay right price");
        userWeight[msg.sender].push(weightList[id].url);
    }

    function getList (address user) public view returns (string[] memory){
        return userWeight[user];
    }
}
