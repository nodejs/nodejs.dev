import React, {
  createElement,
  FC,
  MouseEvent,
  ReactElement,
  useCallback,
  useMemo,
} from 'react';
import classnames from 'classnames';
import { buildPaginationModel } from './utils/buildPaginationModel';
import { buildComponentData } from './utils/buildComponentData';
import styles from './index.module.scss';

interface UsePaginationPagesParameters {
  pageCount: number;
  currentPage: number;
  onPageChange?: (e: MouseEvent, n: number) => void;
  hrefBuilder: (n: number) => string;
  marginPageCount: number;
  showPages?: boolean;
  surroundingPageCount: number;
}

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

function usePaginationPages({
  pageCount,
  currentPage,
  onPageChange,
  hrefBuilder,
  marginPageCount,
  showPages,
  surroundingPageCount,
}: UsePaginationPagesParameters): ReactElement[] {
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

  const children = useMemo(
    () =>
      model.map(page => {
        const { props, key, content } = buildComponentData(
          page,
          hrefBuilder,
          pageChange(page.num)
        );
        const { as, className, ...restProps } = props;
        const button = createElement(
          as,
          {
            ...restProps,
            className: classnames(
              styles.paginationButton,
              styles[className as string]
            ),
          },
          content
        );
        return <li key={key}>{button}</li>;
      }),
    [model, hrefBuilder, pageChange]
  );

  return children;
}

function defaultHrefBuilder(pageNum: number): string {
  return `#${pageNum}`;
}

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
  const pageElements = usePaginationPages({
    pageCount,
    currentPage,
    onPageChange,
    hrefBuilder,
    marginPageCount,
    showPages,
    surroundingPageCount,
  });
  return (
    <nav aria-label="Pagination" className={wrapperClassName}>
      <ul className={styles.pagination}>{pageElements}</ul>
    </nav>
  );
};

export default Pagination;
