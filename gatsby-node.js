// Use in this file CommonJS syntax see https://www.gatsbyjs.org/docs/migrating-from-v1-to-v2/#convert-to-either-pure-commonjs-or-pure-es6
const fs = require('fs');
const path = require('path');
const yaml = require('yaml');
const readingTime = require('reading-time');
const asyncMethods = require('async');
const safeJSON = require('./util-node/safeJSON');
const createSlug = require('./util-node/createSlug');
const getNodeReleasesData = require('./util-node/getNodeReleasesData');
const getBannersData = require('./util-node/getBannersData');
const getNvmData = require('./util-node/getNvmData');
const createBlogQuery = require('./util-node/queries/createBlogQuery');
const createLearnQuery = require('./util-node/queries/createLearnQuery');
const createApiQuery = require('./util-node/queries/createApiQuery');
const createBlogPages = require('./util-node/createBlogPages');
const createLearnPages = require('./util-node/createLearnPages');
const createApiPages = require('./util-node/createApiPages');
const generateRedirects = require('./util-node/generateRedirects');
const getPaginationPath = require('./util-node/getPaginationPath');
const redirects = require('./redirects');
const nodeLocales = require('./locales');
const { learnPath, apiPath, blogPath } = require('./pathPrefixes');

const BLOG_POST_FILENAME_REGEX = /([0-9]+)-([0-9]+)-([0-9]+)-(.+)\.md$/;

const learnYamlNavigationData = yaml.parse(
  fs.readFileSync('./src/data/learn.yaml', 'utf8')
);

const apiTypesNavigationData = yaml.parse(
  fs.readFileSync('./src/data/apiTypes.yaml', 'utf8')
);

// This creates a map of all the locale JSONs that are enabled in the config.json file
const intlMessages = nodeLocales.locales.reduce(
  (acc, locale) => ({
    ...acc,
    // eslint-disable-next-line import/no-dynamic-require, global-require
    [locale.code]: require(`./src/i18n/locales/${locale.code}.json`),
  }),
  {}
);

const getMessagesForLocale = locale =>
  locale && locale in intlMessages
    ? intlMessages[locale]
    : intlMessages[nodeLocales.defaultLanguage];

