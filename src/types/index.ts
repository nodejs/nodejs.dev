import type { GatsbyBrowser, GatsbySSR } from 'gatsby';
import { GenericPageContext } from './pages';

export * from './api';
export * from './banners';
export * from './blog';
export * from './releases';
export * from './navigation';
export * from './markdown';
export * from './article';
export * from './pages';
export * from './dropdown';

export interface HomepageData {
  article: {
    id: string;
    body: string;
    frontmatter: {
      title: string;
      displayTitle: string;
      subTitle: string;
      description: string;
      learnLinkText: string;
      beginnerGuideHeaderText: string;
      beginnerGuideBodyText: string;
      doMoreWithNodeHeaderText: string;
      doMoreWithNodeBodyText: string;
      nodeFeatureHeader1: string;
      nodeFeatureHeader2: string;
      nodeFeatureHeader3: string;
      nodeFeature1: string;
      nodeFeature2: string;
      nodeFeature3: string;
      nodeFeatureAltText: string;
    };
  };
}

export type SearchResult = {
  id: React.Key | null | undefined;
  slug: string;
  title: string;
  category: string;
  displayTitle?: string | JSX.Element;
  tableOfContents?: string;
  wrapInCode?: boolean;
};

export type WrapPageElementBrowser =
  | GatsbyBrowser<unknown, GenericPageContext>['wrapPageElement'];

export type WrapPageElementSSR =
  | GatsbySSR<unknown, GenericPageContext>['wrapPageElement'];
