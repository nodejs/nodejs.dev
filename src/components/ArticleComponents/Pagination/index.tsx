import React from 'react';
import { FormattedMessage } from 'react-intl';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import { PaginationInfo } from '../../../types';
import styles from './index.module.scss';

interface Props {
  previous?: PaginationInfo;
  next?: PaginationInfo;
}

const Pagination = ({ previous, next }: Props): JSX.Element | null => {
  if (!previous && !next) return null;

  return (
    <ul className={styles.pagination}>
      <li>
        {previous && previous.title && (
          <Link to={previous.slug} rel="prev">
            <FontAwesomeIcon
              icon={faAnglesLeft}
              style={{ marginRight: '5px' }}
            />
            <FormattedMessage id="components.pagination.previous" />
          </Link>
        )}
      </li>
      <li>
        {next && next.title && (
          <Link to={next.slug} rel="next">
            <FormattedMessage id="components.pagination.next" />
            <FontAwesomeIcon
              icon={faAnglesRight}
              style={{ marginLeft: '5px' }}
            />
          </Link>
        )}
      </li>
    </ul>
  );
};

export default Pagination;
