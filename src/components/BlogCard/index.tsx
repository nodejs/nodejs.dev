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
      frontmatter: { blogAuthors, title },
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
      {blogAuthors?.map((author, i) => (
        <Fragment key={author.name}>
          <span>{author.name}</span>
          {getTerminatingString(i, blogAuthors.length)}
        </Fragment>
      ))}
    </p>
  </div>
);

export default BlogCard;
