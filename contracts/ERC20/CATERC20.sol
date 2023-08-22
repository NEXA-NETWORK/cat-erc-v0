// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

import "../shared/WormholeStructs.sol";
import "../interfaces/IWormhole.sol";
import "../interfaces/ICATERC20.sol";
import "./Governance.sol";
import "./Structs.sol";

contract CATERC20 is Context, ERC20, CATERC20Governance, CATERC20Events, ERC165 {
    using SafeERC20 for IERC20;

    constructor(string memory name, string memory symbol, uint8 decimal) ERC20(name, symbol) {
        setEvmChainId(block.chainid);
        setDecimals(decimal);
    }

    function initialize(
        uint16 chainId,
        address wormhole,
        uint8 finality,
        uint256 maxSupply
    ) public onlyOwner {
        require(isInitialized() == false, "Already Initialized");
        require(maxSupply <= type(uint64).max, "Max supply can't exceed maximum u64 value");
        require(chainId != 0, "Invalid chainId");

        setChainId(chainId);
        setWormhole(wormhole);
        setFinality(finality);
        setMaxSupply(maxSupply);
        setMintedSupply(0);
        setIsInitialized();
    }

    function decimals() public view virtual override returns (uint8) {
        return getDecimals();
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC165) returns (bool) {
        return interfaceId == type(ICATERC20).interfaceId || super.supportsInterface(interfaceId);
    }

    /**
     * @dev To bridge tokens to other chains.
     */
    function bridgeOut(
        uint256 amount,
        uint16 recipientChain,
        bytes32 recipient,
        uint32 nonce
    ) external payable returns (uint64 sequence) {
        require(isInitialized() == true, "Not Initialized");
        require(evmChainId() == block.chainid, "unsupported fork");
        require(amount <= type(uint64).max, "Amount exceeds u64");

        uint256 fee = wormhole().messageFee();
        require(msg.value >= fee, "Not enough fee provided to publish message");
        uint16 tokenChain = wormhole().chainId();
        bytes32 tokenAddress = bytes32(uint256(uint160(address(this))));

        _burn(_msgSender(), amount);

        uint256 foreignAmount = normalizeAmount(amount, getDecimals());

        CATERC20Structs.CrossChainPayload memory transfer = CATERC20Structs.CrossChainPayload({
            amount: foreignAmount,
            tokenAddress: tokenAddress,
            tokenChain: tokenChain,
            toAddress: recipient,
            toChain: recipientChain,
            tokenDecimals: getDecimals()
        });

        sequence = wormhole().publishMessage{value: msg.value}(
            nonce,
            encodeTransfer(transfer),
            finality()
        );

        emit bridgeOutEvent(
            foreignAmount,
            tokenChain,
            recipientChain,
            addressToBytes(_msgSender()),
            recipient,
            getDecimals()
        );
    } // end of function

    function bridgeIn(bytes memory encodedVm) external returns (bytes memory) {
        require(isInitialized() == true, "Not Initialized");
        require(evmChainId() == block.chainid, "unsupported fork");

        (IWormhole.VM memory vm, bool valid, string memory reason) = wormhole().parseAndVerifyVM(
            encodedVm
        );
        require(valid, reason);
        require(
            bytesToAddress(vm.emitterAddress) == address(this) ||
                tokenContracts(vm.emitterChainId) == vm.emitterAddress,
            "Invalid Emitter"
        );

        CATERC20Structs.CrossChainPayload memory transfer = decodeTransfer(vm.payload);
        address transferRecipient = bytesToAddress(transfer.toAddress);

        require(!isTransferCompleted(vm.hash), "transfer already completed");
        setTransferCompleted(vm.hash);

        require(transfer.toChain == wormhole().chainId(), "invalid target chain");

        uint256 nativeAmount = deNormalizeAmount(transfer.amount, getDecimals());

        _mint(transferRecipient, nativeAmount);

        emit bridgeInEvent(
            nativeAmount,
            transfer.tokenChain,
            transfer.toChain,
            transfer.toAddress,
            transfer.tokenDecimals
        );

        return vm.payload;
    }

    function mint(address recipient, uint256 amount) public onlyOwner {
        require(mintedSupply() + amount <= maxSupply(), "MAX SUPPLY REACHED");
        setMintedSupply(mintedSupply() + amount);
        _mint(recipient, amount);
    }
}
