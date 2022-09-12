export interface BlogCategory {
  node: {
    name: string;
    slug: string;
    description?: string;
  };
}

export interface BlogPostAuthor {
  id?: string;
  name: string;
  website: string;
}

export interface BlogPost {
  node: {
    frontmatter: {
      title: string;
      blogAuthors: BlogPostAuthor[];
      category?: BlogCategory['node'];
    };
    fields: { date: string; slug: string; readingTime: { text: string } };
  };
}
