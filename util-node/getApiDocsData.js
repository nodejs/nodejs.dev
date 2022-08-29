const fetch = require('node-fetch');
const { createFileNodeFromBuffer } = require('gatsby-source-filesystem');

const createGitHubHeaders = require('./createGitHubHeaders');
const {
  createApiDocsFrontmatter,
  createYamlMetadataParser,
  replaceUrlReferences,
} = require('./apiDocsTransformUtils');

async function getApiDocsData(activeReleasesVersions, gatsbyApis) {
  // Retrieves all the Lists of the Documentation files for that Node.js version
  const requestPromises = activeReleasesVersions.map(releaseVersion => {
    const endpointUrl = `https://api.github.com/repos/nodejs/node/contents/doc/api?ref=${releaseVersion}`;

    return fetch(endpointUrl, createGitHubHeaders()).then(r => r.json());
  });

  // Execute the Requests and fetches data from GitHub
  const apiDocsReleases = await Promise.all(requestPromises);

  const getFileName = file => file.name.replace('.md', '');

  // Iterates on each file, and gets only the Markdown files
  // Then we return a Promise with the createRemoteFileNode
  // And thgen `gatsby-node` will execute them all
  const apiDocsFilesPerVersion = await Promise.all(
    apiDocsReleases.map(async (apiDocsFiles, index) => {
      const markdownFiles = apiDocsFiles.filter(
        file => file.name.endsWith('.md') && !file.name.startsWith('index')
      );

      const fullReleaseVersion = activeReleasesVersions[index];
      const releaseVersion = fullReleaseVersion.split('.')[0];

      const promisifiedNodes = await Promise.all(
        markdownFiles.map(async file => {
          const markdownFile = await fetch(file.download_url).then(r =>
            r.text()
          );

          const { topLevelMetadata, transformYaml } = createYamlMetadataParser(
            file,
            fullReleaseVersion
          );

          const [firstLine, ...markdownContents] = markdownFile.split('\n');

          const markdownWithLinks = replaceUrlReferences(
            markdownContents.join('\n')
          );

          const mdxWithComponents = markdownWithLinks.replace(
            /^<!--([\s\S]*?)-->$/gm,
            transformYaml
          );

          const frontmatterYaml = createApiDocsFrontmatter(firstLine, {
            version: fullReleaseVersion,
            name: getFileName(file),
            ...topLevelMetadata,
          });

          const finalContent = `${frontmatterYaml}${mdxWithComponents}`;

          if (frontmatterYaml.length) {
            return createFileNodeFromBuffer({
              buffer: Buffer.from(finalContent),
              cache: gatsbyApis.cache,
              createNode: gatsbyApis.createNode,
              name: `internalApiDoc-${releaseVersion}-${getFileName(file)}`,
              createNodeId: gatsbyApis.createNodeId,
              ext: '.mdx',
            });
          }
        })
      );

      return promisifiedNodes;
    })
  );

  return apiDocsFilesPerVersion;
}

module.exports = getApiDocsData;