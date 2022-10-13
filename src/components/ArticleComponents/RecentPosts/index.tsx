import React from 'react';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { FormattedMessage } from 'react-intl';
import { BlogPost } from '../../../types';
import styles from './index.module.scss';

interface Props {
  posts: BlogPost[];
}

const getSlugWithTrailingSlash = (slug: string) =>
  slug.endsWith('/') ? slug : `${slug}/`;

const RecentPosts = ({ posts }: Props) => (
  <div className={styles.recentPosts}>
    <h2 className={styles.recentPostsHeader}>
      <FormattedMessage id="components.recentPosts.title" />
    </h2>
    <ul>
      {posts.map(post => (
        <li key={post.node.fields.slug}>
          <Link
            className={styles.link}
            activeClassName={styles.linkActive}
            to={getSlugWithTrailingSlash(post.node.fields.slug)}
          >
            {post.node.frontmatter.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default RecentPosts;
