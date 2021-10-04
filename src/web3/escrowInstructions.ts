import { serialize } from "borsh";
import BN from "bn.js";
import {
  AccountLayout,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  NATIVE_MINT,
  Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  TransactionInstruction,
} from "@solana/web3.js";
import {
  CancelEscrowdataArgs,
  CANCEL_ESCROW_SCHEMA,
  InitEscrowdataArgs,
  Escrowdata,
  INIT_ESCROW_SCHEMA,
  TradeEscrowdataArgs,
  TRADE_ESCROW_SCHEMA,
} from "../schema/escrowdata";
import { EscrowLayout, ESCROW_ACCOUNT_DATA_LAYOUT } from "./escrowLayout";

/**
 * Initialize TokenAccount before Escrow
 * 1. Initialize temp TokenAccount as MintTokenAccount
 *   -> owner: Payer(initializer)
 * 2. Transfer tokens to TempAccount from MintToken Account
 */
export function initAccountInstruction({
  tempTokenAccountPublicKey,
  mint,
  mintTokenAccount,
  payer,
  amount,
}: {
  tempTokenAccountPublicKey: PublicKey;
  mint: PublicKey;
  mintTokenAccount: PublicKey;
  payer: PublicKey;
  amount: number;
}): TransactionInstruction[] {
  const initTempAccountInstruction = Token.createInitAccountInstruction(
    TOKEN_PROGRAM_ID,
    mint,
    tempTokenAccountPublicKey,
    payer
  );
  const transferTokensToTempAccInstruction = Token.createTransferInstruction(
    TOKEN_PROGRAM_ID,
    mintTokenAccount,
    tempTokenAccountPublicKey,
    payer,
    [],
    amount
  );

  return [initTempAccountInstruction, transferTokensToTempAccInstruction];
}

export async function createAccountInstruction({
  connection,
  tokenAccount,
  payer,
}: {
  connection: Connection;
  tokenAccount: Keypair;
  payer: PublicKey;
}): Promise<TransactionInstruction> {
  // https://github.com/solana-labs/solana-program-library/blob/master/token/js/client/token.js#L356
  return SystemProgram.createAccount({
    programId: TOKEN_PROGRAM_ID,
    space: AccountLayout.span,
    lamports: await connection.getMinimumBalanceForRentExemption(
      AccountLayout.span,
      "singleGossip"
    ),
    fromPubkey: payer,
    newAccountPubkey: tokenAccount.publicKey,
  });
}

export async function createEscrowAccountInstruction({
  connection,
  escrowAccount,
  payer,
  programId,
}: {
  connection: Connection;
  escrowAccount: Keypair;
  payer: PublicKey;
  programId: PublicKey;
}): Promise<TransactionInstruction> {
  return SystemProgram.createAccount({
    programId,
    space: ESCROW_ACCOUNT_DATA_LAYOUT.span,
    lamports: await connection.getMinimumBalanceForRentExemption(
      ESCROW_ACCOUNT_DATA_LAYOUT.span,
      "singleGossip"
    ),
    fromPubkey: payer,
    newAccountPubkey: escrowAccount.publicKey,
  });
}

export function createInitEscrowInstruction({
  initializer,
  tempTokenAccount,
  receiveTokenAccount,
  escrowAccount,
  escrowProgramId,
  amount,
}: {
  initializer: PublicKey;
  tempTokenAccount: PublicKey;
  receiveTokenAccount: PublicKey;
  escrowAccount: PublicKey;
  escrowProgramId: PublicKey;
  amount: number;
}): TransactionInstruction {
  const data = new Escrowdata(new BN(amount));
  const value = new InitEscrowdataArgs({ data });
  const txnData = Buffer.from(serialize(INIT_ESCROW_SCHEMA, value));
  const keys = [
    {
      pubkey: initializer,
      isSigner: true,
      isWritable: false,
    },
    {
      pubkey: tempTokenAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: receiveTokenAccount,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: escrowAccount,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: SYSVAR_RENT_PUBKEY,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: TOKEN_PROGRAM_ID,
      isSigner: false,
      isWritable: false,
    },
  ];

  return new TransactionInstruction({
    keys,
    programId: escrowProgramId,
    data: txnData,
  });
}