const getRedirectForLocale = (locale, url) =>
  /^\/\/|https?:\/\//.test(url) ? url : `/${locale}${url}`;

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

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  const pageRedirects = { ...redirects };

  const templates = path.resolve(__dirname, './src/templates/');

  const apiTemplate = `${templates}/api.tsx`;
  const learnTemplate = `${templates}/learn.tsx`;
  const postTemplate = `${templates}/post.tsx`;
  const blogTemplate = `${templates}/blog.tsx`;

  const [learnResult, blogResult, apiResult] = await Promise.all([
    graphql(createLearnQuery),
    graphql(createBlogQuery),
    graphql(createApiQuery),
  ]);

  const {
    pages: { edges: blogEdges },
    categories: { edges: categoryEdges },
  } = blogResult.data;

  const {
    allMdx: { edges: learnEdges },
  } = learnResult.data;

  const {
    pages: { edges: apiEdges },
    nodeReleases: { nodeReleasesData, apiAvailableVersions },
  } = apiResult.data;

  const { blogPages, blogPosts, getPaginatedPosts } =
    createBlogPages(blogEdges);

  const { learnPages, navigationData: learnNavigationData } = createLearnPages(
    learnEdges,
    learnYamlNavigationData
  );

  createPage({
    path: learnPath,
    component: learnTemplate,
    context: { ...learnPages[0], navigationData: learnNavigationData },
  });

  learnPages.forEach(page => {
    createPage({
      path: page.slug,
      component: learnTemplate,
      context: { ...page, navigationData: learnNavigationData },
    });
  });

  blogPages.forEach(page => {
    createPage({
      path: page.slug,
      component: postTemplate,
      // Get the latest 10 blog posts for the Recent Posts section
      context: { ...page, recent: blogPosts.slice(0, 10) },
    });
  });

  // This default category acts as a "hack" for creating the default
  // `/blog` page (aka the "Everything" category)
  const defaultCategory = { node: { name: null } };

  [defaultCategory, ...categoryEdges].forEach(({ node }) => {
    const paginatedPosts = getPaginatedPosts(node.name);

    const getPaginationData = current => ({
      current: current + 1,
      total: paginatedPosts.length,
    });

    const getBlogPagePath = getPaginationPath(blogPath, node.name);

    paginatedPosts.forEach((currentPagePosts, index) => {
      createPage({
        path: getBlogPagePath(index + 1),
        component: blogTemplate,
        context: {
          category: node.name ? node : null,
          categories: categoryEdges,
          posts: currentPagePosts,
          pagination: getPaginationData(index),
        },
      });
    });
  });

  const {
    apiPages,
    latestVersion,
    navigationData: apiNavigationData,
    defaultNavigationRedirects: apiRedirects,
  } = createApiPages(apiEdges, apiTypesNavigationData, nodeReleasesData);

  apiPages.forEach(page => {
    createPage({
      path: page.slug,
      component: apiTemplate,
      context: {
        ...page,
        navigationData: apiNavigationData[page.version],
        nodeReleases: { nodeReleasesData, apiAvailableVersions },
      },
    });
  });

  const latestApiPath = `${apiPath}${latestVersion}/`;
  const apiPathWithLatest = `${apiPath}latest/`;

  pageRedirects[apiPath] = `${latestApiPath}documentation/`;
  pageRedirects[latestApiPath] = `${latestApiPath}documentation/`;
  pageRedirects[apiPathWithLatest] = `${latestApiPath}documentation/`;

  apiRedirects.forEach(({ from, to }) => {
    pageRedirects[`${apiPath}${from}`] = `${apiPath}${to}`;

    // Redirects from the old API URL schema (Nodejs.org)
    // To the new URL schema
    pageRedirects[`${apiPath}${from.slice(0, -1)}.html`] = `${apiPath}${to}`;
  });

  const fireBaseRedirects = {};

  // Create Redirects for Pages
  Object.keys(pageRedirects).forEach(from => {
    const metadata = {
      fromPath: from,
      toPath: pageRedirects[from],
      isPermanent: true,
      redirectInBrowser: true,
      statusCode: 302,
    };

    fireBaseRedirects[from] = getRedirectForLocale('en', metadata.toPath);

    createRedirect({ ...metadata, toPath: fireBaseRedirects[from] });

    // Creates Redirects for Locales
    nodeLocales.locales.forEach(({ code }) =>
      createRedirect({
        ...metadata,
        fromPath: getRedirectForLocale(code, metadata.fromPath),
        toPath: getRedirectForLocale(code, metadata.toPath),
      })
    );
  });

  // Updates `firebase.json` with new redirects
  // This is used for our static hosting redirects (npm run build)
  // When using `npm run serve` or `npm run start` this will not be needed
  generateRedirects(fireBaseRedirects);
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  // Deletes the same page that is created by the createPage action
  deletePage(page);

  // Recreates the page with the messages that ReactIntl needs
  // This will be passed to the ReactIntlProvider Component
  // Used within gatsby-browser.js and gatsby-ssr.js
  const context = { ...page.context };
  const locale = context.locale || nodeLocales.defaultLanguage;
  const isLearnPage = context.categoryName === 'learn';
  if (isLearnPage) {
    const navigationLocale = context.navigationData[locale]
      ? locale
      : nodeLocales.defaultLanguage;
    context.navigationData = context.navigationData[navigationLocale];
  }
  createPage({
    ...page,
    context: {
      ...context,
      intlMessages: getMessagesForLocale(context.locale),
      locale,
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

        slug += filename;

        const date = new Date(year, month - 1, day);

        createNodeField({
          node,
          name: 'date',
          value: date.toJSON(),
        });

        createNodeField({
          node,
          name: `readingTime`,
          value: readingTime(node.internal.content),
        });
      }

      if (frontmatter.category === 'learn') {
        // Different type of slug for /learn/ pages
        slug = `${learnPath}${createSlug(frontmatter.title)}/`;
      }

      if (frontmatter.category === 'api') {
        // Different type of slug for /api/ pages
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
  reporter: { activityTimer },
  actions: { createNode },
  createContentDigest,
  createNodeId,
}) => {
  const [releaseTimer, bannersTimer, nvmTimer] = [
    activityTimer('Fetching Node release data'),
    activityTimer('Fetching Banners data'),
    activityTimer('Fetching latest NVM version data'),
  ];

  await asyncMethods.parallel([
    callback => {
      bannersTimer.start();

      getBannersData().then(bannersData => {
        const bannersMeta = {
          id: createNodeId('banners'),
          parent: null,
          children: [],
          internal: {
            type: 'Banners',
            mediaType: 'application/json',
            content: safeJSON.toString(bannersData),
            contentDigest: createContentDigest(bannersData),
          },
        };

        createNode({ ...bannersData, ...bannersMeta }).then(() => {
          bannersTimer.end();

          callback();
        });
      });
    },
    callback => {
      nvmTimer.start();

      getNvmData().then(nvmData => {
        const nvmMeta = {
          id: createNodeId('nvm'),
          parent: null,
          children: [],
          internal: {
            type: 'Nvm',
            mediaType: 'application/json',
            content: safeJSON.toString(nvmData),
            contentDigest: createContentDigest(nvmData),
          },
        };

        createNode({ ...nvmData, ...nvmMeta }).then(() => {
          nvmTimer.end();

          callback();
        });
      });
    },
    callback => {
      releaseTimer.start();

      getNodeReleasesData(nodeReleasesData => {
        const nodeReleasesMeta = {
          id: createNodeId('node-releases'),
          parent: null,
          children: [],
          internal: {
            type: 'NodeReleases',
            mediaType: 'application/json',
            content: safeJSON.toString(nodeReleasesData),
            contentDigest: createContentDigest(nodeReleasesData),
          },
        };

        createNode({ ...nodeReleasesData, ...nodeReleasesMeta }).then(() => {
          releaseTimer.end();

          callback();
        });
      });
    },
  ]);
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelOptions({
    options: {
      generatorOpts: {
        compact: true,
        comments: false,
      },
    },
  });
};

exports.onCreateWebpackConfig = ({ plugins, actions, stage, getConfig }) => {
  actions.setWebpackConfig({
    plugins: [
      plugins.ignore({ resourceRegExp: /canvas/, contextRegExp: /jsdom$/ }),
    ],
  });

  if (stage === 'develop' || stage === 'build-javascript') {
    const config = getConfig();

    const miniCssExtractPlugin = config.plugins.find(
      plugin => plugin.constructor.name === 'MiniCssExtractPlugin'
    );

    if (miniCssExtractPlugin) {
      // We don't care about the order of CSS imports as we use CSS Modules
      miniCssExtractPlugin.options.ignoreOrder = true;
    }

    actions.replaceWebpackConfig(config);
  }
};
