"use client";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useState } from "react";

export const SendSol = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const sendSol = async () => {
    if (!publicKey) {
      alert("Wallet not connected");
      return;
    }

    try {
      setLoading(true);

      const toPubKey = new PublicKey(toAddress);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: toPubKey,
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "confirmed");

      alert(`Transaction successful: ${signature}`);
      setAmount(0);
      setToAddress("");
    } catch (error) {
      console.error(error);
      alert("Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h3>Send SOL</h3>

      <input
        type="text"
        placeholder="Recipient Address"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <input
        type="number"
        placeholder="Amount (SOL)"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <button onClick={sendSol} disabled={loading}>
        {loading ? "Sending..." : "Send SOL"}
      </button>
    </div>
  );
};
