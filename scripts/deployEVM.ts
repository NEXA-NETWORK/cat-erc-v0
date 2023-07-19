import { ethers } from "hardhat";
import wormhole from "@certusone/wormhole-sdk";
import hre from "hardhat";
import fs from "fs";
import path from "path";
const deploymentsPath = path.join("../deployinfo/evm.deploy.json");

const name = "TestToken";
const symbol = "TST";
const decimals = 9;
const maxSupply = "10000000000000000000";
const wormholeChainId = "2";
const wormholeCoreContract = "0xC89Ce4735882C9F0f0FE26686c53074E09B0D550";

async function deploy() {
    const CATERC20 = await ethers.getContractFactory("CATERC20");

    const catERC20 = await CATERC20.deploy(name, symbol, decimals);
    await catERC20.deployed();

    const initialize = await catERC20.initialize(
        wormholeChainId,
        wormholeCoreContract,
        1,
        maxSupply
    );
    await initialize.wait();

    const signers = await ethers.getSigners();


    try {
        // check if accounts is an array of strings
        const contents = {
            contractName: "CATERC20",
            chainId: hre.network.config.chainId,
            wormholeChainId: wormholeChainId,
            chainName: hre.network.name,
            address: catERC20.address,
            privateKeys: hre.network.config.accounts,
            publicKey: signers.map((s) => s.address),
            url: "http://localhost:8545",
        };

        fs.writeFileSync(deploymentsPath, JSON.stringify(contents, null, 2), "utf8");
        console.log("Finished deploying CATERC20");
    } catch (error) { }
}

deploy();
