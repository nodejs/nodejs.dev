import { Moment } from 'moment';
import { Event } from 'react-big-calendar';

export interface HomepageData {
  page: {
    id: string;
    body: string;
    frontmatter: {
      title: string;
      displayTitle: string;
      subTitle: string;
      description: string;
      learnLinkText: string;
      beginnerGuideHeaderText: string;
      beginnerGuideBodyText: string;
      doMoreWithNodeHeaderText: string;
      doMoreWithNodeBodyText: string;
      nodeFeatureHeader1: string;
      nodeFeatureHeader2: string;
      nodeFeatureHeader3: string;
      nodeFeature1: string;
      nodeFeature2: string;
      nodeFeature3: string;
      nodeFeatureAltText: string;
    };
  };
}

export interface LearnPageContext {
  slug: string;
  relativePath: string;
  next: PaginationInfo;
  previous: PaginationInfo;
  navigationData: NavigationSectionData;
}

export interface TableOfContents {
  items: {
    title: string;
    url: string;
  }[];
}

export interface LearnPageData {
  doc: {
    id: string;
    body: string;
    tableOfContents: TableOfContents;
    frontmatter: { title: string; description: string };
    fields: { authors: string[] };
  };
}

export interface PaginationInfo {
  slug: string;
  title: string;
}

export interface NavigationSectionItem {
  slug: string;
  title: string;
  section: string;
  category: string;
}

export interface NavigationSectionData {
  [index: string]: { category: string; data: NavigationSectionItem[] };
}

/**
 * Payload on the `stickychange` custom event
 */
export interface StickyChange {
  stuck: boolean;
  target: HTMLElement;
}

export interface SentinelObserverSetupOptions {
  container: HTMLElement;
  stickyElementsClassName: string;
  root?: HTMLElement | null;
  headerRootMargin?: string;
  footerRootMargin?: string;
}

declare global {
  interface Window {
    previousPath: string;
  }
}

export interface DataPage {
  page: {
    body: string;
    tableOfContents: TableOfContents;
    frontmatter: {
      title: string;
      description: string;
    };
    fields: { authors: string[] };
  };
}

export interface Page {
  editPath?: string;
  data: DataPage;
  location?: Location;
}
export interface CommunityNavigationSection {
  title: string;
  sections: string[];
}

export interface BlogPostAuthor {
  id?: string;
  name: string;
  url: string;
}

export interface BlogMetaData {
  node: {
    frontmatter: { title: string; author: BlogPostAuthor[] };
    fields: { date: string; slug: string };
  };
}
export interface BlogPostsList {
  blogs: {
    edges: BlogMetaData[];
  };
}

export interface BlogPageData {
  blog: {
    body: string;
    excerpt: string;
    frontmatter: { title: string; author: BlogPostAuthor[] };
    fields: { slug: string; date: string };
  };
  recent: {
    edges: BlogMetaData[];
  };
}

export interface BlogPageContext {
  slug: string;
  relativePath: string;
  next: PaginationInfo;
  previous: PaginationInfo;
  navigationData: NavigationSectionData;
}

export interface SideNavBarItem {
  title: string;
  slug: string;
}

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

export interface NodeReleaseDataDetail {
  date: string;
  version: string;
  files: string[];
  lts: string;
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

export type NodeReleaseLTSVersion = Pick<
  NodeReleaseDataDetail,
  'version' | 'lts'
>;

export type NodeReleaseLTSNPMVersion = Pick<
  NodeReleaseDataDetail,
  'lts' | 'npm' | 'version'
>;

export interface BannersIndex {
  endDate: string;
  link: string;
  text: string;
  startDate: string;
}

export interface BannersBLM {
  link: string;
  text: string;
  visible: boolean;
}

export interface Banners {
  banners: {
    index: BannersIndex;
    blacklivesmatter: BannersBLM;
  };
}

/**
 * export interface Event {
    allDay?: boolean | undefined;
    title?: string | undefined; event.summary
    start?: Date | undefined; event.startTime
    end?: Date | undefined; event.endTime
    resource?: any;
}
*/
export interface CalendarEvent extends Event {
  htmlLink?: string;
  description?: string;
  location?: string;
  id: string;
  recurrence?: string[];
  changedEvents?: ChangedCalendarEvent[];
  cancelledEvents?: CancelledCalendarEvent[];
  calendarName?: string;
  color?: string;
  startTime: Moment;
  endTime: Moment;
}

export interface ChangedCalendarEvent {
  recurringEventId: string;
  title: string;
  description?: string;
  location?: string;
  originalStartTime: Moment;
  newStartTime: Moment;
  newEndTime: Moment;
}

export interface CancelledCalendarEvent {
  recurringEventId: string;
  originalStartTime: Moment;
}

export interface GCalEvent {
  kind: 'calendar#event';
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: Date;
  updated: Date;
  summary: string;
  description: string;
  location: string;
  colorId: string;
  creator: {
    id: string;
    email: string;
    displayName: string;
    self: boolean;
  };
  organizer: {
    id: string;
    email: string;
    displayName: string;
    self: boolean;
  };
  start: {
    date: Date;
    dateTime: Date;
    timeZone: string;
  };
  end: {
    date: Date;
    dateTime: Date;
    timeZone: string;
  };
  endTimeUnspecified: boolean;
  recurrence: [string];
  recurringEventId: string;
  originalStartTime: {
    date: Date;
    dateTime: Date;
    timeZone: string;
  };
  transparency: string;
  visibility: string;
  iCalUID: string;
  sequence: number;
  attendees: [
    {
      id: string;
      email: string;
      displayName: string;
      organizer: boolean;
      self: boolean;
      resource: boolean;
      optional: boolean;
      responseStatus: string;
      comment: string;
      additionalGuests: number;
    }
  ];
  attendeesOmitted: boolean;
  extendedProperties: {
    private: {
      [key: string]: string;
    };
    shared: {
      [key: string]: string;
    };
  };
  hangoutLink: string;
  conferenceData: {
    createRequest: {
      requestId: string;
      conferenceSolutionKey: {
        type: string;
      };
      status: {
        statusCode: string;
      };
    };
    entryPoints: [
      {
        entryPointType: string;
        uri: string;
        label: string;
        pin: string;
        accessCode: string;
        meetingCode: string;
        passcode: string;
        password: string;
      }
    ];
    conferenceSolution: {
      key: {
        type: string;
      };
      name: string;
      iconUri: string;
    };
    conferenceId: string;
    signature: string;
    notes: string;
  };
  gadget: {
    type: string;
    title: string;
    link: string;
    iconLink: string;
    width: number;
    height: number;
    display: string;
    preferences: {
      [key: string]: string;
    };
  };
  anyoneCanAddSelf: boolean;
  guestsCanInviteOthers: boolean;
  guestsCanModify: boolean;
  guestsCanSeeOtherGuests: boolean;
  privateCopy: boolean;
  locked: boolean;
  reminders: {
    useDefault: boolean;
    overrides: [
      {
        method: string;
        minutes: number;
      }
    ];
  };
  source: {
    url: string;
    title: string;
  };
  attachments: [
    {
      fileUrl: string;
      title: string;
      mimeType: string;
      iconLink: string;
      fileId: string;
    }
  ];
  eventType: string;
}

export interface GCalResponse {
  result: {
    items: GCalEvent[];
    summary: string;
  };
}
