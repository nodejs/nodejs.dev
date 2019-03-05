import { Link } from 'gatsby';
import React from 'react';
import { PaginationInfo } from '../types';

type Props = {
  previous?: PaginationInfo;
  next?: PaginationInfo;
}

const Pagination = ({ previous, next }: Props) => (
  <ul
    style={{
      display: `flex`,
      flexWrap: `wrap`,
      justifyContent: `space-between`,
      listStyle: `none`,
      padding: '30px',
    }}
  >
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
