// eslint-disable-next-line no-shadow
export enum PageType {
  NEXT = 'NEXT',
  NUM = 'NUM',
  PREV = 'PREV',
}

export interface PageModel {
  className?: string;
  type: PageType;
  num: number;
  disabled?: boolean;
  selected?: boolean;
}

export function generatePageList(
  pageCount: number,
  currentPage: number,
  showPages: boolean
): PageModel[] {
  const pages: PageModel[] = [];
  if (showPages) {
    for (let i = 0; i < pageCount; i += 1) {
      const num = i + 1;
      const selected = num === currentPage;
      pages.push({
        type: PageType.NUM,
        num,
        selected,
      });
    }
  }

  return pages;
}
