const yaml = require('yaml');

function createApiDocsFrontmatter(firstLine, metadata) {
  if (firstLine.startsWith('#')) {
    const editPageLink = `https://github.com/nodejs/node/blob/${metadata.version}/doc/api/${metadata.name}.md`;
    const pageTitle = firstLine.replace('# ', '');

    const frontmatter = {
      title: pageTitle,
      displayTitle: `Node.js API ${metadata.version} - ${pageTitle}`,
      version: metadata.version,
      category: 'api',
      name: metadata.name,
      apiType: metadata.type || 'module',
      introducedIn: metadata.introduced_in || '',
      editPage: editPageLink,
    };

    const result = Object.entries(frontmatter).map(
      ([key, value]) => `${key}: '${value}'`
    );

    return `---\n${result.join('\n')}\n---\n\n`;
  }

  return '';
}

function replaceUrlReferences(markdownContent) {
  return markdownContent.replace(/(: [a-z_]*)(\.md)/gm, (_, prefix) => {
    return prefix;
  });
}

function createYamlMetadataParser(file, version) {
  const topLevelMetadata = {};

  const addTopLevelMetadata = parsedYaml => {
    if (parsedYaml.introduced_in) {
      topLevelMetadata.introduced_in = parsedYaml.introduced_in;
    }

    if (parsedYaml.type) {
      topLevelMetadata.type = parsedYaml.type;
    }
  };

  return {
    topLevelMetadata,
    transformYaml: (_, yamlString) => {
      const cleanContent = yamlString.replace('YAML', '');

      const replacedContent = cleanContent
        // special validations for some non-cool formatted properties
        // of the docs schema
        .replace('introduced_in=', 'introduced_in: ')
        .replace('source_link=', 'source_link: ')
        .replace('type=', 'type: ')
        .replace('name=', 'name: ');

      try {
        const parsedYaml = yaml.parse(replacedContent);

        if (typeof parsedYaml === 'object') {
          addTopLevelMetadata(parsedYaml);

          const stringifiedData = JSON.stringify(parsedYaml);

          return `<DocsApiComponent version="${version}" data={${stringifiedData}} />`;
        }
      } catch (e) {
        console.warn(
          `YAML failure: ${e.message}, ${replacedContent}, ${file.download_url}`
        );
      }

      return '';
    },
  };
}

module.exports = {
  createApiDocsFrontmatter,
  createYamlMetadataParser,
  replaceUrlReferences,
};
