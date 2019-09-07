import { useState, useEffect } from 'react';

export interface ReleaseData {
  date: string;
  version: string;
  files: string[];
  lts: boolean;
  v8: string;
  npm?: string;
  modules?: String;
  openssl?: string;
  security?: boolean;
  uv?: string;
  zlib?: string;
}

export function useReleaseHistory() {
  const releasesURL = 'https://nodejs.org/dist/index.json';
  const [releaseHistory, setReleaseHistory] = useState<ReleaseData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(releasesURL).then(data => data.json());
      setReleaseHistory(result);
    };
    fetchData();
  }, []);

  return releaseHistory;
}
