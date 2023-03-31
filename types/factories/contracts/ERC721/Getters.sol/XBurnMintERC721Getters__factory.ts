/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  XBurnMintERC721Getters,
  XBurnMintERC721GettersInterface,
} from "../../../../contracts/ERC721/Getters.sol/XBurnMintERC721Getters";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "a",
        type: "address",
      },
    ],
    name: "addressToBytes",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "baseUri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "b",
        type: "bytes32",
      },
    ],
    name: "bytesToAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "chainId",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "counter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "encoded",
        type: "bytes",
      },
    ],
    name: "decodeTransfer",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "tokenAddress",
            type: "bytes32",
          },
          {
            internalType: "uint16",
            name: "tokenChain",
            type: "uint16",
          },
          {
            internalType: "uint256",
            name: "tokenID",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "uri",
            type: "string",
          },
          {
            internalType: "bytes32",
            name: "toAddress",
            type: "bytes32",
          },
          {
            internalType: "uint16",
            name: "toChain",
            type: "uint16",
          },
        ],
        internalType: "struct XBurnMintERC721Structs.CrossChainPayload",
        name: "transfer",
        type: "tuple",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "tokenAddress",
            type: "bytes32",
          },
          {
            internalType: "uint16",
            name: "tokenChain",
            type: "uint16",
          },
          {
            internalType: "uint256",
            name: "tokenID",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "uri",
            type: "string",
          },
          {
            internalType: "bytes32",
            name: "toAddress",
            type: "bytes32",
          },
          {
            internalType: "uint16",
            name: "toChain",
            type: "uint16",
          },
        ],
        internalType: "struct XBurnMintERC721Structs.CrossChainPayload",
        name: "transfer",
        type: "tuple",
      },
    ],
    name: "encodeTransfer",
    outputs: [
      {
        internalType: "bytes",
        name: "encoded",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "evmChainId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "finality",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "hash",
        type: "bytes32",
      },
    ],
    name: "isTransferCompleted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "parentChainIdEVM",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "chainId_",
        type: "uint16",
      },
    ],
    name: "tokenContracts",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "wormhole",
    outputs: [
      {
        internalType: "contract IWormhole",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610af0806100206000396000f3fe608060405234801561001057600080fd5b50600436106100df5760003560e01c80639abc83201161008c578063d400e15711610066578063d400e157146101bf578063dc02f456146101d2578063ded8454a146101f2578063f7ee99981461020c57600080fd5b80639abc832014610164578063aa4efa5b14610179578063c599efdd146101ac57600080fd5b8063739fc8d1116100bd578063739fc8d11461010b57806384acd1bb146101295780639a8a05921461014e57600080fd5b80631650515d146100e457806361bc221a146100fb57806364d42b1714610103575b600080fd5b6005545b6040519081526020015b60405180910390f35b6007546100e8565b6004546100e8565b60005462010000900460ff1660405160ff90911681526020016100f2565b6001546001600160a01b03165b6040516001600160a01b0390911681526020016100f2565b60005460405161ffff90911681526020016100f2565b61016c610230565b6040516100f2919061073b565b61019c610187366004610755565b60009081526002602052604090205460ff1690565b60405190151581526020016100f2565b6101366101ba366004610755565b6102c5565b61016c6101cd36600461085a565b610340565b6101e56101e0366004610907565b61038c565b6040516100f29190610958565b6100e86102003660046109bd565b6001600160a01b031690565b6100e861021a3660046109e6565b61ffff1660009081526003602052604090205490565b60606000600601805461024290610a01565b80601f016020809104026020016040519081016040528092919081815260200182805461026e90610a01565b80156102bb5780601f10610290576101008083540402835291602001916102bb565b820191906000526020600020905b81548152906001019060200180831161029e57829003601f168201915b5050505050905090565b60007fffffffffffffffffffffffff000000000000000000000000000000000000000082161561033c5760405162461bcd60e51b815260206004820152601360248201527f696e76616c69642045564d20616464726573730000000000000000000000000060448201526064015b60405180910390fd5b5090565b80516020808301516040808501516060868101518051608089015160a08a01519551939861037698909796929491929101610a3c565b6040516020818303038152906040529050919050565b6040805160c0810182526000808252602082018190529181018290526060808201526080810182905260a08101829052906103c7838261048e565b82526103d4602082610ab4565b90506103e083826104f4565b61ffff1660208301526103f4600282610ab4565b9050610400838261055a565b6040830152610410602082610ab4565b905061041d600182610ab4565b90506104448160228386516104329190610acc565b61043c9190610acc565b8591906105b7565b6060830152508151610457600282610acc565b905061046383826104f4565b61ffff1660a0830152610477602082610acc565b9050610483838261048e565b608083015250919050565b600061049b826020610ab4565b835110156104eb5760405162461bcd60e51b815260206004820152601560248201527f746f427974657333325f6f75744f66426f756e647300000000000000000000006044820152606401610333565b50016020015190565b6000610501826002610ab4565b835110156105515760405162461bcd60e51b815260206004820152601460248201527f746f55696e7431365f6f75744f66426f756e64730000000000000000000000006044820152606401610333565b50016002015190565b6000610567826020610ab4565b835110156104eb5760405162461bcd60e51b815260206004820152601560248201527f746f55696e743235365f6f75744f66426f756e647300000000000000000000006044820152606401610333565b6060816105c581601f610ab4565b10156106135760405162461bcd60e51b815260206004820152600e60248201527f736c6963655f6f766572666c6f770000000000000000000000000000000000006044820152606401610333565b61061d8284610ab4565b8451101561066d5760405162461bcd60e51b815260206004820152601160248201527f736c6963655f6f75744f66426f756e64730000000000000000000000000000006044820152606401610333565b60608215801561068c57604051915060008252602082016040526106d6565b6040519150601f8416801560200281840101858101878315602002848b0101015b818310156106c55780518352602092830192016106ad565b5050858452601f01601f1916604052505b50949350505050565b60005b838110156106fa5781810151838201526020016106e2565b83811115610709576000848401525b50505050565b600081518084526107278160208601602086016106df565b601f01601f19169290920160200192915050565b60208152600061074e602083018461070f565b9392505050565b60006020828403121561076757600080fd5b5035919050565b634e487b7160e01b600052604160045260246000fd5b60405160c0810167ffffffffffffffff811182821017156107a7576107a761076e565b60405290565b803561ffff811681146107bf57600080fd5b919050565b600067ffffffffffffffff808411156107df576107df61076e565b604051601f8501601f19908116603f011681019082821181831017156108075761080761076e565b8160405280935085815286868601111561082057600080fd5b858560208301376000602087830101525050509392505050565b600082601f83011261084b57600080fd5b61074e838335602085016107c4565b60006020828403121561086c57600080fd5b813567ffffffffffffffff8082111561088457600080fd5b9083019060c0828603121561089857600080fd5b6108a0610784565b823581526108b0602084016107ad565b6020820152604083013560408201526060830135828111156108d157600080fd5b6108dd8782860161083a565b606083015250608083013560808201526108f960a084016107ad565b60a082015295945050505050565b60006020828403121561091957600080fd5b813567ffffffffffffffff81111561093057600080fd5b8201601f8101841361094157600080fd5b610950848235602084016107c4565b949350505050565b60208152815160208201526000602083015161ffff8082166040850152604085015160608501526060850151915060c0608085015261099a60e085018361070f565b9150608085015160a08501528060a08601511660c0850152508091505092915050565b6000602082840312156109cf57600080fd5b81356001600160a01b038116811461074e57600080fd5b6000602082840312156109f857600080fd5b61074e826107ad565b600181811c90821680610a1557607f821691505b60208210811415610a3657634e487b7160e01b600052602260045260246000fd5b50919050565b878152600061ffff60f01b808960f01b16602084015287602284015260ff60f81b8760f81b1660428401528551610a7a816043860160208a016106df565b90920160438101949094525060f09190911b16606382015260650195945050505050565b634e487b7160e01b600052601160045260246000fd5b60008219821115610ac757610ac7610a9e565b500190565b600082821015610ade57610ade610a9e565b50039056fea164736f6c634300080a000a";

type XBurnMintERC721GettersConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: XBurnMintERC721GettersConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class XBurnMintERC721Getters__factory extends ContractFactory {
  constructor(...args: XBurnMintERC721GettersConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<XBurnMintERC721Getters> {
    return super.deploy(overrides || {}) as Promise<XBurnMintERC721Getters>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): XBurnMintERC721Getters {
    return super.attach(address) as XBurnMintERC721Getters;
  }
  override connect(signer: Signer): XBurnMintERC721Getters__factory {
    return super.connect(signer) as XBurnMintERC721Getters__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): XBurnMintERC721GettersInterface {
    return new utils.Interface(_abi) as XBurnMintERC721GettersInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): XBurnMintERC721Getters {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as XBurnMintERC721Getters;
  }
}
