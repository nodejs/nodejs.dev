import React from 'react';
import Author from './author';

type Props = {
  authors: string[];
};

const AuthorsList = ({ authors }: Props) => {
  if (!authors) {
    return null;
  }

  return (
    <div className="authors-list">
      <p>Contributors</p>
      {authors &&
        authors.map(
          author =>
            author && <Author username={author} key={author} size="60" />
        )}
    </div>
  );
};

export default AuthorsList;
