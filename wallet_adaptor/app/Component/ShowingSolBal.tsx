"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import React, { useEffect, useState } from "react";

export const ShowingSolBal = () => {
  const [balance, setBalance] = useState<number>(0);
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  useEffect(() => {
    const showBalance = async () => {
      if (!publicKey) {
        // client-side only
        if (typeof window !== "undefined") {
          window.alert("Please connect wallet first");
        }
        return;
      }

      const bal = await connection.getBalance(publicKey);
      setBalance(bal / LAMPORTS_PER_SOL);
    };

    showBalance();
  }, [publicKey, connection]); // ✅ runs when wallet connects

  return (
    <div className="flex justify-center items-center gap-2">
      <h4>ShowingSolBal</h4>
      <h4>Balance: {balance}</h4>
    </div>
  );
};
