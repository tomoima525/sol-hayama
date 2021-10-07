import { DateUtils } from "@aws-amplify/core";
import { TxHistory, TransactionStatus } from "../API";
import { TransactionType } from "../types";

interface TransactionProps {
  txHistory: TxHistory;
  type: TransactionType;
}

const shortAddress = (address: string) => {
  return address.slice(0, 3) + ".." + address.slice(-4);
};

const StatusLogo = ({ status }: { status: TransactionStatus }) => {
  switch (status) {
    case TransactionStatus.ACCEPTED:
      return (
        <td className="px-3 py-4 whitespace-nowrap">
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
            Accepted
          </span>
        </td>
      );
    case TransactionStatus.CANCELED:
      return (
        <td className="px-3 py-4 whitespace-nowrap">
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-pink-100 text-pink-800">
            Canceled
          </span>
        </td>
      );
    case TransactionStatus.REQUESTED:
      return (
        <td className="px-3 py-4 whitespace-nowrap">
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            Requested
          </span>
        </td>
      );
  }
};

export const Transaction = ({ txHistory, type }: TransactionProps) => {
  const buyer = shortAddress(txHistory.buyerAddress);
  const seller = shortAddress(txHistory.sellerAddress);
  const nft = shortAddress(txHistory.nftAddress);
  const date = new Date(txHistory.createdAt);
  const showCancelBtn =
    type === TransactionType.Buyer &&
    txHistory.status === TransactionStatus.REQUESTED;
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {buyer}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {seller}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {nft}
      </td>
      <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
        {txHistory.offeredAmount}
      </td>
      <StatusLogo status={txHistory.status} />
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {date.toLocaleString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        {showCancelBtn ? (
          <a href="#" className="text-indigo-600 hover:text-indigo-900">
            Cancel
          </a>
        ) : (
          <div className="whitespace-nowrap text-right text-sm text-gray-500">
            -
          </div>
        )}
      </td>
    </tr>
  );
};
