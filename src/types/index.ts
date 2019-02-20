export interface RemarkPage {
  id: string;
  fileAbsolutePath: string;
  html: string;
  parent: {
    relativePath: string
  }
  frontmatter: {
    title: string;
    description: string;
    author: string;
  }
  fields: {
    slug: string;
  }
}

export interface PageInfo {
  frontmatter: {
    title: string;
  }
  fields: {
    slug: string;
  }
}

export interface RemarkSection {
  fieldValue: string;
  edges: Array<{ node: RemarkPage; previous: PageInfo; next: PageInfo }>;
}

export interface LearnPageData {
  sections: {
    group: Array<RemarkSection>;
  }
}

export interface NavigationItemData {
  id: string;
  title: string;
  isActive: boolean;
  isDone: boolean;
  slug: string;
}

export interface NavigationSectionData {
  title: string;
  items: Array<NavigationItemData>;
}
