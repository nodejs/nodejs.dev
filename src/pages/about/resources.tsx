import { graphql } from 'gatsby';
import ArticleLayout from '../../layouts/article';
import connectGraphQlArticle from '../../connectGraphQlArticle';
import { AboutNavigationKeys } from '../../types';

export default connectGraphQlArticle(ArticleLayout, {
  editPath: 'content/about/resources.md',
  currentSlug: AboutNavigationKeys.resources,
  hideArticleComponents: true,
});

export const query = graphql`
  query ($locale: String!, $defaultLocale: String!) {
    articleCurrentLanguage: mdx(
      fields: { slug: { eq: "resources" }, locale: { eq: $locale } }
    ) {
      body
      tableOfContents
      frontmatter {
        title
        description
        displayTitle
      }
      fields {
        authors
      }
    }
    articleDefaultLanguage: mdx(
      fields: { slug: { eq: "resources" }, locale: { eq: $defaultLocale } }
    ) {
      body
      tableOfContents
      frontmatter {
        title
        description
        displayTitle
      }
      fields {
        authors
      }
    }
  }
`;
