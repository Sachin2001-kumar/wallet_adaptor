import { useEffect, useState } from "react";
import { getTokenMetadata } from "./metadata";

function useTokenMetadata(connection: any, mint: string) {
  const [meta, setmeta] = useState<any>(null);

  useEffect(() => {
    if (!mint) return;

    async function load() {
      const result = await getTokenMetadata(connection, mint);
      setmeta(result);
    }

    load();
  }, [mint]);

  return meta;
}

export default useTokenMetadata;
