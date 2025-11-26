function TokenCard({ token }: any) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "12px", margin: "10px" }}>
      <img src={token.logo} width={40} height={40} alt="logo" />
      <p>
        <strong>{token.symbol}</strong>
      </p>
      <p>Balance: {token.amount}</p>
      <p>Mint: {token.mint}</p>
    </div>
  );
}

export default TokenCard;
