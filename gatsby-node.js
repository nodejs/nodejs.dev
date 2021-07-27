// Use in this file CommonJS syntax see https://www.gatsbyjs.org/docs/migrating-from-v1-to-v2/#convert-to-either-pure-commonjs-or-pure-es6
const path = require('path');
const createSlug = require('./util-node/createSlug');
const getNodeReleasesData = require('./util-node/getNodeReleasesData');
const getBannersData = require('./util-node/getBannersData');
const createPagesQuery = require('./util-node/createPagesQuery');
const createDocPages = require('./util-node/createDocPages');

const BLOG_POST_FILENAME_REGEX = /([0-9]+)-([0-9]+)-([0-9]+)-(.+)\.md$/;

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions;

  const result = await graphql(createPagesQuery);

  if (result.errors) {
    reporter.panicOnBuild('Error while running "createPages" GraphQL query.');
    return;
  }

  const docTemplate = path.resolve('./src/templates/learn.tsx');
  const blogTemplate = path.resolve('./src/templates/blog.tsx');

  const { edges } = result.data.allMarkdownRemark;
  const docPages = createDocPages(edges);

  docPages.forEach(page => {
    if (page.category === 'blog') {
      createPage({
        path: page.slug,
        component: blogTemplate,
        context: page,
      });
    } else if (page.category === 'learn') {
      createPage({
        path: `/learn/${page.slug}`,
        component: docTemplate,
        context: page,
      });
      createRedirect({
        fromPath: `/${page.slug}`,
        toPath: `/learn/${page.slug}`,
        isPermanent: true,
      });
    }

    if (page.slug === 'introduction-to-nodejs') {
      createPage({
        path: `/learn`,
        component: docTemplate,
        context: page,
      });
    }
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  if (node.internal.type === 'MarkdownRemark') {
    const { createNodeField } = actions;
    const { fileAbsolutePath, parent, frontmatter } = node;

    const relativePath =
      parent && getNode(parent) ? getNode(parent).relativePath : '';

    let slug;
    if (fileAbsolutePath && fileAbsolutePath.includes('/blog/')) {
      const [, year, month, day, filename] =
        BLOG_POST_FILENAME_REGEX.exec(relativePath);

      slug = `/blog/${year}/${month}/${day}/${filename}`;

      const date = new Date(year, month - 1, day);

      createNodeField({
        node,
        name: 'date',
        value: date.toJSON(),
      });
    } else slug = createSlug(frontmatter.title);

    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });

    const { authors } = frontmatter;
    if (authors) {
      createNodeField({
        node,
        name: 'authors',
        value: authors.split(','),
      });
    }
  }
};

exports.sourceNodes = async ({
  actions: { createNode },
  createNodeId,
  createContentDigest,
  reporter: { activityTimer },
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
  } catch (err) {
    activity.panic(err);
  }
};
