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
  // Mark section items as read up to the one currently open
  let isRead = true;
  Object.keys(sections).forEach(sectionKey => {
    sections[sectionKey].forEach(sectionItem => {
      if (sectionItem.slug === currentSlug) {
        isRead = false;
      }
      readStatus.set(sectionItem.slug, isRead);
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
