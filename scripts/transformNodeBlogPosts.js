const fs = require('fs');
const yaml = require('yaml');
const fsPromises = require('fs/promises');
const path = require('path');
const dedent = require('dedent');

const blogAuthorsFile = fs.readFileSync(
  path.join(__dirname, '../src/data/blog/authors.yaml')
);

const blogAuthors = yaml.parse(blogAuthorsFile);

const applyBlogAuthors = metadataAuthors =>
  metadataAuthors.split(' and ').map(authorName => {
    const foundAuthor = blogAuthors.find(author => author.name === authorName);

    return foundAuthor ? foundAuthor.id : authorName;
  });

// eslint-disable-next-line import/no-extraneous-dependencies
const metadataParser = require('markdown-yaml-metadata-parser');

const commandLineArgs = process.argv.slice(2);

const getMarkdownFilesPath = args => (args.length ? args[0] : '.');

const markdownPath = path.join(
  __dirname,
  getMarkdownFilesPath(commandLineArgs)
);

const openMarkdownFile = async filename =>
  fsPromises.readFile(path.join(markdownPath, filename), {
    encoding: 'utf-8',
  });

const processMarkdownFile = (originalSlug, source) => {
  const { content, metadata } = metadataParser(source);

  const dateFromMetadata = new Date(metadata.date);

  const dateString = dateFromMetadata.toISOString().split('T')[0];

  const newFileName = `${dateString}-${originalSlug}.md`;

  const blogAuthors = metadata.author
    ? `['${applyBlogAuthors(metadata.author)}']`
    : `['node-js-website']`;

  const newContent = dedent`
    ---
    title: ${metadata.title}
    blogAuthors: ${blogAuthors}
    category: '${metadata.category.toLowerCase()}'
    ---
  `;

  return { content: `${newContent}\n${content}`, filename: newFileName };
};

if (fs.existsSync(markdownPath)) {
  const filenames = fs.readdirSync(path.join(markdownPath));

  const markdownFilesFromDirectory = filenames.filter(
    filename =>
      filename.toLowerCase().includes('.md') &&
      !filename.toLowerCase().includes('index.md')
  );

  const outDir = path.join(markdownPath, 'out');

  fs.mkdirSync(outDir);

  Promise.all(
    markdownFilesFromDirectory.map(async filename => {
      const source = await openMarkdownFile(filename);

      const originalSlug = filename.toLowerCase().replace('.md', '');

      const { content, filename: newFileName } = processMarkdownFile(
        originalSlug,
        source
      );

      return fsPromises.writeFile(path.join(outDir, newFileName), content);
    })
  );
}
