import { PublicKey } from "@solana/web3.js";
import {
  any,
  boolean,
  coerce,
  enums,
  Infer,
  instance,
  number,
  optional,
  string,
  type,
} from "superstruct";

export type TokenAccountType = Infer<typeof TokenAccountType>;
export const TokenAccountType = enums(["mint", "account", "multisig"]);

const AccountState = enums(["initialized", "uninitialized", "frozen"]);

const PublicKeyFromString = coerce(
  instance(PublicKey),
  string(),
  (value) => new PublicKey(value)
);

const TokenAmount = type({
  decimals: number(),
  uiAmountString: string(),
  amount: string(),
});

export type TokenAccountInfo = Infer<typeof TokenAccountInfo>;
export const TokenAccountInfo = type({
  mint: PublicKeyFromString,
  owner: PublicKeyFromString,
  tokenAmount: TokenAmount,
  delegate: optional(PublicKeyFromString),
  state: AccountState,
  isNative: boolean(),
  rentExemptReserve: optional(TokenAmount),
  delegatedAmount: optional(TokenAmount),
  closeAuthority: optional(PublicKeyFromString),
});

// export type TokenAccount = Infer<typeof TokenAccount>;
// export const TokenAccount = type({
//   type: TokenAccountType,
//   info: TokenAccountInfo,
// });

export type ParsedInfo = Infer<typeof ParsedInfo>;
export const ParsedInfo = type({
  type: string(),
  info: TokenAccountInfo,
});

export type TokenAccount = Infer<typeof TokenAccount>;
export const TokenAccount = type({
  program: string(),
  parsed: ParsedInfo,
});
