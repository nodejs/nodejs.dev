import React, { useState } from 'react';
import NavigationSection from './navigation-section';
import { NavigationSectionData, NavigationSectionItem } from '../types';
import { isSmallScreen } from '../util/isSmallScreen';

type Props = {
  sections: NavigationSectionData;
  currentSlug: string;
};

const Navigation = ({ sections, currentSlug }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = () => setIsOpen(!isOpen);
  const onItemClick = () => {
    if (isSmallScreen()) {
      toggle();
    }
  };
  const className = isOpen ? 'side-nav side-nav--open' : 'side-nav';

  const readStatus: Map<NavigationSectionItem['slug'], boolean> = new Map();
  // Set status flag as read for section items till the one currently open
  let isRead = true;
  Object.keys(sections).forEach((sectionKey: string) => {
    const sectionData = sections[sectionKey];
    sectionData.forEach(section => {
      // Set status flag as unread for section items starting from the one currently open
      if (isRead && section.slug === currentSlug) {
        isRead = false;
      }
      // Mark section items as read or unread using the flag
      readStatus.set(section.slug, isRead);
    });
  });

  return (
    <nav className={className}>
      <button className="side-nav__open" onClick={toggle}>
        Menu
      </button>
      {Object.keys(sections).map((sectionKey: string) => (
        <NavigationSection
          key={sectionKey}
          title={sectionKey}
          section={sections[sectionKey]}
          currentSlug={currentSlug}
          onItemClick={onItemClick}
          readStatus={readStatus}
        />
      ))}
    </nav>
  );
};

export default Navigation;
