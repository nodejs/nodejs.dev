import React from 'react';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import classnames from 'classnames';
import styles from './index.module.scss';

interface Props {
  key: string;
  isRead: boolean;
  isActive: boolean;
  slug: string;
  title: string;
  isApiDocs?: boolean;
}

const NavigationItem = ({
  isRead,
  isActive,
  slug,
  title,
  isApiDocs,
}: Props): JSX.Element => {
  const className = classnames(`t-body2 ${styles.navigationItem}`, {
    [styles.navigationItemDone]: isRead,
    [styles.navigationItemActive]: !isRead && isActive,
    [styles.navigationItemApi]: isApiDocs,
  });

  const slugWithoutSlash = slug.endsWith('/') ? slug.slice(0, -1) : slug;

  return (
    <Link
      id={`link-${slug}`}
      to={slugWithoutSlash}
      className={className}
      aria-current={isActive ? 'page' : undefined}
    >
      {title}
    </Link>
  );
};

export default NavigationItem;
