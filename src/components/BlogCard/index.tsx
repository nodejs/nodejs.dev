import { Link } from 'gatsby';
import React from 'react';
import { BlogMetaData } from '../../types';
import Author from '../Author';
import './BlogCard.scss';

interface Props {
  data: BlogMetaData;
}

const BlogCard = ({
  data: {
    node: {
      fields: { date, slug },
      frontmatter: { authors, title },
    },
  },
}: Props): JSX.Element => (
  <div className="blogCard">
    <Link className="title" to={slug}>
      {title}
    </Link>
    <h4>{date}</h4>
    <p>
      by{' '}
      {authors
        .replace(/\s/g, '')
        .split(',')
        .map((username, i) => (
          <Author key={username} username={username} index={i} size="30" />
        ))}
    </p>
  </div>
);

export default BlogCard;
