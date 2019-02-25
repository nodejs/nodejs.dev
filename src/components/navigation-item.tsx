import React, { useRef, useEffect, useContext } from 'react';
import { Link } from 'gatsby';
import NavigationContext from './navigation-context';

type Props = {
  isDone: boolean;
  isActive: boolean;
  slug: string;
  title: string;
  onClick: (event: HTMLAnchorElement) => void;
};

const NavigationItem = ({ isDone, isActive, slug, title, onClick }: Props) => {
  const element = useRef<HTMLAnchorElement | null>(null);
  const { isOpen, selectedItem } = useContext(NavigationContext);

  const handleRef = (ref?: HTMLAnchorElement | null) => {
    if (ref && isActive) {
      element.current = ref;
    }
  };

  useEffect(() => {
    if (isOpen && selectedItem.scrollIntoView) {
      selectedItem.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      });
    }
  });

  let className = 'side-nav__item ';
  if (isDone) {
    className += 'side-nav__item--done';
  } else if (isActive) {
    className += 'side-nav__item--active';
  }

  return (
    <Link ref={handleRef} to={`/learn/${slug}`} onClick={onClick} className={className}>
      {title}
    </Link>
  );
};

export default NavigationItem;
