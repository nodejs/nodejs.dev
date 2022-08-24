import React from 'react';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import classnames from 'classnames';

interface Props {
  key: string;
  isLearn?: boolean;
  isRead: boolean;
  isActive: boolean;
  slug: string;
  title: string;
  baseUrl?: string;
}

const NavigationItem = ({
  isLearn = true,
  isRead,
  isActive,
  slug,
  title,
  baseUrl,
}: Props): JSX.Element => {
  const className = isLearn
    ? classnames('t-body2 side-nav__item', {
        'side-nav__item--done': isRead,
        'side-nav__item--active': !isRead && isActive,
      })
    : classnames('t-body2 side-nav__item-community', {
        'side-nav__item-community--active': isActive,
      });

  const slugWithoutSlash = slug.endsWith('/') ? slug.slice(0, -1) : slug;
  const destinationUrl = `${baseUrl || '/learn/'}${slugWithoutSlash}/`;

  return (
    <li>
      <Link
        id={`link-${slug}`}
        to={destinationUrl}
        className={className}
        aria-current={isActive ? 'page' : undefined}
      >
        {title}
      </Link>
    </li>
  );
};

export default NavigationItem;
