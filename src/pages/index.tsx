import { useWallet } from "@solana/wallet-adapter-react";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { Layout } from "../components/layout";
import { TabLayout } from "../components/TabLayout";

const Home: NextPage = () => {
  const wallet = useWallet();
  useEffect(() => {
    if (wallet.connected) {
      console.log("====", wallet.publicKey?.toBase58());
    }
  });

  return (
    <Layout>
      <Head>
        <title>hayama-sol</title>
      </Head>
      <div className="container md mx-auto justify-center">
        <h1 className="text-lg bg-red-200 text-pink-500 text-center pt-1 pb-1">
          Hayama
        </h1>
        <TabLayout />
      </div>
    </Layout>
  );
};

export default Home;
