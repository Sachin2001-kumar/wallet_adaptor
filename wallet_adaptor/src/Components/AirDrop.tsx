import { useWallet } from "@solana/wallet-adapter-react";

function Airdrop() {
  const wallet = useWallet(); //This wallet is likely collect all information related to your wallet so, this is important stuff
  //   alert(wallet.publicKey?.toString());
  return (
    <div>
      <h4>This is Airdrop Test </h4>
      <p> Hi {wallet.publicKey?.toString()}</p>
      <input type="text" placeholder="Enter your Amount"></input>
      <button>Send Airdrop</button>
    </div>
  );
}

export default Airdrop;
