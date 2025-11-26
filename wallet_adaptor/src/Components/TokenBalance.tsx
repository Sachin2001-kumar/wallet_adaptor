import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import useTokenMetadata from "../utils/usetokenmetadata";
import TokenCard from "./TokenCard";

type TokenInfo = {
  mint: string;
  amount: number;
  decimals: number;
};

function TokenBalance() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [token, settoken] = useState<TokenInfo[]>([]);

  useEffect(() => {
    if (!wallet.publicKey) {
      alert("No Public key found!");
      return;
    }
    async function fetchToken() {
      try {
        if (wallet.publicKey) {
          const response = await connection.getParsedTokenAccountsByOwner(
            wallet.publicKey,
            {
              programId: new PublicKey(
                "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
              ),
            }
          );

          const cleaned = response.value.map((acc) => {
            const info = acc.account.data.parsed.info;
            return {
              mint: info.mint,
              amount: info.tokenAmount.uiAmount,
              decimals: info.tokenAmount.decimals,
            };
          });
          settoken(cleaned);
        }
      } catch (error: any) {
        throw new Error("Cannot completed your requested");
      }
    }
    fetchToken();
  }, [wallet.publicKey]);

  return (
    <>
      <div>
        <h2>Your Token Balances</h2>
        {token.map((t, i) => {
          const metadata = useTokenMetadata(connection, t.mint);

          return metadata ? (
            <TokenCard key={i} token={{ ...t, ...metadata }} />
          ) : null;
        })}
      </div>
    </>
  );
}

export default TokenBalance;
