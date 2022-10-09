module.exports = `
{
  allMdx(filter: { fields: { categoryName: { eq: "learn" } } }) {
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
          displayTitle
        }
        fields {
          slug
          categoryName
        }
      }
      next {
        frontmatter {
          title
          displayTitle
        }
        fields {
          slug
        }
      }
      previous {
        frontmatter {
          title
          displayTitle
        }
        fields {
          slug
        }
      }
    }
  }
}
`;
