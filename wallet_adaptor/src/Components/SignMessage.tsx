import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import bs58 from "bs58";
import { ed25519 } from "@noble/curves/ed25519.js";

function SignMessage() {
  const { publicKey, signMessage } = useWallet();
  const [message, setMessage] = useState("");

  const SignMsg = async () => {
    if (!publicKey) {
      alert("Wallet not connected. Please connect your wallet first!");
      return;
    }

    if (!signMessage) {
      alert("This wallet does not support message signing.");
      return;
    }

    try {
      const encodedMessage = new TextEncoder().encode(message);
      const signature = await signMessage(encodedMessage);

      // Verify signature
      const isValid = ed25519.verify(
        signature,
        encodedMessage,
        publicKey.toBytes()
      );

      if (!isValid) {
        throw new Error("Message signature invalid!");
      }

      alert(
        `Message Signed Successfully!\nSignature: ${bs58.encode(signature)}`
      );
    } catch (error: any) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={SignMsg}>Sign Message</button>
    </div>
  );
}

export default SignMessage;
