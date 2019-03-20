import React, { useState } from 'react';
import NavigationSection from './navigation-section';
import { NavigationSectionData, NavigationSectionItem } from '../types';
import {
  isScreenWithinWidth,
  MAX_SMALL_SCREEN_WIDTH,
} from '../util/isScreenWithinWidth';

type Props = {
  sections: NavigationSectionData;
  currentSlug: string;
};

const Navigation = ({ sections, currentSlug }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = () => setIsOpen(!isOpen);
  const onItemClick = () => {
    if (isScreenWithinWidth(MAX_SMALL_SCREEN_WIDTH)) {
      toggle();
    }
  };
  const className = isOpen ? 'side-nav side-nav--open' : 'side-nav';

  const readSections: Set<NavigationSectionItem['slug']> = new Set();
  // Assume section items up to the one currently open have been read. Track
  // their unique slugs in `readSections` set.
  Object.keys(sections).some(sectionKey => {
    let isCurrentSlug: boolean = false;
    sections[sectionKey].some(sectionItem => {
      isCurrentSlug = sectionItem.slug === currentSlug;
      if (!isCurrentSlug) {
        readSections.add(sectionItem.slug);
      }

      return isCurrentSlug;
    });

    return isCurrentSlug;
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
          readSections={readSections}
        />
      ))}
    </nav>
  );
};

export default Navigation;
