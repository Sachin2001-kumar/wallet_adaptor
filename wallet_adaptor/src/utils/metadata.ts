import { PublicKey, Connection } from "@solana/web3.js";

export const METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

export async function getTokenMetadata(connection: Connection, mint: string) {
  const mintPubkey = new PublicKey(mint);

  const [metadataPDA] = await PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      METADATA_PROGRAM_ID.toBytes(),
      mintPubkey.toBytes(),
    ],
    METADATA_PROGRAM_ID
  );

  const accountInfo = await connection.getAccountInfo(metadataPDA);
  if (!accountInfo) return null;

  const uri = accountInfo.data
    .slice(1)
    .toString()
    .replace(/\0/g, "")
    .split("uri")[1]
    ?.split("https")[1];

  if (!uri) return null;

  const finalUri = "https" + uri.split('"')[0];
  const json = await fetch(finalUri).then((res) => res.json());

  return {
    name: json.name,
    symbol: json.symbol,
    logo: json.image,
  };
}
