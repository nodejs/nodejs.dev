import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import React, { Fragment } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { BlogMetaData } from '../../types';
import { getTerminatingString } from '../../util/getTerminatingString';
import './BlogCard.scss';

type Props = { data: BlogMetaData } & WrappedComponentProps;

const getBlogCategoryUrl = (category: string): string => `/blog/${category}/`;

const BlogCard = ({
  data: {
    node: {
      fields: { date, slug, readingTime },
      frontmatter: { blogAuthors, title, category },
    },
  },
  intl,
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
        {intl.formatMessage({ id: 'blog.authors.list.title.by' })}{' '}
        {blogAuthors?.map((author, i) => (
          <Fragment key={author.name}>
            <span>{author.name}</span>
            {getTerminatingString(
              i,
              blogAuthors.length,
              ` ${intl.formatMessage({ id: 'blog.authors.list.title.and' })} `
            )}
          </Fragment>
        ))}
      </p>
    </div>
  </div>
);

export default injectIntl(BlogCard);
