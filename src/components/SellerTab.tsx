import { useWallet } from "@solana/wallet-adapter-react";
import React, { useEffect } from "react";
import { useTransactions } from "../hooks/useTransactions";
import { TransactionType } from "../types";
import { Transactions } from "./Transactions";

export const SellerTab = () => {
  const { publicKey } = useWallet();
  const [items, fetch] = useTransactions(TransactionType.Seller);

  useEffect(() => {
    if (publicKey) {
      fetch(publicKey.toBase58());
    }
  });

  return <Transactions items={items} type={TransactionType.Seller} />;
};
