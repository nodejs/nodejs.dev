import { graphql } from 'gatsby';
import React from 'react';
import Article from '../components/Article';
import Layout from '../components/Layout';
import RecentPosts from '../components/RecentPosts';
import { PostTemplateData, PostTemplateContext } from '../types';
import styles from '../styles/templates/post.module.scss';

interface Props {
  data: PostTemplateData;
  pageContext: PostTemplateContext;
}

const PostTemplate = ({
  data: {
    mdx: {
      frontmatter: { title, blogAuthors },
      body,
      excerpt,
      fields: { date },
    },
  },
  pageContext: { next, previous, relativePath, recent },
}: Props): JSX.Element => (
  <Layout title={title} description={excerpt}>
    <main className={`grid-container ${styles.postContainer}`}>
      <RecentPosts posts={recent} />
      <Article
        title={title}
        body={body}
        next={next}
        authors={blogAuthors}
        previous={previous}
        relativePath={relativePath}
        blog
        date={date}
      />
    </main>
  </Layout>
);

export default PostTemplate;

export const query = graphql`
  query ($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      excerpt(pruneLength: 500)
      frontmatter {
        title
        blogAuthors {
          id
          name
          website
        }
      }
      fields {
        slug
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
