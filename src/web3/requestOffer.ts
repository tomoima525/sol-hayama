import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  NATIVE_MINT,
  Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { SignerWalletAdapterProps } from "@solana/wallet-adapter-base";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  TransactionInstruction,
} from "@solana/web3.js";
import BigNumber from "bignumber.js";
import { CreateTxHistoryInput, TransactionStatus } from "../API";
import { escrowProgramPublicKey } from "../constants";
import {
  createAccountInstruction,
  initAccountInstruction,
  createEscrowAccountInstruction,
  createInitEscrowInstruction,
  createAssociatedAccountInstruction,
  createWrappedNativeAccountInstructions,
  createCloseAccountInstruction,
} from "./escrowInstructions";
import { generateTransaction, signAndSendTransaction } from "./transaction";

export async function requestOffer({
  connection,
  buyer,
  sellerAddressStr,
  sellerNFTAddressStr,
  signTransaction,
  amountInSol,
  fee,
}: {
  connection: Connection;
  buyer: PublicKey;
  sellerAddressStr: string;
  sellerNFTAddressStr: string;
  signTransaction: SignerWalletAdapterProps["signTransaction"];
  amountInSol: number;
  fee: number;
}): Promise<CreateTxHistoryInput> {
  const totalAmountInLamport = new BigNumber(amountInSol)
    .plus(new BigNumber(fee))
    .multipliedBy(LAMPORTS_PER_SOL)
    .toNumber();
  const feeInLamport = fee * LAMPORTS_PER_SOL;
  const instructions: TransactionInstruction[] = [];

  const seller = new PublicKey(sellerAddressStr);
  const sellerNFTAddress = new PublicKey(sellerNFTAddressStr);

  // Create Mint Token Account that has token to transfer
  // Create a new account
  const mintTokenAccount = Keypair.generate();
  instructions.push(
    ...(await createWrappedNativeAccountInstructions({
      connection,
      nativeAccount: mintTokenAccount.publicKey,
      owner: buyer,
      payer: buyer,
      lamports: totalAmountInLamport,
    }))
  );

  const associatedAccountForSeller = await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    NATIVE_MINT,
    seller
  );

  // Check if seller has an associated token for native mint
  const info = await connection.getAccountInfo(associatedAccountForSeller);

  if (info === null) {
    instructions.push(
      await createAssociatedAccountInstruction({
        associatedToken: associatedAccountForSeller,
        mintToken: NATIVE_MINT,
        owner: seller,
        payer: buyer,
      })
    );
  }

  console.log(
    "Associated Token Account for Seller:",
    associatedAccountForSeller.toBase58()
  );

  const associatedAccountForReceivingNFT =
    await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      sellerNFTAddress,
      buyer
    );

  instructions.push(
    await createAssociatedAccountInstruction({
      associatedToken: associatedAccountForReceivingNFT,
      mintToken: sellerNFTAddress,
      owner: buyer,
      payer: buyer,
    })
  );

  console.log(
    "Associated Token Account for Buyer",
    associatedAccountForReceivingNFT.toBase58()
  );
  console.log("Create temp Account");
  const tempTokenAccount = Keypair.generate();
  instructions.push(
    await createAccountInstruction({
      connection,
      tokenAccount: tempTokenAccount,
      payer: buyer,
    })
  );

  instructions.push(
    ...initAccountInstruction({
      tempTokenAccountPublicKey: tempTokenAccount.publicKey,
      payer: buyer,
      mint: NATIVE_MINT,
      mintTokenAccount: mintTokenAccount.publicKey,
      totalAmount: totalAmountInLamport,
    })
  );

  console.log("Create escrowToken");
  const escrowAccount = Keypair.generate();
  instructions.push(
    await createEscrowAccountInstruction({
      connection,
      escrowAccount,
      payer: buyer,
      programId: escrowProgramPublicKey,
    })
  );

  console.log("Initialize Escrow");
  instructions.push(
    createInitEscrowInstruction({
      initializer: buyer,
      tempTokenAccount: tempTokenAccount.publicKey,
      receiveTokenAccount: associatedAccountForReceivingNFT,
      escrowAccount: escrowAccount.publicKey,
      escrowProgramId: escrowProgramPublicKey,
      amount: 1, // NFT amount is one
      fee: feeInLamport,
    })
  );

  console.log("clean up wrapped token associated account");
  instructions.push(
    createCloseAccountInstruction({
      accountToClose: mintTokenAccount.publicKey,
      receiveAmountAccount: buyer,
      owner: buyer,
    })
  );

  // confirm transaction
  const transaction = await generateTransaction({
    connection,
    feePayer: buyer,
  });
  instructions.forEach((instruction) => transaction.add(instruction));

  transaction.partialSign(
    ...[mintTokenAccount, escrowAccount, tempTokenAccount]
  );

  const signature = await signAndSendTransaction(
    connection,
    signTransaction,
    transaction
  );

  // https://stackoverflow.com/questions/68744958/solana-commitment-vs-preflightcommitment
  // https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment
  await connection.confirmTransaction(signature, "confirmed");

  return {
    buyerAddress: buyer.toBase58(),
    sellerAddress: sellerAddressStr,
    escrowAddress: escrowAccount.publicKey.toBase58(),
    nftAddress: sellerNFTAddressStr,
    offeredAmount: amountInSol,
    status: TransactionStatus.REQUESTED,
  };
}
