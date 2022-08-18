import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import React, { Fragment } from 'react';
import { BlogMetaData } from '../../types';
import { getTerminatingString } from '../../util/getTerminatingString';
import './BlogCard.scss';

interface Props {
  data: BlogMetaData;
}

const getBlogCategoryUrl = (category: string): string => `/blog/${category}/`;

const BlogCard = ({
  data: {
    node: {
      fields: { date, slug, readingTime },
      frontmatter: { blogAuthors, title, category },
    },
  },
}: Props): JSX.Element => (
  <div className="blog-card">
    <div className="title">
      <Link to={slug}>{title}</Link>
      <div className="metadata">
        {category && (
          <Link className="category" to={getBlogCategoryUrl(category.name)}>
            {category.slug}
          </Link>
        )}
        <span>{readingTime.text}</span>
      </div>
    </div>
    <div className="content">
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
  </div>
);

export default BlogCard;
