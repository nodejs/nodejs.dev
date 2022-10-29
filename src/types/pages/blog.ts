import { PagePaginationInfo } from '../markdown';
import { BlogCategory, BlogPost } from '../blog';

export interface BlogTemplateContext {
  categories: BlogCategory[];
  category: BlogCategory['node'];
  pagination: PagePaginationInfo;
  posts: BlogPost[];
}
