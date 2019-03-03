import React from 'react';
import { RemarkPage, PageInfo } from '../types';
import Pagination from './pagination';
import EditLink from './edit-link';

type Props = {
  page: RemarkPage;
  previous?: PageInfo;
  next?: PageInfo;
};

const Article = ({ page, previous, next }: Props) => (
  <article className="article-reader">
    <h1 className="article-reader__headline">{page.frontmatter.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: page.html }} />
    <EditLink relativePath={page.parent.relativePath} />
    <Pagination previous={previous} next={next} />
  </article>
);

export default Article;
