import React from 'react';
import { NavigationItemList, NavigationSectionItem } from '../types';
import NavigationItem from './navigation-item';

type Props = {
  key: string;
  title: string;
  section: NavigationItemList;
  currentSlug: string;
  onItemClick: () => void;
  flatSessions: NavigationSectionItem[];
};

const NavigationSection = ({
  title,
  section,
  currentSlug,
  onItemClick,
  flatSessions,
}: Props) => {
  return (
    <ul className="side-nav__list">
      <h2 className="side-nav__title">{title}</h2>
      {section.map((item: NavigationSectionItem) => {
        let flatItem: NavigationSectionItem = { ...item, isDone: false };
        for (let i = 0; i < flatSessions.length; i++) {
          if (flatSessions[i].slug === item.slug) {
            flatItem = flatSessions[i];
            break;
          }
        }

        return (
          <NavigationItem
            key={item.slug}
            title={item.title}
            slug={item.slug}
            isDone={flatItem.isDone || false}
            isActive={item.slug === currentSlug}
            onClick={onItemClick}
          />
        );
      })}
    </ul>
  );
};

export default NavigationSection;
