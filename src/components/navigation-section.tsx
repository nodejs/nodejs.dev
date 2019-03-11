import React from 'react';
import { NavigationItemList, NavigationSectionItem } from '../types';
import NavigationItem from './navigation-item';

type Props = {
  key: string;
  title: string;
  section: NavigationItemList;
  currentSlug: string;
  onItemClick: () => void;
  flatSections: NavigationSectionItem[];
};

const NavigationSection = ({
  title,
  section,
  currentSlug,
  onItemClick,
  flatSections,
}: Props) => {
  return (
    <ul className="side-nav__list">
      <h2 className="side-nav__title">{title}</h2>
      {section.map((item: NavigationSectionItem) => {
        let flatItem: NavigationSectionItem = { ...item, isDone: false };
        for (let i: number = 0; i < flatSections.length; i++) {
          if (flatSections[i].slug === item.slug) {
            flatItem = flatSections[i];
            break;
          }
        }

        return (
          <NavigationItem
            key={item.slug}
            title={item.title}
            slug={item.slug}
            isDone={flatItem.isDone}
            isActive={item.slug === currentSlug}
            onClick={onItemClick}
          />
        );
      })}
    </ul>
  );
};

export default NavigationSection;
