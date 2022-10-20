export interface PageType {
  className?: string;
  type: string;
  num: number;
  disabled?: boolean;
  selected?: boolean;
}

export function buildPaginationModel(
  pageCount: number,
  currentPage: number,
  showPages: boolean,
  marginPageCount: number,
  surroundingPageCount: number
): PageType[] {
  const pages = [];

  if (showPages) {
    const pageNums: Array<number> = [];
    const addPage = (n: number) => {
      if (n >= 1 && n <= pageCount) {
        pageNums.push(n);
      }
    };

    // Start by defining the window of pages to show around the current page.
    // If the window goes off either edge, shift it until it fits.
    let extentLeft = currentPage - surroundingPageCount;
    let extentRight = currentPage + surroundingPageCount;
    if (extentLeft < 1 && extentRight > pageCount) {
      // Our window is larger than the entire range,
      // so simply display every page.
      extentLeft = 1;
      extentRight = pageCount;
    } else if (extentLeft < 1) {
      while (extentLeft < 1) {
        extentLeft += 1;
        extentRight += 1;
      }
    } else if (extentRight > pageCount) {
      while (extentRight > pageCount) {
        extentLeft -= 1;
        extentRight -= 1;
      }
    }

    // Next, include the pages in the margins.
    // If a margin page is already covered in the window,
    // extend the window to the other direction.
    for (let i = 1; i <= marginPageCount; i += 1) {
      const leftPage = i;
      const rightPage = pageCount - (i - 1);
      if (leftPage >= extentLeft) {
        extentRight += 1;
      } else {
        addPage(leftPage);
      }
      if (rightPage <= extentRight) {
        extentLeft -= 1;
      } else {
        addPage(rightPage);
      }
    }

    for (let i = extentLeft; i <= extentRight; i += 1) {
      addPage(i);
    }

    const sorted = pageNums
      .slice()
      .sort((a, b) => a - b)
      .filter((item, idx, ary) => !idx || item !== ary[idx - 1]);
    for (let idx = 0; idx < sorted.length; idx += 1) {
      const num = sorted[idx];
      const selected = num === currentPage;
      if (idx === 0) {
        if (num !== 1) {
          // If the first page isn't page one,
          // we need to add a break
          pages.push({
            type: 'BREAK',
            num: 1,
          });
        }
        pages.push({
          type: 'NUM',
          num,
          selected,
        });
      } else {
        const last = sorted[idx - 1];
        const delta = num - last;
        if (delta === 1) {
          pages.push({
            type: 'NUM',
            num,
            selected,
          });
        } else {
          // We skipped some, so add a break
          pages.push({
            type: 'BREAK',
            num: num - 1,
          });
          pages.push({
            type: 'NUM',
            num,
            selected,
          });
        }
      }
    }

    const lastPage = pages[pages.length - 1];
    if (lastPage.type === 'NUM' && lastPage.num !== pageCount) {
      // The last page we rendered wasn't the actual last page,
      // so we need an additional break
      pages.push({
        type: 'BREAK',
        num: pageCount,
      });
    }
  }

  const prev = {
    type: 'PREV',
    num: currentPage - 1,
    disabled: currentPage === 1,
    className: 'prev',
  };
  const next = {
    type: 'NEXT',
    num: currentPage + 1,
    disabled: currentPage === pageCount,
    className: 'next',
  };
  return [prev, ...pages, next];
}
