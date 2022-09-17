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
  onClick?: (event: React.MouseEvent<HTMLLinkElement>) => void;
}

const NavigationItem = ({
  isRead,
  isActive,
  slug,
  title,
  isApiDocs,
  onClick,
}: Props): JSX.Element => {
  const className = classnames(`t-body2 ${styles.navigationItem}`, {
    [styles.navigationItemDone]: isRead,
    [styles.navigationItemActive]: !isRead && isActive,
    [styles.navigationItemApi]: isApiDocs,
  });

  if (slug.startsWith('https')) {
    return (
      <a href={slug} className={className}>
        {title}
      </a>
    );
  }

  return (
    <Link
      onClick={onClick}
      to={slug}
      className={className}
      aria-current={isActive ? 'page' : undefined}
    >
      {title}
    </Link>
  );
};

export default NavigationItem;
