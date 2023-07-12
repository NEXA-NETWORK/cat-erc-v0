# CAT_ERC_Standards
Cross Chain Burn and Mint for ERC721 and ERC20 tokens

## Instruction to run the tests.
To run the contracts locally. we will use Wormhole Devnet called tilt.
```bash
git clone https://github.com/barnjamin/wormhole-local-validator
cd wormhole-local-validator
npm install
npm run evm 
npm run solana
npm run wormhole 
```
The above commands will start a local devnet and deploy the wormhole contracts.
The Private keys required to run the test are already added into the hardhat.config.js file.
To run the tests, run the following command.
```bash
npx hardhat test --network evm
```

and thats it