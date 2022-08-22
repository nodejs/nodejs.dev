import React from 'react';
import { FormattedMessage } from 'react-intl';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { PaginationInfo } from '../../types';
import './Pagination.scss';

interface Props {
  previous?: PaginationInfo;
  next?: PaginationInfo;
}

const Pagination = ({ previous, next }: Props): JSX.Element | null => {
  if (!previous && !next) return null;

  return (
    <ul className="pagination">
      <li>
        {previous && previous.title && (
          <Link className="link" to={`/learn/${previous.slug}`} rel="prev">
            <FormattedMessage id="components.pagination.previous" />
          </Link>
        )}
      </li>
      <li>
        {next && next.title && (
          <Link className="link" to={`/learn/${next.slug}`} rel="next">
            <FormattedMessage id="components.pagination.next" />
          </Link>
        )}
      </li>
    </ul>
  );
};

export default Pagination;
