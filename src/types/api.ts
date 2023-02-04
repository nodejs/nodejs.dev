export interface ApiChange {
  version: string | string[];
  'pr-url': string;
  description: string;
}

export interface ApiUpdate {
  type: 'added' | 'removed' | 'deprecated' | 'introduced_in' | 'napiVersion';
  version: string[];
}

export interface ApiComponentData {
  type?: string;
  name?: string;
  source_link?: string;
  update?: ApiUpdate;
  changes?: ApiChange[];
}

export interface ApiType {
  name: string;
  slug: string;
}
