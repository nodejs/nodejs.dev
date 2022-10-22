import React, { MouseEvent } from 'react';
import classnames from 'classnames';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { PageModel } from '../../../types/pagination';

interface Props {
  className: string;
  page: PageModel;
  hrefBuilder: (n: number) => string;
  onPageChange?: (e: MouseEvent) => void;
}

const PaginationPage = ({
  className,
  page,
  hrefBuilder,
  onPageChange,
}: Props) => {
  const content = String(page.num);
  const componentClassName = classnames(className, page?.className ?? '');

  if (page.selected) {
    return (
      <em aria-current="page" className={componentClassName}>
        {content}
      </em>
    );
  }

  return (
    <Link
      aria-label={`Page ${page.num}`}
      onClick={onPageChange}
      className={componentClassName}
      to={hrefBuilder(page.num)}
    >
      {content}
    </Link>
  );
};

export default PaginationPage;
