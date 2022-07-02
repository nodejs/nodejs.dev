module.exports = `
{
  allMdx(
    filter: {
      fields: {
        slug: {
          nin: [
            ""
            "nodejs-community"
            "homepage"
            "trademark-policy"
            "working-groups"
            "resources"
            "privacy-policy"
            "about"
            "governance"
            "security"
            "package-manager"
          ]
        }
      }
    }
    sort: { fields: [fileAbsolutePath], order: ASC }
  ) {
    edges {
      node {
        id
        fileAbsolutePath
        body
        parent {
          ... on File {
            relativePath
          }
        }
        frontmatter {
          title
          description
          authors
          section
          category {
            name
          }
        }
        fields {
          slug
          categoryName
        }
      }
      next {
        frontmatter {
          title
        }
        fields {
          slug
        }
      }
      previous {
        frontmatter {
          title
        }
        fields {
          slug
        }
      }
    }
  }
}
`;
