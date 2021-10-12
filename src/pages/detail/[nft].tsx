import API from "@aws-amplify/api";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { graphqlOperation } from "aws-amplify";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import {
  GetTxHistoryByNFTAddressQuery,
  TransactionStatus,
  TxHistory,
} from "../../API";
import { Layout } from "../../components/Layout";
import { BuyerInput } from "../../components/BuyerInput";
import { ImageType, MetaImage } from "../../components/MetaImage";
import { getTxHistoryByNFTAddress } from "../../graphql/queries";
import { Metadata } from "../../schema/metadata";
import { getMetadata } from "../../web3/metaplex/metadataHelpers";

export default function Detail() {
  const router = useRouter();
  const { connection } = useConnection();
  const [metadata, setMetadata] = useState<Metadata | undefined>(undefined);
  const [transaction, setTransaction] = useState<TxHistory | undefined>(
    undefined
  );
  const { sellerAddress, nft } = router.query;
  useEffect(() => {
    const fetchData = async () => {
      if (typeof nft !== "string") return;
      const nftPubkey = new PublicKey(nft);
      const data = await getMetadata(connection, nftPubkey);
      setMetadata(data);
      const response = (await API.graphql(
        graphqlOperation(getTxHistoryByNFTAddress, {
          nftAddress: nft,
        })
      )) as { data: GetTxHistoryByNFTAddressQuery };

      const items = (response.data.getTxHistoryByNFTAddress?.items ||
        []) as TxHistory[];
      if (
        items.length !== 0 &&
        items.find((item) => item.sellerAddress === sellerAddress)
      ) {
        setTransaction(
          items.find((item) => item.sellerAddress === sellerAddress)
        );
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopy = async () => {
    const link = "https://www.sol-hayama.com";
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(link);
    } else {
      document.execCommand("copy", true, link);
    }
  };

  const handlePostSubmit = (transaction: TxHistory | undefined) => {
    setTransaction(transaction);
  };

  const formatRpc = "";
  return (
    <Layout formatRpc={formatRpc}>
      <section className="relative pt-12 bg-blueGray-50 px-4">
        <button
          className="text-gray-700"
          onClick={() => router.back()}
        >{`< Back`}</button>
        {transaction && transaction.status === TransactionStatus.REQUESTED && (
          <div className="w-full rounded-md bg-pink-200 p-4 ml-auto mr-auto">
            <div className="grid grid-cols-10">
              <div className="sm:col-span-8 col-span-10">
                <h3 className="text-lg font-medium text-gray-700">
                  Offer Requested
                </h3>
                <p className="text-md text-gray-700 pt-2">{`Send this site's web link to Seller so that they can accept your offer!`}</p>
              </div>
              <div className="col-span-2 self-center">
                <button
                  onClick={handleCopy}
                  className="shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 py-2 px-4"
                >
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="items-center flex flex-wrap">
          <div className="md:w-5/12 ml-auto mr-auto bg-gray-50 sm:px-4">
            <div className="flex flex-col">
              <div className="flex-shrink  place-self-center pt-4">
                <MetaImage uri={metadata?.data.uri!} type={ImageType.Detail} />
              </div>
              <div className="flex-none p-4 text-center">
                {metadata?.data.name}
              </div>
              <div className="flex-none pb-4 text-gray-600 text-center">
                {metadata?.data.symbol}
              </div>
            </div>
          </div>
          <div className="w-full md:w-7/12 ml-auto mr-auto px-4">
            <BuyerInput
              isRequested={transaction?.status === TransactionStatus.REQUESTED}
              nftAddress={nft as string}
              onSubmitted={handlePostSubmit}
              sellerAddress={sellerAddress as string}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}
