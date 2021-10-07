import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { useState } from "react";
import {
  TxHistory,
  GetTxHistoryByBuyerAddressQuery,
  GetTxHistoryBySellerAddressQuery,
} from "../API";
import {
  getTxHistoryByBuyerAddress,
  getTxHistoryBySellerAddress,
} from "../graphql/queries";
import { TransactionType } from "../types";

export const useTransactions = (
  type: TransactionType
): [TxHistory[] | null, (address: string) => Promise<void>] => {
  const [transactions, setTransactions] = useState<TxHistory[] | null>(null);
  async function fetchBuyerTransactions(address: string) {
    try {
      if (address) {
        const response = (await API.graphql(
          graphqlOperation(getTxHistoryByBuyerAddress, {
            buyerAddress: address,
          })
        )) as { data: GetTxHistoryByBuyerAddressQuery };
        const items = (response.data.getTxHistoryByBuyerAddress?.items ||
          []) as TxHistory[];
        if (items.length !== 0) {
          setTransactions(items);
        }
      }
    } catch (err) {
      console.log("error fetching buyer tx", err);
    }
  }
  async function fetchSellerTransactions(address: string) {
    try {
      if (address) {
        const response = (await API.graphql(
          graphqlOperation(getTxHistoryBySellerAddress, {
            sellerAddress: address,
          })
        )) as { data: GetTxHistoryBySellerAddressQuery };
        const items = (response.data.getTxHistoryBySellerAddress?.items ||
          []) as TxHistory[];
        if (items.length !== 0) {
          setTransactions(items);
        }
      }
    } catch (err) {
      console.log("error fetching todos");
    }
  }
  switch (type) {
    case TransactionType.Buyer:
      return [transactions, fetchBuyerTransactions];
    case TransactionType.Seller:
      return [transactions, fetchSellerTransactions];
    default:
      throw new Error("TranasactionType is missing");
  }
};
