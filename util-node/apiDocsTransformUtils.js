const yaml = require('yaml');

const typeParser = require('./api-generation/typeParser');

const FEATURES_REGEX = {
  // Fixes the references to Markdown pages into the API documentation
  markdownFootnoteUrls: /(^\[.+\]:) ([a-z]+)\.md([#-_]+)?/gim,
  // ReGeX to match the in-line YAML metadatas
  metadataComponents: /^<!--([\s\S]*?)-->/,
  // ReGeX to match the {Type} (Structure Type metadatas)
  // eslint-disable-next-line no-useless-escape
  structureType: /\{[a-zA-Z.|\[\]\\]+\}/g,
  // ReGeX for transforming `<pre>` into JSX snippets
  removePreCodes: /<pre>|<\/pre>/gi,
  // ReGeX for increasing the heading level
  increaseHeadingLevel: /^(#{1,6}\s)/,
  // ReGeX for detecting class/event headings
  classEventHeading: /^(#{3,5}) (Class:|Event:|`.+`)/,
  // ReGeX for the Stability Index
  stabilityIndex: /^> (.*:)\s*(\d)([\s\S]*)/,
};

const YAML_FEATURES = {
  arrayOnlyMetadata: [
    'added',
    'napiVersion',
    'deprecated',
    'removed',
    'introduced_in',
  ],
  updateMetadatas: [
    'added',
    'removed',
    'deprecated',
    'introduced_in',
    'napiVersion',
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

    return `---\n${result.join('\n')}\n---\n\n`;
  }

  return '';
}

function replaceStabilityIndex(metadata) {
  return (_, __, level, text) => {
    const data = JSON.stringify({ stability: { level: Number(level), text } });

    return `<Metadata version="${metadata.version}" data={${data}} />`;
  };
}

function increaseHeadingLevel() {
  return (_, l) => {
    // trim the string and calculate length as there might be whitespace
    const level = l.trim().length;

    return `${'#'.repeat(level === 6 ? level : level + 1)} `;
  };
}

function addClassEventHeading() {
  const getTagPerName = name => {
    switch (name) {
      case 'Class:':
        return `<DataTag tag="C" />`;
      case 'Event:':
        return `<DataTag tag="E" />`;
      default:
        return `<DataTag tag="M" /> ${name}`;
    }
  };

  return (_, prefix, name) => `${prefix} ${getTagPerName(name)}`;
}

function replaceTypeToLinks() {
  return source => typeParser(source);
}

function cleanseCodeTags() {
  return () => `\`\`\``;
}

function replaceMarkdownMetadata(metadata) {
  return (_, yamlString) => {
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

          if (YAML_FEATURES.updateMetadatas.includes(key)) {
            parsedYaml.update = { type: key, version: parsedYaml[key] };

            delete parsedYaml[key];
          }
        });

        const stringifiedData = JSON.stringify(parsedYaml);

        return `<Metadata version="${metadata.version}" data={${stringifiedData}} />`;
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(`YAML failure: ${e.message}, ${metadata.downloadUrl}`);
    }

    return '';
  };
}

function replaceUrlReferences() {
  return (_, reference, file, hash) =>
    `${reference} (/api/${file}${hash || ''})`;
}

function createMarkdownParser(markdownContent, metadata) {
  const metadataComponents = replaceMarkdownMetadata(metadata);
  const classEventHeading = addClassEventHeading(metadata);
  const stabilityIndex = replaceStabilityIndex(metadata);
  const urlReferences = replaceUrlReferences(metadata);
  const headingLevel = increaseHeadingLevel(metadata);
  const structureType = replaceTypeToLinks(metadata);
  const codeTags = cleanseCodeTags(metadata);

  return {
    parseMarkdown: () => {
      const [firstLine, ...markdownContents] = markdownContent.split('\n\n');

      const frontmatter = createApiDocsFrontmatter(firstLine, metadata);

      // Iterate between chunks of paragraphs instead of the whole document
      // As this is way more perfomatic for regex queries
      const parsedContent = markdownContents.map(lines => {
        return lines
          .replace(FEATURES_REGEX.stabilityIndex, stabilityIndex)
          .replace(FEATURES_REGEX.increaseHeadingLevel, headingLevel)
          .replace(FEATURES_REGEX.classEventHeading, classEventHeading)
          .replace(FEATURES_REGEX.structureType, structureType)
          .replace(FEATURES_REGEX.removePreCodes, codeTags)
          .replace(FEATURES_REGEX.metadataComponents, metadataComponents)
          .replace(FEATURES_REGEX.markdownFootnoteUrls, urlReferences);
      });

      return `${frontmatter}${parsedContent.join('\n\n')}`;
    },
  };
}

module.exports = { createMarkdownParser };
