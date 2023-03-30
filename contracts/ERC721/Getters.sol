// contracts/Getters.sol
// SPDX-License-Identifier: Apache 2

pragma solidity ^0.8.0;

import "../interfaces/IWormhole.sol";

import "./State.sol";
import "../libraries/BytesLib.sol";

contract XBurnMintERC721Getters is XBurnMintERC721State {

    using BytesLib for bytes;

    function isTransferCompleted(bytes32 hash) public view returns (bool) {
        return _state.completedTransfers[hash];
    }

    function wormhole() public view returns (IWormhole) {
        return IWormhole(_state.wormhole);
    }

    function chainId() public view returns (uint16){
        return _state.provider.chainId;
    }

    function evmChainId() public view returns (uint256) {
        return _state.evmChainId;
    }

    function tokenContracts(uint16 chainId_) public view returns (bytes32){
        return _state.tokenImplementations[chainId_];
    }

    function finality() public view returns (uint8) {
        return _state.provider.finality;
    }

    function baseUri() public view returns (string memory){
        return _state.baseUri;
    }

    /*
     * @dev Truncate a 32 byte array to a 20 byte address.
     *      Reverts if the array contains non-0 bytes in the first 12 bytes.
     *
     * @param bytes32 bytes The 32 byte array to be converted.
     */
    function bytesToAddress(bytes32 b) public pure returns (address) {
        require(bytes12(b) == 0, "invalid EVM address");
        return address(uint160(uint256(b)));
    }

    function addressToBytes(address a) public pure returns (bytes32) {
        return bytes32(uint256(uint160(a)));
    }

    function encodeTransfer(XBurnMintERC721Structs.CrossChainPayload memory transfer) public pure returns (bytes memory encoded) {
            encoded = abi.encodePacked(
            uint8(1),
            transfer.tokenAddress,
            transfer.tokenChain,
            transfer.tokenID,
            uint8(bytes(transfer.uri).length),
            transfer.uri,
            transfer.toAddress,
            transfer.toChain
        );
    }

    function decodeTransfer(bytes memory encoded) public pure returns (XBurnMintERC721Structs.CrossChainPayload memory transfer) {
        uint256 index = 0;

        uint8 payloadID = encoded.toUint8(index);
        index += 1;

        require(payloadID == 1, "invalid Transfer");

        transfer.tokenAddress = encoded.toBytes32(index);
        index += 32;

        transfer.tokenChain = encoded.toUint16(index);
        index += 2;

        transfer.tokenID = encoded.toUint256(index);
        index += 32;

        // Ignore length due to malformatted payload
        index += 1;
        transfer.uri = string(
            encoded.slice(index, encoded.length - index - 34)
        );

        // From here we read backwards due malformatted package
        index = encoded.length;

        index -= 2;
        transfer.toChain = encoded.toUint16(index);

        index -= 32;
        transfer.toAddress = encoded.toBytes32(index);
    }
}