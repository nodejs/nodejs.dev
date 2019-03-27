import React from 'react';
import { NavigationSectionItem } from '../types';
import NavigationItem from './navigation-item';

type Props = {
  key: string;
  title: string;
  section: NavigationSectionItem[];
  currentSlug: string;
  onItemClick: () => void;
  readSections: Set<NavigationSectionItem['slug']>;
  autoScroll: (height: number) => void;
};

const NavigationSection = ({
  title,
  section,
  currentSlug,
  onItemClick,
  readSections,
  autoScroll,
}: Props) => {
  return (
    <ul className="side-nav__list">
      <h2 className="side-nav__title">{title}</h2>
      {section.map((item: NavigationSectionItem) => {
        const isRead: boolean = readSections.has(item.slug);

        return (
          <NavigationItem
            key={item.slug}
            title={item.title}
            slug={item.slug}
            isRead={isRead}
            isActive={item.slug === currentSlug}
            onClick={onItemClick}
            autoScroll={autoScroll}
          />
        );
      })}
    </ul>
  );
};

export default NavigationSection;
