import { RemarkSection, RemarkPage, NavigationSectionData, PageInfo } from '../types';

type ActiveResults = {
  activePage?: RemarkPage,
  previousPage?: PageInfo,
  nextPage?: PageInfo,
  navigationSections: Array<NavigationSectionData>
}

export function findActive(sections: Array<RemarkSection>, currentPage?: string): ActiveResults {
  let activePage: RemarkPage | undefined;
  let previousPage: PageInfo | undefined;
  let nextPage: PageInfo | undefined;
  const navigationSections = [];

  for (const { fieldValue, edges } of sections) {
    const items = []
    const title = fieldValue === 'undefined' ? 'Getting Started' : fieldValue;
    for (const { node: page, previous, next } of edges ) {
      if (!page.frontmatter.title) {
        continue;
      }
      if (!currentPage) {
        currentPage = page.fields.slug;
      }
      const isActivePage = currentPage === page.fields.slug;
      if (isActivePage) {
        activePage = page;
        previousPage = previous;
        nextPage = next;
      }
      items.push({
        id: page.id,
        title: page.frontmatter.title,
        isActive: isActivePage,
        isDone: !activePage && !isActivePage,
        slug: page.fields.slug
      });
    }
    navigationSections.push({
      title,
      items
    })
  }

  return {
    activePage,
    previousPage,
    nextPage,
    navigationSections
  }
}