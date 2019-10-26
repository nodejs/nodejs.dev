/* eslint-disable @typescript-eslint/no-var-requires */
// Use in this file CommonJS syntax see https://www.gatsbyjs.org/docs/migrating-from-v1-to-v2/#convert-to-either-pure-commonjs-or-pure-es6
const path = require('path');
const createSlug = require('./src/util/createSlug');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const learnTemplate = path.resolve('./src/templates/learn.tsx');
    const contentTemplate = path.resolve('./src/templates/content.tsx');

    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              filter: {
                fields: { slug: { ne: "" } }
                frontmatter: { section: { ne: "Content" } }
              }
              sort: { fields: [fileAbsolutePath], order: ASC }
            ) {
              edges {
                node {
                  id
                  fileAbsolutePath
                  html
                  parent {
                    ... on File {
                      relativePath
                    }
                  }
                  frontmatter {
                    title
                    description
                    authors
                    section
                  }
                  fields {
                    slug
                  }
                }
                next {
                  frontmatter {
                    title
                  }
                  fields {
                    slug
                  }
                }
                previous {
                  frontmatter {
                    title
                  }
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          // eslint-disable-next-line no-console
          console.log(result.errors);
          reject(result.errors);
        }
        const { edges } = result.data.allMarkdownRemark;
        let navigationData = {};
        const docPages = [];
        edges.forEach(({ node }, index) => {
          const {
            fields: { slug },
            frontmatter: { title, section },
            parent: { relativePath },
          } = node;

          let previousNodeData = null;
          const previousNode = index === 0 ? undefined : edges[index - 1].node;
          if (previousNode) {
            previousNodeData = {
              slug: previousNode.fields.slug,
              title: previousNode.frontmatter.title,
            };
          }

          let nextNodeData = null;
          const nextNode =
            index === edges.length - 1 ? undefined : edges[index + 1].node;
          if (nextNode) {
            nextNodeData = {
              slug: nextNode.fields.slug,
              title: nextNode.frontmatter.title,
            };
          }

          let data;
          if (!navigationData[section]) {
            data = { title, slug, section };
            navigationData = { ...navigationData, [section]: [data] };
          } else {
            data = { title, slug, section };
            navigationData = {
              ...navigationData,
              [section]: [...navigationData[section], data],
            };
          }
          docPages.push({
            slug,
            next: nextNodeData,
            previous: previousNodeData,
            relativePath,
          });
        });

        docPages.forEach(page => {
          switch (page.slug) {
            case 'installing-via-package-manager':
              // createPage({
              //   path: `/`,
              //   component: contentTemplate,
              //   context: {
              //     slug: page.slug,
              //     next: page.next,
              //     previous: page.previous,
              //     relativePath: page.relativePath,
              //     navigationData,
              //   },
              // });
              break;
            case 'introduction-to-nodejs':
              createPage({
                path: `/learn`,
                component: learnTemplate,
                context: {
                  slug: page.slug,
                  next: page.next,
                  previous: page.previous,
                  relativePath: page.relativePath,
                  navigationData,
                },
              });
              break;
            default:
              createPage({
                path: `/learn/${page.slug}`,
                component: learnTemplate,
                context: {
                  slug: page.slug,
                  next: page.next,
                  previous: page.previous,
                  relativePath: page.relativePath,
                  navigationData,
                },
              });
          }
        });
      })
    );
  });
};

exports.onCreateNode = ({ node, actions }) => {
  if (node.internal.type === 'MarkdownRemark') {
    const { createNodeField } = actions;

    const slug = createSlug(node.frontmatter.title);
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });

    let { authors } = node.frontmatter;
    if (authors) {
      authors = authors.split(',');
      createNodeField({
        node,
        name: 'authors',
        value: authors,
      });
    }
  }
};
