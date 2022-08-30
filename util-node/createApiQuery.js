module.exports = `
{
  allMdx(
    filter: { fields: { categoryName: { eq: "api" } } }
    sort: { fields: [frontmatter___name], order: ASC }
  ) {
    edges {
      node {
        id
        fileAbsolutePath
        parent {
          ... on File {
            relativePath
          }
        }
        frontmatter {
          title
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
