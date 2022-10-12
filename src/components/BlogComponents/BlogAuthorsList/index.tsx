import React from 'react';
import { getTerminatingString } from '../../../util/getTerminatingString';
import { BlogPostAuthor } from '../../../types';
import styles from './index.module.scss';

interface Props {
  authors: BlogPostAuthor[];
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

const BlogAuthorsList = ({ authors, date }: Props): JSX.Element => {
  if (authors.length) {
    return (
      <h5 className={styles.list}>
        {date} by{' '}
        {mapAuthorsList(authors).map(
          (author, i, array): string | JSX.Element => (
            <span key={author.id}>
              {getAuthorWebsite(author)}
              {getTerminatingString(i, array.length)}
            </span>
          )
        )}
      </h5>
    );
  }

  return <div />;
};

export default BlogAuthorsList;
