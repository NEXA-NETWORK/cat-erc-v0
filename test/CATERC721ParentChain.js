const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers, upgrades } = require("hardhat");
const { expect } = require("chai");

const wormholeChainId = "1";
const wormholeCoreContract = "0x9BF4eb2fd0E414B813E5253811055238E8923A48";
const finality = 1;
const nowTime = parseInt(Math.floor(new Date().getTime() / 1000));
const validTime = nowTime + 300;

describe("CATERC721ParentChain", () => {
  async function deployFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const TestNFTFactory = await ethers.getContractFactory("TestNFT");
    const CATERC721ParentChainFactory = await ethers.getContractFactory("CATERC721ParentChain");
    const TestNFTInstance = await TestNFTFactory.deploy();
    await TestNFTInstance.deployed();
    const CATERC721ParentChainInstance = await CATERC721ParentChainFactory.deploy();
    await CATERC721ParentChainInstance.deployed();

    const initialize = await CATERC721ParentChainInstance.connect(owner).initialize(
      wormholeChainId,
      TestNFTInstance.address,
      wormholeCoreContract,
      finality
    );
    await initialize.wait();

    return {
      owner,
      otherAccount,
      TestNFTInstance,
      CATERC721ParentChainInstance,
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
      const { owner, otherAccount, TestNFTInstance, CATERC721ParentChainInstance } = await deployFixture();
      const { custodian, validTill, signature } = await makeSignature(
        otherAccount.address,
        validTime,
        owner
      );
      const SignatureVerification = [custodian, validTill, signature];

      const TestNFTBytes32 = await CATERC721ParentChainInstance.connect(otherAccount).addressToBytes(
        TestNFTInstance.address
      );
      await CATERC721ParentChainInstance.connect(otherAccount).registerChain(
        2,
        TestNFTBytes32,
        SignatureVerification
      );

      expect(await CATERC721ParentChainInstance.tokenContracts(2)).to.equal(TestNFTBytes32);
    });

    it("register multiple chains", async () => {
      const { owner, otherAccount, TestNFTInstance, CATERC721ParentChainInstance } = await deployFixture();
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
          await CATERC721ParentChainInstance.connect(otherAccount).addressToBytes(tokenAddresses[i])
        );
      }

      await CATERC721ParentChainInstance.connect(otherAccount).registerChains(
        chaindIds,
        tokenAddressesBytes32,
        SignatureVerification
      );

      expect(await CATERC721ParentChainInstance.tokenContracts(chaindIds[0])).to.equal(
        tokenAddressesBytes32[0]
      );
      expect(await CATERC721ParentChainInstance.tokenContracts(chaindIds[1])).to.equal(
        tokenAddressesBytes32[1]
      );
      expect(await CATERC721ParentChainInstance.tokenContracts(chaindIds[2])).to.equal(
        tokenAddressesBytes32[2]
      );
    });

    it("update finality", async () => {
      const { owner, otherAccount, TestNFTInstance, CATERC721ParentChainInstance } = await deployFixture();
      const { custodian, validTill, signature } = await makeSignature(
        otherAccount.address,
        validTime,
        owner
      );
      const SignatureVerification = [custodian, validTill, signature];
      const newFinality = 15;

      await CATERC721ParentChainInstance.connect(otherAccount).updateFinality(
        newFinality,
        SignatureVerification
      );

      expect(await CATERC721ParentChainInstance.finality()).to.equal(newFinality);
    });
  });

  describe("Encoding and Decoding Transfers", () => {
    it("encode and decode data to transfer", async () => {
      const { owner, otherAccount, TestNFTInstance, CATERC721ParentChainInstance } = await deployFixture();

      const data = {
        tokenAddress: await CATERC721ParentChainInstance.addressToBytes(TestNFTInstance.address),
        tokenChain: 1,
        tokenID: 1,
        uri: "hello",
        toAddress: await CATERC721ParentChainInstance.addressToBytes(otherAccount.address),
        toChain: 2,
      };

      const encoded = await CATERC721ParentChainInstance.encodeTransfer(data);
      const decoded = await CATERC721ParentChainInstance.decodeTransfer(encoded);

      expect(decoded.tokenAddress).to.equal(data.tokenAddress);
      expect(decoded.tokenChain).to.equal(data.tokenChain);
      expect(decoded.tokenID).to.equal(data.tokenID);
      expect(decoded.uri).to.equal(data.uri);
      expect(decoded.toAddress).to.equal(data.toAddress);
      expect(decoded.toChain).to.equal(data.toChain);
    });
  });
});
