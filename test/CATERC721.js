const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers, upgrades } = require("hardhat");
const { expect } = require("chai");

const name = "CATERC721Test";
const symbol = "CATTEST";

const wormholeChainId = "1";
const wormholeCoreContract = "0x9BF4eb2fd0E414B813E5253811055238E8923A48";
const finality = 1;
const nowTime = parseInt(Math.floor(new Date().getTime() / 1000));
const validTime = nowTime + 300;

describe("CATERC721", () => {
  async function deployFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const TestNFTFactory = await ethers.getContractFactory("TestNFT");
    const CATERC721Factory = await ethers.getContractFactory("CATERC721");
    const TestNFTInstance = await TestNFTFactory.deploy();
    await TestNFTInstance.deployed();
    const CATERC721Instance = await CATERC721Factory.deploy(name, symbol);
    await CATERC721Instance.deployed();

    const initialize = await CATERC721Instance.connect(owner).initialize(
      wormholeChainId,
      wormholeCoreContract,
      finality
    );
    await initialize.wait();

    return {
      owner,
      otherAccount,
      TestNFTInstance,
      CATERC721Instance,
    };
  }

  async function makeSignature(custodian, validTill, signer) {
    let messageHash = ethers.utils.solidityKeccak256(
      ["address", "uint256"],
      [custodian, validTill]
    );

    let messageHashBinary = ethers.utils.arrayify(messageHash);
    let signature = await signer.signMessage(messageHashBinary);

    return { custodian, validTill, signature };
  }

  describe("Governance Functions", () => {
    it("registerChain", async () => {
      const { owner, otherAccount, TestNFTInstance, CATERC721Instance } = await deployFixture();
      const { custodian, validTill, signature } = await makeSignature(
        otherAccount.address,
        validTime,
        owner
      );
      const SignatureVerification = [custodian, validTill, signature];

      const TestNFTBytes32 = await CATERC721Instance.connect(otherAccount).addressToBytes(
        TestNFTInstance.address
      );
      await CATERC721Instance.connect(otherAccount).registerChain(
        2,
        TestNFTBytes32,
        SignatureVerification
      );

      expect(await CATERC721Instance.tokenContracts(2)).to.equal(TestNFTBytes32);
    });

    it("register multiple chains", async () => {
      const { owner, otherAccount, TestNFTInstance, CATERC721Instance } = await deployFixture();
      const { custodian, validTill, signature } = await makeSignature(
        otherAccount.address,
        validTime,
        owner
      );
      const SignatureVerification = [custodian, validTill, signature];
      const chaindIds = [1, 2, 3];
      const tokenAddresses = [
        "0x0000000000000000000000000000000000000001",
        "0x0000000000000000000000000000000000000002",
        "0x0000000000000000000000000000000000000003",
      ];
      const tokenAddressesBytes32 = [];

      for (let i = 0; i < chaindIds.length; i++) {
        tokenAddressesBytes32.push(
          await CATERC721Instance.connect(otherAccount).addressToBytes(tokenAddresses[i])
        );
      }

      await CATERC721Instance.connect(otherAccount).registerChains(
        chaindIds,
        tokenAddressesBytes32,
        SignatureVerification
      );

      expect(await CATERC721Instance.tokenContracts(chaindIds[0])).to.equal(
        tokenAddressesBytes32[0]
      );
      expect(await CATERC721Instance.tokenContracts(chaindIds[1])).to.equal(
        tokenAddressesBytes32[1]
      );
      expect(await CATERC721Instance.tokenContracts(chaindIds[2])).to.equal(
        tokenAddressesBytes32[2]
      );
    });

    it("update finality", async () => {
      const { owner, otherAccount, TestNFTInstance, CATERC721Instance } = await deployFixture();
      const { custodian, validTill, signature } = await makeSignature(
        otherAccount.address,
        validTime,
        owner
      );
      const SignatureVerification = [custodian, validTill, signature];
      const newFinality = 15;

      await CATERC721Instance.connect(otherAccount).updateFinality(
        newFinality,
        SignatureVerification
      );

      expect(await CATERC721Instance.finality()).to.equal(newFinality);
    });
  });

  describe("Encoding and Decoding Transfers", () => {
    it("encode and decode data to transfer", async () => {
      const { owner, otherAccount, TestNFTInstance, CATERC721Instance } = await deployFixture();

      const data = {
        tokenAddress: await CATERC721Instance.addressToBytes(TestNFTInstance.address),
        tokenChain: 1,
        tokenID: 1,
        uri: "hello",
        toAddress: await CATERC721Instance.addressToBytes(otherAccount.address),
        toChain: 2,
      };

      const encoded = await CATERC721Instance.encodeTransfer(data);
      const decoded = await CATERC721Instance.decodeTransfer(encoded);

      expect(decoded.tokenAddress).to.equal(data.tokenAddress);
      expect(decoded.tokenChain).to.equal(data.tokenChain);
      expect(decoded.tokenID).to.equal(data.tokenID);
      expect(decoded.uri).to.equal(data.uri);
      expect(decoded.toAddress).to.equal(data.toAddress);
      expect(decoded.toChain).to.equal(data.toChain);
    });
  });
});
