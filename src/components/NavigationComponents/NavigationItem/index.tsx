import React from 'react';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import classnames from 'classnames';
import { useScrollToElement } from '../../../hooks/useScrollToElement';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
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

  const isMobile = useMediaQuery('(max-width: 900px)');

  useScrollToElement({
    element: slug,
    smooth: true,
    containerId: 'main-navigation',
    offset: -100,
    // This needs to be a strict `===false` as
    // the initial value is `undefined` as being CSR
    isActive: isActive && isMobile === false,
  });

  if (slug.startsWith('https')) {
    return (
      <a id={slug} href={slug} className={className}>
        {title}
      </a>
    );
  }

  return (
    <Link
      id={slug}
      to={slug}
      className={className}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
    >
      {title}
    </Link>
  );
};

export default NavigationItem;
