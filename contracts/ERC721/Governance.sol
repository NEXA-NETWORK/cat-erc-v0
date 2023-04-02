// contracts/Bridge.sol
// SPDX-License-Identifier: Apache 2

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

import "../libraries/BytesLib.sol";

import "./Getters.sol";
import "./Setters.sol";
import "./Structs.sol";

import "../interfaces/IWormhole.sol";

contract XBurnMintERC721Governance is XBurnMintERC721Getters, XBurnMintERC721Setters, Ownable {
    using BytesLib for bytes;

    /**
     * @dev verifySignature serves to verify a signature for owner verification purposes.
     * - it computes the keccak256 hash of data passed by the client
     * - it recovers the authority key from the hashed data and signature
     */
    function verifySignature(
        bytes memory encodedHashData,
        bytes memory sig,
        address authority
    ) internal pure returns (bool) {
        require(sig.length == 65, "incorrect signature length");
        require(encodedHashData.length > 0, "no hash data");

        /// compute hash from encoded data
        bytes32 hash_ = keccak256(encodedHashData);

        /// parse v, r, s
        uint8 index = 0;

        bytes32 r = sig.toBytes32(index);
        index += 32;

        bytes32 s = sig.toBytes32(index);
        index += 32;

        uint8 v = sig.toUint8(index) + 27;

        /// recovered key
        address key = ecrecover(hash_, v, r, s);

        /// confirm that the recovered key is the authority
        if (key == authority) {
            return true;
        } else {
            return false;
        }
    }

    /// @dev verify owner is caller or the caller has valid owner signature
    modifier onlyOwnerOrOwnerSignature(
        XBurnMintERC721Structs.SignatureVerification memory signatureArguments
    ) {
        if (msg.sender == owner()) {
            _;
        } else {
            bytes memory encodedHashData = abi.encodePacked(
                signatureArguments.custodian,
                signatureArguments.validTill
            );
            require(signatureArguments.custodian == msg.sender, "custodian can call only");
            require(signatureArguments.validTill > block.timestamp, "signed transaction expired");
            require(
                verifySignature(encodedHashData, signatureArguments.signature, owner()),
                "unauthorized signature"
            );
            _;
        }
    }

    // Execute a RegisterChain governance message
    function registerChain(
        uint16 chainId,
        bytes32 tokenContract,
        XBurnMintERC721Structs.SignatureVerification memory signatureArguments
    ) public onlyOwnerOrOwnerSignature(signatureArguments) {
        setTokenImplementation(chainId, tokenContract);
    }

    function registerChains(
        uint16[] memory chainId,
        bytes32[] memory tokenContract,
        XBurnMintERC721Structs.SignatureVerification memory signatureArguments
    ) public onlyOwnerOrOwnerSignature(signatureArguments) {
        require(chainId.length == tokenContract.length, "Invalid Input");
        for (uint256 i = 0; i < tokenContract.length; i++) {
            setTokenImplementation(chainId[i], tokenContract[i]);
        }
    }

    // Execute a RegisterChain governance message
    function updateFinality(
        uint8 finality,
        XBurnMintERC721Structs.SignatureVerification memory signatureArguments
    ) public onlyOwnerOrOwnerSignature(signatureArguments) {
        setFinality(finality);
    }

    function updateBaseUri(
        string memory uri,
        XBurnMintERC721Structs.SignatureVerification memory signatureArguments
    ) public onlyOwnerOrOwnerSignature(signatureArguments) {
        setBaseUri(uri);
    }
}
