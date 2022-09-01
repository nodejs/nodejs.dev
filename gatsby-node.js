// Use in this file CommonJS syntax see https://www.gatsbyjs.org/docs/migrating-from-v1-to-v2/#convert-to-either-pure-commonjs-or-pure-es6
const fs = require('fs');
const path = require('path');
const yaml = require('yaml');
const readingTime = require('reading-time');
const createSlug = require('./util-node/createSlug');
const getCurrentActiveReleases = require('./util-node/getCurrentActiveReleases');
const getNodeReleasesData = require('./util-node/getNodeReleasesData');
const getApiDocsData = require('./util-node/getApiDocsData');
const getBannersData = require('./util-node/getBannersData');
const getNvmData = require('./util-node/getNvmData');
const createPagesQuery = require('./util-node/createPagesQuery');
const createLearnQuery = require('./util-node/createLearnQuery');
const createApiQuery = require('./util-node/createApiQuery');
const createMarkdownPages = require('./util-node/createMarkdownPages');
const createApiPages = require('./util-node/createApiPages');
const redirects = require('./util-node/redirects');
const nodeLocales = require('./util-node/locales');
const { learnPath, apiPath, blogPath } = require('./pathPrefixes');

const BLOG_POST_FILENAME_REGEX = /([0-9]+)-([0-9]+)-([0-9]+)-(.+)\.md$/;

const learnYamlNavigationData = yaml.parse(
  fs.readFileSync('./src/data/learn.yaml', 'utf8')
);

const apiTypesNavigationData = yaml.parse(
  fs.readFileSync('./src/data/apiTypes.yaml', 'utf8')
);

// This creates a map of all the locale JSONs that are enabled in the config.json file
const intlMessages = nodeLocales.locales.reduce((acc, locale) => {
  const filePath = require.resolve(`./src/i18n/locales/${locale.code}.json`);
  acc[locale.code] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return acc;
}, {});

const getMessagesForLocale = locale =>
  locale && locale in intlMessages
    ? intlMessages[locale]
    : intlMessages[nodeLocales.defaultLanguage];

const getRedirectForLocale = (locale, url) =>
  /^\/\/|https?:\/\//.test(url) ? url : `/${locale}${url}`;

