import React from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { MdxLink } from 'gatsby-theme-i18n';
import {
  PaginationInfo,
  BlogPostAuthor,
  PageTableOfContents,
} from '../../types';
import AuthorList from '../../containers/AuthorList';
import EditLink from '../EditLink';
import Pagination from '../Pagination';
import TableOfContents from '../TableOfContents';
import BlogAuthorsList from '../BlogAuthorsList';
import Codebox from '../Codebox';
import InlineCode from '../Codebox/InlineCode';
import styles from './index.module.scss';

interface Props {
  title: string;
  body: string;
  tableOfContents?: PageTableOfContents;
  authors: string[] | BlogPostAuthor[];
  relativePath?: string;
  absolutePath?: string;
  editPath?: string;
  next?: PaginationInfo;
  previous?: PaginationInfo;
  blog?: boolean;
  date?: string;
  children?: React.ReactNode;
  extraComponents?: Record<string, (...any: any[]) => JSX.Element>;
}

const mdxComponents = {
  pre: Codebox,
  inlineCode: InlineCode,
  a: MdxLink,
};

const renderBlogAuthors = (date?: string, authors?: BlogPostAuthor[]) => (
  <BlogAuthorsList date={date} authors={authors} />
);

const renderTOC = (tableOfContents?: PageTableOfContents) => (
  <TableOfContents tableOfContents={tableOfContents} />
);

const Article = ({
  title,
  body,
  tableOfContents,
  previous,
  next,
  relativePath,
  absolutePath,
  editPath,
  authors,
  blog,
  date,
  children,
  extraComponents = {},
}: Props): JSX.Element => (
  <article className={styles.article}>
    <h1 className={styles.headline}>{title}</h1>
    {blog
      ? renderBlogAuthors(date, authors as BlogPostAuthor[])
      : renderTOC(tableOfContents)}
    <div>
      <MDXProvider components={{ ...mdxComponents, ...extraComponents }}>
        <MDXRenderer>{body}</MDXRenderer>
      </MDXProvider>
    </div>
    {children && <div>{children}</div>}
    {!blog && authors.length > 0 && (
      <AuthorList authors={authors as string[]} />
    )}
    {!blog && (
      <EditLink
        absolutePath={absolutePath}
        relativePath={relativePath}
        editPath={editPath}
      />
    )}
    {!blog && <Pagination previous={previous} next={next} />}
  </article>
);

export default Article;
