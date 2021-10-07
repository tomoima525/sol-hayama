import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  NATIVE_MINT,
  Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { SignerWalletAdapterProps } from "@solana/wallet-adapter-base";
import { Connection, PublicKey, TransactionInstruction } from "@solana/web3.js";
import { createCancelInstruction } from "./escrowInstructions";
import { generateTransaction, signAndSendTransaction } from "./transaction";

const escrowProgramPublicKey = new PublicKey(
  "HiUeHUfAvcZJvwCAYPvWG7my2r3ZXGtvXUXrc8t7gBru"
);

export async function cancelOffer({
  connection,
  buyer,
  escrowAccountAddressString,
  signTransaction,
}: {
  connection: Connection;
  buyer: PublicKey;
  escrowAccountAddressString: string;
  signTransaction: SignerWalletAdapterProps["signTransaction"];
}): Promise<void> {
  const instructions: TransactionInstruction[] = [];

  const escrowAccount = new PublicKey(escrowAccountAddressString);

  const PDA = await PublicKey.findProgramAddress(
    [Buffer.from("escrow"), escrowProgramPublicKey.toBuffer()],
    escrowProgramPublicKey
  );

  console.log("Get Program Derived AccessToken:", PDA[0].toBase58());
  console.log("Exchange Escrow");

  instructions.push(
    await createCancelInstruction({
      connection,
      buyer,
      pda: PDA[0],
      escrowAccount,
      programId: escrowProgramPublicKey,
    })
  );

  // confirm transaction
  const transaction = await generateTransaction({
    connection,
    feePayer: buyer,
  });

  instructions.forEach((instruction) => transaction.add(instruction));

  const signature = await signAndSendTransaction(
    connection,
    signTransaction,
    transaction
  );
  console.log("Transaction confirmed. Signature", signature);
}
