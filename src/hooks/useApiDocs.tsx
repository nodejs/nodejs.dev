import { useState, useEffect } from 'react';
export interface ApiDocsMeta {
  added: string[];
  changes: string[];
}
export interface ApiDocsBase {
  type: string;
  name: string;
  textRaw: string;
  displayName?: string;
  desc?: string;
  meta?: ApiDocsMeta;
  introduced_in?: string;
}

export interface ApiDocsMiscs extends ApiDocsBase {
  type: 'misc';
  miscs?: ApiDocsMiscs[];
}

export interface ApiDocsMethod extends ApiDocsBase {
  type: 'method';
  signatures: ApiDocsSignature[];
}
export interface ApiDocsSignature extends ApiDocsBase {
  params: ApiDocsProp[];
}

export interface ApiDocsClass extends ApiDocsBase {
  type: 'class';
  methods: ApiDocsMethod[];
  properties: ApiDocsProp[];
  signatures: ApiDocsSignature[];
}

export interface ApiDocsProp extends ApiDocsBase {
  type: string;
}

export interface ApiDocsModule extends ApiDocsBase {
  type: 'module';
  stability: number;
  stabilityText: string;
  modules?: ApiDocsModule[];
  methods?: ApiDocsMethod[];
  classes?: ApiDocsClass[];
  properties?: ApiDocsProp[];
  miscs?: ApiDocsMiscs[];
}

export interface APIResponse {
  classes: ApiDocsClass[];
  globals: ApiDocsProp[];
  methods: ApiDocsMethod[];
  miscs: ApiDocsMiscs[];
  modules: ApiDocsModule[];
}

export type ApiDocsObj =
  | ApiDocsMiscs
  | ApiDocsMethod
  | ApiDocsSignature
  | ApiDocsClass
  | ApiDocsProp
  | ApiDocsModule;

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
