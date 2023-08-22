// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

interface ICircuitsVerifier {
    /// @return r  bool true if proof is valid
    function verifyProof(
            uint[2] memory a,
            uint[2][2] memory b,
            uint[2] memory c
        ) external view returns (bool r);
}