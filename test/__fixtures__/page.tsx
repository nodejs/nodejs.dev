import { RemarkPage, PageInfo } from '../../src/types';

export const createPageInfo = (title: string) => ({
  frontmatter: { title },
  fields: { slug: title },
}) as PageInfo;

export const createRemarkPage = (title: string) => ({
  html: `<span>${title}</span>`,
  parent: {
    relativePath: `path/${title}.md`
  },
  frontmatter: {
    title,
    description: 'mock-description',
    author: 'mock-author',
  },
  fields: {
    slug: title
  },
}) as RemarkPage;
