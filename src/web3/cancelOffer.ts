import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  NATIVE_MINT,
  Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { SignerWalletAdapterProps } from "@solana/wallet-adapter-base";
import { Connection, PublicKey, TransactionInstruction } from "@solana/web3.js";
import { escrowProgramPublicKey } from "../constants";
import {
  createCancelInstruction,
  createCloseAccountInstruction,
} from "./escrowInstructions";
import { generateTransaction, signAndSendTransaction } from "./transaction";

export async function cancelOffer({
  connection,
  buyer,
  escrowAccountAddressString,
  nftAddressString,
  signTransaction,
}: {
  connection: Connection;
  buyer: PublicKey;
  escrowAccountAddressString: string;
  nftAddressString: string;
  signTransaction: SignerWalletAdapterProps["signTransaction"];
}): Promise<void> {
  const instructions: TransactionInstruction[] = [];

  const escrowAccount = new PublicKey(escrowAccountAddressString);

  const PDA = await PublicKey.findProgramAddress(
    [Buffer.from("escrow"), escrowProgramPublicKey.toBuffer()],
    escrowProgramPublicKey
  );

  console.log("Get Program Derived AccessToken:", PDA[0].toBase58());
  console.log("Cancel Escrow");

  instructions.push(
    await createCancelInstruction({
      connection,
      buyer,
      pda: PDA[0],
      escrowAccount,
      programId: escrowProgramPublicKey,
    })
  );
  const nft = new PublicKey(nftAddressString);

  const associatedAccountForNFT = await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    nft,
    buyer
  );

  console.log({ associatedAccountForNFT: associatedAccountForNFT.toBase58() });

  // Close associated account for NFT
  instructions.push(
    createCloseAccountInstruction({
      accountToClose: associatedAccountForNFT,
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

  const signature = await signAndSendTransaction(
    connection,
    signTransaction,
    transaction
  );
  console.log("Transaction confirmed. Signature", signature);
}
