import React, { useState, useRef } from 'react';
import NavigationSection from './navigation-section';
import { NavigationSectionData, NavigationSectionItem } from '../types';
import { isSmallScreen } from '../util/isScreenWithinWidth';
import { scrollTo, calcNavScrollParams } from '../util/scrollTo';

interface Props {
  sections: NavigationSectionData;
  currentSlug: string;
}

const Navigation = ({ sections, currentSlug }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const navElement = useRef<HTMLElement | null>(null);
  const toggle = (): void => setIsOpen(!isOpen);
  const onItemClick = (): void => {
    if (isSmallScreen()) {
      toggle();
    }
  };
  const autoScroll = async (height: number): Promise<void> => {
    if (isOpen && !hasScrolled && navElement.current) {
      const { newScrollPos, scrollWindow, scrollTime } = calcNavScrollParams(
        height,
        navElement.current
      );

      try {
        await scrollTo(newScrollPos, scrollWindow, scrollTime);
        setHasScrolled(true);
      } catch (e) {
        // TODO: follow up with appropriate error logging if any
        setHasScrolled(false);
      }
    }
  };

  const className = isOpen ? 'side-nav side-nav--open' : 'side-nav';

  const readSections: Set<NavigationSectionItem['slug']> = new Set();
  // Assume section items up to the one currently open have been read. Track
  // their unique slugs in `readSections` set.
  Object.keys(sections).some((sectionKey): boolean => {
    let isCurrentSlug = false;
    sections[sectionKey].some((sectionItem): boolean => {
      isCurrentSlug = sectionItem.slug === currentSlug;
      if (!isCurrentSlug) {
        readSections.add(sectionItem.slug);
      }

      return isCurrentSlug;
    });

    return isCurrentSlug;
  });

  return (
    <nav className={className} ref={navElement}>
      <button type="button" className="side-nav__open" onClick={toggle}>
        Menu
      </button>
      {Object.keys(sections).map((sectionKey: string): JSX.Element[] => (
        <NavigationSection
          key={sectionKey}
          title={sectionKey}
          section={sections[sectionKey]}
          currentSlug={currentSlug}
          onItemClick={onItemClick}
          readSections={readSections}
          autoScroll={autoScroll}
        />
      ))}
    </nav>
  );
};

export default Navigation;
