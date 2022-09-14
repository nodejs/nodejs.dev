const yaml = require('yaml');

const typeParser = require('./apiDocsTypeParser');
const createSlug = require('./createSlug');
const { apiPath } = require('../pathPrefixes');

const FEATURES_REGEX = {
  // Fixes the references to Markdown pages into the API documentation
  markdownFootnoteUrls: /(^\[.+\]:) ([a-z]+)\.md([#-_]+)?/gim,
  // ReGeX to match the in-line YAML metadatas
  metadataComponents: /^<!--([\s\S]*?)-->/,
  // ReGeX to match the {Type}<Type> (Structure Type metadatas)
  // eslint-disable-next-line no-useless-escape
  structureType: /(\{|<)(?! )[a-z0-9.| \n\[\]\\]+(?! )(\}|>)/gim,
  // ReGeX for transforming `<pre>` into JSX snippets
  removePreCodes: /<pre>|<\/pre>/gi,
  // ReGeX for increasing the heading level
  increaseHeadingLevel: /^(#{1,6}\s)/,
  // ReGeX for detecting class/event headings
  classEventHeading: /^(#{3,5}) (Class:|Event:|`.+`)/,
  // ReGeX for the Stability Index
  stabilityIndex: /^> (.*:)\s*(\d)([\s\S]*)/,
  // ReGeX for non-valid Markdown Links
  fixLinks: /<(https:\/\/.+)>/gm,
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

// Utility to remove common tokens from the beginning of a Heading
function parseHeading(value) {
  return value.replace(/^(Modules|Class|Event): /, '');
}

// This utility allows us to create a Navigation Entry
// For every file and their respective version
// As the structure of the Navigation object is "flat"
// In the sense that we don't group entries by release Version
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
        // The way how this works is that once we're iterating over each Section within a file
        // Section = a Paragraph (or in other words chunks of text separated by two line breaks)
        // We use our utilities to identify the type of the Section if possible
        // And attempts to find pieces of either the current section or previous sections that are Headings.
        // Within the current Doc specification the Type Metadata could be at least two leves after the heading
        addType: type => metadataTypes.push(type),
        // We want to only get the first line to be added as part of the heading
        addHeading: lines => headings.push(lines.split('\n', 1)[0]),
        create: () => {
          // As not necessarily any of these items are a heading, we want to find
          // the first one that is a heading. The order of this array is (currentIndex, currentIndex - 1, currentIndex - 2)
          const lineWithActualHeading = headings.find(h => h.startsWith('#'));

          if (lineWithActualHeading && lineWithActualHeading.length) {
            // We want to replace any prefix the Heading might have
            const title = parseHeading(
              lineWithActualHeading.replace(/^#{1,5} /i, '')
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

// This utility creates the Frontmatter of the Documentation page
// It uses the metadata to create a YAML that will be inserted at the top of the page
function createApiDocsFrontmatter(firstLine, { version, name }) {
  if (firstLine.startsWith('#')) {
    // Does some special treatment to the pageTitle
    const pageTitle = parseHeading(firstLine.replace(/^# /, ''));

    const frontmatter = {
      title: name,
      displayTitle: pageTitle,
      category: 'api',
      version,
    };

    const result = Object.entries(frontmatter).map(
      ([key, value]) => `${key}: '${value}'`
    );

    return `---\n${result.join('\n')}\n---\n\n`;
  }

  return '';
}

// Utility to replace the `> Stability: XXXXXX` blockquotes and their following lines
// into a proper metadata with the information (index number) and any other accompanying text
function replaceStabilityIndex(metadata) {
  return (_, __, level, text) => {
    const sanitizedText = text
      .replace('\n>', '')
      .replace(/\[(.+)\]\[\]/g, (___, piece) => piece);

    const data = JSON.stringify({
      stability: { level: Number(level), text: sanitizedText },
    });

    return `<Metadata version="${metadata.fullVersion}" data={${data}} />`;
  };
}

// This utility increases any Heading Level by 1 until it reachs Level 6
function increaseHeadingLevel() {
  return (_, l) => {
    // trim the string and calculate length as there might be whitespace
    const level = l.trim().length;

    return `${'#'.repeat(level === 6 ? level : level + 1)} `;
  };
}

// This utility inserts the `<Tag>` component as prefix of the Heading
// It allows us to render the small "round tags" that identify if the entry
// is a class, event, method or something else
function addClassEventHeading(_, navigationCreator) {
  const getTagPerName = name => {
    switch (name) {
      case 'Class:':
        navigationCreator.addType('class');
        // @TODO: Replace to <Tag>
        return `<DataTag tag="C" />`;
      case 'Event:':
        // @TODO: Replace to <Tag>
        return `<DataTag tag="E" />`;
      default:
        // @TODO: Replace to <Tag>
        return `<DataTag tag="M" /> ${name}`;
    }
  };

  return (_m, prefix, name) => `${prefix} ${getTagPerName(name)}`;
}

// This Utility replace links in the <https://example.org>
// Into [https://example.org](https://example.oirg)
function replaceLinksToMarkdownLinks() {
  return (_, link) => `[${link}](${link})`;
}

// This utility replaces any encounter of `{String}`, {Object}` etc
// Within a proper link referencing either to its MDN specification
// Or if it is another API doc (e.g.: `fs.something`) then to its
// respective API page
function replaceTypeToLinks() {
  return source => typeParser(source);
}

// This utility replaces `<pre>` tags with ``` so that it is Markdown compatible
// Otherwise MDX will crash as it attempts to parse the <pre> contents as HTML/JSX
function cleanseCodeTags() {
  return () => `\`\`\``;
}

// This utility replaces the YAML metadata sections with our
// <Metadata> component that will render proper Metadata information
// for that section. Such as when it ws added, when it was removed, et cetera
function replaceMarkdownMetadata(metadata, navigationCreator) {
  return (_, yamlString) => {
    const cleanContent = yamlString.replace(/YAML| YAML/, '');

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
          // Some entries should always be Array for the sake of consistency
          if (YAML_FEATURES.arrayOnlyMetadata.includes(key)) {
            parsedYaml[key] = yamlValueToArray(parsedYaml[key]);
          }

          if (YAML_FEATURES.updateMetadatas.includes(key)) {
            // We transform some entries in a standardized "updates" field
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

// This utility fixes URL references from `.md` files directly to the /api/ path
function replaceUrlReferences(metadata) {
  return (_, reference, file, hash) =>
    `${reference} ${apiPath}${metadata.version}/${file}${hash || ''}`;
}

function calculateCodeBlockIntersection() {
  let codeBlockEndingIndex = -1;

  return (lines, index) => {
    const linesStartWithCodeBlock = lines.startsWith('```');
    const linesEndsWithCodeBlock = lines.endsWith('```');

    if (linesStartWithCodeBlock) {
      if (!linesEndsWithCodeBlock) {
        // If the current block starts with a codeblock but doesn't end with one
        // We have a multiple line code block then
        codeBlockEndingIndex = index;
      }

      return true;
    }

    if (codeBlockEndingIndex !== -1) {
      // This means we're currently iterating inside a code block
      // We should ignore parsing all lines until we reach the
      // end of the code block
      if (linesEndsWithCodeBlock) {
        // If we have a ending code block, stop ignoring the code loop
        // And go back to normal business starting the next block
        codeBlockEndingIndex = -1;
      }

      return true;
    }

    return false;
  };
}

// This function creates our Markdown parser that parses the whole MDX/Markdown file
// By updating and removing contents to the way we need them to be
function createMarkdownParser(markdownContent, metadata) {
  const invalidLinkFormat = replaceLinksToMarkdownLinks(metadata);
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
      const [, ...markdownContents] = markdownContent.split('\n\n');

      const firstLine = markdownContent.split('\n', 1)[0];

      const frontmatter = createApiDocsFrontmatter(firstLine, metadata);

      // Create Navigation for the Modules Entries
      const moduleCreator = navigationCreator();

      moduleCreator.addHeading(firstLine);
      moduleCreator.addType('module');
      moduleCreator.create();

      const calculateBlockIntersection = calculateCodeBlockIntersection();

      // Iterate between chunks of paragraphs instead of the whole document
      // As this is way more perfomatic for regex queries
      const parsedContent = markdownContents.map((lines, index) => {
        const navigation = navigationCreator();

        const classEventHeading = addClassEventHeading(metadata, navigation);

        const metadataComponents = replaceMarkdownMetadata(
          metadata,
          navigation
        );

        // This verifies if the current lines are part of a multi-line code block
        // This allows us to simply ignore any modification during this time
        if (calculateBlockIntersection(lines, index)) {
          return lines;
        }

        const addHeadingFromPreviousLines = () => {
          // Otherwise it might be in the previous lines (Maximum depth of 3)
          // As the header should be on maximum 3 levels away from the current item
          // We use index + 1 as reference for markdownContents as the firstLine is not part
          // of the markdownContents array
          navigation.addHeading(index > 1 ? markdownContents[index - 2] : '');
          navigation.addHeading(index > 2 ? markdownContents[index - 3] : '');
          navigation.create();
        };

        // In this case the lines are either a YAML metadata or a code block
        if (lines.startsWith('<!--') || lines.startsWith('<pre>')) {
          const parsedLines = lines
            .replace(FEATURES_REGEX.removePreCodes, codeTags)
            .replace(FEATURES_REGEX.metadataComponents, metadataComponents);

          addHeadingFromPreviousLines();

          return parsedLines;
        }

        // If the current item is a Heading then we add it itself
        if (lines.startsWith('#')) {
          const parsedLines = lines
            // This means the current line is a Heading
            .replace(FEATURES_REGEX.increaseHeadingLevel, headingLevel)
            .replace(FEATURES_REGEX.classEventHeading, classEventHeading);

          navigation.addHeading(lines);
          navigation.create();

          return parsedLines;
        }

        if (lines.startsWith('> ')) {
          // This means the current line is a Stability Index
          return lines.replace(FEATURES_REGEX.stabilityIndex, stabilityIndex);
        }

        const parsedLines = lines
          // This is the last scenario where lines are text
          .replace(FEATURES_REGEX.fixLinks, invalidLinkFormat)
          .replace(FEATURES_REGEX.structureType, structureType)
          .replace(FEATURES_REGEX.stabilityIndex, stabilityIndex)
          .replace(FEATURES_REGEX.markdownFootnoteUrls, urlReferences);

        addHeadingFromPreviousLines();

        return parsedLines;
      });

      // Removes empty lines to reduce the footprint of the Markdown file
      const filteredContent = parsedContent.filter(l => l.trim().length);

      return `${frontmatter}${filteredContent.join('\n\n')}`;
    },
  };
}

module.exports = { createMarkdownParser };
