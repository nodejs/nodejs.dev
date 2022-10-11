module.exports = `
{
  pages: allMdx(
    filter: { fileAbsolutePath: { regex: "/blog/" } }
    sort: { fields: fields___date, order: DESC }
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
          category {
            slug
            name
            description
          }
          blogAuthors {
            id
            name
          }
        }
        fields {
          slug
          categoryName
          date(formatString: "MMMM DD, YYYY")
          readingTime {
            text
          }
        }
      }
    }
  }
  categories: allCategoriesYaml {
    edges {
      node {
        slug
        name
        description
      }
    }
  }
}
`;
