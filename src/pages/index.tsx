import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Layout } from "../components/Layout";
import { Main } from "../components/Main";

const Home: NextPage = () => {
  const [rpc, setRpc] = useState<string | null>(null);
  const { connection } = useConnection();
  const wallet = useWallet();
  useEffect(() => {
    const toastConnected = async () => {
      if (wallet.connected) {
        const cluster = await connection.getClusterNodes();
        if (rpc !== cluster[0].rpc) {
          toast(`Connected to ${cluster[0].rpc}`);
          setRpc(cluster[0].rpc);
        }
      }
    };
    toastConnected();
  }, [wallet, connection, rpc]);

  const formatRpc = rpc !== null ? `Network: ${rpc}` : "";
  return (
    <Layout formatRpc={formatRpc}>
      <Head>
        <title>sol-hayama</title>
        <meta property="og:url" content="https://www.sol-hayama.com" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Hayama - NFT trading platform on Solana"
        />
        <meta name="twitter:card" content="summary" />
        <meta
          property="og:description"
          content="Trading NFT without hassle. Decentralized Escrow service on Solana block-chain"
        />
        <meta property="og:image" content="/ogp_image.png" />
      </Head>
      <div className="container mx-auto justify-center">
        <Main />
      </div>
    </Layout>
  );
};

export default Home;
