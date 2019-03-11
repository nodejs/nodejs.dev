import React from 'react';
import { PaginationInfo } from '../types';
import AuthorLink from './author-link';
import EditLink from './edit-link';
import Pagination from './pagination';
import TOC from './toc';

type Props = {
  title: string;
  html: string;
  tableOfContents: string;
  authors: string[];
  relativePath: string;
  next?: PaginationInfo;
  previous?: PaginationInfo;
};

const Article = ({
  title,
  html,
  tableOfContents,
  previous,
  next,
  relativePath,
  authors,
}: Props) => (
  <article className="article-reader">
    <h1 className="article-reader__headline">{title}</h1>
    <TOC heading="TABLE OF CONTENTS" tableOfContents={tableOfContents} />
    <div dangerouslySetInnerHTML={{ __html: html }} />
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: '5rem',
        alignItems: 'center',
      }}
    >
      Contributors:
      {authors &&
        authors.map(
          author => author && <AuthorLink username={author} key={author} />
        )}
    </div>
    <EditLink relativePath={relativePath} />
    <Pagination previous={previous} next={next} />
  </article>
);

export default Article;
