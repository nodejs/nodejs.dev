import React, { useRef, useEffect } from 'react';
import { Link } from 'gatsby';

type Props = {
  key: string;
  isRead: boolean;
  isActive: boolean;
  slug: string;
  title: string;
  onClick: () => void;
};

const NavigationItem = ({ isRead, isActive, slug, title, onClick }: Props) => {
  const element = useRef<HTMLAnchorElement | null>(null);

  const handleRef = (ref?: HTMLAnchorElement | null) => {
    if (ref && isActive) {
      element.current = ref;
    }
  };

  useEffect(() => {
    if (element.current) {
      // TODO: Scroll ref element in to view
      // maybe use utils/scrollTo
    }
  });

  let className = 'side-nav__item ';
  if (isRead) {
    className += 'side-nav__item--done';
  } else if (isActive) {
    className += 'side-nav__item--active';
  }

  return (
    <Link
      innerRef={handleRef}
      to={`/${slug}`}
      onClick={onClick}
      className={className}
    >
      {title}
    </Link>
  );
};

export default NavigationItem;
