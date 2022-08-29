const yaml = require('yaml');

function createApiDocsFrontmatter(textFile, metadata) {
  const firstDocumentLine = textFile.split('\n')[0];

  if (firstDocumentLine.startsWith('#')) {
    const pageTitle = `Node.js API ${metadata.version} - ${firstDocumentLine}`;

    return `---\ntitle: '${pageTitle}'\ncategory: 'api'\n---\n\n`;
  }

  return '';
}

function transformYamlCodeBlocks(yamlString, file) {
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
      return `<DocsApiComponent data={${JSON.stringify(parsedYaml)}} />`;
    }
  } catch (e) {
    console.warn(
      `YAML failure: ${e.message}, ${replacedContent}, ${file.download_url}`
    );
  }

  return '';
}

module.exports = {
  createApiDocsFrontmatter,
  transformYamlCodeBlocks,
};
