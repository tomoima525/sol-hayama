import { TransactionType, TxHistory } from "../types";
import { Transaction } from "./Transaction";

interface TransactionsProps {
  items: TxHistory[] | null;
  onClickCancel?: ({
    escrowAddress,
    id,
  }: {
    escrowAddress: string;
    id: string;
  }) => any;
  type: TransactionType;
}

export const Transactions = ({
  items,
  onClickCancel,
  type,
}: TransactionsProps) => {
  const hasNoItems = !items || items?.length === 0;
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Buyer
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Seller
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    NFT
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Offer(SOL)
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  ></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items?.map((item) => (
                  <Transaction
                    key={item?.id}
                    onClickCancel={onClickCancel}
                    txHistory={item!}
                    type={type}
                  />
                ))}
              </tbody>
            </table>
            {hasNoItems && (
              <div className="p-6 text-xl text-center font-medium text-gray-500">
                There are no transactions.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
