export interface TableOfContentsItem {
  title: string;
  url: string;
  items?: TableOfContentsItem[];
}

export interface PageTableOfContents {
  items: TableOfContentsItem[];
}

export interface PaginationInfo {
  slug: string;
  title: string;
}

export interface PagePaginationInfo {
  current: number;
  total: number;
}
