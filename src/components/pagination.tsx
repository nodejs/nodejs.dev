import { Link } from 'gatsby';
import React from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { PageInfo } from '../types';

type Props = {
  previous?: PageInfo;
  next?: PageInfo;
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
      {previous && previous.frontmatter.title && (
        <Link to={`/learn/${previous.fields.slug}`} rel="prev">
          ← &nbsp; Prev
        </Link>
      )}
    </li>
    <li>
      {next && next.frontmatter.title && (
        <Link to={`/learn/${next.fields.slug}`} rel="next">
          Next &nbsp; →
        </Link>
      )}
    </li>
  </ul>
)

export default Pagination
