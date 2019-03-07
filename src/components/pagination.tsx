import { Link } from 'gatsby';
import React from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { PaginationInfo } from '../types';

type Props = {
  previous?: PaginationInfo;
  next?: PaginationInfo;
}

const ulStyles: SerializedStyles = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 30px;
`;

const Pagination = ({ previous, next }: Props) => (
  <ul css={ulStyles}>
    <li>
      {previous && previous.title && (
        <Link to={`/${previous.slug}`} rel="prev">
          ← &nbsp; Prev
        </Link>
      )}
    </li>
    <li>
      {next && next.title && (
        <Link to={`/${next.slug}`} rel="next">
          Next &nbsp; →
        </Link>
      )}
    </li>
  </ul>
)

export default Pagination
