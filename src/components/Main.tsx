import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { TransactionStatus } from "../API";
import { ActionProps, ModalUserAction } from "../contexts/ModalContext";
import { updateTxHistory } from "../graphql/mutations";
import { TransactionType } from "../types";
import { cancelOffer } from "../web3/cancelOffer";
import { BuyerInput } from "./BuyerInput";
import { BuyerTab } from "./BuyerTab";
import { ModalDialog } from "./dialogs/ModalDialog";
import { SellerTab } from "./SellerTab";

const colors = {
  active: "text-purple-50 bg-purple-500",
  inactive: "text-gray-500 bg-gray-100",
};

export const Main = () => {
  const { connection } = useConnection();
  const { publicKey, signTransaction } = useWallet();
  const [isLoading, setLoading] = useState(false);
  const [tab, setTab] = useState(TransactionType.Buyer);

  const handleSwitchTab = (type: TransactionType) => () => {
    setTab(type);
  };
  const cancelOfferAction = async ({
    id,
    escrowAccountAddressString,
  }: {
    id: string;
    escrowAccountAddressString: string;
  }) => {
    if (!publicKey || !signTransaction) {
      // TODO: show error
      return;
    }
    setLoading(true);
    try {
      const result = await cancelOffer({
        connection,
        buyer: publicKey,
        escrowAccountAddressString,
        signTransaction,
      });
      console.log(result);
      await API.graphql(
        graphqlOperation(updateTxHistory, {
          input: { id, status: TransactionStatus.CANCELED },
        })
      );
    } catch (e) {
      console.error(e);
      toast((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (props: ActionProps) => {
    switch (props.type) {
      case ModalUserAction.CancelOffer: {
        return cancelOfferAction({
          id: props.id,
          escrowAccountAddressString: props.escrowAddress,
        });
      }
    }
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
      <ModalDialog onConfirm={handleConfirm} />
    </div>
  );
};
