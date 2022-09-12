// eslint-disable-next-line no-shadow
export enum ReleaseTypes {
  current = 'Current',
  lts = 'LTS',
  maintenance = 'Maintenance',
  endoflife = 'End-of-life',
}

export interface UpcomingReleaseData {
  releaseDate: string;
  releaseType: ReleaseTypes;
  alreadyReleased: boolean;
}

export interface UpcomingRelease {
  title: string;
  releases: UpcomingReleaseData[];
}

export interface NodeReleaseData {
  version: string;
  fullVersion: string;
  codename: string;
  isLts: boolean;
  status:
    | 'Maintenance LTS'
    | 'Active LTS'
    | 'Current'
    | 'End-of-life'
    | 'Pending';
  initialRelease: string;
  ltsStart: string | null;
  maintenanceStart: string | null;
  endOfLife: string;
}