export async function createAssociatedAccountInstruction({
  associatedToken,
  mintToken,
  owner,
  payer,
}: {
  associatedToken: PublicKey;
  mintToken: PublicKey;
  owner: PublicKey;
  payer: PublicKey;
}): Promise<TransactionInstruction> {
  return Token.createAssociatedTokenAccountInstruction(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    mintToken,
    associatedToken,
    owner,
    payer
  );
}

export async function createWrappedNativeAccountInstructions({
  connection,
  nativeAccount,
  owner,
  payer,
  amount,
}: {
  connection: Connection;
  nativeAccount: PublicKey;
  owner: PublicKey;
  payer: PublicKey;
  amount: number;
}): Promise<TransactionInstruction[]> {
  const instructions: TransactionInstruction[] = [];
  // Allocate memory for the account
  const balanceNeeded = await Token.getMinBalanceRentForExemptAccount(
    connection
  );
  instructions.push(
    SystemProgram.createAccount({
      fromPubkey: payer,
      newAccountPubkey: nativeAccount,
      lamports: balanceNeeded,
      space: AccountLayout.span,
      programId: TOKEN_PROGRAM_ID,
    })
  );
  instructions.push(
    SystemProgram.transfer({
      fromPubkey: payer,
      toPubkey: nativeAccount,
      lamports: amount,
    })
  );

  instructions.push(
    Token.createInitAccountInstruction(
      TOKEN_PROGRAM_ID,
      NATIVE_MINT,
      nativeAccount,
      owner
    )
  );
  return instructions;
}

export async function createExchangeInstruction({
  connection,
  escrowAccount,
  pda,
  programId,
  seller,
  sellerNFTAccount,
  sellerReceiveTokenAccount,
  expectedSellerReceiveAmount,
}: {
  connection: Connection;
  escrowAccount: PublicKey;
  pda: PublicKey;
  programId: PublicKey;
  seller: PublicKey;
  sellerNFTAccount: PublicKey;
  sellerReceiveTokenAccount: PublicKey;
  expectedSellerReceiveAmount: number;
}): Promise<TransactionInstruction> {
  const encodedEscrowState = (
    await connection.getAccountInfo(escrowAccount, "singleGossip")
  )?.data;
  if (!encodedEscrowState) {
    console.log("Invalid EscrowState");
    throw new Error("Invalid Escrow State");
  }
  const decodedEscrowState = ESCROW_ACCOUNT_DATA_LAYOUT.decode(
    encodedEscrowState
  ) as EscrowLayout;
  const initializerAccount = new PublicKey(
    decodedEscrowState.initializerPubkey
  );
  const initializerReceivingTokenAccount = new PublicKey(
    decodedEscrowState.initializerReceivingTokenAccountPubkey
  );
  const initializerTempToken = new PublicKey(
    decodedEscrowState.initializerTempTokenAccountPubkey
  );
  const data = new Escrowdata(new BN(expectedSellerReceiveAmount));
  const value = new TradeEscrowdataArgs({ data });
  const txnData = Buffer.from(serialize(TRADE_ESCROW_SCHEMA, value));

  return new TransactionInstruction({
    programId,
    data: txnData,
    keys: [
      {
        pubkey: seller,
        isSigner: true,
        isWritable: false,
      },
      {
        pubkey: sellerNFTAccount,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: sellerReceiveTokenAccount,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: initializerTempToken,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: initializerAccount,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: initializerReceivingTokenAccount,
        isSigner: false,
        isWritable: true,
      },
      { pubkey: escrowAccount, isSigner: false, isWritable: true },
      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
      { pubkey: pda, isSigner: false, isWritable: false },
    ],
  });
}

export function createCloseAccountInstruction({
  accountToClose,
  receiveAmountAccount,
  owner,
}: {
  accountToClose: PublicKey;
  receiveAmountAccount: PublicKey;
  owner: PublicKey;
}): TransactionInstruction {
  return Token.createCloseAccountInstruction(
    TOKEN_PROGRAM_ID,
    accountToClose,
    receiveAmountAccount,
    owner,
    []
  );
}
