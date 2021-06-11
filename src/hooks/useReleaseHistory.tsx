import { useState, useEffect } from 'react';
import { getReleaseStatus } from '../util/getReleaseStatus';

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

export interface NodeReleaseData {
  release: string;
  status: string;
  codename: string;
  initialRelease: string;
  activeLTSStart: string;
  maintenanceLTSStart: string;
  endOfLife: string;
}

export interface NodeReleaseVersionData {
  start: string;
  end: string;
  maintenance?: string;
  lts?: string;
  codename?: string;
}

type NodeReleaseDataAPIResponse = Record<string, NodeReleaseVersionData>;

export function useReleaseHistory(): ReleaseData[] {
  const releasesURL = 'https://nodejs.org/dist/index.json';
  const [releaseHistory, setReleaseHistory] = useState<ReleaseData[]>([]);
  useEffect((): void => {
    const fetchData = async (): Promise<void> => {
      const apiResponse = await fetch(releasesURL);
      const result: ReleaseData[] = await apiResponse.json();
      setReleaseHistory(result);
    };
    fetchData();
  }, []);

  return releaseHistory;
}

export function useReleaseData(): {
  releaseData: NodeReleaseData[];
  rawData: NodeReleaseDataAPIResponse;
} {
  const releaseDataURL =
    'https://raw.githubusercontent.com/nodejs/Release/main/schedule.json';
  const [releaseData, setReleaseData] = useState<NodeReleaseData[]>([]);
  const [rawData, setRawData] = useState<NodeReleaseDataAPIResponse>({});
  useEffect((): void => {
    const fetchData = async (): Promise<void> => {
      const apiResponse = await fetch(releaseDataURL);
      const result: NodeReleaseDataAPIResponse = await apiResponse.json();
      setRawData(result);
      const filteredResult: NodeReleaseData[] = [];
      Object.keys(result).forEach(key => {
        const release = result[key];
        const end = new Date(release.end);
        if (end >= new Date())
          filteredResult.push({
            endOfLife: release.end,
            maintenanceLTSStart: release.maintenance || '',
            activeLTSStart: release.lts || '',
            codename: release.codename || '',
            initialRelease: release.start,
            release: key,
            status: getReleaseStatus(release),
          });
      });
      setReleaseData(filteredResult);
    };
    fetchData();
  }, []);

  return { releaseData, rawData };
}
