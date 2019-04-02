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
    <div css={list}>
      <span>Contributors</span>
      {authors &&
        authors.map(
          author =>
            author && <Author username={author} key={author} size="60" />
        )}
    </div>
  );
};
