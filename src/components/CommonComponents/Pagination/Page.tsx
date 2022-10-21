import React, { MouseEvent, ReactElement, FC } from 'react';
import classnames from 'classnames';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { FormattedMessage } from 'react-intl';
import { PageModel, PageType } from './util/buildPaginationModel';

interface Props {
  className: string;
  page: PageModel;
  hrefBuilder: (n: number) => string;
  onPageChange?: (e: MouseEvent) => void;
}

const getPagerContent = (page: PageModel): string | ReactElement => {
  const content = {
    [PageType.PREV]: <FormattedMessage id="components.pagination.previous" />,
    [PageType.NEXT]: <FormattedMessage id="components.pagination.next" />,
    [PageType.NUM]: String(page.num),
    [PageType.BREAK]: '…',
  };
  return content[page.type] || '';
};
const getAriaLabel = (page: PageModel): string => {
  const ariaLabel = {
    [PageType.PREV]: 'Previous Page',
    [PageType.NEXT]: 'Next Page',
    [PageType.NUM]: `Page ${page.num}`,
  };
  return ariaLabel[page.type] || '';
};
const getRel = (page: PageModel): string | undefined => {
  const rel = {
    [PageType.PREV]: 'prev',
    [PageType.NEXT]: 'next',
  };
  return rel[page.type];
};

const Page: FC<Props> = ({ className, page, hrefBuilder, onPageChange }) => {
  const content = getPagerContent(page);
  const componentClassName = classnames(className, page?.className ?? '');

  if (page.disabled) {
    return (
      <span aria-disabled="true" className={componentClassName}>
        {content}
      </span>
    );
  }

  if (page.selected) {
    return (
      <em aria-current="page" className={componentClassName}>
        {content}
      </em>
    );
  }

  return (
    <Link
      aria-label={getAriaLabel(page)}
      onClick={onPageChange}
      className={componentClassName}
      rel={getRel(page)}
      to={hrefBuilder(page.num)}
    >
      {content}
    </Link>
  );
};

export default Page;
