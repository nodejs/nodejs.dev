import { PageTableOfContents, PaginationInfo } from '../markdown';
import { NavigationSectionData } from '../navigation';

export interface LearnTemplateContext {
  slug: string;
  relativePath: string;
  next: PaginationInfo;
  previous: PaginationInfo;
  navigationData: NavigationSectionData;
}

export interface LearnTemplateData {
  article: {
    id: string;
    body: string;
    tableOfContents: PageTableOfContents;
    frontmatter: { displayTitle: string; description: string };
    fields: { authors: string[] };
  };
}
