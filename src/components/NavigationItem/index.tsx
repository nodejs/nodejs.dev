import React from 'react';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import classnames from 'classnames';
import styles from './index.module.scss';

interface Props {
  slug: string;
  title: string;
  isActive: boolean;
  extraClasses?: string;
  onClick?: (event: React.MouseEvent<HTMLLinkElement>) => void;
}

const NavigationItem = ({
  slug,
  title,
  onClick,
  isActive,
  extraClasses,
}: Props): JSX.Element => {
  const className = classnames('t-body2', styles.navigationItem, extraClasses, {
    [styles.navigationItemActive]: isActive,
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
