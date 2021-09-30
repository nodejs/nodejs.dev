import {
  LearnPageData,
  PaginationInfo,
  LearnPageContext,
  NavigationSectionData,
  BlogPostsList,
  BlogPageData,
  BlogPageContext,
  Page,
  NodeReleaseDataDetail,
  NodeReleaseData,
  TableOfContents,
} from '../../src/types';
import mockMDXBodyContent from './mockMDXBodyContent';

export const mockTableOfContents: TableOfContents = {
  items: [
    { title: 'mock-title', url: '#mock-title' },
    { title: 'mock-title-2', url: '#mock-title-2' },
  ],
};

export const createPaginationInfo = (): PaginationInfo =>
  ({
    slug: 'test-slug',
    title: 'test-title',
  } as PaginationInfo);

export const createNavigationSectionData = (): NavigationSectionData =>
  ({
    'test-section': {
      data: [
        {
          slug: 'test-slug-1',
          title: 'test-title-1',
          section: 'test-section-1',
          category: 'test1',
        },
        {
          title: 'test-title-2',
          slug: 'test-slug-2',
          section: 'test-section-2',
          category: 'test1',
        },
      ],
      category: 'test1',
    },
    'test-section2': {
      data: [
        {
          slug: 'test-slug-3',
          title: 'test-title-3',
          section: 'test-section-3',
          category: 'test2',
        },
        {
          title: 'test-title-4',
          slug: 'test-slug-4',
          section: 'test-section-4',
          category: 'test2',
        },
      ],
      category: 'test2',
    },
  } as NavigationSectionData);

export const createLearnPageData = (): LearnPageData =>
  ({
    doc: {
      id: 'test-id',
      body: mockMDXBodyContent,
      tableOfContents: mockTableOfContents,
      frontmatter: {
        title: 'test-title',
        description: 'test-description',
      },
      fields: {
        authors: ['test-user1', 'test-user2'],
      },
    },
  } as LearnPageData);

export const createNodeReleasesDataDetail = (): NodeReleaseDataDetail[] =>
  [
    {
      version: 'mock-version-1',
      date: 'mock-date',
      files: ['aix-ppc64', 'headers', 'linux-arm64'],
      npm: 'mock-npm',
      v8: 'mock-v8',
      uv: 'mock-uv',
      zlib: 'mock-zlib',
      openssl: 'mock-openssl',
      modules: 'mock-module',
      lts: 'fermium',
      security: false,
    },
    {
      version: 'mmock-version-2',
      date: 'mock-date',
      files: ['aix-ppc64', 'headers', 'linux-arm64', 'linux-armv7l'],
      npm: 'mock-npm',
      v8: 'mock-v8',
      uv: 'mock-uv',
      zlib: 'mock-zlib',
      openssl: '1.1.1g',
      modules: '83',
      lts: 'fermium',
      security: false,
    },
  ] as NodeReleaseDataDetail[];

export const createNodeReleasesData = (): NodeReleaseData[] =>
  [
    {
      endOfLife: '2022-04-30',
      maintenanceLTSStart: '2020-11-30',
      activeLTSStart: '2019-10-21',
      codename: 'Erbium',
      initialRelease: '2019-04-23',
      release: 'v12',
      status: 'Maintenance LTS',
    },
    {
      endOfLife: '2023-04-30',
      maintenanceLTSStart: '2021-10-19',
      activeLTSStart: '2020-10-27',
      codename: 'Fermium',
      initialRelease: '2020-04-21',
      release: 'v14',
      status: 'Active LTS',
    },
  ] as NodeReleaseData[];

export const createLearnPageContext = (): LearnPageContext =>
  ({
    slug: 'test-slug',
    relativePath: 'test-path',
    next: createPaginationInfo(),
    previous: createPaginationInfo(),
    navigationData: createNavigationSectionData(),
  } as LearnPageContext);

export const createBlogPageContext = (): BlogPageContext => ({
  slug: 'test-slug',
  relativePath: 'test-path',
  next: createPaginationInfo(),
  previous: createPaginationInfo(),
  navigationData: createNavigationSectionData(),
});

export const createBlogData = (): BlogPostsList =>
  ({
    blogs: {
      edges: [
        {
          node: {
            frontmatter: {
              title: 'Mock blog title',
              author: [
                {
                  name: 'Mock author name',
                  url: 'Mock URL',
                },
              ],
            },
            fields: { date: 'Mock date', slug: 'Mock blog slug' },
          },
        },
      ],
    },
  } as BlogPostsList);

export const createBlogPageData = (): BlogPageData => ({
  blog: {
    body: mockMDXBodyContent,
    excerpt: 'excerpt-mock',
    frontmatter: {
      title: 't,itle-mock',
      author: [
        {
          id: 'id-mock',
          name: 'name-mock',
          url: 'url-mock',
        },
      ],
    },
    fields: { slug: 'slug-mock', date: 'date-mock' },
  },
  recent: {
    edges: [
      {
        node: {
          frontmatter: {
            title: 'title-mock',
            author: [
              {
                id: 'id-mock',
                name: 'name-mock',
                url: 'url-mock',
              },
            ],
          },
          fields: { date: 'date-mock', slug: 'slug-mock' },
        },
      },
    ],
  },
});

export const createGeneralPageData = (): Page => ({
  data: {
    page: {
      fields: {
        authors: ['author-mock'],
      },
      frontmatter: {
        description: 'Mock Description',
        title: 'Mock Title',
      },
      body: mockMDXBodyContent,
      tableOfContents: mockTableOfContents,
    },
  },
});

export const createResourcesData = (): Page => ({
  data: {
    page: {
      fields: {
        authors: ['MrJithil'],
      },
      frontmatter: {
        description: 'Mock Description',
        title: 'Mock Title',
      },
      body: mockMDXBodyContent,
      tableOfContents: mockTableOfContents,
    },
  },
});

export const createPrivacyData = (): Page => ({
  data: {
    page: {
      fields: {
        authors: ['Author'],
      },
      frontmatter: {
        description: 'Description',
        title: 'Title',
      },
      body: mockMDXBodyContent,
      tableOfContents: mockTableOfContents,
    },
  },
});
