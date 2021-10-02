import dynamic from "next/dynamic";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

const WalletConnectionProvider = dynamic(() => import("../components/Wallet"), {
  ssr: false,
});

function HayamaApp({ Component, pageProps }: AppProps) {
  const localAddress = "http://localhost:8899";
  return (
    <WalletConnectionProvider
      network={WalletAdapterNetwork.Devnet}
      localAddress={localAddress}
    >
      <Component {...pageProps} />
    </WalletConnectionProvider>
  );
}
export default HayamaApp;
