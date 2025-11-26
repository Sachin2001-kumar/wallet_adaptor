import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { useState } from "react";
import {
  createTransferInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";

function SendToken() {
  const { connection } = useConnection();
  const wallet = useWallet();

  const [mint, setmint] = useState("");
  const [reciver, setreciver] = useState("");
  const [amount, setamount] = useState("");

  async function send() {
    if (!wallet.publicKey) return alert("Connect wallet first");

    const mintPubkey = new PublicKey(mint);
    const reciverPubkey = new PublicKey(reciver);

    const senderAta = await getAssociatedTokenAddress(
      mintPubkey,
      wallet.publicKey
    );

    const reciverAta = await getAssociatedTokenAddress(
      mintPubkey,
      reciverPubkey
    );

    const tx = new Transaction().add(
      createTransferInstruction(
        senderAta,
        reciverAta,
        wallet.publicKey,
        Number(amount)
      )
    );
    const sign = await wallet.sendTransaction(tx, connection);
    await connection.confirmTransaction(sign, "confirmed");

    alert("Token Sent!");
  }

  return (
    <>
      <input
        type="text"
        placeholder="Enter Mint Address"
        value={mint}
        onChange={(e) => setmint(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="Enter reciver Address"
        value={reciver}
        onChange={(e) => setreciver(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setamount(e.target.value)}
      ></input>
      <button onClick={send}>Send Token</button>
    </>
  );
}

export default SendToken;
