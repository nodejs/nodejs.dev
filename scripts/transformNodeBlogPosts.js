const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

// eslint-disable-next-line import/no-extraneous-dependencies
const metadataParser = require('markdown-yaml-metadata-parser');

const commandLineArgs = process.argv.slice(2);

const getMarkdownFilesPath = args => {
  return args.length ? args[0] : '.';
};

const markdownPath = getMarkdownFilesPath(commandLineArgs);

const openMarkdownFile = async filename => {
  return fsPromises.readFile(path.join(__dirname, markdownPath, filename), {
    encoding: 'utf-8',
  });
};

const processMarkdownFile = (originalSlug, source) => {
  const { content, metadata } = metadataParser(source);

  const dateFromMetadata = new Date(metadata.date);

  const dateString = dateFromMetadata.toISOString().split('T')[0];

  const newFileName = `${dateString}-${originalSlug}.md`;

  const blogAuthors = metadata.author
    ? `['${metadata.author}']`
    : `['node-js-website']`;

  const newContent = `---
title: ${metadata.title}
blogAuthors: ${blogAuthors}
category: '${metadata.category.toLowerCase()}'
---
${content}`;

  return { content: newContent, filename: newFileName };
};

if (fs.existsSync(markdownPath)) {
  const filenames = fs.readdirSync(path.join(__dirname, markdownPath));

  const markdownFilesFromDirectory = filenames.filter(
    filename =>
      filename.toLowerCase().includes('.md') &&
      !filename.toLowerCase().includes('index.md')
  );

  const outDir = path.join(__dirname, markdownPath, 'out');

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
