"use client";
import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

export const Signmessage = () => {
  const { publicKey, signMessage } = useWallet();

  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState<Uint8Array | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignMessage = async () => {
    if (!publicKey) {
      alert("Wallet not connected");
      return;
    }

    if (!signMessage) {
      alert("Wallet does not support message signing");
      return;
    }

    try {
      setLoading(true);

      const encodedMessage = new TextEncoder().encode(message);
      const signedMessage = await signMessage(encodedMessage);

      setSignature(signedMessage);
      alert("Message signed successfully");
    } catch (err) {
      console.error(err);
      alert("Message signing failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h3>Sign Message</h3>

      <textarea
        placeholder="Enter message to sign"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <button onClick={handleSignMessage} disabled={loading}>
        {loading ? "Signing..." : "Sign Message"}
      </button>

      {signature && (
        <div style={{ marginTop: "10px", wordBreak: "break-all" }}>
          <strong>Signature:</strong>
          <p>{Buffer.from(signature).toString("hex")}</p>
        </div>
      )}
    </div>
  );
};
