import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";

import "hardhat-deploy";

import { resolve } from "path";

import { config as dotenvConfig } from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import { NetworkUserConfig } from "hardhat/types";

dotenvConfig({ path: resolve(__dirname, "./.env") });

const chainIds = {
  hardhat: 1337,
  mainnet: 1,
  binance: 56,
  polygon: 137,
  avalanche: 43114,
  fantom: 250,
  goerli: 5,
  kovan: 42,
  rinkeby: 4,
  ropsten: 3,
  bscTestnet: 97,
  mumbai: 80001,
  fuji: 43113,
};

// Ensure that we have all the environment variables we need.
const privateKey = process.env.PRIVATE_KEY ?? "NO_PRIVATE_KEY";
// const reportGas = process.env.REPORT_GAS ? true : false;
const infuraKey = process.env.INFURA_KEY;
const etherscanApiKey = process.env.ETHERSCAN_API_KEY ?? "NO_API_KEY";
// const bscscanApiKey = process.env.BSCSCAN_API_KEY ?? "NO_API_KEY";
// const polygonscanApiKey = process.env.POLYGONSCAN_API_KEY ?? "NO_API_KEY";
// const snowscanApiKey = process.env.SNOWSCAN_API_KEY ?? "NO_API_KEY";
// const ftmscanApiKey = process.env.FTMSCAN_API_KEY ?? "NO_API_KEY";
// const coinmarketcapApiKey = process.env.COINMARKETCAP_API_KEY;
// const gasPricePublicApi =
//   "https://api.etherscan.io/api?module=proxy&action=eth_gasPrice";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  // gasReporter: {
  //   currency: "USD",
  //   enabled: reportGas,
  //   excludeContracts: [],
  //   src: "./contracts",
  //   token: "ETH",
  //   showTimeSpent: true,
  //   gasPriceApi: gasPricePublicApi,
  //   coinmarketcap: coinmarketcapApiKey,
  // },
  networks: {
    hardhat: {
      forking: {
        url: `https://rpc.ankr.com/eth`,
      },
      chainId: chainIds.hardhat,
    },
    evm: {
      accounts: [
        "0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d",
        "0x6cbed15c793ce57650b9877cf6fa156fbef513c4e6134f022a85b1ffdd59b2a1",
        "0x6370fd033278c143179d81c5526140625662b8daa446c22ee2d73db3707e620c",
        "0x646f1ce2fdad0e6deeeb5c7e8e5543bdde65e86029e2fd9fc169899c440a7913",
        "0xadd53f9a7e588d003326d1cbf9e4a43c061aadd9bc938c843a79e7b4fd2ad743",
        "0x395df67f0c2d2d9fe1ad08d1bc8b6627011959b79c53d7dd6a3536a33ab8a4fd",
        "0xe485d098507f54e7733a205420dfddbe58db035fa577fc294ebd14db90767a52",
        "0xa453611d9419d0e56f499079478fd72c37b251a94bfde4d19872c44cf65386e3",
        "0x829e924fdf021ba3dbbc4225edfece9aca04b929d6e75613329ca6f1d31c0bb4",
        "0xb0057716d5917badaf911b193b12b910811c1497b5bada8d7711f758981c3773",
      ],
      chainId: 1,
      url: "http://localhost:8545",
      gasPrice: "auto",
    },
    mainnet: {
      accounts: [`${privateKey}`],
      chainId: chainIds.mainnet,
      url: "https://rpc.ankr.com/eth",
      gasPrice: "auto",
    },
    goerli: {
      accounts: [`${privateKey}`],
      chainId: chainIds.goerli,
      url: `https://goerli.infura.io/v3/${infuraKey}`,
      gasPrice: "auto",
    },
    kovan: {
      accounts: [`${privateKey}`],
      chainId: chainIds.kovan,
      url: `https://kovan.infura.io/v3/${infuraKey}`,
      gasPrice: "auto",
    },
    rinkeby: {
      accounts: [`${privateKey}`],
      chainId: chainIds.rinkeby,
      url: `https://rinkeby.infura.io/v3/${infuraKey}`,
      gasPrice: "auto",
    },
    ropsten: {
      accounts: [`${privateKey}`],
      chainId: chainIds.ropsten,
      url: `https://ropsten.infura.io/v3/${infuraKey}`,
      gasPrice: "auto",
    },
    binance: {
      accounts: [`${privateKey}`],
      chainId: chainIds.binance,
      url: "https://rpc.ankr.com/bsc",
      gasPrice: "auto",
    },
    polygon: {
      accounts: [`${privateKey}`],
      chainId: chainIds.polygon,
      url: "https://rpc.ankr.com/polygon",
      gasPrice: "auto",
    },
    avalanche: {
      accounts: [`${privateKey}`],
      chainId: chainIds.avalanche,
      url: "https://rpc.ankr.com/avalanche",
      gasPrice: "auto",
    },
    fantom: {
      accounts: [`${privateKey}`],
      chainId: chainIds.fantom,
      url: "https://rpc.ankr.com/fantom",
      gasPrice: "auto",
    },
    bscTestnet: {
      accounts: [`${privateKey}`],
      chainId: chainIds.bscTestnet,
      url: "https://data-seed-prebsc-2-s2.binance.org:8545",
      gasPrice: "auto",
    },
    mumbai: {
      accounts: [`${privateKey}`],
      chainId: chainIds.mumbai,
      url: "https://rpc.ankr.com/polygon_mumbai",
      gasPrice: "auto",
    },
    fuji: {
      accounts: [`${privateKey}`],
      chainId: chainIds.fuji,
      url: "https://rpc.ankr.com/avalanche_fuji",
      gasPrice: "auto",
    },
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
    deploy: "./scripts/deploy",
    deployments: "./deployments",
  },
  solidity: {
    compilers: [
      {
        version: "0.8.10",
        settings: {
          metadata: {
            bytecodeHash: "none",
          },
          optimizer: {
            enabled: true,
            runs: 800,
          },
        },
      },
    ],
    settings: {
      outputSelection: {
        "*": {
          "*": ["storageLayout"],
        },
      },
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  typechain: {
    outDir: "types",
    target: "ethers-v5",
  },
  etherscan: {
    apiKey: {
      mainnet: etherscanApiKey,
      goerli: etherscanApiKey,
      kovan: etherscanApiKey,
      rinkeby: etherscanApiKey,
      ropsten: etherscanApiKey,
      // bsc: bscscanApiKey,
      // bscTestnet: bscscanApiKey,
      // polygon: polygonscanApiKey,
      // polygonMumbai: polygonscanApiKey,
      // avalanche: snowscanApiKey,
      // avalancheFujiTestnet: snowscanApiKey,
      // opera: ftmscanApiKey,
    },
  },
  mocha: {
    timeout: 1000000,
  },
};

export default config;
