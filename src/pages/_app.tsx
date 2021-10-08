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

function HayamaApp({ Component, pageProps }: AppProps) {
  const localAddress = "http://localhost:8899";
  return (
    <LoadingProvider>
      <ModalProvider>
        <WalletConnectionProvider
          network={WalletAdapterNetwork.Devnet}
          localAddress={localAddress}
        >
          <Component {...pageProps} />
        </WalletConnectionProvider>
      </ModalProvider>
    </LoadingProvider>
  );
}
export default HayamaApp;
