import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

function ShowingBalance() {
  const [balance, setBalance] = useState<number | null>(null);
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  useEffect(() => {
    async function getBalance() {
      if (publicKey && connection) {
        const lamports = await connection.getBalance(publicKey);
        setBalance(lamports / LAMPORTS_PER_SOL);
      }
    }

    getBalance();
  }, [publicKey, connection]);

  return (
    <div>
      <p>SOL Balance:</p> <div>{balance}</div>
    </div>
  );
}

export default ShowingBalance;
