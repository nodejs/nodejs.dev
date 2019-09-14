import { css, SerializedStyles } from '@emotion/core';
import React from 'react';
import Author from './author';

const list: SerializedStyles = css`
  display: flex;
  flex-wrap: wrap;
  margin: 5rem 0 2.5rem;
  align-items: center;
  color: var(--black7);
  text-transform: uppercase;
  padding-left: 0;

  li:first-child a {
    margin-left: 0 !important;
  }

  h5 {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin: 0.5rem 0.5rem 0.5rem 0;
    font-weight: normal;
    font-size: 1.4rem;
  }
`;

interface Props {
  authors: string[];
}

const AuthorsList = ({ authors }: Props): null | JSX.Element => {
  if (!authors) {
    return null;
  }

  return (
    <ul css={list}>
      <h5>Contributors</h5>
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
