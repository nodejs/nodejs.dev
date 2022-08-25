import React from 'react';
import { BlogPostAuthor } from '../../types';
import { getTerminatingString } from '../../util/getTerminatingString';
import './BlogAuthorsList.scss';

interface Props {
  authors?: BlogPostAuthor[];
  date?: string;
}

const unknownAuthor = {
  name: 'Unknown',
};

const mapAuthorsList = (authors: BlogPostAuthor[]) =>
  authors.map(author => author || unknownAuthor);

const BlogAuthorsList = ({ authors, date }: Props): null | JSX.Element => (
  <h5 className="list">
    {date} by{' '}
    {mapAuthorsList(authors || []).map(
      (author, i, array): string | JSX.Element =>
        author && (
          <span key={author.id}>
            {author.website ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={author.website}
              >
                {author.name}
              </a>
            ) : (
              author.name
            )}
            {getTerminatingString(i, array.length)}
          </span>
        )
    )}
  </h5>
);

export default BlogAuthorsList;
