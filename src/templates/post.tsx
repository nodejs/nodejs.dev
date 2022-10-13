import { graphql } from 'gatsby';
import React from 'react';
import Article from '../sections/Article';
import DefaultLayout from '../layouts/default';
import { ArticleComponents } from '../components';
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
  <DefaultLayout title={title} description={excerpt}>
    <main className={`grid-container ${styles.postContainer}`}>
      <ArticleComponents.RecentPosts posts={recent} />
      <Article
        title={title}
        body={body}
        next={next}
        authors={blogAuthors}
        previous={previous}
        relativePath={relativePath}
        tableOfContents={[]}
        blog
        date={date}
      />
    </main>
  </DefaultLayout>
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
