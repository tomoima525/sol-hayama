import Amplify from "aws-amplify";
import dynamic from "next/dynamic";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import awsExports from "../aws-exports";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { LoadingProvider } from "../contexts/LoadingContext";
import { ModalProvider } from "../contexts/ModalContext";
import { SearchProvider } from "../contexts/SearchContext";
import React from "react";
import { Seo } from "../components/Seo";

const WalletConnectionProvider = dynamic(() => import("../components/Wallet"), {
  ssr: false,
});

Amplify.configure(awsExports);

const network = () => {
  switch (process.env.NEXT_PUBLIC_BUILD_ENV) {
    case "dev":
      return WalletAdapterNetwork.Devnet;
    case "prod":
      return WalletAdapterNetwork.Mainnet;
    default:
      return WalletAdapterNetwork.Devnet;
  }
};

function HayamaApp({ Component, pageProps }: AppProps) {
  const localAddress = process.env.NEXT_PUBLIC_LOCAL_ADDRESS;
  return (
    <>
      <Seo
        imgHeight={508}
        imgUrl="/sol-hayama.png"
        imgWidth={1110}
        path="https://www.sol-hayama.com"
        title="Hayama"
        pageDescription="Hayama - NFT trading platform on Solana"
      />
      <LoadingProvider>
        <ModalProvider>
          <SearchProvider>
            <WalletConnectionProvider
              network={network()}
              localAddress={localAddress}
            >
              <Component {...pageProps} />
            </WalletConnectionProvider>
          </SearchProvider>
        </ModalProvider>
      </LoadingProvider>
    </>
  );
}
export default HayamaApp;
