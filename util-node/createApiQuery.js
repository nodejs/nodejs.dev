module.exports = `
{
  allMdx(
    filter: { fields: { categoryName: { eq: "api" } } }
    sort: { fields: [fields___slug], order: ASC }
  ) {
    edges {
      node {
        id
        fileAbsolutePath
        body
        frontmatter {
          title
          description
        }
        fields {
          slug
          categoryName
        }
      }
    }
  }
}
`;
