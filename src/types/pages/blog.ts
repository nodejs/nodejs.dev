import { BlogCategory, BlogPost } from '../blog';

export interface BlogTemplateContext {
  posts: BlogPost[];
  categories: BlogCategory[];
  category: BlogCategory['node'];
}
