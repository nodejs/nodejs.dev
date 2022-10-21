import React, { FC, MouseEvent, useCallback, useMemo } from 'react';
import { buildPaginationModel } from './util/buildPaginationModel';
import Page from './Page';
import styles from './index.module.scss';

interface Props {
  currentPage: number;
  hrefBuilder?: (n: number) => string;
  marginPageCount: number;
  pageCount: number;
  onPageChange?: (e: MouseEvent, n: number) => void;
  showPages?: boolean;
  surroundingPageCount?: number;
  wrapperClassName?: string;
}

const defaultHrefBuilder = (pageNum: number): string => `#${pageNum}`;

const Pagination: FC<Props> = ({
  pageCount,
  currentPage,
  onPageChange,
  hrefBuilder = defaultHrefBuilder,
  marginPageCount = 1,
  showPages = true,
  surroundingPageCount = 2,
  wrapperClassName,
}) => {
  const pageChange = useCallback(
    (n: number) => (e: MouseEvent) => onPageChange && onPageChange(e, n),
    [onPageChange]
  );

  const model = useMemo(
    () =>
      buildPaginationModel(
        pageCount,
        currentPage,
        !!showPages,
        marginPageCount,
        surroundingPageCount
      ),
    [pageCount, currentPage, showPages, marginPageCount, surroundingPageCount]
  );

  const pageElements = useMemo(
    () =>
      model.map(page => (
        <li key={`${page.type}${page.num}`}>
          <Page
            className={styles.paginationPage}
            hrefBuilder={hrefBuilder}
            page={page}
            onPageChange={pageChange(page.num)}
          />
        </li>
      )),
    [model, hrefBuilder, pageChange]
  );

  return (
    <nav aria-label="Pagination" className={wrapperClassName}>
      <ul className={styles.pagination}>{pageElements}</ul>
    </nav>
  );
};

export default Pagination;
