import React from 'react';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { FormattedMessage } from 'react-intl';
import { BlogMetaData } from '../../types';
import './RecentPosts.scss';

interface Props {
  posts: BlogMetaData[];
}

const RecentPosts = ({ posts }: Props) => (
  <div className="recent-posts">
    <h2 className="recent-posts-header">
      <FormattedMessage id="components.recentPosts.title" />
    </h2>
    <ul className="recent-post-list">
      {posts.map(post => {
        const {
          node: {
            frontmatter: { title },
            fields: { slug },
          },
        } = post;
        return (
          <li key={slug} className="recent-post-item">
            <Link activeClassName="recent-post-item-active" to={slug}>
              {title}
            </Link>
          </li>
        );
      })}
    </ul>
  </div>
);

export default RecentPosts;
