import React, { useState, useRef } from 'react';
import NavigationSection from '../../components/NavigationSection';
import { NavigationSectionData, NavigationSectionItem } from '../../types';
import { isMobileScreen } from '../../util/isScreenWithinWidth';
import { scrollTo, calcNavScrollParams } from '../../util/scrollTo';

interface Props {
  sections: NavigationSectionData;
  currentSlug: string;
  label: string;
  previousSlug: string;
}

const Navigation = ({
  sections,
  currentSlug,
  label,
  previousSlug,
}: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const navElement = useRef<HTMLElement | null>(null);
  const toggle = (): void => setIsOpen(!isOpen);
  const onItemClick = (): void => {
    if (isMobileScreen()) {
      toggle();
    }
  };

  if (typeof window !== 'undefined') {
    const nav = navElement.current;

    if (nav) {
      const CurrentLinkElem = document.getElementById(`link-${currentSlug}`);
      const { newScrollPos, scrollWindow, scrollTime } = calcNavScrollParams(
        CurrentLinkElem?.getBoundingClientRect().top || 0,
        nav
      );
      if (!previousSlug) {
        nav.scrollTop = newScrollPos;
      } else {
        const PrevLinkElem = document.getElementById(`link-${previousSlug}`);
        const prevElemScroll = calcNavScrollParams(
          PrevLinkElem?.getBoundingClientRect().top || 0,
          nav
        );
        nav.scrollTop = prevElemScroll.newScrollPos;
        scrollTo(newScrollPos, scrollWindow, scrollTime);
      }
    }
  }

  const reRender = async (): Promise<void> => {
    if ((isOpen || !isMobileScreen()) && !hasScrolled && navElement.current)
      setHasScrolled(true);
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
    <nav aria-label={label} className={className} ref={navElement}>
      <button type="button" className="side-nav__open" onClick={toggle}>
        Menu
      </button>
      {Object.keys(sections).map(
        (sectionKey: string): JSX.Element => (
          <NavigationSection
            key={sectionKey}
            title={sectionKey}
            section={sections[sectionKey]}
            currentSlug={currentSlug}
            onItemClick={onItemClick}
            readSections={readSections}
            reRender={reRender}
          />
        )
      )}
    </nav>
  );
};

export default Navigation;
