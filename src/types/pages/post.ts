import { BlogPost, BlogPostAuthor } from '../blog';
import { PaginationInfo } from '../markdown';
import { NavigationData } from '../navigation';

export interface PostTemplateData {
  mdx: {
    body: string;
    excerpt: string;
    frontmatter: { title: string; blogAuthors: BlogPostAuthor[] };
    fields: { slug: string; date: string };
  };
}

export interface PostTemplateContext {
  slug: string;
  relativePath: string;
  next: PaginationInfo;
  previous: PaginationInfo;
  navigationData: NavigationData;
  recent: BlogPost[];
}