exports.onCreateWebpackConfig = ({ plugins, actions }) => {
  actions.setWebpackConfig({
    plugins: [
      plugins.ignore({ resourceRegExp: /canvas/, contextRegExp: /jsdom$/ }),
    ],
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type BannersIndex implements Node {
      endDate: String
      link: String
      text: String
      html: String
      startDate: String
    }
  `;

  createTypes(typeDefs);
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions;

  const pageRedirects = { ...redirects };

  const apiTemplate = path.resolve('./src/templates/api.tsx');
  const learnTemplate = path.resolve('./src/templates/learn.tsx');
  const blogTemplate = path.resolve('./src/templates/blog.tsx');
  const blogCategoryTemplate = path.resolve(
    './src/templates/blog-category.tsx'
  );

  const [learnResult, pagesResult, apiResult] = await Promise.all([
    graphql(createLearnQuery),
    graphql(createPagesQuery),
    graphql(createApiQuery),
  ]);

  if (pagesResult.errors || learnResult.errors || apiResult.errors) {
    reporter.panicOnBuild('Error while running GraphQL queries.');
    return;
  }

  const {
    pages: { edges: pageEdges },
    categories: { edges: categoryEdges },
  } = pagesResult.data;

  const {
    allMdx: { edges: learnEdges },
  } = learnResult.data;

  const {
    pages: { edges: apiEdges },
    navigation: { apiNavigationEntries },
  } = apiResult.data;

  const {
    markdownPages,
    learnPages,
    firstLearnPage,
    navigationData: learNavigationData,
  } = createMarkdownPages(pageEdges, learnEdges, learnYamlNavigationData);

  const {
    apiPages,
    latestVersion,
    navigationData: apiNavigationData,
    defaultNavigationRedirects: apiRedirects,
  } = createApiPages(apiEdges, apiTypesNavigationData, apiNavigationEntries);

  if (firstLearnPage) {
    createPage({
      path: learnPath,
      component: learnTemplate,
      context: { ...firstLearnPage, navigationData: learNavigationData },
    });
  }

  learnPages.forEach(page => {
    createPage({
      path: page.slug,
      component: learnTemplate,
      context: { ...page, navigationData: learNavigationData },
    });
  });

  categoryEdges.forEach(({ node }) => {
    createPage({
      path: `${blogPath}${node.name}/`,
      component: blogCategoryTemplate,
      context: { categoryName: node.name },
    });
  });

  const latestApiPath = `${apiPath}${latestVersion}/`;

  pageRedirects[apiPath] = `${latestApiPath}documentation/`;
  pageRedirects[latestApiPath] = `${latestApiPath}documentation/`;

  apiRedirects.forEach(({ from, to }) => {
    pageRedirects[`${apiPath}${from}`] = `${apiPath}${to}`;

    // Redirects from the old API URL schema (Nodejs.org)
    // To the new URL schema
    pageRedirects[`${apiPath}${from.slice(0, -1)}.html`] = `${apiPath}${to}`;
  });

  apiPages.forEach(page => {
    createPage({
      path: page.slug,
      component: apiTemplate,
      context: { ...page, navigationData: apiNavigationData[page.version] },
    });
  });

  markdownPages
    .filter(page => page.realPath.match(blogPath))
    .forEach(page => {
      // Blog Pages don't necessary need to be within the `blog` category
      // But actually inside /content/blog/ section of the repository
      createPage({
        path: page.slug,
        component: blogTemplate,
        context: page,
      });
    });

  Object.keys(pageRedirects).forEach(from => {
    const metadata = {
      fromPath: from,
      toPath: pageRedirects[from],
      isPermanent: true,
      redirectInBrowser: process.env.NODE_ENV !== 'production',
      statusCode: 200,
    };

    createRedirect(metadata);

    // Creates Redirects for Locales
    nodeLocales.locales.forEach(({ code }) =>
      createRedirect({
        ...metadata,
        fromPath: getRedirectForLocale(code, metadata.fromPath),
        toPath: getRedirectForLocale(code, metadata.toPath),
      })
    );
  });
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  // Deletes the same page that is created by the createPage action
  deletePage(page);

  // Recreates the page with the messages that ReactIntl needs
  // This will be passed to the ReactIntlProvider Component
  // Used within gatsby-browser.js and gatsby-ssr.js
  createPage({
    ...page,
    context: {
      ...page.context,
      intlMessages: getMessagesForLocale(page.context.locale),
      locale: page.context.locale || nodeLocales.defaultLanguage,
    },
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  if (node.internal.type === 'Mdx') {
    const { createNodeField } = actions;
    const { fileAbsolutePath, parent, frontmatter } = node;

    const relativePath =
      parent && getNode(parent) ? getNode(parent).relativePath : '';

    let slug;

    if (fileAbsolutePath) {
      // Special Handling for Blog Posts
      if (fileAbsolutePath.includes(blogPath)) {
        const [, year, month, day, filename] =
          BLOG_POST_FILENAME_REGEX.exec(relativePath);

        slug = blogPath;

        if (frontmatter.category) {
          slug += `${frontmatter.category}/`;
        }

        slug += `${year}/${month}/${day}/${filename}`;

        const date = new Date(year, month - 1, day);

        createNodeField({
          node,
          name: 'date',
          value: date.toJSON(),
        });

        createNodeField({
          node,
          name: `readingTime`,
          value: readingTime(node.rawBody),
        });
      }

      if (fileAbsolutePath.includes(learnPath)) {
        // Special Handling for Learn Content
        slug = `${learnPath}${createSlug(frontmatter.title)}/`;
      }

      // For Nodes created from Buffers the Absolute Path comes differently
      // From what we would expect of `apiPath`
      if (fileAbsolutePath.includes('/-api-v')) {
        // `apiDoc-v` prefix comes from `getApiDocsData.js` and its used to define the file name
        // Speicla Handling for Api Docs Pages
        slug = `${apiPath}${frontmatter.version}/${frontmatter.title}/`;
      }
    }

    createNodeField({
      node,
      name: 'slug',
      value: slug || createSlug(frontmatter.title),
    });

    if (frontmatter.authors) {
      createNodeField({
        node,
        name: 'authors',
        value: frontmatter.authors.split(','),
      });
    }

    if (frontmatter.category) {
      createNodeField({
        node,
        name: 'categoryName',
        value: frontmatter.category,
      });
    }
  }
};

exports.sourceNodes = async ({
  actions: { createNode },
  createNodeId,
  createContentDigest,
  reporter: { activityTimer },
  cache,
}) => {
  let activity = activityTimer('Fetching Node release data');

  activity.start();

  try {
    const nodeReleasesData = await getNodeReleasesData();

    const nodeReleasesMeta = {
      id: createNodeId('node-releases'),
      parent: null,
      children: [],
      internal: {
        type: 'NodeReleases',
        mediaType: 'application/json',
        content: JSON.stringify(nodeReleasesData),
        contentDigest: createContentDigest(nodeReleasesData),
      },
    };

    await createNode({
      ...nodeReleasesData,
      ...nodeReleasesMeta,
    });

    activity.end();

    activity = activityTimer('Fetching API Docs');

    activity.start();

    const currentActiveReleasesVersions =
      getCurrentActiveReleases(nodeReleasesData);

    // For now we're only going to parse the latest Node.js docs
    // As the v14 and v16 docs have some Markdown Errors
    const [latestNodeRelease] = currentActiveReleasesVersions.reverse();

    const apiNavigationData = await getApiDocsData([latestNodeRelease], {
      createNode,
      createNodeId,
      cache,
    });

    const apiNavigationMeta = {
      id: createNodeId('api-navigation'),
      parent: null,
      children: [],
      internal: {
        type: 'ApiNavigation',
        mediaType: 'application/json',
        content: JSON.stringify(apiNavigationData),
        contentDigest: createContentDigest(apiNavigationData),
      },
    };

    await createNode({
      ...apiNavigationData,
      ...apiNavigationMeta,
    });

    activity.end();

    activity = activityTimer('Fetching Banners');

    activity.start();

    const bannersData = await getBannersData();

    const bannersMeta = {
      id: createNodeId('banners'),
      parent: null,
      children: [],
      internal: {
        type: 'Banners',
        mediaType: 'application/json',
        content: JSON.stringify(bannersData),
        contentDigest: createContentDigest(bannersData),
      },
    };

    await createNode({
      ...bannersData,
      ...bannersMeta,
    });

    activity.end();

    activity = activityTimer('Fetching latest NVM version data');

    activity.start();

    const nvmData = await getNvmData();

    const nvmMeta = {
      id: createNodeId('nvm'),
      parent: null,
      children: [],
      internal: {
        type: 'Nvm',
        mediaType: 'application/json',
        content: JSON.stringify(nvmData),
        contentDigest: createContentDigest(nvmData),
      },
    };

    await createNode({
      ...nvmData,
      ...nvmMeta,
    });

    activity.end();
  } catch (err) {
    activity.panic(err);
  }
};
