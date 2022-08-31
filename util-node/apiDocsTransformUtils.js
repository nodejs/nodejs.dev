const yaml = require('yaml');

const typeParser = require('./api-generation/typeParser');
const createSlug = require('./createSlug');
const { apiPath } = require('../pathPrefixes');

const FEATURES_REGEX = {
  // Fixes the references to Markdown pages into the API documentation
  markdownFootnoteUrls: /(^\[.+\]:) ([a-z]+)\.md([#-_]+)?/gim,
  // ReGeX to match the in-line YAML metadatas
  metadataComponents: /^<!--([\s\S]*?)-->/,
  // ReGeX to match the {Type}<Type> (Structure Type metadatas)
  // eslint-disable-next-line no-useless-escape
  structureType: /(\{|<)[a-zA-Z.|\[\]\\]+(\}|>)/gm,
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
  allowedNavigationTypes: ['class', 'module', 'global'],
};

function yamlValueToArray(value) {
  return Array.isArray(value) ? value : [value];
}

function createNavigationCreator({ version, name }) {
  const navigationEntriesForFile = [];

  const getHash = (type, title) =>
    type === 'module' ? '' : `#${createSlug(title)}`;

  return {
    getNavigationEntries: () => navigationEntriesForFile,
    navigationCreator: () => {
      const metadataTypes = [];
      const headings = [];

      return {
        addType: type => metadataTypes.push(type),
        addHeading: lines => headings.push(lines),
        create: () => {
          const lineWithActualHeading = headings.find(h => h.startsWith('#'));

          if (lineWithActualHeading && lineWithActualHeading.length) {
            const title = lineWithActualHeading.replace(
              /^(#{1,5}) (Class: |Event: )/i,
              ''
            );

            navigationEntriesForFile.push(
              ...metadataTypes.map(type => ({
                slug: `${apiPath}${version}/${name}/${getHash(type, title)}`,
                // eslint-disable-next-line no-useless-escape
                title: title.split('(')[0].replace(/[^\w\- ]+/g, ''),
                type,
                name,
              }))
            );
          }
        },
      };
    },
  };
}

function createApiDocsFrontmatter(firstLine, { version, name, fullVersion }) {
  if (firstLine.startsWith('#')) {
    const editPageLink = `https://github.com/nodejs/node/blob/${fullVersion}/doc/api/${name}.md`;
    const pageTitle = firstLine.replace('# ', '');

    const frontmatter = {
      title: name,
      displayTitle: pageTitle,
      category: 'api',
      editPage: editPageLink,
      version,
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

    return `<Metadata version="${metadata.fullVersion}" data={${data}} />`;
  };
}

function increaseHeadingLevel() {
  return (_, l) => {
    // trim the string and calculate length as there might be whitespace
    const level = l.trim().length;

    return `${'#'.repeat(level === 6 ? level : level + 1)} `;
  };
}

function addClassEventHeading(_, navigationCreator) {
  const getTagPerName = name => {
    switch (name) {
      case 'Class:':
        navigationCreator.addType('class');
        return `<DataTag tag="C" />`;
      case 'Event:':
        return `<DataTag tag="E" />`;
      default:
        return `<DataTag tag="M" /> ${name}`;
    }
  };

  return (_m, prefix, name) => `${prefix} ${getTagPerName(name)}`;
}

function replaceTypeToLinks() {
  return source => typeParser(source);
}

function cleanseCodeTags() {
  return () => `\`\`\``;
}

function replaceMarkdownMetadata(metadata, navigationCreator) {
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

        if (YAML_FEATURES.allowedNavigationTypes.includes(parsedYaml.type)) {
          navigationCreator.addType(parsedYaml.type);
        }

        const stringifiedData = JSON.stringify(parsedYaml);

        return `<Metadata version="${metadata.fullVersion}" data={${stringifiedData}} />`;
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
    `${reference} (${apiPath}${file}${hash || ''})`;
}

function createMarkdownParser(markdownContent, metadata) {
  const stabilityIndex = replaceStabilityIndex(metadata);
  const urlReferences = replaceUrlReferences(metadata);
  const headingLevel = increaseHeadingLevel(metadata);
  const structureType = replaceTypeToLinks(metadata);
  const codeTags = cleanseCodeTags(metadata);

  const { navigationCreator, getNavigationEntries } =
    createNavigationCreator(metadata);

  return {
    getNavigationEntries,
    parseMarkdown: () => {
      const [firstLines, ...markdownContents] = markdownContent.split('\n\n');

      const frontmatter = createApiDocsFrontmatter(firstLines, metadata);

      // Create Navigation for the Modules Entries
      const moduleCreator = navigationCreator();

      moduleCreator.addHeading(firstLines);
      moduleCreator.addType('module');
      moduleCreator.create();

      // Iterate between chunks of paragraphs instead of the whole document
      // As this is way more perfomatic for regex queries
      const [, ...parsedContent] = [firstLines, ...markdownContents].map(
        (lines, index) => {
          const navigation = navigationCreator();

          const classEventHeading = addClassEventHeading(metadata, navigation);

          const metadataComponents = replaceMarkdownMetadata(
            metadata,
            navigation
          );

          const parsedLines = lines
            .replace(FEATURES_REGEX.structureType, structureType)
            .replace(FEATURES_REGEX.stabilityIndex, stabilityIndex)
            .replace(FEATURES_REGEX.increaseHeadingLevel, headingLevel)
            .replace(FEATURES_REGEX.classEventHeading, classEventHeading)
            .replace(FEATURES_REGEX.removePreCodes, codeTags)
            .replace(FEATURES_REGEX.metadataComponents, metadataComponents)
            .replace(FEATURES_REGEX.markdownFootnoteUrls, urlReferences);

          // If the current item is a Heading then we add it itself
          if (lines.startsWith('#')) {
            navigation.addHeading(lines);
            navigation.create();

            return parsedLines;
          }

          // Otherwise it might be in the previous lines (Maximum depth of 3)
          // As the header should be on maximum 3 levels away from the current item
          // We use index + 1 as reference for markdownContents as the firstLine is not part
          // of the markdownContents array
          navigation.addHeading(index > 1 ? markdownContents[index - 2] : '');
          navigation.addHeading(index > 2 ? markdownContents[index - 3] : '');
          navigation.create();

          return parsedLines;
        }
      );

      return `${frontmatter}${parsedContent.join('\n\n')}`;
    },
  };
}

module.exports = { createMarkdownParser };
