import { css } from '@emotion/core';
import React from 'react';
import Author from './author';

const list = css`
  display: flex;
  flex-wrap: wrap;
  margin: 5rem 0;
  align-items: center;
  color: var(--gray7);
  text-transform: uppercase;
  padding-left: 0;

  h5 {
    margin: 0.5rem;
    font-weight: normal;
  }
`;

type Props = {
  authors: string[];
};

const AuthorsList = ({ authors }: Props) => {
  if (!authors) {
    return null;
  }

  return (
    <ul css={list}>
      <h5>Contributors</h5>
      {authors.map(
        author => author && <Author username={author} key={author} size="60" />
      )}
    </ul>
  );
};

export default AuthorsList;
