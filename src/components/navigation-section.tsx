import React from 'react';
import { NavigationSectionItem } from '../types';
import NavigationItem from './navigation-item';

interface Props {
  key: string;
  title: string;
  section: NavigationSectionItem[];
  currentSlug: string;
  onItemClick: () => void;
  readSections: Set<NavigationSectionItem['slug']>;
  autoScroll: (height: number) => void;
}

const NavigationSection = ({
  title,
  section,
  currentSlug,
  onItemClick,
  readSections,
  autoScroll,
}: Props): JSX.Element => {
  return (
    <ul className="side-nav__list">
      <h2 className="t-body2 side-nav__title">
        <i className="material-icons">offline_bolt</i>
        {title}
      </h2>
      {section.map(
        (item: NavigationSectionItem): JSX.Element => {
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
        }
      )}
    </ul>
  );
};

export default NavigationSection;
