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
}

const PaginationPreviousPage = ({
  className,
  currentPage,
  hrefBuilder,
  onPageChange,
}: Props) => {
  const componentClassName = classnames(className, styles.prev);
  const content = <FormattedMessage id="components.pagination.previous" />;
  const disabled = currentPage === 1;

  if (disabled) {
    return (
      <span aria-disabled="true" className={componentClassName}>
        {content}
      </span>
    );
  }

  const previousPage = currentPage - 1;

  return (
    <Link
      aria-label="Previous Page"
      onClick={onPageChange(previousPage)}
      className={componentClassName}
      rel="prev"
      to={hrefBuilder(previousPage)}
    >
      {content}
    </Link>
  );
};

export default PaginationPreviousPage;
