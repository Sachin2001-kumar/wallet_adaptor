import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useState } from "react";

function SendingToken() {
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const { connection } = useConnection();
  const wallet = useWallet();

  async function SendTok() {
    if (!wallet.publicKey) {
      alert("Wallet not connected!");
      return;
    }

    if (!receiver) {
      alert("Please enter receiver address");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      alert("Enter a valid amount");
      return;
    }

    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(receiver),
          lamports: Number(amount) * LAMPORTS_PER_SOL,
        })
      );

      const signature = await wallet.sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "confirmed");

      alert(`Sent ${amount} SOL to ${receiver}`);
    } catch (error: any) {
      alert("Transaction failed: " + error.message);
      console.error(error);
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Receiver address"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount (SOL)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={SendTok}>Send</button>
    </div>
  );
}

export default SendingToken;
