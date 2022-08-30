const yaml = require('yaml');

const typeParser = require('./api-generation/typeParser');

const FEATURES_REGEX = {
  // Fixes the references to Markdown pages into the API documentation
  markdownFootnoteUrls: /(?![+a-z]+:)([^#?]+)\.md(#.+)?$/gim,
  // ReGeX to match the in-line YAML metadatas
  metadataComponents: /^<!--([\s\S]*?)-->$/gm,
  // ReGeX to match the {Type} (Structure Type metadatas)
  // eslint-disable-next-line no-useless-escape
  structureType: /\{[a-zA-Z.|\[\]\\]+\}/gm,
  // ReGeX for transforming `<pre>` into JSX snippets
  removePreCodes: /<pre>|<\/pre>/gim,
  // ReGeX for increasing the heading level
  increaseHeadingLevel: /^(#{1,6}\s)/gim,
  // ReGeX for the Stability Index
  stabilityIndex: /> Stability: ([0-5])(?:\s*-\s*)?[a-z]+/gim,
};

const YAML_FEATURES = {
  arrayOnlyMetadata: [
    'added',
    'napiVersion',
    'deprecated',
    'removed',
    'introduced_in',
  ],
};

function yamlValueToArray(value) {
  return Array.isArray(value) ? value : [value];
}

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
      editPage: editPageLink,
    };

    const result = Object.entries(frontmatter).map(
      ([key, value]) => `${key}: '${value}'`
    );

    return `---\n${result.join('\n')}\n---\n`;
  }

  return '';
}

function replaceStabilityIndex(markdownContent, metadata) {
  return markdownContent.replace(
    FEATURES_REGEX.stabilityIndex,
    (_, stability) =>
      `<DocsApiComponent version="${metadata.version}" data={{"stability":${stability}}} />`
  );
}

function replaceUrlReferences(markdownContent) {
  return markdownContent.replace(
    FEATURES_REGEX.markdownFootnoteUrls,
    (_, filename, hash) => `/api/${filename}${hash || ''}`
  );
}

function increaseHeadingLevel(markdownContent) {
  return markdownContent.replace(
    FEATURES_REGEX.increaseHeadingLevel,
    (_, l) => {
      // trim the string and calculate length as there might be whitespace
      const level = l.trim().length;

      return `${'#'.repeat(level === 6 ? level : level + 1)} `;
    }
  );
}

function cleanseCodeTags(markdownContent) {
  return markdownContent.replace(FEATURES_REGEX.removePreCodes, () => `\`\`\``);
}

function replaceTypeToLinks(markdownContent) {
  return markdownContent.replace(FEATURES_REGEX.structureType, source =>
    typeParser(source)
  );
}

function replaceMarkdownMetadata(markdownContent, metadata) {
  return markdownContent.replace(
    FEATURES_REGEX.metadataComponents,
    (_, yamlString) => {
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
          Object.keys(parsedYaml).forEach(key => {
            if (YAML_FEATURES.arrayOnlyMetadata.includes(key)) {
              parsedYaml[key] = yamlValueToArray(parsedYaml[key]);
            }
          });

          const stringifiedData = JSON.stringify(parsedYaml);

          return `<DocsApiComponent version="${metadata.version}" data={${stringifiedData}} />`;
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(`YAML failure: ${e.message}, ${metadata.downloadUrl}`);
      }

      return '';
    }
  );
}

function createMarkdownParser(markdownContent, metadata) {
  let resultingContent = markdownContent;

  return {
    replaceMetadata: () => {
      resultingContent = replaceMarkdownMetadata(resultingContent, metadata);
    },
    replaceUrlReferences: () => {
      resultingContent = replaceUrlReferences(resultingContent);
    },
    increaseHeadingLevel: () => {
      resultingContent = increaseHeadingLevel(resultingContent);
    },
    replaceTypeToLinks: () => {
      resultingContent = replaceTypeToLinks(resultingContent);
    },
    replaceStabilityIndex: () => {
      resultingContent = replaceStabilityIndex(resultingContent, metadata);
    },
    createFrontmatter: () => {
      const [firstLine, ...markdownContents] = resultingContent.split('\n');

      const frontmatter = createApiDocsFrontmatter(firstLine, metadata);

      if (frontmatter.length) {
        resultingContent = `${frontmatter}${markdownContents.join('\n')}`;
      }
    },
    cleanseCodeTags: () => {
      resultingContent = cleanseCodeTags(resultingContent);
    },
    getParsedContent: () => resultingContent,
  };
}

module.exports = { createMarkdownParser };
