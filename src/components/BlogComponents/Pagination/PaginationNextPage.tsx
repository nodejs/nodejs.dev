import React from 'react';
import classnames from 'classnames';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { FormattedMessage } from 'react-intl';
import styles from './index.module.scss';

interface Props {
  className: string;
  currentPage: number;
  hrefBuilder: (n: number) => string;
  onPageChange: (n: number) => void;
  pageCount: number;
}

const PaginationNextPage = ({
  className,
  currentPage,
  hrefBuilder,
  onPageChange,
  pageCount,
}: Props) => {
  const componentClassName = classnames(className, styles.next);
  const content = <FormattedMessage id="components.pagination.next" />;
  const disabled = currentPage === pageCount;

  if (disabled) {
    return (
      <span aria-disabled="true" className={componentClassName}>
        {content}
      </span>
    );
  }

  const nextPage = currentPage + 1;

  return (
    <Link
      aria-label="Next Page"
      onClick={onPageChange(nextPage)}
      className={componentClassName}
      rel="next"
      to={hrefBuilder(nextPage)}
    >
      {content}
    </Link>
  );
};

export default PaginationNextPage;
