import { graphql } from 'gatsby';
import ArticleLayout from '../../components/Layout/article';
import { SideNavBarKeys } from '../../components/SideNavBar';
import connectGraphQlArticle from '../../components/connectGraphQlArticle';

export default connectGraphQlArticle(ArticleLayout, {
  editPath: 'content/get-involved/index.md',
  sidenavKey: SideNavBarKeys.getInvolved,
});

export const query = graphql`
  query ($locale: String!, $defaultLocale: String!) {
    articleCurrentLanguage: mdx(
      fields: { slug: { eq: "get-involved" }, locale: { eq: $locale } }
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
      fields: { slug: { eq: "get-involved" }, locale: { eq: $defaultLocale } }
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
