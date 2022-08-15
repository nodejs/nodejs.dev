module.exports = `
{
  allMdx(
    filter: {
      fields: {
        categoryName: { eq: "learn" }
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
