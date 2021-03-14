import React from 'react';
import Author from '../../components/Author';
import './AuthorList.scss';

interface Props {
  authors: string[];
  blog?: boolean;
}

const AuthorsList = ({ authors, blog }: Props): null | JSX.Element => {
  return (
    <ul className="list">
      <h5>
        {!blog ? 'Contributors' : `Author${authors.length > 1 ? 's' : ''}`}
      </h5>
      {authors.map(
        (author, i): string | JSX.Element =>
          author && (
            <Author index={i} username={author} key={author} size="60" />
          )
      )}
    </ul>
  );
};

export default AuthorsList;
