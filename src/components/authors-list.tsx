import styled from '@emotion/styled';
import React from 'react';
import Author from './author';

const AuthorsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 5rem 0;
  align-items: center;
  color: var(--gray7);
  text-transform: uppercase;

  span {
    margin: 0.5rem;
  }
`;

type Props = {
  authors: string[];
};

export default ({ authors }: Props) => {
  if (!authors) {
    return null;
  }

  return (
    <AuthorsList>
      <span>Contributors</span>
      {authors &&
        authors.map(
          author =>
            author && <Author username={author} key={author} size="60" />
        )}
    </AuthorsList>
  );
};
