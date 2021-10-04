import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  NATIVE_MINT,
  Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { SignerWalletAdapterProps } from "@solana/wallet-adapter-base";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  TransactionInstruction,
} from "@solana/web3.js";
import {
  createCloseAccountInstruction,
  createExchangeInstruction,
} from "./escrowInstructions";
import { generateTransaction, signAndSendTransaction } from "./transaction";

const escrowProgramPublicKey = new PublicKey(
  "HiUeHUfAvcZJvwCAYPvWG7my2r3ZXGtvXUXrc8t7gBru"
);

export async function acceptOffer({
  connection,
  escrowAccountAddressString,
  expectedSellerReceiveAmountInSol,
  seller,
  sellerNFTAddressStr,
  signTransaction,
}: {
  connection: Connection;
  escrowAccountAddressString: string;
  expectedSellerReceiveAmountInSol: number;
  seller: PublicKey;
  sellerNFTAddressStr: string;
  signTransaction: SignerWalletAdapterProps["signTransaction"];
}): Promise<void> {
  const amountInLamport = expectedSellerReceiveAmountInSol * LAMPORTS_PER_SOL;
  const instructions: TransactionInstruction[] = [];

  const escrowAccount = new PublicKey(escrowAccountAddressString);
  const sellerNFT = new PublicKey(sellerNFTAddressStr);

  const associatedAccountForSeller = await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    NATIVE_MINT,
    seller
  );

  const associatedAccountForNFT = await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    sellerNFT,
    seller
  );

  console.log(
    "Associated Token Account for Seller NFT",
    associatedAccountForNFT.toBase58()
  );

  const PDA = await PublicKey.findProgramAddress(
    [Buffer.from("escrow"), escrowProgramPublicKey.toBuffer()],
    escrowProgramPublicKey
  );

  console.log("Get Program Derived AccessToken:", PDA[0].toBase58());
  console.log("Exchange Escrow");

  instructions.push(
    await createExchangeInstruction({
      connection,
      escrowAccount,
      pda: PDA[0],
      programId: escrowProgramPublicKey,
      seller,
      sellerNFTAccount: associatedAccountForNFT,
      sellerReceiveTokenAccount: associatedAccountForSeller,
      expectedSellerReceiveAmount: amountInLamport,
    })
  );

  // Unwrap native wrapped token by closing it
  instructions.push(
    createCloseAccountInstruction({
      accountToClose: associatedAccountForSeller,
      receiveAmountAccount: seller,
      owner: seller,
    })
  );

  instructions.push(
    createCloseAccountInstruction({
      accountToClose: associatedAccountForNFT,
      receiveAmountAccount: seller,
      owner: seller,
    })
  );

  // confirm transaction
  const transaction = await generateTransaction({
    connection,
    feePayer: seller,
  });

  instructions.forEach((instruction) => transaction.add(instruction));

  const signature = await signAndSendTransaction(
    connection,
    signTransaction,
    transaction
  );
  console.log("Transaction confirmed. Signature", signature);
}
