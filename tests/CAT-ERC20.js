const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("CAT ERC20", function () {
  async function deployFixture() {
    const [owner, otherAccount, otherAccount1] = await ethers.getSigners();

    const ERC20CATFactory = await ethers.getContractFactory("CATEERC20");
    const ERC20CATContractInstance = await ERC20CATFactory.deply();
    await ERC20CATContractInstance.deployed();
  }
});
