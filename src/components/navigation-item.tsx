import React, { useRef, useEffect } from 'react';
import { Link } from 'gatsby';

type Props = {
  key: string;
  isRead: boolean;
  isActive: boolean;
  slug: string;
  title: string;
  onClick: () => void;
  autoScroll: (height: number) => void;
};

const NavigationItem = ({
  isRead,
  isActive,
  slug,
  title,
  onClick,
  autoScroll,
}: Props) => {
  let className = 'side-nav__item ';
  if (isRead) {
    className += 'side-nav__item--done';
  } else if (isActive) {
    className += 'side-nav__item--active';
  }
  const element = useRef<HTMLAnchorElement | null>(null);
  const handleRef = (ref?: HTMLAnchorElement | null) => {
    if (ref && isActive) {
      element.current = ref;
    }
  };
  useEffect(() => {
    if (element.current) {
      const height = element.current.getBoundingClientRect().top;
      autoScroll(height);
    }
  });

  return (
    <Link
      ref={handleRef}
      to={`/learn/${slug}`}
      onClick={onClick}
      className={className}
    >
      {title}
    </Link>
  );
};

export default NavigationItem;
