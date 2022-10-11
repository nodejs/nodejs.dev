import React, { useMemo } from 'react';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import classnames from 'classnames';
import styles from './index.module.scss';
import { useScrollToElement } from '../../hooks/useScrollToElement';

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

  useScrollToElement({
    element: slug,
    smooth: true,
    containerId: 'main-navigation',
    offset: -100,
    isActive,
  });

  const linkElement = useMemo(() => {
    if (slug.startsWith('https')) {
      return (
        <a href={slug} className={className}>
          {title}
        </a>
      );
    }

    const ariaCurrent = isActive ? 'page' : undefined;

    return (
      <Link
        to={slug}
        className={className}
        onClick={onClick}
        aria-current={ariaCurrent}
      >
        {title}
      </Link>
    );
  }, [slug, onClick, isActive, className, title]);

  return <span id={slug}>{linkElement}</span>;
};

export default NavigationItem;
