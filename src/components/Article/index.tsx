import React, { useEffect, useMemo, useState } from 'react';
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
import Table from '../Table';
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extraComponents?: Record<string, (...any: any[]) => JSX.Element | null>;
}

const mdxComponents = {
  pre: Codebox,
  inlineCode: InlineCode,
  a: MdxLink,
  table: Table,
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
}: Props): JSX.Element => {
  const [mdxRendered, setMdxRendered] = useState<React.ReactElement | null>(
    null
  );

  // Due to some pages being enormously big, we don't want to render the whole page on the server-side as it would take too long.
  // Not to mention it could also lead to crashes and babel optimization issues as there's just too much to bundle on SSR
  // Instead we render the contents of MDX Pages only within the client-side, and we memoize the remaining components
  // to avoid re-rendering them on every page change.
  useEffect(() => {
    setMdxRendered(
      <MDXProvider components={{ ...mdxComponents, ...extraComponents }}>
        <MDXRenderer>{body}</MDXRenderer>
      </MDXProvider>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const memoizedArticle = useMemo(
    () => (
      <>
        <h1 className={styles.headline}>{title}</h1>
        {blog
          ? renderBlogAuthors(date, authors as BlogPostAuthor[])
          : renderTOC(tableOfContents)}
        <div>{mdxRendered}</div>
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
      </>
    ),
    [
      absolutePath,
      authors,
      blog,
      children,
      date,
      editPath,
      mdxRendered,
      next,
      previous,
      relativePath,
      tableOfContents,
      title,
    ]
  );

  return (
    <article className={styles.article}>
      {mdxRendered && memoizedArticle}
    </article>
  );
};

export default Article;
