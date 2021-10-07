import { useWallet } from "@solana/wallet-adapter-react";
import React, { useEffect, useState } from "react";
import { useTransactions } from "../hooks/useTransactions";
import { TransactionType } from "../types";
import { BuyerInput } from "./BuyerInput";
import { BuyerTab } from "./BuyerTab";
import { SellerTab } from "./SellerTab";

const colors = {
  active: "text-purple-50 bg-purple-500",
  inactive: "text-gray-500 bg-gray-100",
};
export const Main = () => {
  const [tab, setTab] = useState(TransactionType.Buyer);

  const handleSwitchTab = (type: TransactionType) => () => {
    setTab(type);
  };

  return (
    <div>
      <BuyerInput />
      <div className="mt-6 sm:mt-6">
        <div className="p-4 sm:px-0 sm:py-3">
          <h3 className="text-lg font-medium  text-gray-900">Transactions</h3>
        </div>
        <div className="px-4 sm:px-0">
          <div className="flex justify-start items-center py-2 gap-2">
            <button
              className={`cursor-pointer py-2 px-4 rounded transition text-center ${
                tab === TransactionType.Buyer
                  ? colors["active"]
                  : colors["inactive"]
              }`}
              onClick={handleSwitchTab(TransactionType.Buyer)}
            >
              Buy Offers
            </button>
            <button
              className={`cursor-pointer py-2 px-4 rounded transition text-center ${
                tab === TransactionType.Seller
                  ? colors["active"]
                  : colors["inactive"]
              }`}
              onClick={handleSwitchTab(TransactionType.Seller)}
            >
              Sell Requests
            </button>
          </div>
          {tab === TransactionType.Buyer && <BuyerTab />}
          {tab === TransactionType.Seller && <SellerTab />}
        </div>
      </div>
    </div>
  );
};
