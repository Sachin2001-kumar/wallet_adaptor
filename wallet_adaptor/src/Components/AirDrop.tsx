import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

function Airdrop() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [amount, setamount] = useState("");

  async function SendRequestToUser() {
    if (!wallet.publicKey) {
      alert("Please connect your wallet first!");
      return;
    }

    if (!amount || isNaN(Number(amount))) {
      alert("Please Enter Amount");
    }
    // Airdrop 2 SOL (or whatever amount you want)

    await connection.requestAirdrop(
      wallet.publicKey,
      Number(amount) * LAMPORTS_PER_SOL
    );
  }

  return (
    <div>
      <h4>This is Airdrop Test</h4>
      <p>Hi {wallet.publicKey?.toString()}</p>

      <input
        value={amount}
        onChange={(e) => setamount(e.target.value)}
        type="text"
        placeholder="Enter your Amount"
      />

      <button onClick={SendRequestToUser}>Send Airdrop</button>
    </div>
  );
}

export default Airdrop;
