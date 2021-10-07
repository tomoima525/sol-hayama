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
        console.log("====", wallet.publicKey?.toBase58());
        const cluster = await connection.getClusterNodes();
        if (rpc !== cluster[0].rpc) {
          toast(`Connected to ${cluster[0].rpc}`);
          setRpc(cluster[0].rpc);
        }
      }
    };
    toastConnected();
  }, [wallet, connection, rpc]);

  const formatRpc = rpc !== null ? `(${rpc})` : "";
  return (
    <Layout>
      <Head>
        <title>hayama-sol</title>
      </Head>
      <div className="container md mx-auto justify-center">
        <h1 className="text-lg bg-red-200 text-pink-500 text-center pt-1 pb-1">
          {`Hayama ${formatRpc}`}
        </h1>
        <Main />
      </div>
    </Layout>
  );
};

export default Home;
