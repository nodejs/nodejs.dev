module.exports = `
{
  pages: allMdx(
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
        categoryName: { nin: ["learn", "api"] }
      }
    }
    sort: { fields: [fileAbsolutePath], order: ASC }
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
  categories: allCategoriesYaml {
    edges {
      node {
        name
      }
    }
  }
}
`;
