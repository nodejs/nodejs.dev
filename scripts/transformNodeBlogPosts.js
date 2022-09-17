const fs = require('fs');
const yaml = require('yaml');
const path = require('path');
const async = require('async');
const dedent = require('dedent');

const blogAuthorsFile = fs.readFileSync(
  path.join(__dirname, '../src/data/blog/authors.yaml'),
  { encoding: 'utf-8' }
);

const blogAuthors = yaml.parse(blogAuthorsFile);

const applyBlogAuthors = metadataAuthors =>
  metadataAuthors
    .split(' and ')
    .map(authorName => {
      const foundAuthor = blogAuthors.find(
        author => author.name === authorName
      );

      return foundAuthor ? `'${foundAuthor.id}'` : authorName;
    })
    .join(', ');

// eslint-disable-next-line import/no-extraneous-dependencies
const metadataParser = require('markdown-yaml-metadata-parser');

const commandLineArgs = process.argv.slice(2);

const getMarkdownFilesPath = args => (args.length ? args[0] : '.');

const markdownPath = path.join(getMarkdownFilesPath(commandLineArgs));

const processMarkdownFile = (originalSlug, source) => {
  const { content, metadata } = metadataParser(source);

  const dateFromMetadata = new Date(metadata.date);

  const dateString = dateFromMetadata.toISOString().split('T')[0];

  const newFileName = `${dateString}-${originalSlug}.md`;

  const metadataAuthors = metadata.author
    ? `[${applyBlogAuthors(metadata.author)}]`
    : `['node-js-website']`;

  const newContent = dedent`
    ---
    title: ${metadata.title}
    blogAuthors: ${metadataAuthors}
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

  const blogQueue = async.queue((filename, callback) => {
    const markdownFile = path.join(markdownPath, filename);

    fs.readFile(markdownFile, { encoding: 'utf-8' }, (_, data) => {
      const originalSlug = filename.toLowerCase().replace('.md', '');

      const { content, filename: newFileName } = processMarkdownFile(
        originalSlug,
        data
      );

      const newMarkdownFile = path.join(markdownPath, newFileName);

      fs.unlink(markdownFile, () => {});
      fs.writeFile(newMarkdownFile, content, () => callback());
    });
  });

  blogQueue.push([...markdownFilesFromDirectory]);

  // eslint-disable-next-line no-console
  blogQueue.drain(() => console.log('Finished Processing'));
}
