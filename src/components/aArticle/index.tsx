import React from 'react';
import { PaginationInfo } from '../../types';
import AuthorsList from '../../containers/AuthorList';
import EditLink from '../EditLink';
import Pagination from '../Pagination';
import TOC from '../Toc';

interface Props {
  title: string;
  html: string;
  tableOfContents: string;
  authors: string[];
  relativePath: string;
  next?: PaginationInfo;
  previous?: PaginationInfo;
}

const Article = ({
  title,
  html,
  tableOfContents,
  previous,
  next,
  relativePath,
  authors,
}: Props): JSX.Element => (
  <article className="article-reader">
    <h1 className="article-reader__headline">{title}</h1>
    <TOC heading="TABLE OF CONTENTS" tableOfContents={tableOfContents} />
    {/* eslint-disable-next-line react/no-danger */}
    <div dangerouslySetInnerHTML={{ __html: html }} />
    <AuthorsList authors={authors} />
    <EditLink relativePath={relativePath} />
    <Pagination previous={previous} next={next} />
  </article>
);

export default Article;
