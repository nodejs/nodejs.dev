import { useState, useEffect } from 'react';

export interface ReleaseData {
  date: string;
  version: string;
  files: string[];
  lts: boolean;
  v8: string;
  npm?: string;
  modules?: string;
  openssl?: string;
  security?: boolean;
  uv?: string;
  zlib?: string;
}

export function useReleaseHistory(): ReleaseData[] {
  const releasesURL = 'https://nodejs.org/dist/index.json';
  const [releaseHistory, setReleaseHistory] = useState<ReleaseData[]>([]);
  useEffect((): void => {
    const fetchData = async (): Promise<void> => {
      const result = await fetch(releasesURL).then(
        (data): Promise<ReleaseData[]> => data.json()
      );
      setReleaseHistory(result);
    };
    fetchData();
  }, []);

  return releaseHistory;
}
