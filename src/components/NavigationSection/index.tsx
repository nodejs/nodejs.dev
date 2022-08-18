import React, { useState } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { NavigationSectionItem } from '../../types';
import NavigationItem from '../NavigationItem';

interface Props {
  key: string;
  title: string;
  section: NavigationSectionItem[];
  currentSlug: string;
  onItemClick: () => void;
  readSections: Set<NavigationSectionItem['slug']>;
}

const NavigationSection = ({
  title,
  section,
  currentSlug,
  onItemClick,
  readSections,
}: Props): JSX.Element => {
  const isActive = (item: NavigationSectionItem) => item.slug === currentSlug;
  const [isOpen, setIsOpen] = useState(!!section.find(isActive));
  const isMobile = useMediaQuery('(max-width: 870px)');
  const toggle = (): void => setIsOpen(!isOpen);

  return (
    <ul className="side-nav__list">
      <div
        className="t-body2 side-nav__item side-nav__item--title"
        onClick={toggle}
        onKeyDown={toggle}
        tabIndex={0}
        role="menuitem"
      >
        {title}
        {!isMobile && (
          <i className="material-icons">
            {isOpen ? 'arrow_drop_down' : 'arrow_drop_up'}
          </i>
        )}
      </div>
      <div style={{ display: isOpen || isMobile ? 'block' : 'none' }}>
        {section.map((item: NavigationSectionItem): JSX.Element => {
          const isRead: boolean = readSections.has(item.slug);

          return (
            <NavigationItem
              key={item.slug}
              title={item.title}
              slug={item.slug}
              isRead={isRead}
              isActive={isActive(item)}
              onClick={onItemClick}
            />
          );
        })}
      </div>
    </ul>
  );
};

export default NavigationSection;
