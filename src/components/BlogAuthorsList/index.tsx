import React from 'react';
import { BlogPostAuthor } from '../../types';
import { getTerminatingString } from '../../util/getTerminatingString';
import './BlogAuthorsList.scss';

interface Props {
  authors: BlogPostAuthor[];
  date?: string;
}

const BlogAuthorsList = ({ authors, date }: Props): null | JSX.Element => {
  return (
    <h5 className="list">
      {date} by{' '}
      {authors.map(
        (author, i): string | JSX.Element =>
          author && (
            <span key={author.id}>
              {author.url ? (
                <a target="_blank" rel="noopener noreferrer" href={author.url}>
                  {author.name}
                </a>
              ) : (
                author.name
              )}
              {getTerminatingString(i, authors.length)}
            </span>
          )
      )}
    </h5>
  );
};

export default BlogAuthorsList;
