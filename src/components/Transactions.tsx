import { GetTxHistoryByBuyerAddressQuery, TransactionStatus } from "../API";
import { TransactionType } from "../types";
import { Transaction } from "./Transaction";

interface TransactionsProps {
  address: string;
  type: TransactionType;
}

const data: { data: GetTxHistoryByBuyerAddressQuery } = {
  data: {
    getTxHistoryByBuyerAddress: {
      __typename: "ModelTxHistoryConnection",
      items: [
        {
          __typename: "TxHistory",
          id: "1",
          buyerAddress: "abcd",
          createdAt: "2021-10-05T06:38:19.489Z",
          escrowAddress: "es_abcd3",
          nftAddress: "nft_abcd3",
          offeredAmount: 1,
          sellerAddress: "def3",
          status: TransactionStatus.REQUESTED,
          updatedAt: "2021-10-05T06:38:19.489Z",
        },
        {
          __typename: "TxHistory",
          id: "2",
          buyerAddress: "abcd",
          createdAt: "2021-10-05T06:37:50.079Z",
          escrowAddress: "es_abcd2",
          nftAddress: "nft_abcd2",
          offeredAmount: 1,
          sellerAddress: "def2",
          status: TransactionStatus.CANCELED,
          updatedAt: "2021-10-05T06:37:50.079Z",
        },
        {
          __typename: "TxHistory",
          id: "1",
          buyerAddress: "abcd",
          createdAt: "2021-10-05T06:37:06.655Z",
          escrowAddress: "es_abcd",
          nftAddress: "nft_abcd",
          offeredAmount: 1.5,
          sellerAddress: "def",
          status: TransactionStatus.ACCEPTED,
          updatedAt: "2021-10-05T06:37:06.655Z",
        },
      ],
    },
  },
};
export const Transactions = ({ address, type }: TransactionsProps) => {
  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:gap-6">
        <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="p-6 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Transaction History
            </h3>
          </div>
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
                          Offer Amount(SOL)
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
                      {data.data.getTxHistoryByBuyerAddress?.items?.map(
                        (item) => (
                          <Transaction
                            key={item?.id}
                            txHistory={item!}
                            type={type}
                          />
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
