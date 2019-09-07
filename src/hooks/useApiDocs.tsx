import { useState, useEffect } from 'react';

// TODO: Flesh out API types.
/* tslint:disable */
export interface ApiDocsPage {
  name: string;
  displayName?: string;
  desc?: string;
}

export interface APIResponse {
  classes: ApiDocsPage[];
  globals: ApiDocsPage[];
  methods: ApiDocsPage[];
  miscs: ApiDocsPage[];
  modules: ApiDocsPage[];
}
/* tslint:enable */

export function useApiData(version: string | null): APIResponse {
  const [apiData, setApiData] = useState<APIResponse>({
    classes: [],
    globals: [],
    methods: [],
    miscs: [],
    modules: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await window.fetch(
        `https://nodejs.org/dist/${version}/docs/api/all.json`
      );
      setApiData((await res.json()) as APIResponse);
    };
    if (version) {
      fetchData();
    }
  }, [version]);

  return apiData;
}
