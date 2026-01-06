"use client";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import React, { useState } from "react";

export const RequestAirdrop = () => {
  const [amount, setAmount] = useState<number>(0);

  const { publicKey } = useWallet();
  const { connection } = useConnection();

  const requestDrop = async () => {
    if (!publicKey) {
      alert("Please connect wallet first");
      return;
    }

    await connection.requestAirdrop(publicKey, amount * LAMPORTS_PER_SOL);
    setAmount(0);
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <h4>Request Air Drop</h4>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Enter your amount"
        className="p-2 font-medium border-2"
        required
      />
      <button
        className="bg-blue-700 font-bold p-2 m-2 rounded-xl"
        onClick={requestDrop}
      >
        Send
      </button>
    </div>
  );
};
