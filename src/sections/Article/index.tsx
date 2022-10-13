import React from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { BlogComponents, ArticleComponents } from '../../components';
import { mdxComponents } from '../../mdxComponents';
import {
  PaginationInfo,
  BlogPostAuthor,
  TableOfContentsItem,
} from '../../types';
import styles from './index.module.scss';

interface Props {
  title: string;
  body: string;
  authors?: string[] | BlogPostAuthor[];
  tableOfContents?: TableOfContentsItem[];
  relativePath?: string;
  absolutePath?: string;
  editPath?: string;
  next?: PaginationInfo;
  previous?: PaginationInfo;
  blog?: boolean;
  date?: string;
  children?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extraComponents?: Record<string, (...any: any[]) => JSX.Element | null>;
  childrenPosition?: 'before' | 'after';
}

const renderBlogAuthors = (
  date: string | undefined,
  authors: BlogPostAuthor[] | undefined
) => <BlogComponents.BlogAuthorsList date={date} authors={authors || []} />;

const renderArticleAuthors = (authors: string[]) => (
  <ArticleComponents.AuthorList authors={authors || []} />
);

const renderTOC = (tableOfContents: TableOfContentsItem[] | undefined) => (
  <ArticleComponents.TableOfContents tableOfContents={tableOfContents || []} />
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
  childrenPosition = 'after',
}: Props): JSX.Element => (
  <article className={styles.article}>
    {childrenPosition === 'before' && children && <div>{children}</div>}
    <h1 className={styles.headline}>{title}</h1>
    {blog
      ? renderBlogAuthors(date, authors as BlogPostAuthor[])
      : renderArticleAuthors(authors as string[])}
    {renderTOC(tableOfContents)}
    <div>
      <MDXProvider components={{ ...mdxComponents, ...extraComponents }}>
        <MDXRenderer>{body}</MDXRenderer>
      </MDXProvider>
    </div>
    {childrenPosition === 'after' && children && <div>{children}</div>}
    {!blog && (
      <>
        <ArticleComponents.EditLink
          absolutePath={absolutePath}
          relativePath={relativePath}
          editPath={editPath}
        />
        <ArticleComponents.Pagination previous={previous} next={next} />
      </>
    )}
  </article>
);

export default Article;
