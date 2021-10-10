import Amplify from "aws-amplify";
import dynamic from "next/dynamic";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import awsExports from "../aws-exports";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ModalProvider } from "../contexts/ModalContext";
import { LoadingProvider } from "../contexts/LoadingContext";

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
    <LoadingProvider>
      <ModalProvider>
        <WalletConnectionProvider
          network={network()}
          localAddress={localAddress}
        >
          <Component {...pageProps} />
        </WalletConnectionProvider>
      </ModalProvider>
    </LoadingProvider>
  );
}
export default HayamaApp;
