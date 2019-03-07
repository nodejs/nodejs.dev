import {
  LearnPageData,
  PaginationInfo,
  LearnPageContext,
  NavigationSectionData,
} from '../../src/types';

export const createPaginationInfo = () =>
  ({
    slug: 'test-slug',
    title: 'test-title',
  } as PaginationInfo);

export const createNavigationSectionData = () =>
  ({
    'test-section': [
      {
        slug: 'test-slug',
        title: 'test-title',
        section: 'test-section',
      },
      {
        title: 'test-title',
        slug: 'test-slug',
        section: 'test-section',
      },
    ],
    'test-section2': [
      {
        slug: 'test-slug',
        title: 'test-title',
        section: 'test-section',
      },
      {
        title: 'test-title',
        slug: 'test-slug',
        section: 'test-section',
      },
    ],
  } as NavigationSectionData);

export const createLearnPageData = () =>
  ({
    doc: {
      id: 'test-id',
      html: '<span>Test html</span>',
      frontmatter: {
        title: 'test-title',
        description: 'test-description',
      },
      fields: {
        authors: ['test-user1', 'test-user2'],
      },
    },
  } as LearnPageData);

export const createLearnPageContext = () =>
  ({
    slug: 'test-slug',
    relativePath: 'test-path',
    next: createPaginationInfo(),
    previous: createPaginationInfo(),
    navigationData: createNavigationSectionData(),
  } as LearnPageContext);
