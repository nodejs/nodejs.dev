import { graphql } from 'gatsby';
import ArticleLayout from '../../components/Layout/article';
import { SideNavBarKeys } from '../../components/SideNavBar';
import connectGraphQlArticle from '../../components/connectGraphQlArticle';

export default connectGraphQlArticle(ArticleLayout, {
  editPath: 'content/download/package-manager.md',
  sidenavKey: SideNavBarKeys.packageManager,
});

export const query = graphql`
  query ($locale: String!, $defaultLocale: String!) {
    articleCurrentLanguage: mdx(
      fields: {
        slug: { eq: "installing-nodejs-via-package-manager" }
        locale: { eq: $locale }
      }
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
      fields: {
        slug: { eq: "installing-nodejs-via-package-manager" }
        locale: { eq: $defaultLocale }
      }
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
