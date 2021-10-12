import { useConnection } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { useMetadata } from "../hooks/useMetadata";
import { NFTCard } from "./NFTcard";

export const SearchNFT = () => {
  const { connection } = useConnection();
  const [metadataList, fetchMetadata] = useMetadata();
  const [sellerAddress, setSellerAddress] = useState("");

  const handleChangeSellerAddress = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSellerAddress(e.target.value ? e.target.value.toString() : "");
  };

  const isDisabled = () => {
    return sellerAddress.length === 0;
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await fetchMetadata({
      connection,
      ownerAddress: sellerAddress,
    });
  };
  return (
    <div className="mt-10 sm:mt-0">
      <div className="p-4 sm:px-0">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Search NFTs
        </h3>
      </div>
      <div className="sm:grid sm:grid-cols-3 gap-4">
        <div className="mt-5 md:mt-0 sm:col-span-2 ">
          <form action="#" method="POST">
            <div className="flex">
              <div className="flex-grow">
                <input
                  type="text"
                  name="seller-address"
                  id="seller-address"
                  placeholder="Input wallet address"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm  sm:text-sm border-gray-300 rounded-md"
                  onChange={handleChangeSellerAddress}
                  value={sellerAddress}
                />
              </div>
              <div className="flex-none px-3">
                <button
                  type="submit"
                  className="justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                  disabled={isDisabled()}
                  onClick={handleSubmit}
                >
                  Search
                </button>
              </div>
            </div>
          </form>
          {metadataList && (
            <div className="text-sm text-gray-600 pt-4">{`Found ${metadataList.length} items`}</div>
          )}
        </div>
      </div>
      {metadataList && (
        <div className="flex overflow-x-scroll sm:col-span-4 md:col-span-6">
          {metadataList.map((metadata) => {
            return (
              metadata && (
                <NFTCard
                  key={metadata.mint}
                  metadata={metadata}
                  sellerAddress={sellerAddress}
                />
              )
            );
          })}
        </div>
      )}
    </div>
  );
};
