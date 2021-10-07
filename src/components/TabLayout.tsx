import { API, graphqlOperation } from "aws-amplify";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

import { SellerInput } from "./SellerInput";
import { BuyerInput } from "./BuyerInput";
import { Transactions } from "./Transactions";
import { TransactionType, TxHistory } from "../types";
import { getTxHistoryByBuyerAddress } from "../graphql/queries";
import { GetTxHistoryByBuyerAddressQuery } from "../API";
import { BuyerTab } from "./BuyerTab";
import { SellerTab } from "./SellerTab";

export const TabLayout = () => {
  const router = useRouter();
  const { publicKey } = useWallet();
  const [buyerTransactions, setBuyerTransactions] = useState<
    TxHistory[] | null
  >(null);
  const { tab } = router.query;
  const isBuyerTab = tab === "buyer" || tab === undefined;
  const isSellerTab = tab === "seller";

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const buyerAddress = publicKey?.toBase58();
        if (buyerAddress) {
          const response = (await API.graphql(
            graphqlOperation(getTxHistoryByBuyerAddress, { buyerAddress })
          )) as { data: GetTxHistoryByBuyerAddressQuery };
          const items = (response.data.getTxHistoryByBuyerAddress?.items ||
            []) as TxHistory[];
          console.log("====", items);
          setBuyerTransactions(items);
        }
      } catch (err) {
        console.log("error fetching todos");
      }
    }
    if (publicKey) {
      fetchTransactions();
    }
  }, [publicKey]);

  return (
    <>
      <div className="container mx-auto pt-2 pb-2 flex flex-1 flex-row justify-evenly bg-gray-500">
        <Link href={{ pathname: "/", query: { tab: "buyer" } }} passHref>
          <a className="px-5 w-24 text-center">Buyer</a>
        </Link>
        <div>
          <Link href={{ pathname: "/", query: { tab: "seller" } }}>
            <a className="px-5 w-24 text-center">Seller</a>
          </Link>
        </div>
      </div>
      <div>
        {isBuyerTab && <BuyerTab />}
        {isSellerTab && <SellerTab />}
      </div>
    </>
  );
};
