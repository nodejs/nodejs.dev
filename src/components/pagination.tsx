import { Link } from 'gatsby';
import React from 'react';
import { PageInfo } from '../types';

type Props = {
  previous?: PageInfo;
  next?: PageInfo;
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
