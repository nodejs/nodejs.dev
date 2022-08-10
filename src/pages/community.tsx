import { graphql } from 'gatsby';
import ArticleLayout from '../components/Layout/article';
import { SideNavBarKeys } from '../components/SideNavBar';
import connectGraphQlArticle from '../components/connectGraphQlArticle';

import '../styles/community.scss';

export default connectGraphQlArticle(ArticleLayout, {
  editPath: 'content/community/index.md',
  sidenavKey: SideNavBarKeys.community,
});

export const query = graphql`
  query ($locale: String!, $defaultLocale: String!) {
    articleCurrentLanguage: mdx(
      fields: { slug: { eq: "nodejs-community" }, locale: { eq: $locale } }
    ) {
      body
      tableOfContents
      frontmatter {
        title
        description
      }
      fields {
        authors
      }
    }
    articleDefaultLanguage: mdx(
      fields: {
        slug: { eq: "nodejs-community" }
        locale: { eq: $defaultLocale }
      }
    ) {
      body
      tableOfContents
      frontmatter {
        title
        description
      }
      fields {
        authors
      }
    }
  }
`;
