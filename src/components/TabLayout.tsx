import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SellerInput } from "./SellerInput";
import { BuyerInput } from "./BuyerInput";
import { Transactions } from "./Transactions";
import { TransactionType } from "../types";

export const TabLayout = () => {
  const router = useRouter();
  const { tab } = router.query;
  const isBuyerTab = tab === "buyer" || tab === undefined;
  const isSellerTab = tab === "seller";
  console.log(isBuyerTab, isSellerTab);
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
        {isBuyerTab && (
          <div>
            <BuyerInput />
            <Transactions address="x" type={TransactionType.Buyer} />
          </div>
        )}
        {isSellerTab && (
          <div>
            <SellerInput />
            <Transactions address="x" type={TransactionType.Seller} />
          </div>
        )}
      </div>
    </>
  );
};
