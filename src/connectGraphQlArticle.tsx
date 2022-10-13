import React from 'react';
import { useLocalization } from 'gatsby-theme-i18n';
import { ArticleData } from './types';
import { ArticleLayoutProps } from './layouts/article';
import { AboutNavigationKeys } from './types/pages/about';

interface PageDefaultProps {
  editPath?: string;
  currentSlug?: AboutNavigationKeys;
  // We explicitly want to allow them to pass any data here that comes from the props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  articleContent?: (props: any) => JSX.Element;
  childrenPosition?: 'before' | 'after';
  hideArticleComponents?: boolean;
}

interface ParseGraphqlProps<T extends object> {
  data: {
    articleCurrentLanguage?: T;
    articleDefaultLanguage?: T;
  };
}

export const parseGraphqlArticleIntoStandardProps = <T extends object>({
  data: rawData,
}: ParseGraphqlProps<T>) => {
  const clonedDataObject = { ...rawData };

  // Here we assume the data must be available as the queries are static
  // Otherwise during runtime this will throw an Error
  const articleData =
    rawData.articleCurrentLanguage || rawData.articleDefaultLanguage;

  if (articleData === null || articleData === undefined) {
    throw new Error(
      'Failed fetching GraphQL Article data. Please ensure you are using the Query correclty'
    );
  }

  delete clonedDataObject.articleCurrentLanguage;
  delete clonedDataObject.articleDefaultLanguage;

  return { ...clonedDataObject, article: articleData };
};

interface CustomComponentProps {
  data: object;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const connectGraphQlCustom = <T extends object>(Comp: React.FC<T>) => {
  const ConnectCustomComponent = <P extends { data: object }>(props: P) => {
    // Here we assume the data must be available as the queries are static
    // Otherwise during runtime this will throw an Error
    const data = parseGraphqlArticleIntoStandardProps<P>(props);

    const connectedProps = { ...props, data };

    // Here we do a hack so we mutate the original props of the Component
    const ComponentWithMutatedProps = Comp as React.FC<CustomComponentProps>;

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <ComponentWithMutatedProps {...connectedProps} />;
  };

  return ConnectCustomComponent;
};

interface ArticleProps {
  editPath?: string;
  data: {
    articleCurrentLanguage?: ArticleData;
    articleDefaultLanguage?: ArticleData;
  };
  location?: Location;
}

const connectGraphQlArticle = (
  Component: React.FC<ArticleLayoutProps>,
  extraProps: PageDefaultProps = {}
) => {
  const ConnectComponent = (props: ArticleProps) => {
    const { locale: currentLocale } = useLocalization();

    // Here we assume the data must be available as the queries are static
    // Otherwise during runtime this will throw an Error
    const { article, ...extraData } =
      parseGraphqlArticleIntoStandardProps<ArticleData>(props);

    const articleLayoutProps = {
      title: article.frontmatter.title,
      displayTitle: article.frontmatter.displayTitle,
      description: article.frontmatter.description,
      authors: article.fields.authors,
      body: article.body,
      tableOfContents: article.tableOfContents,
      ...extraProps,
      ...extraData,
    };

    // In some pages we don't want to show these extra components
    // Like, for example, the about pages that aren't really "articles"
    if (articleLayoutProps.hideArticleComponents) {
      articleLayoutProps.tableOfContents = undefined;
      articleLayoutProps.authors = [];
    }

    // Attempt to modify the editPath adding the locale prefix to the extension file
    // If the current Article is fallbacking in the current language, it creates an opportunity
    // for adding the file on the desired language :)
    const editPath = articleLayoutProps.editPath
      ? articleLayoutProps.editPath.replace('.md', `.${currentLocale}.md`)
      : undefined;

    return (
      <Component
        title={articleLayoutProps.displayTitle || articleLayoutProps.title}
        description={articleLayoutProps.description}
        authors={articleLayoutProps.authors}
        body={articleLayoutProps.body}
        tableOfContents={articleLayoutProps.tableOfContents}
        currentSlug={articleLayoutProps.currentSlug}
        childrenPosition={articleLayoutProps.childrenPosition}
        editPath={editPath}
      >
        {articleLayoutProps.articleContent
          ? articleLayoutProps.articleContent(articleLayoutProps)
          : null}
      </Component>
    );
  };

  return ConnectComponent;
};

export default connectGraphQlArticle;
