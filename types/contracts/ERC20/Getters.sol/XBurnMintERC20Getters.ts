/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../common";

export declare namespace XBurnMintERC20Structs {
  export type CrossChainPayloadStruct = {
    amount: PromiseOrValue<BigNumberish>;
    tokenAddress: PromiseOrValue<BytesLike>;
    tokenChain: PromiseOrValue<BigNumberish>;
    to: PromiseOrValue<BytesLike>;
    toChain: PromiseOrValue<BigNumberish>;
  };

  export type CrossChainPayloadStructOutput = [
    BigNumber,
    string,
    number,
    string,
    number
  ] & {
    amount: BigNumber;
    tokenAddress: string;
    tokenChain: number;
    to: string;
    toChain: number;
  };
}

export interface XBurnMintERC20GettersInterface extends utils.Interface {
  functions: {
    "addressToBytes(address)": FunctionFragment;
    "bytesToAddress(bytes32)": FunctionFragment;
    "chainId()": FunctionFragment;
    "decodeTransfer(bytes)": FunctionFragment;
    "encodeTransfer((uint256,bytes32,uint16,bytes32,uint16))": FunctionFragment;
    "evmChainId()": FunctionFragment;
    "finality()": FunctionFragment;
    "isTransferCompleted(bytes32)": FunctionFragment;
    "tokenContracts(uint16)": FunctionFragment;
    "wormhole()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "addressToBytes"
      | "bytesToAddress"
      | "chainId"
      | "decodeTransfer"
      | "encodeTransfer"
      | "evmChainId"
      | "finality"
      | "isTransferCompleted"
      | "tokenContracts"
      | "wormhole"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addressToBytes",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "bytesToAddress",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(functionFragment: "chainId", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "decodeTransfer",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "encodeTransfer",
    values: [XBurnMintERC20Structs.CrossChainPayloadStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "evmChainId",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "finality", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "isTransferCompleted",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenContracts",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "wormhole", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "addressToBytes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "bytesToAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "chainId", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "decodeTransfer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "encodeTransfer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "evmChainId", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "finality", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isTransferCompleted",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokenContracts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "wormhole", data: BytesLike): Result;

  events: {};
}

export interface XBurnMintERC20Getters extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: XBurnMintERC20GettersInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    addressToBytes(
      a: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    bytesToAddress(
      b: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    chainId(overrides?: CallOverrides): Promise<[number]>;

    decodeTransfer(
      encoded: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<
      [XBurnMintERC20Structs.CrossChainPayloadStructOutput] & {
        transfer: XBurnMintERC20Structs.CrossChainPayloadStructOutput;
      }
    >;

    encodeTransfer(
      transfer: XBurnMintERC20Structs.CrossChainPayloadStruct,
      overrides?: CallOverrides
    ): Promise<[string] & { encoded: string }>;

    evmChainId(overrides?: CallOverrides): Promise<[BigNumber]>;

    finality(overrides?: CallOverrides): Promise<[number]>;

    isTransferCompleted(
      hash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    tokenContracts(
      chainId_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    wormhole(overrides?: CallOverrides): Promise<[string]>;
  };

  addressToBytes(
    a: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  bytesToAddress(
    b: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  chainId(overrides?: CallOverrides): Promise<number>;

  decodeTransfer(
    encoded: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<XBurnMintERC20Structs.CrossChainPayloadStructOutput>;

  encodeTransfer(
    transfer: XBurnMintERC20Structs.CrossChainPayloadStruct,
    overrides?: CallOverrides
  ): Promise<string>;

  evmChainId(overrides?: CallOverrides): Promise<BigNumber>;

  finality(overrides?: CallOverrides): Promise<number>;

  isTransferCompleted(
    hash: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  tokenContracts(
    chainId_: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  wormhole(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    addressToBytes(
      a: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    bytesToAddress(
      b: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    chainId(overrides?: CallOverrides): Promise<number>;

    decodeTransfer(
      encoded: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<XBurnMintERC20Structs.CrossChainPayloadStructOutput>;

    encodeTransfer(
      transfer: XBurnMintERC20Structs.CrossChainPayloadStruct,
      overrides?: CallOverrides
    ): Promise<string>;

    evmChainId(overrides?: CallOverrides): Promise<BigNumber>;

    finality(overrides?: CallOverrides): Promise<number>;

    isTransferCompleted(
      hash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    tokenContracts(
      chainId_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    wormhole(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    addressToBytes(
      a: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    bytesToAddress(
      b: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    chainId(overrides?: CallOverrides): Promise<BigNumber>;

    decodeTransfer(
      encoded: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    encodeTransfer(
      transfer: XBurnMintERC20Structs.CrossChainPayloadStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    evmChainId(overrides?: CallOverrides): Promise<BigNumber>;

    finality(overrides?: CallOverrides): Promise<BigNumber>;

    isTransferCompleted(
      hash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenContracts(
      chainId_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    wormhole(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    addressToBytes(
      a: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    bytesToAddress(
      b: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    chainId(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    decodeTransfer(
      encoded: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    encodeTransfer(
      transfer: XBurnMintERC20Structs.CrossChainPayloadStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    evmChainId(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    finality(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isTransferCompleted(
      hash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokenContracts(
      chainId_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    wormhole(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}