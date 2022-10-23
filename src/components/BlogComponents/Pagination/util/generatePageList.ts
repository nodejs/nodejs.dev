import { PageModel, PageType } from '../../../../types/pagination';

export function generatePageList(
  pageCount: number,
  currentPage: number,
  showPages: boolean
): PageModel[] {
  const pages: PageModel[] = [];
  if (showPages) {
    for (let i = 1; i <= pageCount; i += 1) {
      const selected = i === currentPage;
      pages.push({
        type: PageType.NUM,
        num: i,
        selected,
      });
    }
  }

  return pages;
}
