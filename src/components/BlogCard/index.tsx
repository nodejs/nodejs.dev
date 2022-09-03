import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import React, { Fragment } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { BlogPost } from '../../types';
import { getTerminatingString } from '../../util/getTerminatingString';
import { blogPath } from '../../../pathPrefixes';
import styles from './index.module.scss';

interface Props {
  data: BlogPost;
}

const getBlogCategoryUrl = (category: string): string =>
  `${blogPath}${category}/`;

const getBlogPostUrl = (slug: string) =>
  slug.endsWith('/') ? slug : `${slug}/`;

const BlogCard = ({
  data: {
    node: {
      fields: { date, slug, readingTime },
      frontmatter: { blogAuthors, title, category },
    },
  },
  intl,
}: Props & WrappedComponentProps): JSX.Element => (
  <div className={styles.blogCard}>
    <div className={styles.title}>
      <Link to={getBlogPostUrl(slug)}>{title}</Link>
      <div className={styles.metadata}>
        {category && (
          <Link
            className={styles.category}
            to={getBlogCategoryUrl(category.name)}
          >
            {category.slug}
          </Link>
        )}
        <span>{readingTime.text}</span>
      </div>
    </div>
    <div className={styles.content}>
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
