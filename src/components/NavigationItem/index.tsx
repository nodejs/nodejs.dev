import React, { useRef, useEffect } from 'react';
import { Link } from 'gatsby';

interface Props {
  key: string;
  isRead: boolean;
  isActive: boolean;
  slug: string;
  title: string;
  onClick: () => void;
  autoScroll: (height: number) => void;
}

const NavigationItem = ({
  isRead,
  isActive,
  slug,
  title,
  onClick,
  autoScroll,
}: Props): JSX.Element => {
  let className = 't-body2 side-nav__item ';
  if (isRead) {
    className += 'side-nav__item--done';
  } else if (isActive) {
    className += 'side-nav__item--active';
  }
  const element = useRef<HTMLAnchorElement | null>(null);
  const handleRef = (ref?: HTMLAnchorElement | null): void => {
    if (ref && isActive) {
      element.current = ref;
    }
  };

  useEffect((): void => {
    if (element.current) {
      const height = element.current.getBoundingClientRect().top;
      autoScroll(height);
    }
  });

  return (
    <Link
      innerRef={handleRef}
      to={`/learn/${slug}`}
      onClick={onClick}
      className={className}
    >
      {title}
    </Link>
  );
};

export default NavigationItem;
