export const SellerInput = () => {
  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:gap-6">
        <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="p-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Seller Confirmation
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Fill in information below to accept the request
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
                      className="mt-1
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        block 
                        w-full 
                        shadow-sm 
                        sm:text-sm
                        border-gray-300 
                        rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="buyer-address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Buyer Address
                    </label>
                    <input
                      type="text"
                      name="buyer-address"
                      id="buyer-address"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="escrow-address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Escrow address
                    </label>
                    <input
                      type="text"
                      name="escrow-address"
                      id="escrow-address"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-3">
                    <label
                      htmlFor="offered-amount"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Offered Amount(Sol)
                    </label>
                    <input
                      type="number"
                      name="offered-amount"
                      id="offered-amount"
                      placeholder="1.2"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Accept Offer
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
