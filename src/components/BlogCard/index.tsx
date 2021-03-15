import { Link } from 'gatsby';
import React, { Fragment } from 'react';
import { BlogMetaData } from '../../types';
import { getTerminatingString } from '../../util/getTerminatingString';
import './BlogCard.scss';

interface Props {
  data: BlogMetaData;
}

const BlogCard = ({
  data: {
    node: {
      fields: { date, slug },
      frontmatter: { author, title },
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
      {author &&
        author.map((user, i) => (
          <Fragment key={user.id}>
            <span>{user.name}</span>
            {getTerminatingString(i, author.length)}
          </Fragment>
        ))}
    </p>
  </div>
);

export default BlogCard;
