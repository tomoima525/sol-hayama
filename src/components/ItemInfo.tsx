import { useWallet } from "@solana/wallet-adapter-react";
import { useLoadingState } from "../contexts/LoadingContext";

interface BuyerInputProps {
  nftAddress: string;
  sellerAddress: string;
  isRequested: boolean;
}
export const ItemInfo = ({
  nftAddress,
  sellerAddress,
  isRequested,
}: BuyerInputProps) => {
  const { publicKey } = useWallet();
  const loadingState = useLoadingState();

  const isDisabled = () => {
    return (
      isRequested ||
      sellerAddress.length === 0 ||
      loadingState.show ||
      !publicKey
    );
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
  };

  const explorerAddress = `https://explorer.solana.com/address/${nftAddress}${
    process.env.NEXT_PUBLIC_BUILD_ENV === "dev" && "?cluster=devnet"
  }`;
  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:gap-6">
        <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="p-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Share This Item
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              {
                "Share/Send this item's link to others so they can may an offer!"
              }
            </p>
          </div>
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-x-6 gap-y-4">
                <div className="col-span-6 sm:col-span-5">
                  <label
                    htmlFor="token-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Non-Fungible Token Address
                  </label>
                  <a href={explorerAddress} target="_blank" rel="noreferrer">
                    <button
                      id="token-address"
                      className="p-3 block sm:text-sm text-left hover:text-gray-400"
                    >
                      {nftAddress}
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                disabled={isDisabled()}
                onClick={handleSubmit}
              >
                Share this item
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
