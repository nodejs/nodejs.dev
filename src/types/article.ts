import { PageTableOfContents } from './markdown';

export interface ArticleData {
  body: string;
  tableOfContents: PageTableOfContents;
  frontmatter: {
    title: string;
    description: string;
    displayTitle?: string;
  };
  fields: { authors: string[]; slug?: string };
}
