import React from 'react';
import { NavigationItemList, NavigationSectionItem } from '../types';
import NavigationItem from './navigation-item';

type Props = {
  key: string;
  title: string;
  section: NavigationItemList;
  currentSlug: string;
  onItemClick: () => void;
};

const NavigationSection = ({
  title,
  section,
  currentSlug,
  onItemClick,
}: Props) => {
  return (
    <ul className="side-nav__list">
      <h2 className="side-nav__title">{title}</h2>
      {section.map((item: NavigationSectionItem) => {
        return (
          <NavigationItem
            key={item.slug}
            title={item.title}
            slug={item.slug}
            isDone={isDone(currentSlug, item.slug, section)}
            isActive={item.slug == currentSlug}
            onClick={() => onItemClick}
          />
        );
      })}
    </ul>
  );
};

const isDone = (
  currentSlug: string,
  requestedSlug: string,
  section: NavigationItemList
): boolean => {
  let currentSlugIndex: number = 0;
  let requestedSlugIndex: number = 0;
  section.forEach((navigationItem, index) => {
    if (navigationItem.slug == currentSlug) {
      currentSlugIndex = index;
    }

    if (navigationItem.slug == requestedSlug) {
      requestedSlugIndex = index;
    }
  });

  return currentSlugIndex > requestedSlugIndex;
};

export default NavigationSection;
