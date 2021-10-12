import { SignerWalletAdapterProps } from "@solana/wallet-adapter-base";
import {
  Connection,
  PublicKey,
  Transaction,
  TransactionCtorFields,
} from "@solana/web3.js";

export async function generateTransaction({
  connection,
  feePayer,
}: {
  connection: Connection;
  feePayer: PublicKey;
}): Promise<Transaction> {
  const recentBlockhash = await connection.getRecentBlockhash();
  const options: TransactionCtorFields = {
    feePayer,
    recentBlockhash: recentBlockhash.blockhash,
  };
  const transaction = new Transaction(options);
  return transaction;
}

export async function signAndSendTransaction(
  connection: Connection,
  signTransaction: SignerWalletAdapterProps["signTransaction"],
  transaction: Transaction
): Promise<string> {
  const signedTrans = await signTransaction(transaction);
  const signature = await connection.sendRawTransaction(
    signedTrans.serialize()
  );
  return signature;
}
