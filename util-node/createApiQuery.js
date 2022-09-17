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
    }
  }
  nodeReleases {
    nodeReleasesData {
      fullVersion
      version
      codename
      isLts
      status
      initialRelease
      ltsStart
      maintenanceStart
      endOfLife
    }
    apiAvailableVersions
  }
}
`;
