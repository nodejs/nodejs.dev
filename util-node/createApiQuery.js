module.exports = `
{
  pages: allMdx(filter: { fields: { categoryName: { eq: "api" } } }) {
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
          version
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
  nodeReleases {
    nodeReleasesVersion: nodeReleasesData {
      version
      fullVersion
    }
  }
}
`;
