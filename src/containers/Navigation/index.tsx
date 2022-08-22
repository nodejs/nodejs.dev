import React, { useState } from 'react';
import NavigationSection from '../../components/NavigationSection';
import { NavigationSectionData, NavigationSectionItem } from '../../types';
import { isMobileScreen } from '../../util/isScreenWithinWidth';

interface Props {
  sections: NavigationSectionData;
  currentSlug: string;
  label: string;
  category: string;
}

const Navigation = ({
  sections,
  currentSlug,
  label,
  category,
}: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = (): void => setIsOpen(!isOpen);

  const onItemClick = () => {
    if (isMobileScreen()) {
      toggle();
    }
  };

  const className = isOpen ? 'side-nav side-nav--open' : 'side-nav';

  const readSections: Set<NavigationSectionItem['slug']> = new Set();

  // Assume section items up to the one currently open have been read. Track
  // their unique slugs in `readSections` set.
  Object.keys(sections).some(sectionKey => {
    let isCurrentSlug = false;
    sections[sectionKey].data.some((sectionItem): boolean => {
      isCurrentSlug = sectionItem.slug === currentSlug;

      if (!isCurrentSlug) {
        readSections.add(sectionItem.slug);
      }

      return isCurrentSlug;
    });

    return isCurrentSlug;
  });

  return (
    <nav aria-label={label} className={className}>
      <button type="button" className="side-nav__open" onClick={toggle}>
        Menu
      </button>
      {Object.keys(sections).map(
        (sectionKey: string): false | JSX.Element =>
          sections[sectionKey].category === category && (
            <NavigationSection
              key={sectionKey}
              title={sectionKey}
              section={sections[sectionKey].data}
              currentSlug={currentSlug}
              onItemClick={onItemClick}
              readSections={readSections}
            />
          )
      )}
    </nav>
  );
};

export default Navigation;
