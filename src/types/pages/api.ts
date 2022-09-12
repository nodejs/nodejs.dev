import { PageTableOfContents, PaginationInfo } from '../markdown';
import { NavigationSectionData } from '../navigation';
import { NodeReleaseData } from '../releases';

export interface ApiTemplateData {
  mdx: {
    id: string;
    body: string;
    tableOfContents: PageTableOfContents;
    frontmatter: {
      title: string;
      version: string;
      displayTitle: string;
      editPage: string;
    };
  };
}

export interface ApiTemplateContext {
  slug: string;
  relativePath: string;
  next: PaginationInfo;
  previous: PaginationInfo;
  navigationData: NavigationSectionData;
  nodeReleases: {
    nodeReleasesData: NodeReleaseData[];
    apiAvailableVersions: string[];
  };
}
