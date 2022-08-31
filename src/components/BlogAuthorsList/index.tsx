import React from 'react';
import { BlogPostAuthor } from '../../types';
import { getTerminatingString } from '../../util/getTerminatingString';
import styles from './index.module.scss';

interface Props {
  authors?: BlogPostAuthor[];
  date?: string;
}

const unknownAuthor = {
  name: 'Unknown',
};

const mapAuthorsList = (authors: BlogPostAuthor[]) =>
  authors.map(author => author || unknownAuthor);

const getAuthorWebsite = (author: BlogPostAuthor) => {
  if (author.website) {
    return (
      <a target="_blank" rel="noopener noreferrer" href={author.website}>
        {author.name}
      </a>
    );
  }

  return author.name;
};

const BlogAuthorsList = ({ authors, date }: Props): null | JSX.Element => (
  <h5 className={styles.list}>
    {date} by{' '}
    {mapAuthorsList(authors || []).map(
      (author, i, array): string | JSX.Element => (
        <span key={author.id}>
          {getAuthorWebsite(author)}
          {getTerminatingString(i, array.length)}
        </span>
      )
    )}
  </h5>
);

export default BlogAuthorsList;
