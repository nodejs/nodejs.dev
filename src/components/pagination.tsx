import { css, SerializedStyles } from '@emotion/core';
import { Link } from 'gatsby';
import React from 'react';
import { PaginationInfo } from '../types';

const link: SerializedStyles = css`
  color: var(--black7) !important;
  text-transform: uppercase;
  text-decoration: none !important;
  font-size: 1.4rem;
  font-weight: normal;
  font-family: var(--sans-serif);
  vertical-align: middle;

  &:hover {
    color: var(--brand-light) !important;
  }
`;

interface Props {
  previous?: PaginationInfo;
  next?: PaginationInfo;
}

const ulStyles: SerializedStyles = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 5rem 0;
`;

const Pagination = ({ previous, next }: Props): JSX.Element => (
  <ul css={ulStyles}>
    <li>
      {previous && previous.title && (
        <Link css={link} to={`/learn/${previous.slug}`} rel="prev">
          ← &nbsp; Prev
        </Link>
      )}
    </li>
    <li>
      {next && next.title && (
        <Link css={link} to={`/learn/${next.slug}`} rel="next">
          Next &nbsp; →
        </Link>
      )}
    </li>
  </ul>
);

export default Pagination;
