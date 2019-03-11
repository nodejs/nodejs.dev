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
  let flatSections: NavigationSectionItem[] = [];
  Object.keys(sections).map((sectionKey: string) => {
    flatSections = [...flatSections, ...sections[sectionKey]];
  });

  const currentSlugIndex: number = flatSections.findIndex(
    (flatSection: NavigationSectionItem) => flatSection.slug === currentSlug
  );

  flatSections.forEach((item: NavigationSectionItem, index: number) => {
    item.isDone = index < currentSlugIndex;
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
          flatSections={flatSections}
        />
      ))}
    </nav>
  );
};

export default Navigation;
