import { useWallet } from "@solana/wallet-adapter-react";
import React from "react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  FacebookShareCount,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
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
  const shareUrl = ({
    nftAddress,
    sellerAddress,
  }: {
    nftAddress: string;
    sellerAddress: string;
  }) => {
    let host = `${
      process.env.NEXT_PUBLIC_BUILD_ENV === "dev"
        ? "https://deploy-dev.sol-hayama.com"
        : "https://www.sol-hayama.com"
    }`;
    return host + `/detail/${nftAddress}?sellerAddress=${sellerAddress}`;
  };
  const url = shareUrl({ nftAddress, sellerAddress });
  const title =
    "Checkout my #nft on @sol_hayama! Click this link to make an offer #solana #solananft";
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
                "Share/Send this item's link to others so they can make an offer!"
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
            <div className="px-4 py-3 bg-gray-50 text-center sm:px-6">
              <div className="mr-2 text-center inline-block align-top">
                <TwitterShareButton url={url} title={title}>
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
              </div>

              <div className="mr-2 text-center inline-block align-top">
                <TelegramShareButton url={url} title={title}>
                  <TelegramIcon size={32} round />
                </TelegramShareButton>
              </div>

              <div className="mr-2 text-center inline-block align-top">
                <WhatsappShareButton url={url} title={title} separator=":: ">
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
              </div>

              <div className="mr-2 text-center inline-block align-top">
                <EmailShareButton url={url} subject={title} body="body">
                  <EmailIcon size={32} round />
                </EmailShareButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
