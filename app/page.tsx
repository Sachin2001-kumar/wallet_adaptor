"use client";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

import "@solana/wallet-adapter-react-ui/styles.css";
import { RequestAirdrop } from "./Component/RequestAirdrop";
import { ShowingSolBal } from "./Component/ShowingSolBal";

export default function Home() {
  return (
    <>
      <ConnectionProvider endpoint="https://api.devnet.solana.com">
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div className="flex flex-col gap-4 justify-center items-center min-h-screen">
              <WalletMultiButton></WalletMultiButton>
              <RequestAirdrop />
              <ShowingSolBal />
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
}
