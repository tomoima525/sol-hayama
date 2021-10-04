import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { requestOffer } from "../web3/requestOffer";

export const BuyerInput = () => {
  const { connection } = useConnection();
  const { publicKey, signTransaction } = useWallet();
  const [amount, setAmount] = useState(0);
  const [nftAddress, setNftAddress] = useState("");
  const [sellerAddress, setSellerAddress] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value ? Number(e.target.value) : 0);
  };

  const handleChangeNFTAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNftAddress(e.target.value ? e.target.value.toString() : "");
  };

  const handleChangeSellerAddress = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSellerAddress(e.target.value ? e.target.value.toString() : "");
  };

  const isDisabled = () => {
    return amount <= 0 || sellerAddress.length === 0 || isLoading;
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!publicKey || !signTransaction) {
      // TODO: show error
      return;
    }
    setLoading(true);
    try {
      const result = await requestOffer({
        connection,
        buyer: publicKey,
        signTransaction,
        sellerAddressStr: sellerAddress,
        sellerNFTAddressStr: nftAddress,
        amountInSol: amount,
      });
      console.log(result);
    } catch (e) {
      console.error(e);
      toast((e as Error).message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:gap-6">
        <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="p-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Buyer Request
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Fill in information below to make your offer
            </p>
          </div>
          <form action="#" method="POST">
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-x-6 gap-y-4">
                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="token-address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Non-Fungible Token Address
                    </label>
                    <input
                      type="text"
                      name="token-address"
                      id="token-address"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm  sm:text-sm border-gray-300 rounded-md"
                      onChange={handleChangeNFTAddress}
                      value={nftAddress}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="seller-address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Seller Address
                    </label>
                    <input
                      type="text"
                      name="seller-address"
                      id="seller-address"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      onChange={handleChangeSellerAddress}
                      value={sellerAddress}
                    />
                  </div>

                  <div className="col-span-3">
                    <label
                      htmlFor="offered-amount"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Offer Amount(Sol)
                    </label>
                    <input
                      type="number"
                      name="offered-amount"
                      id="offered-amount"
                      placeholder="1.2"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      onChange={handleChangeAmount}
                      value={amount}
                    />
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
                  Make Offer
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
