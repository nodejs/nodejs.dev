export interface LearnPageContext {
  slug: string;
  relativePath: string;
  next: PaginationInfo;
  previous: PaginationInfo;
  navigationData: NavigationSectionData;
}
export interface PaginationInfo {
  slug: string;
  title: string;
}
export interface NavigationSectionData {
  [index: string]: NavigationItemList;
}

export interface LearnPageData {
  doc: {
    id: string;
    html: string;
    frontmatter: {
      title: string;
      description: string;
    };
    fields: {
      authors: string[];
    };
  };
}

export type NavigationItemList = NavigationSectionItem[];

export interface NavigationSectionItem {
  isDone: boolean | null | undefined;
  slug: string;
  title: string;
  section: string;
}
