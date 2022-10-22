import React, { MouseEvent, useCallback } from 'react';
import { generatePageList } from './util/generatePageList';
import { PageType } from '../../../types/pagination';
import PaginationPreviousPage from './PaginationPreviousPage';
import PaginationNextPage from './PaginationNextPage';
import PaginationPage from './PaginationPage';
import styles from './index.module.scss';

interface Props {
  currentPage: number;
  hrefBuilder?: (n: number) => string;
  pageCount: number;
  onPageChange?: (e: MouseEvent, n: number) => void;
  showPages?: boolean;
  wrapperClassName?: string;
}

const defaultHrefBuilder = (pageNum: number): string => `#${pageNum}`;

const Pagination = ({
  pageCount,
  currentPage,
  onPageChange,
  hrefBuilder = defaultHrefBuilder,
  showPages = true,
  wrapperClassName,
}: Props) => {
  const pageChange = useCallback(
    (n: number) => (e: MouseEvent) => onPageChange && onPageChange(e, n),
    [onPageChange]
  );

  const pageList = generatePageList(pageCount, currentPage, !!showPages);

  const pageElements = pageList.map(page => (
    <li key={`${page.type}${page.num}`}>
      <PaginationPage
        className={styles.paginationPage}
        hrefBuilder={hrefBuilder}
        page={page}
        onPageChange={pageChange(page.num)}
      />
    </li>
  ));

  return (
    <nav aria-label="Pagination" className={wrapperClassName}>
      <ul className={styles.pagination}>
        <li key={PageType.PREV}>
          <PaginationPreviousPage
            className={styles.paginationPage}
            currentPage={currentPage}
            hrefBuilder={hrefBuilder}
            onPageChange={pageChange}
          />
        </li>
        {pageElements}
        <li key={PageType.NEXT}>
          <PaginationNextPage
            className={styles.paginationPage}
            currentPage={currentPage}
            hrefBuilder={hrefBuilder}
            onPageChange={pageChange}
            pageCount={pageCount}
          />
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
