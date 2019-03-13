import React from 'react';
import { NavigationSectionItem } from '../types';
import NavigationItem from './navigation-item';

type Props = {
  key: string;
  title: string;
  section: NavigationSectionItem[];
  currentSlug: string;
  onItemClick: () => void;
  readStatus: Map<NavigationSectionItem['slug'], boolean>;
};

const NavigationSection = ({
  title,
  section,
  currentSlug,
  onItemClick,
  readStatus,
}: Props) => {
  return (
    <ul className="side-nav__list">
      <h2 className="side-nav__title">{title}</h2>
      {section.map((item: NavigationSectionItem) => {
        const isRead: boolean = readStatus.get(item.slug) || false;

        return (
          <NavigationItem
            key={item.slug}
            title={item.title}
            slug={item.slug}
            isRead={isRead}
            isActive={item.slug === currentSlug}
            onClick={onItemClick}
          />
        );
      })}
    </ul>
  );
};

export default NavigationSection;
