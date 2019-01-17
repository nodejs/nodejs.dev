import React, { Component } from 'react'
import { graphql, Link } from 'gatsby'
import { css } from 'emotion'

import Layout from '../components/layout'

const header = css({
  color: 'black',
});

interface RemarkPage {
  id: string;
  fileAbsolutePath: string;
  html: string;
  frontmatter: {
    title: string;
    description: string;
    author: string;
  }
}

interface LearnPageData {
  pages: {
    edges: ({ node: RemarkPage })[];
  }
}

type Props = {
  data: LearnPageData;
}

export default ({ data }: Props) => {
  const pages = [];
  for (const { node: page } of data.pages.edges) {
    pages.push((
      <li>
        <h2>{page.frontmatter.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: page.html }} />
      </li>
    ));
  }

  return (
    <Layout>
      <h1 className={header}>Getting Started with Node.js</h1>

      <ul>
        {pages}
      </ul>
    </Layout>
  );
}

export const query = graphql`{
  pages: allMarkdownRemark {
    edges {
      node {
        id,
        fileAbsolutePath,
        html,
        frontmatter {
          title
          description
          author
        }
      }
    }
  }
}`;