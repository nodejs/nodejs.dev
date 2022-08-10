import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import React from 'react';
import { BlogMetaData } from '../../types';

import './RecentPosts.scss';

interface Props {
  posts: BlogMetaData[];
}

const RecentPosts = ({ posts }: Props) => {
  return (
    <div className="recent-posts">
      <h2 className="recent-posts-header">Recent Posts</h2>
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
};

export default RecentPosts;
